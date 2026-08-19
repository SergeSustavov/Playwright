import { expect } from '@playwright/test';
import { test } from './helpers/fixtures';

test.describe('WebTables tests', () => {
    test.beforeEach(async ({ webTables }) => {
        await webTables.addNewEmployee();
    });

    test('check new employee added to the table', async ({ webTables }) => {
        await expect(webTables.createdEmployeeRow).toBeVisible();
    });

    test('edit new employee in the table', async ({ webTables }) => {
        const updatedEmail = 'update@thisEmail.com'
        await webTables.newEmployeeRowEdit.click();
        await webTables.emailInput.fill(updatedEmail);
        await webTables.submitButton.click();
        await expect(webTables.editedEmployeeRow(updatedEmail)).toBeVisible();
    });

    test('delete new employee from the table', async ({ webTables }) => {
        await webTables.newEmployeeRowDelete.click();
        await expect(webTables.createdEmployeeRow).not.toBeVisible();
    });
});
