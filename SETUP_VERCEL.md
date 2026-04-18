# Setup Vercel — Lobby Spectator Feature

## 1. Deploy su Vercel

1. Vai su https://vercel.com e fai login
2. Clicca **Add New → Project**
3. Importa il repository GitHub del progetto
4. Framework Preset: **Next.js** (rilevato automaticamente)
5. Clicca **Deploy**

---

## 2. Aggiungere Redis (Upstash) per il lobby store

Il progetto usa `@upstash/redis` direttamente.

### Dal dashboard Vercel

1. Apri il progetto su Vercel → tab **Storage**
2. Clicca **Create Database → Upstash Redis**  
   _(oppure vai su Vercel Marketplace → cerca "Upstash Redis")_
3. Dai un nome (es. `lobby-store`) e scegli la regione più vicina ai tuoi utenti
4. Clicca **Create & Continue → Connect to Project**
5. Vercel aggiunge automaticamente queste variabili d'ambiente al progetto:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `UPSTASH_REDIS_REST_READ_ONLY_TOKEN`
6. Fai un nuovo deploy (o usa **Redeploy** dalla tab Deployments)

> ℹ️ Il `lobbyStore.ts` supporta anche le vecchie variabili `KV_REST_API_URL` / `KV_REST_API_TOKEN`
> come fallback, quindi funziona anche con store KV esistenti.

---

## 3. Variabili d'ambiente in locale (sviluppo)

In locale il progetto NON ha bisogno di Redis — usa uno store in-memory.
Se vuoi testare il KV in locale:

1. Installa la Vercel CLI:
   ```
   npm i -g vercel
   ```
2. Linka il progetto:
   ```
   vercel link
   ```
3. Scarica le variabili d'ambiente:
   ```
   vercel env pull .env.local
   ```
4. Avvia il dev server:
   ```
   npm run dev
   ```

---

## 4. Come funziona la lobby in produzione

| Cosa succede                       | Dove                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| Host clicca "Condividi partita"    | `/game` — genera un ID es. `A3F9QR`                                 |
| Stato di gioco inviato ogni ~400ms | `POST /api/lobby/A3F9QR` → salvato su Upstash Redis (TTL 4 ore)     |
| Spettatori aprono il link          | `/watch/A3F9QR` — fa polling `GET /api/lobby/A3F9QR` ogni 3 secondi |
| Schermata WIN, LOSE, ENDGAME       | Mostrate in overlay sulla pagina watch                              |
| Carte in mano                      | Visibili in sola lettura in basso                                   |

---

## 5. Note importanti

- **TTL lobby**: lo stato viene cancellato automaticamente dopo **4 ore** di inattività.
- **Free tier Upstash**: 10.000 richieste/giorno gratuite. Con polling ogni 3s per 10 spettatori = ~29.000 richieste/ora — **considera di aumentare il POLL_INTERVAL_MS** a 5000–10000 per partite con molti spettatori.
- **Scalabilità**: l'architettura funziona su Vercel Serverless (stateless) grazie a Redis. Non c'è stato in-memory tra richieste in produzione.

---

## 6. Dipendenze — stato attuale

### `@upstash/redis` ✅ (già in uso)

Libreria ufficiale Upstash, attivamente mantenuta. Sostituisce il deprecato `@vercel/kv`.

### `next-pwa` ⚠️ (deprecato / non mantenuto)

- **Situazione**: `next-pwa` (v5) non è mantenuto attivamente e ha vulnerabilità note.
- **Alternativa**: `@ducanh2912/next-pwa` (fork mantenuto attivamente, drop-in replacement)
  ```
  npm uninstall next-pwa
  npm install @ducanh2912/next-pwa
  ```
  Cambia solo l'import in `next.config.js`:
  ```js
  // Prima
  const withPWA = require("next-pwa")({ ... });
  // Dopo
  const withPWA = require("@ducanh2912/next-pwa").default({ ... });
  ```
