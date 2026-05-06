# CLAUDE.md — The Bridge Consulting

Site vitrine + tunnel de paiement Mobile Money (Gabon) pour The Bridge Consulting (tourisme d'affaire, personal shopper, consulting Afrique).

## Stack

- **Front** : React 19 + TypeScript + Vite 6
- **Routing** : React Router 7 (`createBrowserRouter`)
- **UI** : Tailwind CSS 4 (`@tailwindcss/vite`), `lucide-react` (icônes), `motion` (animations Framer Motion v12)
- **Back paiement** : Node.js + Express 5 + `tsx` (sert l'API `/api/*`, port 3001)
- **Passerelle de paiement** : **SingPay** (Airtel Money + Moov Money — Gabon)

## Arborescence

```
src/
  App.tsx              → RouterProvider
  routes.ts            → définition des routes (Home, About, Services, Payment, Checkout, Contact, Testimonials)
  pages/
    Home.tsx           → landing
    Services.tsx       → catalogue d'offres + modale de confirmation, navigue vers /checkout
    Checkout.tsx       → tunnel de paiement (sélection opérateur → numéro → polling statut)
    Payment.tsx        → page d'explications "comment payer" (workflow WhatsApp + Airtel)
    About.tsx, Contact.tsx, Testimonials.tsx
  components/
    Header.tsx, Footer.tsx
    PaymentModal.tsx   → variante modale du tunnel de paiement (réutilisable)
    WhatsAppButton.tsx → bouton CTA WhatsApp (numéro +241 60354192)

server/
  index.ts             → API Express : /api/pay, /api/payment-status/:id, /api/payment-callback
                         Proxy vers SingPay (gateway.singpay.ga/v1)

public/                → assets statiques (logos opérateurs, images d'offres)
vite.config.ts         → proxy /api → http://localhost:3001
```

## Scripts

```bash
npm run dev       # Front Vite seul (port 5173)
npm run server    # Backend SingPay seul (port 3001)
npm run dev:all   # Les deux en parallèle (concurrently)
npm run build     # tsc + vite build
npm run preview   # serveur statique du build
```

## Variables d'environnement (`.env`)

```
SINGPAY_BASE_URL=https://gateway.singpay.ga/v1
SINGPAY_CLIENT_ID=<x-client-id depuis SingPay Workspace>
SINGPAY_CLIENT_SECRET=<x-client-secret depuis SingPay Workspace>
SINGPAY_WALLET_ID=<Wallet ID — récupéré dans le détail du portefeuille>
SINGPAY_DISBURSEMENT_ID=<obligatoire en prod uniquement>
CALLBACK_URL=<URL publique pour le webhook /api/payment-callback>
PORT=3001
```

## API SingPay — Référentiel rapide

Auth : 3 headers obligatoires sur chaque appel paiement :
- `x-client-id`, `x-client-secret`, `x-wallet`

Endpoints utilisés (host `https://gateway.singpay.ga/v1`) :

| Endpoint | Usage |
|---|---|
| `POST /74/paiement` | USSD Push **Airtel Money** |
| `POST /62/paiement` | USSD Push **Moov Money** |
| `GET  /transaction/api/status/{id}` | Vérifier le statut d'une transaction |
| `PUT  /portefeuille/api/{id}` | Configurer l'URL de callback du portefeuille |

Body de paiement :
```json
{
  "amount": 1400000,
  "reference": "<uuid marchand>",
  "client_msisdn": "+241XXXXXXXX",
  "portefeuille": "<wallet_id>",
  "disbursement": "<disbursement_id>",   // prod uniquement
  "isTransfer": false
}
```

Statuts transaction (`transaction.status`) : `Start` → `Partenaire` → `Terminate` (+ `Disbursement`, `Refund`).
Résultats finaux (`transaction.result`) : `Success`, `PasswordError`, `BalanceError`, `TimeOutError`, `Error`.

Mapping côté frontend :
- `Terminate` + `Success` → `COMPLETED`
- `Terminate` + autre → `FAILED`
- sinon → `PENDING`

## Flux de paiement

1. **Services.tsx** : l'utilisateur clique sur une offre → modale de confirmation → `navigate('/checkout', { state: { offer } })`.
2. **Checkout.tsx** : choix opérateur (Airtel/Moov) → saisie numéro → `POST /api/pay`.
3. **server/index.ts** : appelle SingPay (`/74/paiement` ou `/62/paiement`), retourne `{ depositId, reference }`.
4. **Checkout.tsx** : poll `GET /api/payment-status/:id` toutes les 5s (timeout 3 min).
5. **server/index.ts** (callback) : si SingPay POST `/api/payment-callback`, on met à jour le store local.

## Conventions

- Charte couleurs : noir `#1C1C1C`, or `#C9A84C`, sable `#F5F3EE`.
- Tous les textes en **français**.
- Numéro WhatsApp commercial : **+241 60354192**.
- Logos opérateurs dans `public/airtel-money-logo.png` et `public/moov-money-logo.png`.
