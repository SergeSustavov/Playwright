import { test as base } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { Elements } from '../pages/elementsPage';
import { WebTables } from '../pages/webTablesPage';

export const test = base.extend<{ webTables: WebTables }>({
    webTables: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        const elements = new Elements(page);
        const webTables = new WebTables(page);
        await mainPage.open();
        await mainPage.openElements();
        await elements.openWebTables();
        await use(webTables);
    },
});