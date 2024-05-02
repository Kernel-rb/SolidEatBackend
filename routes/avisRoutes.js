const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/authMiddleware');
const { creerAvis, obtenirAvisRestaurant } = require('../controllers/avisController');

// Utilisez la fonction creerAvis comme callback pour POST /avis
router.post('/', middlewareAuth, creerAvis);

// Utilisez la fonction obtenirAvisRestaurant comme callback pour GET /restaurants/:restaurantId/avis
router.get('/restaurants/:restaurantId/avis', obtenirAvisRestaurant);

module.exports = router;
