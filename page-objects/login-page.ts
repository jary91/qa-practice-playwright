import { Locator, Page } from '@playwright/test';

class LoginPage {
    private locators;

    constructor(private page: Page) {
        this.page = page;
        this.locators = {
            usernameInput: this.page.locator('input[name="emailAddress"]'),
            passwordInput: this.page.locator('input[name="password"]'),
            loginButton: this.page.locator('button[test-data="submitBtn"]')
        };
    }
    async goto() {
        await this.page.goto('https://qa-practice.netlify.app/auth_ecommerce.html');
    }
    async login(username: string, password: string) {
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.loginButton.click();
    }
}

export default LoginPage;