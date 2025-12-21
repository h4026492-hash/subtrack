import { test, expect } from '@playwright/test';

test('login navigates to dashboard', async ({ page }) => {
  // Navigates to the login page and performs a demo login
  await page.goto('/login');

  await page.fill('input[placeholder="Email"]', 'test@test.com');
  await page.fill('input[placeholder="Password"]', 'x');

  // Click the platform Login button
  await page.click('button:has-text("Login")');

  // Wait for dashboard
  await page.waitForSelector('text=DASHBOARD SCREEN', { timeout: 10000 });
  await expect(page.locator('text=DASHBOARD SCREEN')).toBeVisible();
});
