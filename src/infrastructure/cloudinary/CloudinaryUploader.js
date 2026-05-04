const ImageUploader = require('../../domain/player/ImageUploader');
require('dotenv').config();

class CloudinaryUploader extends ImageUploader {
  async upload(file) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary config missing: CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET required');
    }

    const formData = new FormData();
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error(`Cloudinary upload failed: ${data.error?.message || 'Unknown error'}`);
    }

    return data.secure_url;
  }
}

module.exports = CloudinaryUploader;
