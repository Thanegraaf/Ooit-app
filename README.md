# Ooit, onze gedeelde bucketlist

Een web-app voor jullie twee. Eén gedeelde lijst met ervaringen, live bijgewerkt, met herinneringen en foto's. De app draait op Supabase en staat als app op het beginscherm van je iPhone.

## Wat er al klaarstaat

| Onderdeel | Status |
|---|---|
| De app zelf (`index.html`, `app.css`, `app.js`) | Staat in de repository |
| Database, beveiliging en foto-opslag (`supabase/schema.sql`) | Klaar om te plakken, getest op PostgreSQL 16 |
| Online zetten (`.github/workflows/deploy.yml`) | Automatisch bij elke push naar de standaardbranch |
| GitHub Pages aanzetten | Eén klik in Settings, zie stap 6 |
| Supabase-sleutels invullen | Doet de deploy zelf, uit twee repository secrets |
| Cache-versie ophogen bij updates | Doet de deploy zelf, op basis van de commit |
| Supabase wakker houden (`.github/workflows/keepalive.yml`) | Elke dag om 05:17 UTC |
| Meldingen op je telefoon (`supabase/push.sql`, `.github/workflows/notify.yml`) | Klaar om aan te zetten, zie stap 8 |

Je hoeft `config.js` en `sw.js` dus niet meer met de hand aan te passen.

## Wat je zelf moet doen

Zeven stappen, ongeveer twintig minuten.

### 1. Repository op publiek (gedaan)

GitHub Pages werkt bij een gratis account alleen vanuit een publieke repository. Deze repository staat al op publiek.

Dat is veilig. In de code staan geen geheimen. De publishable key van Supabase hoort openbaar te zijn, want Row Level Security bepaalt wie wat mag. Alleen jullie twee accounts kunnen de lijst en de foto's lezen. Je foto's en teksten staan in Supabase, niet in de repository.

### 2. Maak het Supabase-project

1. Maak een gratis project op supabase.com.
2. Kies een regio in Europa, bijvoorbeeld Frankfurt.
3. Bewaar het databasewachtwoord op een veilige plek.

### 3. Zet de database klaar

1. Open in Supabase de **SQL Editor**.
2. Plak de volledige inhoud van `supabase/schema.sql`.
3. Klik op **Run**. Onderaan verschijnt een tijdstempel.

Het script maakt de tabellen, de beveiliging, de privé foto-opslag `photos` en de live updates. Je kunt het veilig opnieuw uitvoeren.

### 4. Zet inloggen goed

Ga in Supabase naar **Authentication > Sign In / Providers > Email**.

1. Zet **Confirm email** uit. Een nieuw account werkt dan meteen, zonder bevestigingsmail.
2. Laat **Allow new users to sign up** aan. Die zet je in stap 7 uit.

### 5. Zet twee secrets op GitHub

Ga naar **Settings > Secrets and variables > Actions > New repository secret** en maak deze twee aan.

| Naam | Waarde |
|---|---|
| `SUPABASE_URL` | De Project URL, bijvoorbeeld `https://abcdefgh.supabase.co` |
| `SUPABASE_ANON_KEY` | De publishable key (`sb_publishable_...`) of de legacy anon key |

Je vindt beide in Supabase onder **Project Settings > API Keys**.

Gebruik nooit de secret key of de service_role key. De deploy weigert die en stopt met een foutmelding.

Deze twee secrets gebruiken zowel de deploy als de keep-alive. Je hoeft ze dus maar één keer in te vullen.

### 6. Zet GitHub Pages aan en start de deploy

Dit moet je zelf doen. Een workflow mag Pages niet aanzetten, GitHub weigert dat met `Resource not accessible by integration`.

1. Ga naar **Settings > Pages**.
2. Kies bij **Source** de optie **GitHub Actions**.
3. Ga naar het tabblad **Actions**, kies **Deploy naar GitHub Pages** en klik op **Run workflow**.

Na een minuut staat de app op `https://thanegraaf.github.io/Ooit-app/`.

