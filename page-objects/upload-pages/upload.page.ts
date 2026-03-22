import { Page, expect } from '@playwright/test';

class UploadPage {
    private readonly locators = {
        fileInput: this.page.getByRole('button', { name: 'Choose File' }),
        uploadButton: this.page.locator('#file_upload'),
        submitButton: this.page.getByRole('button', { name: 'Submit' }),
        uploadConfirmationText: this.page.getByText('You have successfully')
    }

    constructor(private page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/file-upload');
    }

    async uploadFile(filePath: string) {
        await this.locators.uploadButton.setInputFiles(filePath);
    }

    async validateUpload(fileName: RegExp) {
        await expect(this.locators.uploadButton).toHaveValue(fileName);
    }

    async submitUpload() {
        await this.locators.submitButton.click();
    }

    async getUploadConfirmationText() {
        return await this.locators.uploadConfirmationText.textContent();
    }
}

export default UploadPage;