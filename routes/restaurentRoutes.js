const { Router } = require('express');
const {
    registerRestaurant,
    loginRestaurant,
    restaurantProfile,
    updateRestaurant,
    myMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/restaurateurController');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);
router.get('/profile', authMiddleware, restaurantProfile);
router.patch('/update', authMiddleware, updateRestaurant);
router.get('/menu', authMiddleware, myMenu);
router.post('/menu/add', authMiddleware, addMenuItem);
router.patch('/menu/update', authMiddleware, updateMenuItem);
router.delete('/menu/delete', authMiddleware, deleteMenuItem); 

module.exports = router;
