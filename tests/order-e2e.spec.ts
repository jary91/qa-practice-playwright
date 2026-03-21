import { test, expect } from '../page-objects/fixtures'
import { ProductPage } from '../page-objects/product.page';

test('order flow with page objects', async ({ loginPage, productPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await productPage.isLoaded()
   
    /*
    Potential Improvements:
    - Selecting products could be more dynamic e.g. based on the productId, name etc.
    - Lack of quantity selection
    - Safety check of products displayed on the product page before adding to cart
    */

    const selectedProducts = await productPage.getFirstNProducts(3)
    await productPage.addToCart(selectedProducts)
    const productsData = await productPage.getProductsData(selectedProducts)

    const expectedTotal = productsData.reduce((sum, p) => sum + p.price, 0);
    expect(await cartPage.getTotalCartPrice()).toBeCloseTo(expectedTotal);
    expect(await cartPage.getProducts()).toEqual(
        productsData.map(p => ({
            ...p,
            quantity: '1' // To Be Improved: Assuming each product is added once, quantity is '1'
        }))
    );

    await cartPage.proceedToCheckout();
});