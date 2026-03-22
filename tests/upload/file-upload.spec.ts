import { test, expect} from '../../page-objects/upload-pages/fixtures'
import { getUploadFile } from '../../helpers/get-upload-file';

const fileNames = [
    'upload-test.json',
    'upload-test-docx.docx',
    'upload-test-jpg.jpg',
    'upload-test-pdf.pdf'
]

fileNames.forEach((fileName) => {
    test(`Checking different file format upload: ${fileName}`, async ({ uploadPage }) => {
        const uploadFile = getUploadFile(fileName)

    await uploadPage.goto();
    await uploadPage.uploadFile(uploadFile.path);
    await uploadPage.validateUpload(uploadFile.regex);
    await uploadPage.submitUpload()

    expect(await uploadPage.getUploadConfirmationText()).toBeTruthy()
    expect(await uploadPage.getUploadConfirmationText()).toContain(fileName)
    });
});