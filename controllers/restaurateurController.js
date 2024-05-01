const Restaurant = require('../models/Restaurant');
const jwt = require('jsonwebtoken');


// === Restaurant Registration ===
// Path: /api/restaurateur/register

const registerRestaurant = async (req, res, next) => {
    return res.status(200).json({ message: 'Restaurant registration' });
}

// === Restaurant Login ===
// Path: /api/restaurateur/login

const loginRestaurant = async (req, res, next) => {
    return res.status(200).json({ message: 'Restaurant login' });
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

