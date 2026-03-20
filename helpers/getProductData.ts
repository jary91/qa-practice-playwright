import { Locator } from "@playwright/test";

export async function getProductData(item: Locator) {
    const priceString = await item.locator('.shop-item-price').textContent();
    const price = parseFloat(priceString?.replace('$', '') || '0');
    return {
        name: await item.locator('.shop-item-title').textContent(),
        price,
        button: await item.getByRole('button', { name: 'ADD TO CART' })
    }
}