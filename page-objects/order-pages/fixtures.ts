import {test as base} from '@playwright/test';
import CartPage from './cart.page';
import LoginPage from './login.page';
import ProductPage from './product.page';
import ShippingDetailsPage from './shipping-details.page';

type MyFixtures = {
    cartPage: CartPage,
    loginPage: LoginPage,
    productPage: ProductPage,
    submitOrderPage: ShippingDetailsPage
}

export const test = base.extend<MyFixtures>({
    cartPage: async({page}, use) => {
        await use(new CartPage(page));
    },
    loginPage: async({page}, use) => {
        await use(new LoginPage(page));
    },
    productPage: async({page}, use) => {
        await use(new ProductPage(page));
    },
    submitOrderPage: async({page}, use) => {
        await use(new ShippingDetailsPage(page));
    }
})

export { expect } from '@playwright/test';
