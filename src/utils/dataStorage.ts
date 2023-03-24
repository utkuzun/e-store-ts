import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.STORAGE_NAME,
  api_key: process.env.STORAGE_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
});

export default cloudinary;
