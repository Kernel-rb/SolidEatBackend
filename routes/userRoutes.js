const { Router } = require('express');
const { registerUser, loginUser, userProfile, updateProfile, allRestaurants, allMenus, viewOrders, placeOrder, getMenu, getRestaurant, searchRestaurants } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/mon-compte', authMiddleware, userProfile);
router.patch('/edit-user', authMiddleware, updateProfile);
router.get('/all-restaurants', authMiddleware, allRestaurants);
router.get('/all-menus', authMiddleware, allMenus);
router.get('/orders', authMiddleware, viewOrders);
router.post('/place-order', authMiddleware, placeOrder);
router.get('/menu/:id', authMiddleware, getMenu);
router.get('/restaurant/:id', authMiddleware, getRestaurant);
router.get('/search-restaurants', authMiddleware, searchRestaurants);


module.exports = router;
