const {assert} = require('chai');

const url = 'http://localhost:3000/hw/store';

describe('cart', async function () {
    beforeEach(async function (done) {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        await page.evaluate(el => localStorage.setItem('example-store-cart', '{}'))
    })
    it('Cart should have items equal added times', async function() {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const [catalog, delivery, contacts, cart] = await page.$$('.nav-link');
        await catalog.click()
        await page.waitForSelector('.ProductItem', {timeout: 5000});
        const itemLink = await page.$('.ProductItem-DetailsLink');
        await itemLink.click();
        await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 3000});
        const addToCartButton = await page.$('.ProductDetails-AddToCart');
        await addToCartButton.click()
        await addToCartButton.click()
        await addToCartButton.click()
        await cart.click();
        await page.reload();
        const itemCount = await page.$('.Cart-Count');
        assert.equal(await itemCount.evaluate(el => el.textContent), '3');
    })
});
