import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend<{ authenticatedPage: Page }>({
    page: async ({ page }, use) => {
        page.on('dialog', async (dialog) => {
            if (dialog.type() === 'alert') {
                await dialog.dismiss();
            }
        });

        await use(page);
    },

    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.ensureSession();
        await use(page);
    },
});
