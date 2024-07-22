const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User'); // Import User model

const listingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  maps_url: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  country: { type: String, required: true },
  property_type: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'approved', 'deleted'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  images: [
    {
      image_url: { type: String, required: true },
      created_at: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.models.Listing || mongoose.model('Listing', listingSchema);
