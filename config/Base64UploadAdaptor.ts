// @ts-ignore
export default class Base64UploadAdaptor {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve) => {
        this._initBase64(file).then((result) => {
          resolve({
            default: result,
          });
        });
      });
    });
  }

  _initBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target?.result);
      };
    });
  }
}
