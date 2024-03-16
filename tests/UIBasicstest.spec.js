import { test } from '@playwright/test'

test('First Playwright Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
})