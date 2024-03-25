class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
  }
}
module.exports = { DashboardPage };
