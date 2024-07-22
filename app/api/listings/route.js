// pages/api/listings/index.js
import connectToDatabase from '../../lib/mongodb';
import Listing from '../../schemas/Listing';

export const GET = async (request) => {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch all listings
    const listings = await Listing.find().populate({
        path: 'user_id',
        select: 'phone_number', // Only include phone_number field from User schema
      });
;
 if( listings.length === 0){
 return new Response("no listings found ", { status: 200 });
    }
    if (!listings ) {
      return new Response("Listings Not Found", { status: 404 });
    }
   

    return new Response(JSON.stringify({ listings }), { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
