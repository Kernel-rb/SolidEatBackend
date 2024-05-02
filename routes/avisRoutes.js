const express = require('express'); // express
const router = express.Router(); // 
const middlewareAuth = require('../middleware/authMiddleware');
const { creerAvis, obtenirAvisRestaurant } = require('../controllers/avisController');

router.post('/', middlewareAuth, creerAvis);
router.get('/restaurants/:restaurantId/avis', obtenirAvisRestaurant);

module.exports = router;
