const Restaurant = require('../models/Restaurant');
const jwt = require('jsonwebtoken');


// === Restaurant Registration ===
// Path: /api/restaurateur/register

const registerRestaurant = async (req, res, next) => {
    try {
        const { name, address, openingHours, email, confirmEmail, password, confirmPassword, phoneNumber } = req.body;
        if(!name || !address || !openingHours || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const fullnameRegexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!fullnameRegexp.test(name)) {
            return res.status(400).json({ message: 'Name must contain only letters' });
        }
        const newname = name.trim();
        const nameExist = await Restaurant.findOne({ name: newname });
        if (nameExist) {
            return res.status(400).json({ message: 'Name already exists' });
        }
        if(email !== confirmEmail) {
            return res.status(400).json({ message: 'Emails do not match' });
        }
        const newEmail = email.toLowerCase();
        const emailExist = await Restaurant.findOne({ email: newEmail });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if(password.trim().length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        if(phoneNumber.length !== 10) {
            return res.status(400).json({ message: 'Phone number must be 10 digits long' });
        }
        regexp = /^[0-9]*$/;
        if(!regexp.test(phoneNumber)) {
            return res.status(400).json({ message: 'Phone number must contain only numbers' });
        }
        const phoneNumberExist = await Restaurant.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExist) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        const newRestaurant = new Restaurant({
            name,
            address,
            openingHours,
            email: newEmail,
            phoneNumber,
            password
        });
        await newRestaurant.save();
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

// === Restaurant Login ===
// Path: /api/restaurateur/login

const loginRestaurant = async (req, res, next) => {
    try {
        
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login failed" });
    }
}

// === Restaurant Profile ===
// Path: /api/restaurateur/profile

const restaurantProfile = async (req, res, next) => {
    return res.status(200).json({ message: 'Restaurant profile' });
}

// === Update Restaurant Information ===
// Path: /api/restaurateur/update

const updateRestaurant = async (req, res, next) => {
    return res.status(200).json({ message: 'Update restaurant' });
}


// ===  My menu ===
// Path: /api/restaurateur/menu

const myMenu = async (req, res, next) => {
    return res.status(200).json({ message: 'My menu' });
}

// === Add Menu Item ===
// Path: /api/restaurateur/menu/add

const addMenuItem = async (req, res, next) => {
    return res.status(200).json({ message: 'Add menu item' });
}


// ===  Update Menu Item ===
// Path: /api/restaurateur/menu/update

const updateMenuItem = async (req, res, next) => {
    return res.status(200).json({ message: 'Update menu item' });
}

// ===  Delete Menu Item ===
// Path: /api/restaurateur/menu/delete

const deleteMenuItem = async (req, res, next) => {
    return res.status(200).json({ message: 'Delete menu item' });
}


module.exports = {
    registerRestaurant,
    loginRestaurant,
    restaurantProfile,
    updateRestaurant,
    myMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}