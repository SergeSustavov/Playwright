import { Locator, Page } from '@playwright/test';

export class Elements {
    readonly page: Page;
    readonly webTables: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webTables = this.page.getByRole('link', { name: 'Web Tables' });
    }

    async openWebTables(): Promise<void> {
        await this.webTables.click();
    }
}