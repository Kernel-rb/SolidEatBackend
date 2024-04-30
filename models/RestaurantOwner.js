const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const restaurantOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true } // Reference to the associated restaurant
});

restaurantOwnerSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('RestaurantOwner', restaurantOwnerSchema);
