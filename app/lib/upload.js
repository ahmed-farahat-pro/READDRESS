import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "ddvbqilxn",
  api_key: "872484216626147",
  api_secret: "c-xPx8MDWnNdJ3hoEb5nnMkm-dI"
});

// Create the multer storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'listings', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png'], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

export default upload;
