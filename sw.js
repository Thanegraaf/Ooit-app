// Service worker voor Wij twee.
// Verhoog VERSION bij elke update, dan halen telefoons de nieuwe bestanden op.
const VERSION = 'ooit-v1';
const SHELL = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './config.js',
  './manifest.webmanifest',
  './vendor/supabase-2.116.0.js',
  './icons/apple-touch-icon-v2.png',
  './icons/icon-192-v2.png',
  './icons/icon-512-v2.png'
];
const FONT_CACHE = 'ooit-fonts';

self.addEventListener('install', event => {
  // cache: 'reload' slaat de browsercache over, zodat een update meteen de
  // nieuwe bestanden binnenhaalt en niet een bewaard exemplaar.
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Meldingen: de GitHub-taak stuurt hier een bericht naartoe.
self.addEventListener('push', event => {
  let d = { title: 'Wij twee', body: '', tag: 'ooit' };
  try { d = Object.assign(d, event.data ? event.data.json() : {}); }
  catch (e) { if (event.data) d.body = event.data.text(); }
  event.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    tag: d.tag || 'ooit',
    icon: './icons/icon-192-v2.png',
    badge: './icons/icon-192-v2.png',
    data: { url: './' }
  }));
});

// Tik op de melding: open de app, of spring naar het venster dat al open staat.
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Lettertypes: eerst uit de cache.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => { cache.put(req, res.clone()); return res; }))
      )
    );
    return;
  }

  // Supabase en andere domeinen: altijd via het netwerk.
  if (url.origin !== self.location.origin) return;

  // Eigen bestanden: eerst netwerk, bij geen verbinding de cache. 'no-cache'
  // vraagt de server altijd of er een nieuwere versie is. GitHub Pages laat
  // bestanden anders tien minuten bewaren.
  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});
