const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Menu = require('./Menu');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  cuisine: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  photos: { type: Array, of: String },
  openingHours: { type: String, required: true },
  openingDays: { type: String, required: true }
});

restaurantSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

restaurantSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

restaurantSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const uniqueKey = Object.keys(error.keyValue)[0];
    const message = `Duplicate key error: ${uniqueKey} '${error.keyValue[uniqueKey]}' already exists.`;
    return next(new Error(message));
  }
  next(error);
});

restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
