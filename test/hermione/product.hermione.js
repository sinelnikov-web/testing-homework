const { assert } = require('chai');

const url = 'http://localhost:3000/hw/store/catalog/1';

describe('product', async function() {
    beforeEach(async function (done) {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        await page.evaluate(el => localStorage.setItem('example-store-cart', '{}'))
    })
    it('Product page', async function() {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const [catalog, delivery, contacts, cart] = await page.$$('.nav-link');
        await catalog.click()
        await page.waitForSelector('.ProductItem', {timeout: 5000});
        const itemLink = await page.$('.ProductItem-DetailsLink');
        await itemLink.click();
        await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 3000});
        await this.browser.assertView('plain', '.ProductDetails', {
            ignoreElements: [
                '.ProductDetails-Name',
                '.ProductDetails-Description',
                '.ProductDetails-Price',
                '.ProductDetails-Color',
                '.ProductDetails-Material',
            ]
        });
    });
    it('Product id should equal response id', async function() {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const response = await page.waitForResponse('http://localhost:3000/hw/store/api/products/1');
        const json = await response.json();
        assert.equal(json.id, 1);
    });
});
