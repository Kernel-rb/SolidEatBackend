const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    image: { type: String },
    prix: { type: Number, required: true },
    ingredients: { type: String, required: true },
    categorie: { type: String, enum: ["Kebab", "Pizza", "Burger", "Pâtes", "Salade", "Dessert"] },
    status: { type: String, required: true, enum: ["Publié", "Réservé", "Offert"], default: "Publié" },
});

module.exports = mongoose.model('Menu', menuSchema);
