// models/Restaurateur.js

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
});

const menuItemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [ingredientSchema]
});

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
    },
    menu: [menuItemSchema]
});

const Restaurateur = mongoose.model('Restaurateur', restaurateurSchema);

module.exports = Restaurateur;
