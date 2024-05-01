const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    image: { type: String  , required: true},
    prix: { type: Number, required: true },
    ingredients: { type: String, required: true },
    status: { type: String, required: true, enum: ["Publié", "Réservé", "Offert"] },
});

module.exports = mongoose.model('Menu', menuSchema);
