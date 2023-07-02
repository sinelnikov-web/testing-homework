const { assert } = require('chai');

const url = 'http://localhost:3000/hw/store';

describe('catalog', async function() {
    it('Catalog items should have title', async function() {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        const [link] = await page.$$('.nav-link')
        await link.click()
        await page.waitForSelector('.ProductItem', {timeout: 5000});
        const items = await page.$$('.ProductItem-Name');
        await Promise.all(items.map(async (item) => {
            assert.isTrue((await item.evaluate(el => el.textContent)).length > 0);
        }))
    });
});
