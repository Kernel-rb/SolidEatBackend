const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');






// === Restaurant Registration ===
// Path: /api/restaurateur/register
const registerRestaurant = async (req, res, next) => {
    try {
        const { name, address, openingDays, openingHours, email, confirmEmail, password, confirmPassword, phoneNumber } = req.body;
        if (!name || !address || !openingDays || !openingHours || !email || !confirmEmail || !password || !confirmPassword || !phoneNumber) {
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
        if (email !== confirmEmail) {
            return res.status(400).json({ message: 'Emails do not match' });
        }
        const newEmail = email.toLowerCase();
        const emailExist = await Restaurant.findOne({ email: newEmail });
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
        const phoneNumberExist = await Restaurant.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExist) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        const newRestaurant = new Restaurant({
            name,
            address,
            openingDays,
            openingHours,
            email: newEmail,
            phonenumber: phoneNumber,
            password
        });

        await newRestaurant.save();

        // Send a success response
        res.status(201).json({ message: 'Restaurant registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

// === Restaurant Login ===
// Path: /api/restaurateur/login
const loginRestaurant = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const restaurant = await Restaurant.findOne({ email: email });
        if (!restaurant) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await restaurant.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { _id: id, name } = restaurant;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, restaurant: { id, name } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login failed" });
    }
}

// === Restaurant Profile ===
// Path: /api/restaurateur/profile
const restaurantProfile = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.user.id });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({
            name: restaurant.name,
            email: restaurant.email,
            phonenumber: restaurant.phonenumber,
            address: restaurant.address,
            openingHours: restaurant.openingHours,
            openingDays: restaurant.openingDays
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Profile failed" });
    }
}

// === Update Restaurant Information ===
// Path: /api/restaurateur/update
const updateRestaurant = async (req, res, next) => {
    try {
        const { name, address, openingDays, openingHours, email, phoneNumber } = req.body;
        if (!name || !address || !openingDays || !openingHours || !email || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const restaurant = await Restaurant.findOne({ _id: req.user.id });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const nameExist = await Restaurant.findOne({ name: name });
        if (nameExist && nameExist._id.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Name already exists' });
        }

        const emailExist = await Restaurant.findOne({ email: email });
        if (emailExist && emailExist._id.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const phoneNumberExist = await Restaurant.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExist && phoneNumberExist._id.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: req.user.id },
            { name, address, openingDays, openingHours, email, phoneNumber },
            { new: true }
        );

        res.status(200).json({ message: 'Update successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update failed" });
    }
}

// === My Menu ===
// Path: /api/restaurateur/menu
const myMenu = async (req, res, next) => {
    try {
        const restaurantId = req.user.id;
        const menuItems = await Menu.find({ restaurant: restaurantId });
        if (menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found' });
        }
        res.status(200).json({ menuItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch menu" });
    }
}
// === Add Menu Item ===
// Path: /api/restaurateur/menu/add
const addMenuItem = async (req, res, next) => {
    try {
        const { titre, prix, ingredients, categorie } = req.body;

        // Check if all required fields are present
        if (!titre || !prix || !ingredients || !categorie) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if image file is present
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'Image file is missing' });
        }

        const { image } = req.files;

        // Check image size
        if (image.size > 2000000) {
            return res.status(400).json({ message: 'Image size must not exceed 2MB' });
        }

        // Generate a new file name to avoid conflicts
        const fileName = image.name;
        const splittedFileName = fileName.split('.');
        const newFileName = splittedFileName[0] + uuidv4() + '.' + splittedFileName[splittedFileName.length - 1];

        // Move the image file to the uploads directory
        image.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if (err) {
                console.error(err); // Log the error for debugging
                return res.status(500).json({ message: 'Failed to upload image' });
            } else {
                // Create a new menu item with the uploaded image
                const newMenu = await Menu.create({
                    titre,
                    image: newFileName,
                    prix,
                    ingredients,
                    categorie,
                    restaurant: req.user.id
                });
                if (!newMenu) {
                    return res.status(500).json({ message: 'Failed to add menu item' });
                }
                res.status(201).json({ message: 'Menu item added successfully' });
            }
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Failed to add menu item" });
    }
}



// === Update Menu Item ===
// Path: /api/restaurateur/menu/update
const updateMenuItem = async (req, res, next) => {
    return res.status(200).json({ message: 'Update menu item' });
}

// === Delete Menu Item ===
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
