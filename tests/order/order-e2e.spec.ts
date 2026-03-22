import { test, expect } from '../../page-objects/order-pages/fixtures'
import { defaultAddressData } from '../../test-data/shipping-details';

test('E2E order flow', async ({ loginPage, productPage, cartPage, submitOrderPage }) => {
    // await loginPage.goto();
    // await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    // await productPage.isLoaded()
   
    /*
    Potential Improvements:
    - Selecting products could be more dynamic e.g. based on the productId, name etc.
    - Lack of quantity selection
    - Safety check of products displayed on the product page before adding to cart
    */

    const selectedProducts = await productPage.getFirstNProducts(3)
    await productPage.addManyToCart(selectedProducts)
    const productsData = await productPage.getProductsData(selectedProducts)

    const expectedTotal = productsData.reduce((sum, p) => sum + p.price, 0);
    const cartTotal = await cartPage.getTotalCartPrice();
    expect(cartTotal).toBeCloseTo(expectedTotal);
    expect(await cartPage.getProducts()).toEqual(
        productsData.map(p => ({
            ...p,
            quantity: '1' // To Be Improved: Assuming each product is added once, quantity is '1'
        }))
    );
    await cartPage.proceedToCheckout();

    await submitOrderPage.isLoaded();
    await submitOrderPage.fillShippingDetails({
        phoneNumber: defaultAddressData.phoneNumber,
        address: defaultAddressData.address,
        city: defaultAddressData.city,
        country: defaultAddressData.country
    });
    await submitOrderPage.submitOrder();

    await submitOrderPage.assertOrderSubmission(
        cartTotal,
        defaultAddressData.address,
        defaultAddressData.city,
        defaultAddressData.country
    );
    await submitOrderPage.logOut();
    await loginPage.isLoaded();
});