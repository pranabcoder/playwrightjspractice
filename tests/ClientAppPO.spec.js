import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';

test('Example - ClientApp First Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cardTitlePath = page.locator('.card-body b');
  const email = 'anshika@gmail.com';
  const password = 'Iamking@000';
  loginPage.viewLoginPage();
  loginPage.validLogin(email, password);
  await cardTitlePath.first().waitFor();
  const allTexts = await cardTitlePath.allTextContents();
  console.log(allTexts);
});
test('Example - ClientApp Second Test', async ({ page }) => {
  const productName = 'ADIDAS ORIGINAL';
  const loginPage = new LoginPage(page);
  const cardTitlePath = page.locator('.card-body b');
  const email = 'anshika@gmail.com';
  const password = 'Iamking@000';
  loginPage.viewLoginPage();
  loginPage.validLogin(email, password);
  const productsPath = page.locator('.card-body');
  await productsPath.first().waitFor('page');
  const count = await productsPath.count();
  console.log(count);
  for (let i = 0; i < count; i++) {
    const cardTitlePath = productsPath.locator('b');
    const cardText = await cardTitlePath.nth(i).textContent();
    if (cardText.includes(productName)) {
      await productsPath.nth(i).locator('text = Add To Cart').click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator('text=Checkout').click();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially('ind', { delay: 100 });
  const dropdown = page.locator('.ta-results');
  await dropdown.first().waitFor();
  const options = await dropdown.locator('button').count();
  for (let i = 0; i < options; i++) {
    const option = await dropdown.locator('button').nth(i).textContent();
    if (option.trim() === 'India') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator('.action__submit').click();
  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  );
  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForTimeout(5000);
  const rows = page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.waitForTimeout(5000);
});
