const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/authMiddleware'); 
const { createAvis, getAvisByRestaurantId } = require('../controllers/avisController');

router.post('/avis', middlewareAuth, createAvis); 
router.get('/restaurants/:restaurantId/avis', getAvisByRestaurantId); 

module.exports = router;
