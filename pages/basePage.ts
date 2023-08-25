import { APIRequestContext, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async getCountTabs() {
        const [newTab] = await Promise.all([this.page.context().waitForEvent('page')]);
        const countTabs = newTab.context().pages().length;
        await newTab.waitForLoadState('domcontentloaded');
        await newTab.close();
        return countTabs;
    };
    
    async pageIsScrolled() {
        const pixels = await this.page.evaluate(() => window.pageYOffset);
        return pixels > 5;
    };
};