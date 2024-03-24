import { expect, test } from '@playwright/test';

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.waitForTimeout(5000);
  await page.locator('#confirmbtn').click();
  await page.waitForTimeout(5000);
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  await page.waitForTimeout(5000);
});
