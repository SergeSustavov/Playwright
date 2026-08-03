import { test, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';

let home: HomePage;

test.describe('Main page tests', () => {
    test.beforeEach(async ({ page }) => {
        home = new HomePage(page);
        await page.goto('/');
    });

    test(`home page has login form`, async () => {
        await expect(home.loginInput).toBeVisible();
        await expect.soft(home.passwordInput).toBeVisible();
        await expect.soft(home.loginButton).toBeVisible();
        await expect.soft(home.loginLogo).toBeVisible();
    });
});