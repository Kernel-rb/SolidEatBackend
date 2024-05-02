require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const restaurentRoutes = require('./routes/restaurentRoutes');
const avisRoutes = require('./routes/avisRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use('/api/users', userRoutes);
app.use('/api/restaurateur', restaurentRoutes);
app.use('/api/avis', avisRoutes);
app.use('/uploads', express.static('uploads'));
app.use(notFound);
app.use(errorHandler);


connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log(`Server is Running on http://localhost:5000`));
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