Klik daarna ook één keer op **Run workflow** bij **Supabase keepalive**. In de log hoort `HTTP 200` te staan.

### 7. Op de iPhone zetten en accounts aanmaken

Doe dit eerst zelf, daarna je vriendin.

1. Open de link uit stap 6 in **Safari**. Niet in Chrome of in een app.
2. Tik op de deelknop en kies **Zet op beginscherm**. Staat er **Open als webapp**, laat dat aan.
3. Open de app vanaf het beginscherm. Die heeft een eigen login, los van Safari.
4. Maak een account met een gebruikersnaam en wachtwoord en vul je naam in. Jij krijgt plek 1. De gebruikersnaam is niet je echte e-mailadres, de app verzint er zelf een technisch adres bij zodat Supabase het als account kan opslaan.
5. Stuur de link naar je vriendin. Zij doet hetzelfde en krijgt plek 2.

Zet daarna in Supabase **Allow new users to sign up** uit. De lijst laat sowieso maximaal twee leden toe, dit is een extra slot op de deur.

### 8. Meldingen aanzetten

Deze stap is optioneel. Zonder deze stap werkt de app gewoon, je krijgt alleen geen melding op je telefoon.

Meldingen werken op de iPhone **alleen in de app op je beginscherm**. In een Safari-tabblad kan het niet, dat is een regel van Apple.

**8a. Sleutels maken**

Je hebt drie waarden nodig. Maak ze op je eigen computer met Node:

```
npx web-push generate-vapid-keys
```

Dat geeft een Public Key en een Private Key. Voor het wachtwoord van de wachtrij verzin je een lange, willekeurige tekst, bijvoorbeeld met:

```
openssl rand -base64 24
```

**8b. Tabellen in Supabase**

1. Open `supabase/push.sql` en vervang onderaan `VUL_HIER_HET_WACHTWOORD_IN` door het wachtwoord uit stap 8a.
2. Plak het hele bestand in de **SQL Editor** van Supabase en klik op **Run**.

Je kunt dit veilig opnieuw uitvoeren, bijvoorbeeld als je het wachtwoord wilt wijzigen.

**8c. Secrets op GitHub**

Maak deze vier secrets aan, op dezelfde plek als in stap 5.

| Naam | Waarde |
|---|---|
| `VAPID_PUBLIC_KEY` | De Public Key uit stap 8a |
| `VAPID_PRIVATE_KEY` | De Private Key uit stap 8a. Deze hoort nergens anders |
| `PUSH_SECRET` | Hetzelfde wachtwoord dat nu in `push_config` staat |
| `VAPID_SUBJECT` | Optioneel, bijvoorbeeld `mailto:jij@voorbeeld.nl` |

De publieke sleutel gaat mee in `config.js`, dat hoort zo. De private sleutel en het wachtwoord blijven op GitHub en komen nooit in de app terecht.

**8d. Opnieuw uitrollen en aanzetten**

1. Start **Deploy naar GitHub Pages** opnieuw via **Actions > Run workflow**. In de log hoort `VAPID-sleutel ingevuld: true` te staan.
2. Open de app op je beginscherm, tik rechtsboven op de knop met jullie namen en kies **Meldingen aanzetten**. Sta de melding toe.
3. Laat je vriendin hetzelfde doen op haar telefoon.

Elke telefoon meldt zich apart aan. Zet je de app op een tweede apparaat, dan zet je het daar ook apart aan.

**Wanneer krijg je een melding**

| Wat er gebeurt | Wie krijgt de melding |
|---|---|
| De ander zet iets op jullie lijst | Jij |
| De ander zet iets samen op de lijst dat jij moet goedkeuren | Jij |
| De ander wil jouw ervaring ook | Jij |
| De ander streept iets af als beleefd | Jij |
| Een verrassing gaat open | De ontvanger, om 08:00 op die dag |

De app zet de melding in een wachtrij. De workflow **Meldingen versturen** leegt die wachtrij elke tien minuten. GitHub loopt bij drukte achter op het schema, dus reken op een melding binnen een half uur. Haal je een verrassing weg voordat hij opengaat, dan verdwijnt de melding mee.

