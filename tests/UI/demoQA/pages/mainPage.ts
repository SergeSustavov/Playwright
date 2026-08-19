import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly elementsCard: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.elementsCard = this.page.locator('.top-card').filter({ hasText: 'Elements' });
        this.elementsCard = this.page.getByText('Elements');
    }

    async open(): Promise<void>{
        await this.page.goto('/');
    }

    async openElements(): Promise<void> {
        await this.elementsCard.click();
    }
}
