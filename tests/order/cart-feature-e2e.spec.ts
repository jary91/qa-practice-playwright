import { test, expect } from '../../page-objects/order-pages/fixtures'

test.describe('Adding products to the cart tests', async()=> {

    test.beforeEach(async({loginPage, productPage})=> {
        await loginPage.goto();
        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
        await productPage.isLoaded()
    })

    test('Checking cart update on adding a product one by one', async ({ productPage, cartPage }) => {
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
        const selectSecondProduct = productPage.getProduct(1)
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

    test('Adding the same product by add to card button', async({ productPage, cartPage, page })=> {
        // adding first product to the cart
        const selectedProduct = productPage.getProduct(0)
        await selectedProduct.addToCart()
        const productData = await selectedProduct.getProductData()

        expect(await cartPage.getProducts()).toEqual([{
            name: productData.name,
            price: productData.price,
            quantity: '1'
        }])

        // adding the same product and receiving validation message
        page.on('dialog', async dialog => {
          expect(dialog.message()).toContain('This item is already added to the cart');
          await dialog.dismiss();
        });
        await selectedProduct.addToCart()

        expect(await cartPage.getProducts()).toEqual([{
            name: productData.name,
            price: productData.price,
            quantity: '1'
        }])
    
    })
});