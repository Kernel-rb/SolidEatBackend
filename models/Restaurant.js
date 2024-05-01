const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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

const restaurantOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  restaurant: { type: restaurantSchema, required: true }
});

restaurantOwnerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

restaurantOwnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('RestaurantOwner', restaurantOwnerSchema);
