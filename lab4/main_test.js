const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    await page.waitForSelector('.DocSearch-Button');
    await page.click('.DocSearch-Button');

    await page.waitForSelector('.DocSearch-Form');
    await page.keyboard.type('chipi chipi chapa chapa');

    await page.waitForSelector('#docsearch-item-5 a[href="/webdriver-bidi/#measuring-progress"]');
    await page.click('#docsearch-item-5 a[href="/webdriver-bidi/#measuring-progress"]');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const fullTitle = await page.title();
    const desiredTitle = fullTitle.split(' | ')[0];
    console.log(desiredTitle);

    await browser.close();
})(); 
