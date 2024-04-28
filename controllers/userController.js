// UserController.js
const SituationDifficile = require('../models/SituationDifficile');
const Restaurateur = require('../models/Restaurateur');
const Benevole = require('../models/Benevole');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
        const { userType } = req.body;
        switch (userType) {
            case 'En situation difficile':
                return registerSituationDifficile(req, res);
            case 'Restaurateur':
                return registerRestaurateur(req, res);
            case 'Bénévole':
                return registerBenevole(req, res);
            default:
                return res.status(400).json({ message: 'Invalid user type' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user' });
    }
};

const validateUserInput = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

const registerSituationDifficile = async (req, res) => {
    validateUserInput(req, res);
    try {
        const { fullName, email, password, phone, status } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const situationDifficile = new SituationDifficile({ fullName, email, password: hashedPassword, phone, status });
        await situationDifficile.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user' });
    }
};

const registerRestaurateur = async (req, res) => {
    validateUserInput(req, res);
    try {
        const { restaurantName, address, openingHours, email, password, phone } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const restaurateur = new Restaurateur({ restaurantName, address, openingHours, email, password: hashedPassword, phone });
        await restaurateur.save();
        res.status(201).json({ message: 'Restaurateur registered successfully' });
    } catch (error) {
        console.error('Error registering restaurateur:', error);
        res.status(500).json({ message: 'An error occurred while registering restaurateur' });
    }
};

const registerBenevole = async (req, res) => {
    validateUserInput(req, res);
    try {
        const { fullName, email, password, phone } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const benevole = new Benevole({ fullName, email, password: hashedPassword, phone });
        await benevole.save();
        res.status(201).json({ message: 'Benevole registered successfully' });
    } catch (error) {
        console.error('Error registering benevole:', error);
        res.status(500).json({ message: 'An error occurred while registering benevole' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        let user;
        if (email) {
            user = await SituationDifficile.findOne({ email });
            if (!user) {
                user = await Restaurateur.findOne({ email });
            }
            if (!user) {
                user = await Benevole.findOne({ email });
            }
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const { _id: id, fullName, restaurantName, role } = user;
        const token = jwt.sign({ id, fullName, restaurantName, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user: { id, fullName, restaurantName, role } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'An error occurred while logging in user' });
    }
};
