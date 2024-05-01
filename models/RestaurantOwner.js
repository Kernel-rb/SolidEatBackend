const mongoose = require('mongoose');;

const restaurantOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true } // Reference to the associated restaurant
});


module.exports = mongoose.model('RestaurantOwner', restaurantOwnerSchema);
