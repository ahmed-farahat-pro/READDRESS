
import connectToDatabase from '../../../../lib/mongodb';
import Listing from '../../../../schemas/listing';
import { NextResponse } from 'next/server';

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Find the listing by ID and update its status to 'approved'
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
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
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
