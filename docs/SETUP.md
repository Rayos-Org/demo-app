# Local Development Setup

> **Prerequisites:** Node.js ≥ 24, Git, a modern browser (Chrome/Edge recommended for WebAuthn).

---

## 1. Clone the Repository

```bash
git clone https://github.com/Rayos-Org/demo-app.git
cd demo-app
```

---

## 2. Install Dependencies

```bash
npm install
```

> This installs Next.js, `@rayos/wallet-sdk`, Framer Motion, Playwright, and all other dependencies listed in `package.json`.

---

## 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and update the values if needed:

```env
# Stellar Network (Testnet by default — do not change for local dev)
NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_STELLAR_RPC_URL="https://soroban-testnet.stellar.org"

# Relay Backend URL
# Point this at your locally-running relay-backend, or leave as-is for the hosted testnet relay
NEXT_PUBLIC_RELAY_URL="https://relay.testnet.rayos.org"
```

> **Note:** All `NEXT_PUBLIC_*` variables are exposed to the browser. Never put private keys or secrets here.

---

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app includes hot-reloading — changes are reflected instantly.

---

## 5. Run Checks

Before opening a PR, make sure all checks pass locally:

```bash
# TypeScript type check (no emit)
npx tsc --noEmit

# ESLint
npm run lint

# Production build
npm run build

# E2E smoke tests (requires a running dev/prod server)
npx playwright test
```

> **Playwright browsers:** The first time you run `npx playwright test`, it will automatically use any already-installed Chromium. If it complains about missing browsers, run `npx playwright install chromium`.

---

## 6. Development Workflow

```
npm run dev          # Start dev server at localhost:3000
npx tsc --noEmit     # Type-check while coding
npm run lint         # Lint
npx playwright test  # Smoke test after any checkout flow changes
```

---

## 7. Running Against a Local relay-backend

If you have the [`relay-backend`](https://github.com/Rayos-Org/relay-backend) running locally, point the app at it:

```env
NEXT_PUBLIC_RELAY_URL="http://localhost:4000"
```

Then update `lib/sdk-client.ts` to replace `generateCheckoutXdr` with a real `fetch` call to your local relay endpoint.

---

## 8. Project Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Next.js dev server with hot reload |
| Build | `npm run build` | Production build |
| Start | `npm start` | Start the production build locally |
| Lint | `npm run lint` | ESLint |
| Type check | `npx tsc --noEmit` | TypeScript strict check |
| E2E tests | `npx playwright test` | Playwright smoke tests |
| View E2E report | `npx playwright show-report` | Open last test report in browser |

---

## 9. Troubleshooting

**`@rayos/wallet-sdk` install fails**
- Ensure you are running **Node.js ≥ 24**. The SDK has an `engines` constraint. Run `node --version` to check.

**WebAuthn does not trigger in the browser**
- WebAuthn requires a **secure context** (HTTPS or `localhost`). The dev server on `localhost:3000` is a secure context by default.
- Chrome and Edge have the best WebAuthn support. Safari may require additional settings.

**Playwright tests fail locally**
- Make sure no other process is using port 3000.
- Run `npx playwright install chromium` if browsers are missing.

**Build fails with TypeScript errors**
- Run `npx tsc --noEmit` first to see the exact error locations before the build.
