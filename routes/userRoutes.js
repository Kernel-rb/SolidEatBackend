const { Router } = require('express');
const { registerUser, loginUser, userProfile, updateProfile, getMeals, getOffrir, reserverMeal, getRestaurent } = require('../controllers/userController');


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/repas/reserver', reserverMeal);
router.get('/mon-compte', userProfile);
router.get('/repas/commander', getMeals);
router.get('/repas/offrir', getOffrir);
router.get('/restaurent-proximite', getRestaurent);
router.patch('/edit-user', updateProfile);

module.exports = router;
