import { Page, expect } from '@playwright/test';

class LoginPage {
    private readonly locators = {
        usernameInput: this.page.locator('input[name="emailAddress"]'),
        passwordInput: this.page.locator('input[name="password"]'),
        loginButton: this.page.locator('button[test-data="submitBtn"]')
    }

    constructor(private page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('/auth_ecommerce.html');
    }
    async isLoaded() {
        await expect(this.locators.usernameInput).toBeVisible();
    }
    
    async login(username: string, password: string) {
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.loginButton.click();
    }
}

export default LoginPage;