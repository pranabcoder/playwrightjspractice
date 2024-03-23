import { test } from '@playwright/test';

test('Playwright Special Locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you Love IceCreams!').click();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('password').fill('123456');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page
    .getByText('Success! The Form has been submitted successfully!.')
    .isVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page
    .locator('app-card')
    .filter({ hasText: 'Nokia Edge' })
    .getByRole('button', { name: 'Add ' })
    .click();
  await page.waitForTimeout(5000);
});
