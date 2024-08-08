
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Listing from '../../../schemas/listing';

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the listing by ID and populate the user_id field
    const listing = await Listing.findById(id)
      .populate({
        path: 'user_id',
        select: 'phone_number', // Only include phone_number field from User schema
      });

    if (!listing) {
      return NextResponse.notFound();
    }

    // Set no-cache headers
    const response = NextResponse.json({ listing }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();

  try {
        const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
  auth: {
    user: 'ahmedfarahat430@gmail.com', // Your email address
    pass: 'fngu rhtt ijsx zvjl' // Your email password or app-specific password
  }
});
    await connectToDatabase(); // Connect to MongoDB

    // Update the listing by ID with provided fields and set status to 'pending'
    const updatedFields = { ...body, status: 'pending' };
     const oldListing = await Listing.findById(id).populate('user_id');
    const listing = await Listing.findByIdAndUpdate(id, updatedFields, { new: true }).populate('user_id');

    if (!listing) {
      return NextResponse.notFound('Listing Not Found');
    }

       const emailHtml = `

       <h1> User  ${oldListing.user_id.email}</h1>
           <h1> User  ${oldListing.user_id.phone_number}</h1>
    <h1>Old Listing </h1>
    <p><strong>Title:</strong> ${oldListing.title}</p>
    <p><strong>Price:</strong> ${oldListing.price}</p>
    <p><strong>City:</strong> ${oldListing.city}</p>
    <p><strong>State:</strong> ${oldListing.state}</p>
    <p><strong>Zip Code:</strong> ${oldListing.zip_code}</p>
    <p><strong>Country:</strong> ${oldListing.country}</p>
    <p><strong>Property Type:</strong> ${oldListing.property_type}</p>
    <p><strong>Buy/Rent:</strong> ${oldListing.buy}</p>
    <p><strong>Bedrooms:</strong> ${oldListing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${oldListing.bathrooms}</p>
    <p><strong>Area:</strong> ${oldListing.area} sq. ft.</p>
    <p><strong>Status:</strong> ${oldListing.status}</p>
    <p><strong>Images:</strong> ${oldListing.images.join(', ')}</p>

    <br/>

     <br/>
     <h1>Updated Listing </h1>
    <p><strong>Title:</strong> ${listing.title}</p>
    <p><strong>Price:</strong> ${listing.price}</p>
    <p><strong>City:</strong> ${listing.city}</p>
    <p><strong>State:</strong> ${listing.state}</p>
    <p><strong>Zip Code:</strong> ${listing.zip_code}</p>
    <p><strong>Country:</strong> ${listing.country}</p>
    <p><strong>Property Type:</strong> ${listing.property_type}</p>
    <p><strong>Buy/Rent:</strong> ${listing.buy}</p>
    <p><strong>Bedrooms:</strong> ${listing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${listing.bathrooms}</p>
    <p><strong>Area:</strong> ${listing.area} sq. ft.</p>
    <p><strong>Status:</strong> ${listing.status}</p>
    <p><strong>Images:</strong> ${listing.images.join(', ')}</p>
  `;
    // Set no-cache headers

        let mailOptions = {
  from: 'ahmedfarahat430@gmail.com', // Sender address
  to: 'ahmedfarahat430@gmail.com', // List of recipients
  subject: 'Listing Updated And waiting for approval', // Subject line
  html: emailHtml // HTML body
};
 try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }
    return NextResponse.json({ listing }, { status: 200 });
    
   
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Delete the listing by ID
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return NextResponse.notFound('Listing Not Found');
    }

    // Set no-cache headers
    const response = NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};
