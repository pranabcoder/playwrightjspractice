import { expect, test } from '@playwright/test';
import { text } from 'node:stream/consumers';

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.locator('#confirmbtn').click();
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  await page.locator('#mousehover').hover();
  const framesPage = page.frameLocator('#courses-iframe');
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator('.text h2').textContent();
  console.log(textCheck.split(' ')[1]);
  await page.waitForTimeout(5000);
});
test('Screeshot take example', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#displayed-text').screenshot({ path: 'element.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});
test('Visual validation', async ({ page }) => {
  await page.goto('https://www.google.com/');
  expect(await page.screenshot()).toMatchSnapshot('rediff.png');
});
