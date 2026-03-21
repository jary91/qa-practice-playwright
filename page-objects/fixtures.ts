import {test as base} from '@playwright/test';
import CartPage from './cart-page';
import LoginPage from './login-page';
import { ProductPage } from './product-page';

type MyFixtures = {
    cartPage: CartPage,
    loginPage: LoginPage,
    productPage: ProductPage
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
    }
})

export { expect } from '@playwright/test';
