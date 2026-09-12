# Testing Guide — `demo-app`

> A complete guide to testing the Rayos demo app — both as an **end user** experiencing the checkout flow, and as a **developer** running automated test suites.

---

## Table of Contents

- [Quick Test Checklist](#quick-test-checklist)
- [Manual User Testing](#manual-user-testing)
  - [Environment Requirements](#environment-requirements)
  - [Flow 1 — Landing Page](#flow-1--landing-page)
  - [Flow 2 — Shop & Product Catalog](#flow-2--shop--product-catalog)
  - [Flow 3 — Passkey Checkout](#flow-3--passkey-checkout)
  - [Flow 4 — Receipt & On-Chain Proof](#flow-4--receipt--on-chain-proof)
- [Browser & Device Compatibility](#browser--device-compatibility)
- [Automated Tests](#automated-tests)
  - [TypeScript Type Check](#1-typescript-type-check)
  - [Lint](#2-lint)
  - [Production Build](#3-production-build)
  - [Playwright E2E Tests](#4-playwright-e2e-tests)
- [CI Pipeline](#ci-pipeline)
- [Pre-Demo Checklist](#pre-demo-checklist)
- [Known Limitations](#known-limitations)
- [Reporting Test Failures](#reporting-test-failures)

---

## Quick Test Checklist

Use this before every recording session, live demo, or grant submission deadline.

```
□ App loads at / with testnet banner visible
□ /shop renders all 4 products with images, names, and prices
□ Clicking "Buy Now" on any product navigates to /checkout/[itemId]
□ Checkout page shows product image, order summary, and "Pay with Passkey" button
□ Clicking "Pay with Passkey" triggers a biometric/security key prompt
□ After passkey approval, the app redirects to /receipt/[txHash]
□ Receipt shows "Payment Confirmed" heading and the transaction hash
□ "View on Stellar Expert Testnet" link opens the correct explorer URL
□ All pages are responsive on mobile (375px width minimum)
□ npm run build exits with code 0
□ npx playwright test exits with code 0
```

---

## Manual User Testing

### Environment Requirements

| Requirement | Notes |
|---|---|
| **Browser** | Chrome 120+, Edge 120+, or Safari 17+ (see [Browser Compatibility](#browser--device-compatibility)) |
| **Device** | Any device with a biometric sensor — fingerprint, Face ID, or a FIDO2 USB security key |
| **Network** | Internet connection (app calls Stellar Testnet RPC) |
| **Funds** | None — this is Testnet, no real money is used |

> 💡 **Tip:** Chrome on macOS or Windows with Windows Hello gives the smoothest WebAuthn experience during demos.

---

### Flow 1 — Landing Page

**URL:** `https://rayos-demo-app.vercel.app/` (or `http://localhost:3000` locally)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Open the app | Page loads with dark background |
| 2 | Check the top banner | Amber banner reads **"⚠ TESTNET DEMO — No Real Funds Are Used ⚠"** |
| 3 | Check the navbar | **Rayos** logo on the left, **Shop** and **GitHub** links on the right |
| 4 | Observe the hero | Headline, tagline, and two CTAs: **Try the Demo** and **View Source** |
| 5 | Observe animations | Hero elements animate in sequentially (Framer Motion fade-up) |
| 6 | Scroll down | **How it works** 3-step section is visible |
| 7 | Scroll further | **Built for the real world** feature grid is visible |
| 8 | Scroll to bottom | CTA section and footer are visible |
| 9 | Click **Try the Demo** | Navigates to `/shop` |

**Pass criteria:** All sections render, animations play, no console errors, banner is clearly visible.

---

### Flow 2 — Shop & Product Catalog

**URL:** `/shop`

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/shop` | Page loads with **Developer Gear** heading |
| 2 | Check the info bar | Blue info bar with USDC testnet notice is visible |
| 3 | Count the products | Exactly **4 product cards** are rendered |
| 4 | Inspect a card | Product image, name, description, price in USDC, and **Buy Now** button |
| 5 | Hover a card | Card lifts with shadow, image scales slightly |
| 6 | Hover **Buy Now** | Button darkens; text and arrow are on a single line (no wrapping) |
| 7 | Check on mobile | Cards stack to a single column, all text is readable |

**Pass criteria:** 4 cards visible, prices correct, buttons do not wrap, responsive on mobile.

---

### Flow 3 — Passkey Checkout

**URL:** `/checkout/[itemId]` (reached by clicking **Buy Now** on any product)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click **Buy Now** on any product | Navigates to `/checkout/prod_N` |
| 2 | Check the **Back to shop** link | Visible in top-left; clicking it returns to `/shop` |
| 3 | Inspect the left column | Product image (full-width), product name, description, 4 trust signal checkmarks |
| 4 | Inspect the right column | **Order Summary** card with product name, quantity, and total price |
| 5 | Check the trust points | 3 bullet points: keys never leave device, gasless, verifiable |
| 6 | Click **Pay with Passkey** | Button changes to spinner + **Awaiting passkey...** |
| 7 | Approve the biometric prompt | Button changes to spinner + **Submitting to Stellar...** |
| 8 | Wait for redirect | App navigates to `/receipt/[txHash]` |

**What happens during the passkey step:**

```
Button clicked
    ↓
generateCheckoutXdr() — builds the transaction XDR
    ↓
walletClient.signAndSubmit(xdr) — triggers WebAuthn
    ↓
Device biometric prompt appears (OS-native UI)
    ↓
User approves → signature is generated locally
    ↓
Relay backend submits signed XDR to Stellar Testnet
    ↓
Redirect to /receipt/[transactionHash]
```

> **If WebAuthn is not available** (e.g. running in a headless browser, VM without TPM, or during automated testing): The app catches the error and falls back to a demo redirect after 1 second. This is intentional and ensures the full flow is always demonstrable.

**Pass criteria:** Passkey prompt appears, button states cycle correctly, redirect to receipt occurs within ~5 seconds.

---

### Flow 4 — Receipt & On-Chain Proof

**URL:** `/receipt/[txHash]`

| Step | Action | Expected Result |
|---|---|---|
| 1 | Arrive on receipt page | Animated green checkmark plays |
| 2 | Check the heading | **Payment Confirmed** in large text |
| 3 | Check the subheading | _"Your gasless passkey payment was settled on Stellar Testnet."_ |
| 4 | Inspect the transaction hash | Shortened hash visible (first 12 + last 12 chars) |
| 5 | Click the copy icon | Full hash is copied to clipboard (no error in console) |
| 6 | Inspect the explorer link | **View on Stellar Expert Testnet** link is present |
| 7 | Click the explorer link | Opens `https://stellar.expert/explorer/testnet/tx/[txHash]` in a new tab |
| 8 | Verify on Stellar Expert | _(For real transactions only)_ Transaction details visible on-chain |
| 9 | Click **Back to Shop** | Returns to `/shop` |

**Pass criteria:** Checkmark animates, hash displays correctly, explorer link is correct and opens in a new tab.

---

## Browser & Device Compatibility

### Desktop Browsers

| Browser | WebAuthn | Recommended for Demo |
|---|---|---|
| Chrome 120+ | ✅ Full support | ⭐ Best choice |
| Edge 120+ | ✅ Full support | ⭐ Best choice |
| Firefox 120+ | ✅ Supported | ✅ Good |
| Safari 17+ | ✅ Supported (macOS) | ✅ Good |
| Brave | ✅ Supported | ✅ Good |

### Mobile Browsers

| Platform | Browser | WebAuthn |
|---|---|---|
| iOS 17+ | Safari | ✅ Face ID / Touch ID |
| iOS 17+ | Chrome | ✅ Delegates to Safari |
| Android 12+ | Chrome | ✅ Fingerprint / Face Unlock |
| Android 12+ | Samsung Internet | ✅ Biometrics |

### Authenticator Types

| Type | Support | Notes |
|---|---|---|
| Platform authenticator (Face ID, fingerprint) | ✅ Recommended | Most common in demos |
| Roaming authenticator (YubiKey, FIDO2 USB key) | ✅ Supported | Great for desktop demos |
| Password Manager (1Password, Bitwarden) | ✅ Passkey support | Works if passkeys enabled in settings |

> ⚠️ **WebAuthn requires a secure context.** The app must be served over HTTPS or `localhost`. It will not work on plain `http://` non-localhost URLs.

---

## Automated Tests

### Prerequisites

```bash
# Verify Node version (must be >= 24)
node --version

# Install dependencies
npm install
```

### 1. TypeScript Type Check

Verifies all TypeScript is valid without emitting any output files.

```bash
npx tsc --noEmit
```

**Expected output:** No output (silent = pass). Any errors will print with file and line number.

---

### 2. Lint

Runs ESLint with the project's config (`eslint.config.mjs`).

```bash
npm run lint
```

**Expected output:**

```
> demo-app@0.1.0 lint
> eslint


```

Silent output = zero errors. Any rule violations print with file, line, and error code.

---

### 3. Production Build

Compiles the full Next.js production build. This catches TypeScript errors, import issues, and rendering problems that only surface at build time.

```bash
npm run build
```

**Expected output:**

```
▲ Next.js 16.x.x (Turbopack)
✓ Running next.config.ts
✓ Compiled successfully
✓ Running TypeScript
✓ Generating static pages (5/5)

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /checkout/[itemId]
├ ƒ /receipt/[txId]
└ ○ /shop
```

All 5 routes must appear. Exit code must be `0`.

---

### 4. Playwright E2E Tests

End-to-end smoke test that runs a full checkout flow in a real Chromium browser.

#### Run the tests

```bash
npx playwright test
```

**Expected output:**

```
Running 1 test using 1 worker

  ✓ [chromium] › e2e/checkout.spec.ts:3:5 › completes full checkout flow (20s)

  1 passed (20s)
```

#### View the HTML report

```bash
npx playwright show-report
```

Opens the Playwright HTML report in your browser with screenshots, traces, and timing for each test step.

#### Run in headed mode (watch the browser)

```bash
npx playwright test --headed
```

Useful for debugging — you can watch the browser navigate through the full checkout flow.

#### Run with UI mode (interactive)

```bash
npx playwright test --ui
```

Opens the Playwright UI for step-by-step inspection and time-travel debugging.

#### Run a specific test

```bash
npx playwright test e2e/checkout.spec.ts
```

---

### What the E2E Test Covers

The test in [`e2e/checkout.spec.ts`](../e2e/checkout.spec.ts) exercises:

| Step | Assertion |
|---|---|
| Open `/shop` | Testnet banner is visible |
| Find first **Buy Now** button | Link is visible and has correct role |
| Click **Buy Now** | URL matches `/checkout/prod_N` |
| Check order summary | **Order Summary** heading is present |
| Click **Pay with Passkey** | Button is clickable |
| Wait for redirect | URL matches `/receipt/.*` within 15s |
| Check receipt heading | **Payment Confirmed** is visible |
| Check hash label | **Transaction Hash** is visible |
| Check explorer link | **View on Stellar Expert Testnet** link is visible |

#### WebAuthn in CI / Headless Environments

GitHub Actions runners and headless browsers have no biometric hardware. To prevent the test from hanging indefinitely waiting for a passkey prompt that can never appear, the test injects a mock at startup:

```typescript
await page.addInitScript(() => {
  Object.defineProperty(navigator, 'credentials', {
    value: {
      get: () => Promise.reject(new Error("WebAuthn not supported in E2E")),
      create: () => Promise.reject(new Error("WebAuthn not supported in E2E"))
    },
    configurable: true
  });
});
```

When `signAndSubmit` catches this error, the app's graceful fallback kicks in — it waits 1 second then redirects to a mock receipt URL. The test then validates the receipt page normally.

---

## CI Pipeline

Every push and pull request to `main` automatically runs the full test suite on GitHub Actions.

**Workflow file:** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

```
Trigger: push or PR to main
    ↓
actions/checkout
    ↓
Node.js 24 setup + npm cache
    ↓
npm ci  ──────────────── install exact lockfile deps
    ↓
npx tsc --noEmit ──────── TypeScript gate
    ↓
npm run lint ──────────── ESLint gate
    ↓
npm run build ─────────── production build gate
    ↓
playwright install ─────── chromium only (faster)
    ↓
playwright test ────────── E2E smoke test (5 min timeout)
    ↓
upload playwright-report ── artifact for inspection
```

**Viewing CI results:**
1. Go to the [Actions tab](https://github.com/Rayos-Org/demo-app/actions) on GitHub.
2. Click any workflow run to see step-by-step logs.
3. Download the `playwright-report` artifact from a completed run to view the HTML test report.

---

## Pre-Demo Checklist

Run through this before any live demo, recording session, or grant review call.

### 30 Minutes Before

```
□ Pull latest main: git pull origin main
□ Run: npm run build  — must exit 0
□ Run: npx playwright test  — must show "1 passed"
□ Open https://rayos-demo-app.vercel.app/ in your demo browser
□ Confirm the testnet banner is visible
□ Complete one full checkout flow manually from / to receipt
□ Confirm the Stellar Expert link opens and loads
□ Close all unnecessary browser tabs
□ Set browser zoom to 100%
□ Ensure screen recording software is running (if applicable)
```

### Device-Specific Checks

**macOS / Touch ID:**
```
□ Touch ID is enrolled in System Settings → Touch ID & Password
□ The browser has permission to use Touch ID
□ Touch ID sensor is clean and responsive
```

**Windows / Windows Hello:**
```
□ Windows Hello PIN or fingerprint is set up in Settings → Accounts
□ The demo browser has been granted permission to use Windows Hello
```

**iPhone / Face ID:**
```
□ Face ID is enabled for the browser (Settings → [Browser] → Face ID & Touch ID)
□ Screen brightness is adequate for Face ID recognition
```

**YubiKey / FIDO2 USB:**
```
□ YubiKey is plugged in and recognised by the OS
□ The YubiKey has at least one resident key slot available
```

---

## Known Limitations

| Limitation | Detail | Workaround |
|---|---|---|
| **XDR is mocked** | `generateCheckoutXdr()` in `lib/sdk-client.ts` returns a dummy XDR, not a real Soroban transaction | Wire to real relay-backend when deployed |
| **No real USDC balance required** | Payments succeed on testnet regardless of balance | N/A — this is a testnet demo |
| **WebAuthn needs secure context** | Passkey prompt won't appear on plain HTTP | Always use HTTPS or localhost |
| **Safari passkey UX differs** | Safari shows its own passkey management UI which looks different from Chrome | Demo on Chrome for consistency |
| **Headless browsers skip WebAuthn** | Playwright uses the mock fallback instead of a real passkey | Expected — the flow still completes and tests still pass |

---

## Reporting Test Failures

If you encounter a test failure that isn't covered by the Known Limitations above:

1. **Check the CI logs** — go to [Actions](https://github.com/Rayos-Org/demo-app/actions) and look at the failing step.
2. **Download the Playwright report** — the `playwright-report` artifact contains screenshots and a trace of the exact failure.
3. **Reproduce locally** — run `npx playwright test --headed` to watch the browser and identify the step that fails.
4. **Open a bug report** — use the [🐛 Bug Report template](https://github.com/Rayos-Org/demo-app/issues/new?template=bug_report.md) and include:
   - The exact error message
   - Your OS and browser version
   - The Playwright trace file (`.zip`) if available
