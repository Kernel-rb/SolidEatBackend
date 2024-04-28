// Restaurateur.js
const mongoose = require('mongoose');

const restaurateurSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "Restaurateur"
    }
});

const Restaurateur = mongoose.model('Restaurateur', restaurateurSchema);

module.exports = Restaurateur;
