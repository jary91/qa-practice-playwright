import {test as base} from '@playwright/test'
import UploadPage from './upload.page'

export const test = base.extend<{uploadPage: UploadPage}>({
    uploadPage: async({page}, use) => {
        await use(new UploadPage(page))
    }
});

export { expect } from '@playwright/test';
