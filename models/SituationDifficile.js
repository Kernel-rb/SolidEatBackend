// SituationDifficile.js
const mongoose = require('mongoose');

const situationDifficileSchema = new mongoose.Schema({
    fullName: {
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
    status: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'En situation difficile'
    }
});

const SituationDifficile = mongoose.model('SituationDifficile', situationDifficileSchema);

module.exports = SituationDifficile;