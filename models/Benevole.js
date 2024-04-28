const mongoose = require('mongoose');

const mealOfferSchema = new mongoose.Schema({
    mealDate: {
        type: Date,
        required: true
    },
    offeredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SituationDifficile'
    }
});

const benevoleSchema = new mongoose.Schema({
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
    userType: {
        type: String,
        default: "Bénévole"
    },
    offerMeal: {
        type: Boolean,
        default: false
    },
    offerHistory: [mealOfferSchema]
});

const Benevole = mongoose.model('Benevole', benevoleSchema);

module.exports = Benevole;
