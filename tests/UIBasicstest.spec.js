import { test } from '@playwright/test'

test('First Playwright Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const title = page.locator('.navbar__inner .navbar__title')
  await expect(title).toHaveText('Playwright')
})