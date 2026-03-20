import test, { expect } from '@playwright/test';
import { getProductData } from '../helpers/getProductData';
import { getShoppingCartState } from '../helpers/getShoppingCardState';

test('order flow', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce.html');
    await page.locator('input[name="emailAddress"]').fill(process.env.USERNAME || '');
    await page.locator('input[name="password"]').fill(process.env.PASSWORD || '');
    await page.locator('button[test-data="submitBtn"]').click();
    await expect(await page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();

    const firstProduct = await getProductData(page.locator('.shop-item').first());
    const secondProduct = await getProductData(page.locator('.shop-item').nth(1));

    await firstProduct.button.click();
    await secondProduct.button.click();

    const cartState = await getShoppingCartState(page);
    expect(cartState.numberOfProductsInCart).toBe(2);
    expect(cartState.totalPrice).toBeCloseTo((firstProduct.price + secondProduct.price), 2);
    expect(cartState.products).toEqual([
        { name: firstProduct.name, price: firstProduct.price, quantity: '1' },
        { name: secondProduct.name, price: secondProduct.price, quantity: '1' }
    ]);
});