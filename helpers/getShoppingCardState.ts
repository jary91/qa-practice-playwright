import { Page } from "@playwright/test";

export async function getShoppingCartState(page: Page) {
    const cartRows = page.locator('.cart-items .cart-row');
    const numberOfProductsInCart = await cartRows.count();
    const totalPriceString = await page.locator('.cart-total-price').textContent();
    const totalPrice = parseFloat(totalPriceString?.replace('$', '') || '0');

    const products = [];

    for (let i = 0; i < numberOfProductsInCart; i++) {
        const item = cartRows.nth(i);
        const name = await item.locator('.cart-item-title').innerText();
        const priceString = (await item.locator('.cart-price').innerText());
        const price = parseFloat(priceString?.replace('$', '') || '0');
        const quantity = await item.locator('.cart-quantity-input').inputValue();
        products.push({ name, price, quantity });
    }

    return { numberOfProductsInCart, totalPrice, products };
}