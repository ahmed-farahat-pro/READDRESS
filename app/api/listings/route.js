// pages/api/listings/index.js
import Listing from '../../schemas/listing';
import connectToDatabase from '../../lib/mongodb';

export const GET = async (request) => {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch all listings
    const listings = await Listing.find().populate({
      path: 'user_id',
      select: 'phone_number', // Only include phone_number field from User schema
    });

    if (listings.length === 0) {
      const response = new Response("No listings found", { status: 200 });
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    if (!listings) {
      const response = new Response("Listings Not Found", { status: 404 });
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const response = new Response(JSON.stringify({ listings }), { status: 200 });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.error('Error fetching listings:', error);
    const response = new Response("Internal Server Error", { status: 500 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
};
