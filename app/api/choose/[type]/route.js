// pages/api/listings/index.js
import Listing from '../../../schemas/listing';
import connectToDatabase from '../../../lib/mongodb';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const GET = async (request,{params}) => {
   const { type } = params;
console.log(type);

  try {
    revalidateTag('blog-posts');
    await connectToDatabase(); // Connect to MongoDB

    // Fetch listings filtered by property type if provided
    const query = type ? { property_type: type } : {}; // Create a query object based on property_type
    const listings = await Listing.find(query).populate({
      path: 'user_id',
      select: 'phone_number', // Only include phone_number field from User schema
    });

    if (listings.length === 0) {
      return  NextResponse.json("No listings found", { status: 200, headers: { 'Cache-Control': 'no-store' } });
    }

    return  NextResponse.json( listings , { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return  NextResponse.json("Internal Server Error", { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
};
