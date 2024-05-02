const mongoose = require('mongoose');

const schemaAvis = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contenu: { type: String, required: true },
    notation: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Avis = mongoose.model('Avis', schemaAvis);

module.exports = Avis;
