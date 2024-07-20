const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://ahmedfarahat430:Medahny12345@cluster0.xrov2e9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, // no longer needed in newer versions
      useUnifiedTopology: true, // no longer needed in newer versions
   
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = connectToDatabase;
