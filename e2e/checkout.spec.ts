import { test, expect } from "@playwright/test";

test("completes full checkout flow", async ({ page }) => {
  // Mock WebAuthn to immediately reject, preventing hangs in CI environments without virtual authenticators
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'credentials', {
      value: {
        get: () => Promise.reject(new Error("WebAuthn not supported in E2E")),
        create: () => Promise.reject(new Error("WebAuthn not supported in E2E"))
      },
      configurable: true
    });
  });

  // 1. Go to the shop
  await page.goto("/shop");

  // 2. Testnet banner must always be visible
  await expect(page.locator("text=TESTNET DEMO")).toBeVisible();

  // 3. Click first Buy Now button
  const buyButton = page.getByRole("link", { name: /buy now/i }).first();
  await expect(buyButton).toBeVisible();
  await buyButton.click();

  // 4. Should land on checkout page
  await expect(page).toHaveURL(/\/checkout\/prod_\d/);
  await expect(page.getByText("Order Summary")).toBeVisible();

  // 5. Click Pay with Passkey
  await page.getByRole("button", { name: /pay with passkey/i }).click();

  // 6. Wait for receipt — mock fallback redirects after 1s
  await expect(page).toHaveURL(/\/receipt\/.*/, { timeout: 15000 });

  // 7. Receipt page content
  await expect(page.getByText("Payment Confirmed")).toBeVisible();
  await expect(page.getByText("Transaction Hash")).toBeVisible();

  // 8. On-chain proof link must exist (the specific tx link in the receipt card)
  await expect(
    page.getByRole("link", { name: /view on stellar expert testnet/i })
  ).toBeVisible();
});
