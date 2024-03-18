import { test } from '@playwright/test'

test('First Playwright Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  // get the title of the page
  const title = await page.title()
  console.log(`Title of the page: ${title}`); // Title of the page: Practice Page  
  await page.locator('#username').fill('learning')
})