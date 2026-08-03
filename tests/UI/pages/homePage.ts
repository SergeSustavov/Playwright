import { Locator, Page } from "@playwright/test";
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    loginInput = this.page.getByTestId('username');
    passwordInput = this.page.getByTestId('password');
    loginButton = this.page.getByTestId('login-button');
    loginLogo = this.page.getByText('Swag Labs');
};
