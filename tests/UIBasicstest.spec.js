import { test, expect } from '@playwright/test';

test('First Playwright Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  // get the title of the page
  const title = await page.title();
  console.log(`Title of the page: ${title}`); // Title of the page: Practice Page
  // Add an assertion
  await expect(page).toHaveSelector(
    'LoginPage Practise | Rahul Shetty Academy'
  );
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").fill('learning');
  await page.locator('signInBtn').click();
});
