const { Router } = require('express');
const { registerUser, loginUser, userProfile, updateProfile , allRestaurants , allMenus} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/mon-compte',  authMiddleware ,userProfile);
router.patch('/edit-user', authMiddleware, updateProfile);
router.get('/all-restaurants', authMiddleware, allRestaurants);
router.get('/all-menus', authMiddleware, allMenus);


module.exports = router;
