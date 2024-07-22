"use client"
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Listing from '../../../../schemas/listing';

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const { name } = params;

    if (!name) {
      return new Response("Title query parameter is required", { status: 400 });
    }

    // Fetch listings by title
    const listings = await Listing.find({ title: new RegExp(name, 'i') });

    // Set no-cache headers
    const response = new Response(JSON.stringify({ listings }), { status: 200 });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
