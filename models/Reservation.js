const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }, 
    partySize: {
        type: Number,
        required: true
    }, 
    specialRequests: {
        type: String
    }, 
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled']
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
