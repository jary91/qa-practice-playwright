export const getUploadFile = (fileName: string) => ({
    path: `test-data/files-to-upload/${fileName}`,
    regex: new RegExp(fileName),
});