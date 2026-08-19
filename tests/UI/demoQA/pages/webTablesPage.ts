import { Locator, Page } from '@playwright/test';
import { Employee } from '../helpers/types';

export class WebTables {
    readonly page: Page;
    readonly addToTableButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;
    readonly tableRow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToTableButton = this.page.getByRole('button', { name: 'Add' });
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.emailInput = this.page.getByPlaceholder('name@example.com');
        this.ageInput = this.page.getByPlaceholder('Age');
        this.salaryInput = this.page.getByPlaceholder('Salary');
        this.departmentInput = this.page.getByPlaceholder('Department');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.tableRow = this.page.getByRole('row');
    }

    employeeData: Employee = {
        firstName: 'Alden',
        lastName: 'Cantrell',
        email: 'test@test.com',
        age: 30,
        salary: 12345,
        department: 'QA'
    }

    async addNewEmployee(): Promise<void> {
        await this.addToTableButton.click();
        await this.firstNameInput.fill(this.employeeData.firstName);
        await this.lastNameInput.fill(this.employeeData.lastName);
        await this.emailInput.fill(this.employeeData.email);
        await this.ageInput.fill(this.employeeData.age.toString());
        await this.salaryInput.fill(this.employeeData.salary.toString());
        await this.departmentInput.fill(this.employeeData.department);
        await this.submitButton.click();
    }

    get createdEmployeeRow() {
        return this.tableRow
            .filter({ hasText: this.employeeData.firstName })
            .filter({ hasText: this.employeeData.email });
    }

    editedEmployeeRow(employeeField: string): Locator {
        return this.tableRow
            .filter({ hasText: employeeField });
    }

    get newEmployeeRowEdit() {
        return this.createdEmployeeRow.getByTitle('Edit');
    }

    get newEmployeeRowDelete() {
        return this.createdEmployeeRow.getByTitle('Delete');
    }
}
