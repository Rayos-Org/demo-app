# Architecture — `demo-app`

> **Vertical:** Merchant checkout — gasless, passkey-signed payments on Stellar Soroban testnet.
> This document is the single source of truth for how this repository is structured, what it does, and how it connects to the rest of the Rayos platform.

---

## 1. Purpose & Scope

`demo-app` is a **narrow, polished reference application** that proves the Rayos platform solves a real problem. It is:

- What you show in a **demo video**
- What you link to in a **grant application (SCF)**
- What you run during a **live interview**

It is built entirely on `@rayos/wallet-sdk`. It is **not** a kitchen-sink feature showcase — it is one vertical done reliably and beautifully.

**Chosen vertical: Checkout**
A merchant-facing storefront where a user can buy items from a mock catalog using a gasless, passkey-signed USDC payment on Stellar Testnet.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| UI Components | Custom shadcn-style components (Radix UI primitives) |
| Animations | Framer Motion |
| Wallet | `@rayos/wallet-sdk` |
| Network | Stellar Soroban Testnet |
| E2E Tests | Playwright |
| CI/CD | GitHub Actions |
| Deployment | Vercel (planned) |

---

## 3. Directory Structure

```
demo-app/
├── app/                              # Next.js App Router pages
│   ├── page.tsx                      # Landing page (/)
│   ├── layout.tsx                    # Root layout + testnet banner + navbar
│   ├── globals.css                   # Dark-theme CSS design tokens
│   ├── shop/
│   │   └── page.tsx                  # Product listing — mock catalog
│   ├── checkout/
│   │   └── [itemId]/
│   │       └── page.tsx              # Passkey-signed payment flow
│   └── receipt/
│       └── [txId]/
│           └── page.tsx              # Confirmation + on-chain proof link
│
├── components/                       # Shared UI components
│   ├── CheckoutFlow.tsx              # Wraps wallet-sdk's signAndSubmit
│   ├── ProductCard.tsx               # Product listing card
│   ├── ReceiptView.tsx               # Animated receipt + Stellar Expert link
│   └── ui/                           # Base design system (shadcn-style)
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
│
├── data/
│   └── mock-catalog.ts               # Fixed demo catalog — deterministic for recordings
│
├── lib/
│   ├── sdk-client.ts                 # Initialises WalletSdk with env-var config
│   └── utils.ts                      # cn() helper (clsx + tailwind-merge)
│
├── e2e/
│   └── checkout.spec.ts              # Playwright smoke test for full checkout flow
│
├── docs/                             # Developer & contributor documentation
│   ├── ARCHITECTURE.md               # This file
│   ├── SETUP.md                      # Local development setup guide
│   └── CONTRIBUTING.md               # How to contribute to this repository
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    # GitHub Actions: typecheck → lint → build → E2E
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
│
├── .env.example                      # Template for environment variables
├── next.config.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Key Checkout Flow

```
User → /shop → picks item → /checkout/[itemId]
                                    ↓
                          CheckoutFlow component
                                    ↓
                    generateCheckoutXdr(itemId, price)
                    [calls relay-backend API → Soroban XDR]
                                    ↓
                    walletClient.signAndSubmit(xdr, opts)
                    [passkey prompt → signature → relay submits]
                                    ↓
                         /receipt/[txHash]
                         [link to Stellar Expert Explorer]
```

Steps:
1. User browses the fixed demo catalog (deterministic, safe for screen recording).
2. User selects an item and sees the price in USDC.
3. Checkout triggers a **single passkey prompt** — Face ID / fingerprint / security key.
4. `wallet-sdk.signAndSubmit` signs the XDR locally and submits via the relay backend.
5. The receipt page shows the on-chain transaction with a direct Stellar Expert link — the strongest credibility signal in a demo.

---

## 5. Design Priorities

### Reliability over features
This app will be recorded and shown live. Every flow must work on the first try, every time. Cut scope before compromising reliability.

### Visible on-chain proof
Always link to a block explorer for the resulting transaction. This makes "non-custodial" a demonstrable claim, not a marketing line.

### Clear testnet labelling
A persistent, unmissable amber **"Testnet Demo"** banner is required. SCF reviewers specifically check that demos cannot be mistaken for live money applications.

### Environment-variable driven
All endpoint URLs (`NEXT_PUBLIC_RELAY_URL`, `NEXT_PUBLIC_STELLAR_RPC_URL`) must be overridable via `.env.local` — no hard-coded production URLs in source.

---

## 6. Dependencies on Other Repos

```
Rayos-Org/
├── wallet-sdk          ← npm package @rayos/wallet-sdk
│                          Provides: WalletSdk, signAndSubmit, passkey flows
│                          Pin: specific semver, never "latest"
│
├── relay-backend       ← HTTP API
│                          Provides: XDR generation endpoint, fee sponsorship
│                          URL: NEXT_PUBLIC_RELAY_URL env var
│
└── demo-app  ← THIS REPO
               Consumes wallet-sdk and relay-backend
               Produces: a deployable demo URL for grant reviews
```

### Wiring status
| Dependency | Status | Notes |
|---|---|---|
| `@rayos/wallet-sdk` | ✅ Installed & integrated | `lib/sdk-client.ts` |
| `relay-backend` XDR endpoint | 🟡 Mocked | `generateCheckoutXdr` returns dummy XDR — replace when relay is deployed |
| Soroban smart contract | 🟡 Testnet | Accessed via relay, no direct RPC calls from frontend |

---

## 7. Testing Strategy

- **E2E smoke tests (Playwright):** Cover the exact path intended for the demo. Treat these as "does the demo still work" guardrails. Run before every recording session and grant deadline.
- **WebAuthn mocking in CI:** `addInitScript` stubs `navigator.credentials` so the passkey step resolves immediately in headless CI runners, triggering the graceful fallback redirect.
- **TypeScript strict mode:** `npx tsc --noEmit` runs in CI before the build step.
- **Manual:** Test on the specific device/browser you plan to demo on before any live session.

---

## 8. CI/CD Pipeline

```
PR / push to main
       ↓
  actions/checkout
       ↓
  node 24 + npm ci
       ↓
  npx tsc --noEmit    ← type safety gate
       ↓
  npm run lint        ← ESLint
       ↓
  npm run build       ← next build (production)
       ↓
  playwright install  ← chromium only
       ↓
  playwright test     ← E2E smoke test
       ↓
  upload playwright-report artifact
```

- Preview deployment per PR (Vercel — configure via `vercel.json` or Vercel dashboard).
- Pinned stable `demo` deployment separate from `main` — never deploy an in-progress branch before a grant review call.

---

## 9. Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE` | No | `Test SDF Network ; September 2015` | Stellar network identifier |
| `NEXT_PUBLIC_STELLAR_RPC_URL` | No | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |
| `NEXT_PUBLIC_RELAY_URL` | No | `https://relay.testnet.rayos.org` | Relay backend base URL |

Copy `.env.example` → `.env.local` to configure locally.
