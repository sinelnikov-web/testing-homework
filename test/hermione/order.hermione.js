const {assert} = require('chai');

const url = 'http://localhost:3000/hw/store';

describe('Order', async function () {
    beforeEach(async function (done) {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        await page.evaluate(el => localStorage.setItem('example-store-cart', '{}'))
    })
    it('Orders should be green if success', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const [catalog, delivery, contacts, cart] = await page.$$('.nav-link');
        await catalog.click()
        await page.waitForSelector('.ProductItem', {timeout: 5000});
        const itemLink = await page.$('.ProductItem-DetailsLink');
        await itemLink.click();
        await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 3000})
        const addToCartButton = await page.$('.ProductDetails-AddToCart');
        await addToCartButton.click()
        await cart.click();
        const fNameInput = await page.$('#f-name');
        const phoneInput = await page.$('#f-phone');
        const addressInput = await page.$('#f-address');
        await fNameInput.type('test');
        await phoneInput.type('+77777777777');
        await addressInput.type('test');
        const submit = await page.$('.Form-Submit');
        await submit.click();
        await page.waitForSelector('.Cart-SuccessMessage', {timeout: 5000});
        const message = await page.$('.Cart-SuccessMessage');
        const isSuccess = await message.evaluate(el => el.classList.contains('alert-success'));
        assert.isTrue(isSuccess);
    });
    it('Orders should have next id', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const [catalog, delivery, contacts, cart] = await page.$$('.nav-link');
        await catalog.click()
        await page.waitForSelector('.ProductItem', {timeout: 5000});
        const itemLink = await page.$('.ProductItem-DetailsLink');
        await itemLink.click();
        await page.waitForSelector('.ProductDetails-AddToCart', {timeout: 3000})
        const addToCartButton = await page.$('.ProductDetails-AddToCart');
        await addToCartButton.click()
        await cart.click();
        const fNameInput = await page.$('#f-name');
        const phoneInput = await page.$('#f-phone');
        const addressInput = await page.$('#f-address');
        await fNameInput.type('test');
        await phoneInput.type('+77777777777');
        await addressInput.type('test');
        const submit = await page.$('.Form-Submit');
        await submit.click();
        await page.waitForSelector('.Cart-Number', {timeout: 5000});
        const orderNumber = await page.$('.Cart-Number');
        const value = await orderNumber.evaluate(el => el.textContent);
        assert.isTrue(Number(value) <= 100000000);
    });
});
