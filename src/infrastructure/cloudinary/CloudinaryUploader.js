const cloudinary = require('cloudinary').v2;
const ImageUploader = require('../../domain/player/ImageUploader');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

class CloudinaryUploader extends ImageUploader {
  async upload(file) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          folder: 'balon-de-oro'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(file.buffer);
    });
  }
}

module.exports = CloudinaryUploader;
