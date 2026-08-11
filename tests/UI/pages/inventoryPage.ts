import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    get productsTitle(): Locator {
        return this.page.getByText('Products');
    }

    get shoppingCart(): Locator {
        return this.page.locator('.shopping_cart_link');
    }

    get burgerMenuButton(): Locator {
        return this.page.locator('#react-burger-menu-btn');
    }

    get logoutButton(): Locator {
        return this.page.getByRole('button', { name: 'Logout' });
    }
}
