const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');




// === Register User ===
// Path: /api/users/register

const registerUser = async (req, res, next) => {
    try {
        const { name, email, confirmEmail, password, confirmPassword, phoneNumber, status } = req.body;
        if (!name || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (email !== confirmEmail) {
            return res.status(400).json({ message: 'Emails do not match' });

        }
        const newName = name.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const nameExist = await User.findOne({ name: newName });
        if (!nameExist) {
            return res.status(400).json({ message: 'Name already exists' });
        }
        const newEmail = email.toLowerCase();
        const emailExist = await User.findOne({ email: newEmail });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (password.trim().length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        if (phoneNumber.length !== 10) {
            return res.status(400).json({ message: 'Phone number must be 10 digits long' });
        }
        if (typeof phoneNumber !== 'number') {
            return res.status(400).json({ message: 'Phone number must be a number' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: newName,
            email: newEmail,
            phoneNumber,
            password: hashedPassword,
            status
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server xd" });
    }
}



// === Login User ===
// Path: /api/users/login
const loginUser = async (req, res, next) => {
    return res.status(200).json({ message: 'Login successful' });

}

// === My profile ===
// Path: /api/users/mon-compte
const userProfile = async (req, res, next) => {
    return res.status(200).json({ message: 'User profile' });

}

// === Update iformation ===
// Path: /api/users/update
const updateProfile = async (req, res, next) => {
    return res.status(200).json({ message: 'User profile updated' });

}

// === Get mes repas ===
// Path: /api/users/repas
const getMeals = async (req, res, next) => {
    return res.status(200).json({ message: 'All meals' });
}


// === Get Offrir ===
// Path: /api/users/offrir
const getOffrir = async (req, res, next) => {
    return res.status(200).json({ message: 'All offrir' });
}

// == Reserver un repas ===
// Path: /api/users/reserver ; Method: POST
const reserverMeal = async (req, res, next) => {
    return res.status(200).json({ message: 'Meal reserved' });
}

// == Restaurent à proximité ===
// Path: /api/users/restaurent ; Method: GET
const getRestaurent = async (req, res, next) => {
    return res.status(200).json({ message: 'Restaurent à proximité' });
}


module.exports = {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    getMeals,
    getOffrir,
    reserverMeal,
    getRestaurent
}