class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.emailField = page.locator('#userEmail');
    this.passwordField = page.locator('#userPassword');
  }
  async viewLoginPage() {
    await this.page.goto('https://rahulshettyacademy.com/client/');
  }
  async validLogin(userName, password) {
    await this.emailField.fill(userName);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }
}
module.exports = { LoginPage };
