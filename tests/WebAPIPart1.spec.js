import { expect, test, request } from '@playwright/test';
const { APIUtils } = require('./utils/APIUtils');
const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};
const orderPayLoad = {
  orders: [{ country: 'Cuba', productOrderedId: '6581ca979fd99c85e8ee7faf' }],
};
let response;
test.beforeAll(async ({}) => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});
test('Example - Bypass login screen', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.loginToken);
  // const emailPath = page.locator('#userEmail');
  const email = '';
  const productsPath = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/');
  await productsPath.first().waitFor('page');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor('page');
  const rows = page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    console.log(rowOrderId);
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  await page.waitForTimeout(5000);
});
