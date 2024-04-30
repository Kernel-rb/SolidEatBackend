const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  cuisine: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  menu: { type: Array },
  photos: { type: Array, of: String }, 
  openingHours: {
    type: Object,
    required: true,
    properties: {
      days: { type: Array, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      openTime: { type: String, required: true }, 
      closeTime: { type: String, required: true },
    }
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
