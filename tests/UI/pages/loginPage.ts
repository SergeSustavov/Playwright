import fs from 'fs';
import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly storageStatePath = 'tests/UI/helpers/.auth/saucedemo.json';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async goto() {
        await this.page.goto('/');
    }

    get loginInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get loginLogo(): Locator {
        return this.page.getByText('Swag Labs');
    }

    get errorMessage(): Locator {
        return this.page.locator('[data-test="error"]');
    }

    async login(username: string, password: string) {
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsStandardUser() {
        await this.login('standard_user', 'secret_sauce');
    }

    isSessionValid(): boolean {
        if (!fs.existsSync(this.storageStatePath)) {
            return false;
        }

        try {
            const storageState = JSON.parse(fs.readFileSync(this.storageStatePath, 'utf8'));
            const hasSessionCookie = Array.isArray(storageState.cookies)
                && storageState.cookies.some(
                    (cookie: { name?: string; value?: string }) => cookie.name === 'session-username'
                    && Boolean(cookie.value));
            return Boolean(hasSessionCookie);
        } catch {
            return false;
        }
    }

    async restoreSession() {
        if (!this.isSessionValid()) {
            return false;
        }

        try {
            const storageState = JSON.parse(fs.readFileSync(this.storageStatePath, 'utf8'));
            const cookies = Array.isArray(storageState.cookies) ? storageState.cookies : [];

            await this.page.context().addCookies(cookies.map((cookie: 
                { name: any; value: any; domain: any; path: any; expires: any; httpOnly: any; secure: any; sameSite: any; }) => ({
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                path: cookie.path ?? '/',
                expires: cookie.expires,
                httpOnly: cookie.httpOnly,
                secure: cookie.secure,
                sameSite: cookie.sameSite,
            })));

            await this.page.goto('/inventory.html', { waitUntil: 'domcontentloaded', timeout: 15000 });

            const inventoryVisible = await this.page.getByText('Products').isVisible().catch(() => false);
            const loginVisible = await this.page.getByRole('button', { name: 'Login' }).isVisible().catch(() => false);

            return inventoryVisible && !loginVisible;
        } catch {
            return false;
        }
    }

    async ensureSession() {
        if (await this.restoreSession()) {
            return true;
        }

        await this.goto();
        await this.loginAsStandardUser();
        await this.saveAuthState();
    }

    async saveAuthState(path = this.storageStatePath) {
        await this.page.context().storageState({ path });
    }
}
