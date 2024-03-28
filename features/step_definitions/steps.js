const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given(
  'a login to Ecommerce application with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);
When(
  'add {string} to the cart',
  { timeout: 100 * 1000 },
  async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
  }
);
Then(
  'verify {string} is displayed to the cart',
  { timeout: 100 * 1000 },
  async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
  }
);
When('enter valid details and place the order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect('ind', 'India');
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});
Then(
  'verify the order is present in the order history page',
  async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    // eslint-disable-next-line playwright/no-standalone-expect
    expect(
      this.orderId.includes(await ordersHistoryPage.getOrderId())
    ).toBeTruthy();
  }
);
