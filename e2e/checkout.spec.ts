import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test("shows error when passkey is rejected/unsupported", async ({ page }) => {
    // Mock WebAuthn to immediately reject, simulating user cancellation or CI environments
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'credentials', {
        value: {
          get: () => Promise.reject(new Error("WebAuthn not supported in E2E")),
          create: () => Promise.reject(new Error("WebAuthn not supported in E2E"))
        },
        configurable: true
      });
    });

    await page.goto("/shop");
    await expect(page.locator("text=TESTNET DEMO")).toBeVisible();

    const buyButton = page.getByRole("link", { name: /buy now/i }).first();
    await expect(buyButton).toBeVisible();
    await buyButton.click();

    await expect(page).toHaveURL(/\/checkout\/prod_\d/);
    await expect(page.getByText("Order Summary")).toBeVisible();

    // Click Pay with Passkey
    await page.getByRole("button", { name: /pay with passkey/i }).click();

    // Should show error state since passkey was rejected, and button should say Retry
    await expect(page.getByText("WebAuthn not supported in E2E")).toBeVisible();
    await expect(page.getByRole("button", { name: /retry/i })).toBeVisible();
  });

  test("renders receipt page correctly", async ({ page }) => {
    // Test the receipt page independently
    const testHash = "demo_test_hash_890123";
    await page.goto(`/receipt/${testHash}`);

    await expect(page.getByText("Payment Confirmed")).toBeVisible();
    await expect(page.getByText("Transaction Hash")).toBeVisible();
    await expect(page.getByText(testHash)).toBeVisible();

    await expect(
      page.getByRole("link", { name: /view on stellar expert testnet/i })
    ).toBeVisible();
  });
});
