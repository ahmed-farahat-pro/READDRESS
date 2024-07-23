
// pages/api/signup.js

import connectToDatabase from '../../lib/mongodb';
import User from '../../schemas/user';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const POST = async (request) => {
  const {  email, password, firstName, lastName, phoneNumber } = await request.json();
   

  try {
    
    await connectToDatabase();
  

    // Ensure User model is defined and used correctly
    let UserModel;
    try {
      // Attempt to get the existing model if it's already defined
      UserModel = User || require('../../schemas/user').default;
    } catch (error) {
      // If not defined, define it and store it globally
    
      UserModel = require('../../schemas/user').default;
    }

    
    // Create a new User document
    const user = new UserModel({
      
      email:email,
      password:password,
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

    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: '+12567334907',
      to: phoneNumber,
    });

    // Return the response object directly
    return new Response(JSON.stringify({ message: 'User created. OTP sent.' }), { status: 201 });
  } catch (error) {
    // Handle errors during signup process
    return new Response(JSON.stringify({ error: 'Failed to create user.' }), { status: 500 });
  }
};
