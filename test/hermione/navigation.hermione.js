const { assert } = require('chai');

const url = 'http://localhost:3000/hw/store';

describe('navigation', async function() {
    it('Navigation should collapse when click link', async function() {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(url);
        await page.setViewport({
            width: 500,
            height: 800
        });
        const [catalog, delivery, contacts, cart] = await page.$$('.nav-link');
        const toggler = await page.$('.Application-Toggler');
        const menu = await page.$('.Application-Menu');
        let isCollapsed = await menu.evaluate(el => el.classList.contains('collapse'));
        assert.isTrue(isCollapsed);
        await toggler.click();
        isCollapsed = await menu.evaluate(el => el.classList.contains('collapse'));
        assert.isFalse(isCollapsed);
        await catalog.click();
        isCollapsed = await menu.evaluate(el => el.classList.contains('collapse'));
        assert.isTrue(isCollapsed);
    });
});

