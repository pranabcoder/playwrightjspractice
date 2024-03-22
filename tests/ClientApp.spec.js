import { test } from '@playwright/test';

test('Example - ClientApp First Test', async ({ page }) => {
  const emailPath = page.locator('#userEmail');
  const passwordPath = page.locator('#userPassword');
  const loginButtonPath = page.locator("[value='Login']");
  const cardTitlePath = page.locator('.card-body b');
  await page.goto('https://rahulshettyacademy.com/client/');
  await emailPath.fill('anshika@gmail.com');
  await passwordPath.fill('Iamking@000');
  await loginButtonPath.click();
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
  const allTexts = await cardTitlePath.allTextContents();
  console.log(allTexts);
});
