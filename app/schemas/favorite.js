const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  listing_id: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
