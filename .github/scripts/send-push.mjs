// Stuurt de meldingen uit de wachtrij van Supabase door naar de telefoons.
// Draait als geplande taak op GitHub, zie .github/workflows/notify.yml.
//
// Kort samengevat:
//   1. push_batch haalt de meldingen op die klaarstaan, met de telefoons erbij
//   2. web-push levert elke melding af bij Apple of Google
//   3. push_done zet ze op verstuurd en ruimt telefoons op die niet meer bestaan
import webpush from 'web-push';

const url = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
const key = (process.env.SUPABASE_ANON_KEY || '').trim();
const secret = (process.env.PUSH_SECRET || '').trim();
const pub = (process.env.VAPID_PUBLIC_KEY || '').trim();
const priv = (process.env.VAPID_PRIVATE_KEY || '').trim();
const subject = (process.env.VAPID_SUBJECT || '').trim() || 'mailto:ooit@example.com';

const missing = Object.entries({ SUPABASE_URL: url, SUPABASE_ANON_KEY: key, PUSH_SECRET: secret, VAPID_PUBLIC_KEY: pub, VAPID_PRIVATE_KEY: priv })
  .filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.log('Deze secrets ontbreken nog: ' + missing.join(', ') + '. Er wordt niets verstuurd.');
  process.exit(0);
}

webpush.setVapidDetails(subject, pub, priv);

// De publishable key hoort alleen in apikey, de oudere anon key ook als token.
function headers() {
  const h = { apikey: key, 'Content-Type': 'application/json' };
  if (!key.startsWith('sb_publishable_')) h.Authorization = 'Bearer ' + key;
  return h;
}

async function rpc(name, body) {
  const res = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST', headers: headers(), body: JSON.stringify(body)
  });
  const text = await res.text();
  if (!res.ok) {
    if (text.includes('bad_secret')) throw new Error('PUSH_SECRET klopt niet met de waarde in push_config. Voer supabase/push.sql opnieuw uit met het juiste wachtwoord.');
    throw new Error(`${name} gaf HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

const queue = await rpc('push_batch', { p_secret: secret });
if (!Array.isArray(queue) || queue.length === 0) {
  console.log('Geen meldingen die klaarstaan.');
  process.exit(0);
}

const done = [];
const dead = new Set();
let verstuurd = 0;

for (const row of queue) {
  const subs = Array.isArray(row.subs) ? row.subs : [];
  const payload = JSON.stringify({ title: row.title, body: row.body || '', tag: row.tag || 'ooit' });

  if (subs.length === 0) {
    // Niemand heeft meldingen aanstaan. De melding blijft niet eeuwig staan.
    console.log(`#${row.id} "${row.title}": geen telefoon aangemeld, overgeslagen.`);
    done.push(row.id);
    continue;
  }

  let gelukt = 0;
  for (const s of subs) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { TTL: 86400 });
      gelukt++;
      verstuurd++;
    } catch (err) {
      const code = err && err.statusCode;
      if (code === 404 || code === 410) {
        // Deze telefoon bestaat niet meer, of de app is verwijderd.
        dead.add(s.endpoint);
      } else {
        console.log(`#${row.id} naar een telefoon mislukt: HTTP ${code || '?'} ${(err && err.body) || (err && err.message) || ''}`.trim());
      }
    }
  }

  // Een melding telt als afgehandeld zodra elke telefoon geprobeerd is.
  // Alleen bij een storing bij Apple of Google blijft hij staan voor de
  // volgende ronde, dan is een tweede poging zinvol.
  const storing = gelukt === 0 && subs.some(s => !dead.has(s.endpoint));
  if (storing) console.log(`#${row.id} "${row.title}": niets afgeleverd, blijft in de wachtrij.`);
  else done.push(row.id);
}

if (done.length || dead.size) {
  await rpc('push_done', { p_secret: secret, p_ids: done, p_dead: [...dead] });
}
console.log(`Klaar. ${verstuurd} melding(en) afgeleverd, ${done.length} uit de wachtrij, ${dead.size} oude telefoon(s) opgeruimd.`);
