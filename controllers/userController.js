const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

// === Register User ===
const registerUser = async (req, res, next) => {
    try {
        const { name, email, confirmEmail, password, confirmPassword, phoneNumber, status } = req.body;
        if (!name || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const fullnameRegexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!fullnameRegexp.test(name)) {
            return res.status(400).json({ message: 'Name must contain only letters' });
        }
        const newname = name.trim();
        const nameExist = await User.findOne({ name: newname });
        if (nameExist) {
            return res.status(400).json({ message: 'Name already exists' });
        }
        if (email !== confirmEmail) {
            return res.status(400).json({ message: 'Emails do not match' });
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
        regexp = /^[0-9]*$/;
        if (!regexp.test(phoneNumber)) {
            return res.status(400).json({ message: 'Phone number must contain only numbers' });
        }
        const phoneNumberExist = await User.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExist) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const newUser = new User({
            name,
            email: newEmail,
            phoneNumber,
            password,
            status
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

// === Login User ===
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Both email and password are required' });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user: { id, name } });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: "Login failed. Please try again later." });
    }   
}

// === My profile ===
const userProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get user" });
    }
}

// === Update information ===
const updateProfile = async (req, res, next) => {
    try {
        const { name, email, phoneNumber } = req.body;
        if (!name || !email || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const emailExist = await User.findOne({ email });
        if (emailExist && emailExist.id !== req.user.id) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const phoneNumberExist = await User.findOne({ phoneNumber });
        if (phoneNumberExist && phoneNumberExist.id !== req.user.id) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { name, email, phoneNumber }, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update failed" });
    }
}

//=== Get all Restaurants ===
const allRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get restaurants" });
    }
}


// === Get all Menus ===
const allMenus = async (req, res, next) => {
    try {
        const menus = await Menu.find();
        if (menus.length === 0) {
            return res.status(404).json({ message: "No menus available" });
        }
        res.status(200).json(menus);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get menus" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    allRestaurants,
    allMenus
}
