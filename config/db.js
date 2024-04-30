require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.log('Exiting the process');
        process.exit(1);
    }
};

module.exports = connectDB;

// Additional logging to track the flow of the script
console.log('Starting MongoDB connection...');
connectDB().then(() => {
    console.log('MongoDB connection successful');
}).catch(error => {
    console.error('MongoDB connection failed:', error);
});
