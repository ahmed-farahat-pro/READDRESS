"use client"
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
    await connectToDatabase(); // Connect to MongoDB

    // Update the listing by ID with provided fields and set status to 'pending'
    const updatedFields = { ...body, status: 'pending' };
    const listing = await Listing.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!listing) {
      return NextResponse.notFound('Listing Not Found');
    }

    // Set no-cache headers
    const response = NextResponse.json({ listing }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
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
