import { expect } from '@playwright/test';
import { test } from './helpers/fixtures';
import { LoginPage } from './pages/loginPage';

let login: LoginPage;

test.describe('login page tests', () => {
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await login.goto();
    });

    test('@smoke login page has login form', async () => {
        await expect(login.loginInput).toBeVisible();
        await expect.soft(login.passwordInput).toBeVisible();
        await expect.soft(login.loginButton).toBeVisible();
        await expect.soft(login.loginLogo).toBeVisible();
    });

    test('@smoke user can log in with valid credentials', async ({ page }) => {
        await login.loginAsStandardUser();
        await expect.soft(page).toHaveURL(/.*inventory.html/);
        await expect.soft(page.getByText('Products')).toBeVisible();
        await login.saveAuthState();
    });

    test('user cannot log in with invalid credentials', async () => {
        await login.login('standard_user', 'wrong_password');
        await expect.soft(login.errorMessage).toBeVisible();
        await expect.soft(login.errorMessage).toContainText('Epic sadface');
    });

    test('user sees validation error if credentials are empty', async () => {
        await login.loginButton.click();
        await expect.soft(login.errorMessage).toBeVisible();
        await expect.soft(login.errorMessage).toContainText('Username is required');
    });
});