import { test, expect } from '../page-objects/fixtures'

test('order flow with page objects', async ({ loginPage, productPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    // await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();

    /*
    Potential Improvements:
    - Selecting products could be more dynamic e.g. based on the productId, name etc.
    - Lack of quantity selection
    - Safety check of products displayed on the product page before adding to cart
    */
    const selectedProducts = [ 
        productPage.getProduct(1),
    ];
    for (const product of selectedProducts) {
        await product.addToCart();
    }
    expect(await cartPage.getNumberOfProductsInCart())
        .toBe(selectedProducts.length);
    const productsData = await Promise.all(
        selectedProducts.map(p => p.getProductData())
    );

    const expectedTotal = productsData.reduce((sum, p) => sum + p.price, 0);
    expect(await cartPage.getTotalPrice()).toBeCloseTo(expectedTotal);
    expect(await cartPage.getProducts()).toEqual(
        productsData.map(p => ({
            ...p,
            quantity: '1' // To Be Improved: Assuming each product is added once, quantity is '1'
        }))
    );
});