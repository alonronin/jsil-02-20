const puppeteer = require('puppeteer');
const { executablePath, headless } = require('config');

const args = ['--no-sandbox'];

const options = {
  args,
  executablePath,
  headless,
  ignoreHTTPSErrors: true,
  userDataDir: './tmp'
};

module.exports = async url => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.goto(url);

  const html = await page.content();
  await page.close();
  await browser.close();

  return { html };
};
