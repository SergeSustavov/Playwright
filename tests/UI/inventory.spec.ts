import { expect } from '@playwright/test';
import { test } from './helpers/fixtures';
import { InventoryPage } from './pages/inventoryPage';

let inventoryPage: InventoryPage;

test.describe('Inventory page tests', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.goto();
    });

    test('@smoke user sees products page after login', async () => {
        await expect.soft(inventoryPage.productsTitle).toBeVisible();
        await expect.soft(inventoryPage.shoppingCart).toBeVisible();
    });

    test('@smoke user can open the sidebar menu', async ({ authenticatedPage }) => {
        await inventoryPage.burgerMenuButton.click();
        await expect.soft(authenticatedPage.getByText('All Items')).toBeVisible();
        await expect.soft(authenticatedPage.getByText('Logout')).toBeVisible();
    });

    test('page title is visible on the inventory page', async ({ authenticatedPage }) => {
        await expect.soft(authenticatedPage).toHaveTitle(/Swag Labs/);
        await expect.soft(inventoryPage.productsTitle).toHaveText('Products');
    });
});
