import { test as setup } from '../../page-objects/order-pages/fixtures'

setup('Login to the app', async ({ loginPage, productPage, page }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await productPage.isLoaded();

    await page.context().storageState({ path: '.auth/login.json' });
});