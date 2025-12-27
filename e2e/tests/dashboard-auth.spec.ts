import { test, expect } from '@playwright/test';

test('dashboard requests include Authorization header', async ({ page }) => {
  // Perform a UI login so the app stores a token and navigates to dashboard
  await page.goto('/login');
  await page.fill('input[placeholder="Email"]', 'test@test.com');
  await page.fill('input[placeholder="Password"]', 'x');

  // Start waiting for a request to either /dashboard or /subscriptions endpoints
  const reqPromise = page.waitForRequest((req) => {
    const url = req.url();
    return url.includes('/dashboard') || url.includes('/subscriptions');
  }, { timeout: 10000 });

  // Trigger login
  await page.click('button:has-text("Login")');

  // Capture the outgoing request and assert Authorization header exists
  const req = await reqPromise;
  const headers = req.headers();
  const auth = headers['authorization'] || headers['Authorization'];

  expect(auth, 'Authorization header should be present').toBeTruthy();
  expect(auth).toMatch(/^Bearer\s.+/);
});
