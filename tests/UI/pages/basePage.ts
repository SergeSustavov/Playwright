import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getCountTabs() {
        const [newTab] = await Promise.all([this.page.context().waitForEvent('page')]);
        const countTabs = newTab.context().pages().length;
        await newTab.waitForLoadState('domcontentloaded');
        await newTab.close();
        return countTabs;
    }

    async pageIsScrolled() {
        const pixels = await this.page.evaluate(() => window.pageYOffset);
        return pixels > 5;
    }
}