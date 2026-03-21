import { Locator, Page } from '@playwright/test';

class ProductItem {
    private locators: {
        name: Locator;
        price: Locator;
        addToCartButton: Locator;
    };

    constructor(private root: Locator) {
        this.locators = {
            name: root.locator('.shop-item-title'),
            price: root.locator('.shop-item-price'),
            addToCartButton: root.getByRole('button', { name: 'ADD TO CART' }),
        };
    }
    async getProductData() {
        const name = await this.locators.name.textContent();
        const priceString = await this.locators.price.textContent();
        const price = parseFloat(priceString?.replace('$', '') || '0');

        return { name, price };
    }
    async getName() {
        return await this.locators.name.textContent();
    }
    async getPrice() {
        const priceString = await this.locators.price.textContent();
        return parseFloat(priceString?.replace('$', '') || '0');
    }
    async addToCart() {
        await this.locators.addToCartButton.click();
    }
}

export class ProductPage {
    private locators: {
        products: Locator;
    };
    constructor(private page: Page) {
        this.locators = {
            products: page.locator('.shop-item'),
        };
    }
    getProduct(nth: number): ProductItem {
        return new ProductItem(this.locators.products.nth(nth));
    }
}
