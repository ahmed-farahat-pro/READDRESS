// pages/api/login.js
import connectToDatabase from '../../lib/mongodb';
import User from '../../schemas/user'; // Assuming you have a User schema
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { email, password } = await request.json();

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Find user by email and password (you should hash the password for security)
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the password matches (you should use bcrypt or similar for hashing)
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Return additional user data on successful login
    const userData = {
      userId: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      type: user.type, // Return user type (admin or customer)
      // Add other necessary fields
    };

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
