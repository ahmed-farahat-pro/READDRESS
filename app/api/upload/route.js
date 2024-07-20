import multiparty from 'multiparty';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: 'ddvbqilxn',
  api_key: '872484216626147',
  api_secret: 'c-xPx8MDWnNdJ3hoEb5nnMkm-dI'
});

export const config = {
  api: {
    bodyParser: false // Disabling default bodyParser to handle it manually
  }
};

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export const POST = async (req, res) => {
  try {
    // Parse the incoming form
    const { files } = await parseForm(req);

    if (!files.image || files.image.length === 0) {
      return NextResponse.json({ error: 'No image file found' }, { status: 400 });
    }

    const file = files.image[0].path;

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'uploads', // Folder name in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png'] // Allowed file formats
    });

    // Return the uploaded image URL
    return NextResponse.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error('Error uploading image:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
};
