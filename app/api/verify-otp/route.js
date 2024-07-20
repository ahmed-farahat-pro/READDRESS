import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import User from '../../schemas/user';

export const POST = async (request) => {
  const { email, otp } = await request.json();

  try {
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Update user verification status and clear OTP
    user.isVerified = true;
    user.otp = null; // Clear OTP after verification

    await user.save();
    console.log("verified");
    return NextResponse.json({ message: 'User verified' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
