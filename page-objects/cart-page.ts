import { Locator, Page } from '@playwright/test';

class CartPage {
    private cartRows: Locator;
    private totalPrice: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.cartRows = this.page.locator('.cart-items .cart-row');
        this.totalPrice = this.page.locator('.cart-total-price');
    }

    async getNumberOfProductsInCart() {
        return await this.cartRows.count();
    }

    async getTotalPrice() {
        const totalPriceString = await this.totalPrice.textContent();
        return parseFloat(totalPriceString?.replace('$', '') || '0');
    }

    async getProducts() {
        const products = [];
        const numberOfProductsInCart = await this.getNumberOfProductsInCart();

        for (let i = 0; i < numberOfProductsInCart; i++) {
            const item = this.cartRows.nth(i);
            const name = await item.locator('.cart-item-title').innerText();
            const priceString = (await item.locator('.cart-price').innerText());
            const price = parseFloat(priceString?.replace('$', '') || '0');
            const quantity = await item.locator('.cart-quantity-input').inputValue();
            products.push({ name, price, quantity });
        }

        return products;
    }
}

export default CartPage;