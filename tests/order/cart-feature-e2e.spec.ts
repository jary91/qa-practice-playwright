import { test, expect } from '../../page-objects/order-pages/fixtures'

test('Checking cart update on adding a product one by one', async ({ loginPage, productPage, cartPage, submitOrderPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await productPage.isLoaded()

    // First selection
    const selectedFirstProduct = await productPage.getProduct(0)
    await selectedFirstProduct.addToCart()
    const firstProductData = await selectedFirstProduct.getProductData()

    const cartTotal = await cartPage.getTotalCartPrice();
    expect(cartTotal).toBeCloseTo(firstProductData.price);
    expect(await cartPage.getProducts()).toEqual([{
        name: firstProductData.name,
        price: firstProductData.price,
        quantity: '1'
    }])

    // Second selection - Adding more products to the cart
    const selectSecondProduct = await productPage.getProduct(1)
    await selectSecondProduct.addToCart()
    const secondProductData = await selectSecondProduct.getProductData()

    const expectedTotal = (await selectedFirstProduct.getPrice() + await selectSecondProduct.getPrice())
    const updatedCartTotal = await cartPage.getTotalCartPrice();
    expect(updatedCartTotal).toBeCloseTo(expectedTotal);
    expect(await cartPage.getProducts()).toEqual([{
        name: firstProductData.name,
        price: firstProductData.price,
        quantity: '1'
    },
    {        
        name: secondProductData.name,
        price: secondProductData.price,
        quantity: '1'}
    ])
});