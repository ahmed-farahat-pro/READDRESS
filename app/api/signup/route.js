// pages/api/signup.js

import connectToDatabase from '../../lib/mongodb';
import User from '../../schemas/user';
import nodemailer from 'nodemailer';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or any other email service provider
  auth: {
    user: 'ahmedfarahat430@gmail.com', // Your email address
    pass: 'fngu rhtt ijsx zvjl', // Your email password or app-specific password
  },
});

export const POST = async (request) => {
  const { email, password, firstName, lastName, phoneNumber } = await request.json();

  try {
    await connectToDatabase();

    // Create a new User document
    const user = new User({
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      type: 'customer',
    });

    // Save user to MongoDB
    await user.save();

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp; // Store OTP in the user document
    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your verification code is ${otp}`,
    });

    // Return the response object directly
    return new Response(JSON.stringify({ message: 'User created. OTP sent via email.' }), { status: 201 });
  } catch (error) {
    // Handle errors during signup process
    return new Response(JSON.stringify({ error: 'Failed to create user.' }), { status: 500 });
  }
};
