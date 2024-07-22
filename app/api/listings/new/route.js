"use client"
import connectToDatabase from '../../../lib/mongodb';
import Listing from '../../../schemas/listing';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  try {
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
      bedrooms,
      bathrooms,
      area,
      status,
      images
    });

    await newListing.save();

    return NextResponse.json({ message: 'Listing created successfully', listing: newListing }, { status: 201 });
  } catch (error) {
    // Log the error details
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing', details: error.message }, { status: 500 });
  }
};
