import { Page, expect } from '@playwright/test';

export class ShippingDetailsPage {
    private readonly locators = {
        header: this.page.getByRole('heading', { name: 'Shipping Details' }),
        phoneNumberInput: this.page.getByRole('textbox', { name: 'Enter phone number' }),
        addressInput: this.page.getByRole('textbox', { name: 'Little Streets' }),
        cityInput: this.page.getByRole('textbox', { name: 'London' }),
        countryDropdown: this.page.locator('#countries_dropdown_menu'),
        countryOption: this.page.locator(`#countries_dropdown_menu`),
        submitButton: this.page.getByRole('button', { name: 'Submit Order' }),        
    }

    constructor(private page: Page) {
        this.page = page;
    }

    async isLoaded() {
        await expect(this.locators.header).toBeVisible();
    }

    async fillShippingDetails({phoneNumber, address, city, country}: { phoneNumber: string, address: string, city: string, country: string }) {
        await this.locators.phoneNumberInput.fill(phoneNumber);
        await this.locators.addressInput.fill(address);
        await this.locators.cityInput.fill(city);
        await this.locators.countryDropdown.click();
        const countryDropdown = await this.locators.countryOption
        await countryDropdown.selectOption(country);
    }

    async submitOrder() {
        await this.locators.submitButton.click();
    }

    // I decided to keep the summary page here as there are only two elements to use
    async assertOrderSubmission(expectedTotalPrice: number, expectedAddress: string, expectedCity: string, expectedCountry: string) {
        const successText = this.page.getByText(`Congrats! Your order of $${expectedTotalPrice}`);
        const expectedSummaryText = `Congrats! Your order of $${expectedTotalPrice} has been registered and will be shipped to ${expectedAddress}, ${expectedCity} - ${expectedCountry}.`;         await expect(successText).toHaveText(expectedSummaryText);
    }

    async logOut() {
        await this.page.getByRole('link', { name: 'Log Out' }).click();
    }
}

export default ShippingDetailsPage;