import { Page } from '@playwright/test';

class CartPage {
    private readonly locators = {
        cartRows: this.page.locator('.cart-items .cart-row'),
        totalPrice: this.page.locator('.cart-total-price'),
        proceedButton: this.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })
    }

    private getCartRow(i: number) {
        const row = this.locators.cartRows.nth(i)
        return {
            name: row.locator('.cart-item-title'),
            price: row.locator('.cart-price'),
            quantity: row.locator('.cart-quantity-input')
        }
    }

    constructor(private page: Page) {
        this.page = page;
    }

    async getNumberOfProductsInCart() {
        return await this.locators.cartRows.count();
    }

    async getTotalCartPrice() {
        const totalPriceString = await this.locators.totalPrice.textContent();
        return parseFloat(totalPriceString?.replace('$', '') || '0');
    }

    async getNthProduct(n: number) {
        return this.getCartRow(n)
    }

    async getNthProductName(n: number) {
        const product = await this.getNthProduct(n)
        return await product.name.innerText();
    }

    async getNthProducPrice(n: number) {
        const product = await this.getNthProduct(n)
        const priceString = await product.price.innerText();
        return await parseFloat((priceString).replace('$','') || '0');
    }

    async getNthProductQuantity(n: number) {
        const product = await this.getNthProduct(n)
        return await product.quantity.inputValue();
    }

    async getProducts() {
        const products = [];
        const numberOfProductsInCart = await this.getNumberOfProductsInCart();

        for (let i = 0; i < numberOfProductsInCart; i++) {
            const name = await this.getNthProductName(i)
            const price = await this.getNthProducPrice(i)
            const quantity = await this.getNthProductQuantity(i)
            products.push({ name, price, quantity });
        }

        return products;
    }

    async proceedToCheckout() {
        await this.locators.proceedButton.click();
    }
}

export default CartPage;