Wil je meldingen uitzetten, dan tik je in hetzelfde scherm op **Meldingen uitzetten**. Wil je ze voor iedereen stoppen, zet dan de workflow **Meldingen versturen** uit onder **Actions**.

## Updates uitbrengen

Pas de bestanden aan en push naar de standaardbranch. De rest gaat vanzelf. De deploy zet een nieuwe cache-versie in `sw.js`, dus je telefoon haalt de nieuwe versie op bij de volgende keer openen.

## Waarom die keep-alive

Supabase pauzeert een gratis project na een week zonder databaseverkeer. De workflow schrijft elke dag een heartbeat. Mislukt dat, dan krijg je een mail van GitHub.

GitHub zet geplande taken in een publieke repository uit na 60 dagen zonder activiteit. Daarom maakt de workflow een kleine commit als de laatste commit 45 dagen oud is.

## Problemen oplossen

| Probleem | Oplossing |
|---|---|
| De app toont "Nog even koppelen" | De secrets uit stap 5 ontbreken of de deploy draaide daarna niet meer. Voeg ze toe en start **Deploy naar GitHub Pages** opnieuw. |
| De app toont "Jullie lijst is nu niet bereikbaar" | Kijk in Supabase of het project gepauzeerd is en klik op **Restore**. Controleer daarna de runs van de keep-alive. |
| Wachtwoord vergeten | Ga in Supabase naar **Authentication > Users**, open de gebruiker en stel een nieuw wachtwoord in. |
| "Deze lijst is compleet" bij een nieuw account | Er zijn al twee leden. Log in met een van die accounts. |
| Foto's laden niet | Controleer of stap 3 volledig is uitgevoerd. De bucket `photos` moet bestaan. |
| De deploy faalt op "Verkeerde sleutel" | In `SUPABASE_ANON_KEY` staat een secret key of service_role key. Vervang hem door de publishable key. |
| De deploy faalt op "Get Pages site failed" | Pages staat nog uit. Zet in **Settings > Pages** de bron op **GitHub Actions** en start de workflow opnieuw. |

### Ik krijg geen meldingen

1. Open je de app vanaf je beginscherm, niet in een Safari-tabblad? In een tabblad werkt het niet.
2. Staat in het profielscherm **Meldingen staan aan op dit apparaat**? Zo nee, zet ze daar aan.
3. Kijk onder **Actions** bij **Meldingen versturen** naar de laatste run. Staat er `Deze secrets ontbreken nog`, dan mist er een secret uit stap 8c.
4. Staat er `PUSH_SECRET klopt niet`, dan verschilt het secret op GitHub van de waarde in `push_config`. Voer `supabase/push.sql` opnieuw uit met het juiste wachtwoord.
5. Staat in de deploy-log `VAPID-sleutel ingevuld: false`, dan mist `VAPID_PUBLIC_KEY`. Vul hem aan en rol opnieuw uit.
6. Controleer bij Instellingen, Ooit, Berichtgeving of iOS de meldingen niet blokkeert.

## Kosten en grenzen

Het gratis plan van Supabase geeft 500 MB database en 1 GB bestandsopslag. De app verkleint foto's tot maximaal 1800 pixels, dus er passen honderden foto's in. Wil je nooit meer over pauzeren nadenken, dan is het Pro-plan van Supabase de enige garantie. Betaalde projecten pauzeert Supabase niet.

## Alternatief voor de keep-alive: cron-job.org

Gebruik dit als je de app niet via GitHub host.

1. Maak een gratis account op cron-job.org.
2. Maak een job met URL `https://JOUW-PROJECT.supabase.co/rest/v1/rpc/heartbeat`, methode **POST** en body `{}`.
3. Voeg de header `apikey` toe met je publishable key. Gebruik je de legacy anon key, voeg dan ook `Authorization: Bearer JOUW-ANON-KEY` toe.
4. Voeg de header `Content-Type: application/json` toe.
5. Laat de job één keer per dag draaien.
