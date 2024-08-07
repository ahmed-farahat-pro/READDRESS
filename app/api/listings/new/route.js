
import connectToDatabase from '../../../lib/mongodb';
import Listing from '../../../schemas/listing';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  try {
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
  auth: {
    user: 'ahmedfarahat430@gmail.com', // Your email address
    pass: 'fngu rhtt ijsx zvjl' // Your email password or app-specific password
  }
});
    await connectToDatabase();

    const {
      user_id,
      title,
      maps_url,
      description,
      price,
      address,
      city,
      state,
      zip_code,
      country,
      property_type,
      buy,
      bedrooms,
      bathrooms,
      area,
      status,
      images
    } = await request.json();

    // Log the incoming data to check for any issues
    console.log('Incoming data:', {
      user_id,
      title,
      maps_url,
      description,
      price,
      address,
      city,
      state,
      zip_code,
      country,
      property_type,
          buy,
      bedrooms,
      bathrooms,
      area,
      status,
      images
    });

    const newListing = new Listing({
      user_id,
      title,
      maps_url,
      description,
      price,
      address,
      city,
      state,
      zip_code,
      country,
      property_type,
     buy,
      bedrooms,
      bathrooms,
      area,
      status,
      images
    });
    console.log(newListing);


 const emailText = `
    Title: ${newListing.title}
    Price: ${newListing.price}
    City: ${newListing.city}
    State: ${newListing.state}
    Zip Code: ${newListing.zip_code}
    Country: ${newListing.country}
    Property Type: ${newListing.property_type}
    Buy/Rent: ${newListing.buy}
    Bedrooms: ${newListing.bedrooms}
    Bathrooms: ${newListing.bathrooms}
    Area: ${newListing.area} sq. ft.
    Status: ${newListing.status}
    Images: ${newListing.images.join(', ')}
  `;
   const emailHtml = `
    <h1>New Listing Created</h1>
    <p><strong>Title:</strong> ${newListing.title}</p>
    <p><strong>Price:</strong> ${newListing.price}</p>
    <p><strong>City:</strong> ${newListing.city}</p>
    <p><strong>State:</strong> ${newListing.state}</p>
    <p><strong>Zip Code:</strong> ${newListing.zip_code}</p>
    <p><strong>Country:</strong> ${newListing.country}</p>
    <p><strong>Property Type:</strong> ${newListing.property_type}</p>
    <p><strong>Buy/Rent:</strong> ${newListing.buy}</p>
    <p><strong>Bedrooms:</strong> ${newListing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${newListing.bathrooms}</p>
    <p><strong>Area:</strong> ${newListing.area} sq. ft.</p>
    <p><strong>Status:</strong> ${newListing.status}</p>
    <p><strong>Images:</strong> ${newListing.images.join(', ')}</p>
  `;

    await newListing.save();
    let mailOptions = {
  from: 'ahmedfarahat430@gmail.com', // Sender address
  to: 'ahmedfarahat400@gmail.com', // List of recipients
  subject: 'Listing Created and need Approvval ', // Subject line
  text: emailText, // Plain text body
  html: emailHtml // HTML body
};
 try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }

    return NextResponse.json({ message: 'Listing created successfully', listing: newListing }, { status: 201 });

  } catch (error) {
    // Log the error details
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing', details: error.message }, { status: 500 });
  }
};
