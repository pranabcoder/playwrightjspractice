const { After, AfterStep, BeforeAll, Before } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');

Before(async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});
AfterStep(async function ({ result }) {
  if (result.status === 'passed') {
    await this.page.screenshot({ path: `./screenshots/${Date.now()}.png` });
  }
});
After(async function () {
  await this.page.close();
  await this.page.context().close();
});
