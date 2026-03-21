import { Locator, Page, expect } from '@playwright/test';

export class ProductPage {
    private readonly locators = {
        products: this.page.locator('.shop-item'),
        header: this.page.getByRole('heading', { name: 'SHOPPING CART' })
    };
    constructor(private page: Page) {};
    
    getProduct(nth: number): ProductItem {
        return new ProductItem(this.locators.products.nth(nth));
    }

    getFirstNProducts(n: number): ProductItem[] {
        return Array.from({ length: n }, (_, i) => this.getProduct(i))
    }
    async addToCart(products: ProductItem[]) {
        for(const item of products ){
            await item.addToCart()
        }
    }
    getProductsData(products: ProductItem[]) {  
        return Promise.all(products.map(p => p.getProductData()));
    }
    async isLoaded() {
        expect(await this.locators.header).toBeVisible();
    }
}

class ProductItem {
    private readonly locators = {
        name: this.root.locator('.shop-item-title'),
        price: this.root.locator('.shop-item-price'),
        addToCartButton: this.root.getByRole('button', { name: 'ADD TO CART' }),
    };

    constructor(private root: Locator) {}
    
    async getName() {
        return await this.locators.name.textContent();
    }
    async getPrice() {
        const priceString = await this.locators.price.textContent();
        return parseFloat(priceString?.replace('$', '') || '0');
    }
    async getProductData() {
        const name = await this.getName();
        const price = await this.getPrice();

        return { name, price };
    }
    async addToCart() {
        await this.locators.addToCartButton.click();
    }
}

export default ProductPage;