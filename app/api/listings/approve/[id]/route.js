
import connectToDatabase from '../../../../lib/mongodb';
import Listing from '../../../../schemas/listing';
import { NextResponse } from 'next/server';
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
  auth: {
    user: 'ahmedfarahat430@gmail.com', // Your email address
    pass: 'fngu rhtt ijsx zvjl' // Your email password or app-specific password
  }
});

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Find the listing by ID and update its status to 'approved'
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true } // Return the updated document
    ).populate('user_id');
    console.log(updatedListing);

    if (!updatedListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const emailHtml = `
    <h1> Listing Approved</h1>
    <p><strong>Title:</strong> ${updatedListing.title}</p>
    <p><strong>Price:</strong> ${updatedListing.price}</p>
    <p><strong>City:</strong> ${updatedListing.city}</p>
    <p><strong>State:</strong> ${updatedListing.state}</p>
    <p><strong>Zip Code:</strong> ${updatedListing.zip_code}</p>
    <p><strong>Country:</strong> ${updatedListing.country}</p>
    <p><strong>Property Type:</strong> ${updatedListing.property_type}</p>
    <p><strong>Buy/Rent:</strong> ${updatedListing.buy}</p>
    <p><strong>Bedrooms:</strong> ${updatedListing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${updatedListing.bathrooms}</p>
    <p><strong>Area:</strong> ${updatedListing.area} sq. ft.</p>
    <p><strong>Status:</strong> ${updatedListing.status}</p>
    <p><strong>Images:</strong> ${updatedListing.images.join(', ')}</p>
  `;
        let mailOptions = {
  from: 'ahmedfarahat430@gmail.com', // Sender address
  to: updatedListing.user_id.email, // List of recipients
  subject: 'Listing  Approved ', // Subject line
  html: emailHtml // Plain text body

};
 try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }

    return NextResponse.json({ message: 'Listing approved successfully', listing: updatedListing }, { status: 200 });
  } catch (error) {
    console.error('Error approving listing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Find the listing by ID and delete it
    const deletedListing = await Listing.findByIdAndDelete(id).populate('user_id');
console.log(deletedListing);
    if (!deletedListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

       const emailHtml = `
    <h1> Listing Deleted</h1>
    <p><strong>Title:</strong> ${deletedListing.title}</p>
    <p><strong>Price:</strong> ${deletedListing.price}</p>
    <p><strong>City:</strong> ${deletedListing.city}</p>
    <p><strong>State:</strong> ${deletedListing.state}</p>
    <p><strong>Zip Code:</strong> ${deletedListing.zip_code}</p>
    <p><strong>Country:</strong> ${deletedListing.country}</p>
    <p><strong>Property Type:</strong> ${deletedListing.property_type}</p>
    <p><strong>Buy/Rent:</strong> ${deletedListing.buy}</p>
    <p><strong>Bedrooms:</strong> ${deletedListing.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${deletedListing.bathrooms}</p>
    <p><strong>Area:</strong> ${deletedListing.area} sq. ft.</p>
    <p><strong>Status:</strong> ${deletedListing.status}</p>
    <p><strong>Images:</strong> ${deletedListing.images.join(', ')}</p>
  `;
           let mailOptions = {
  from: 'ahmedfarahat430@gmail.com', // Sender address
  to: deletedListing.user_id.email, // List of recipients
  subject: 'Listing Deleted ', // Subject line
  html: emailHtml // Plain text body

};
 try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
