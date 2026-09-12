import { test, expect } from '@playwright/test';

test('completes full checkout flow', async ({ page }) => {
  // Go to the shop page
  await page.goto('/shop');

  // Verify the banner is present
  await expect(page.locator('text=TESTNET DEMO')).toBeVisible();

  // Click on the first product's Buy Now button
  await page.click('text=Buy Now >> nth=0');

  // We should be redirected to the checkout page
  await expect(page).toHaveURL(/\/checkout\/prod_\d/);

  // Click "Pay with Passkey"
  await page.click('button:has-text("Pay with Passkey")');

  // For the demo mock flow, wait for redirection to receipt
  await expect(page).toHaveURL(/\/receipt\/.*/, { timeout: 10000 });

  // Check the receipt page text
  await expect(page.locator('text=Payment Successful')).toBeVisible();
  await expect(page.locator('text=Transaction Hash')).toBeVisible();

  // Verify the Stellar Expert link exists
  await expect(page.locator('a[href*="stellar.expert"]')).toBeVisible();
});
