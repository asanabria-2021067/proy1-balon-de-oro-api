class ImageUploader {
  constructor() {
    if (this.constructor === ImageUploader) {
      throw new Error("Abstract class 'ImageUploader' cannot be instantiated.");
    }
  }

  async upload(file) {
    throw new Error("Method 'upload()' must be implemented.");
  }
}

module.exports = ImageUploader;
