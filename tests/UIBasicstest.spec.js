import { test, expect } from '@playwright/test';

test('First Playwright Test', async ({ page }) => {
  const usernamePath = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  // get the title of the page
  const title = await page.title();
  console.log(`Title of the page: ${title}`); // Title of the page: Practice Page
  await usernamePath.fill('rahulshetty');
  await page.locator("[type='password']").fill('learning');
  await page.locator('#signInBtn').click();
  const unsuccessfulLoginText = await page
    .locator("[style*='block']")
    .textContent();
  console.log(unsuccessfulLoginText);
  // Add an assertion to check the title of the page
  expect(title).toContain('LoginPage Practise | Rahul Shetty Academy');
  // Add an assertion to check the text of the unsuccessful login message
  expect(unsuccessfulLoginText).toContain('Incorrect username/password');
});
test('Example - Multiple elements', async ({ page }) => {
  const usernamePath = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  // get the title of the page
  const title = await page.title();
  console.log(`Title of the page: ${title}`); // Title of the page: Practice Page
  await usernamePath.fill('rahulshetty');
  await page.locator("[type='password']").fill('learning');
  await page.locator('#signInBtn').click();
});
