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
const upload = require('../middleware/uploadMiddleware');
const router = Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);
router.get('/profile', authMiddleware, restaurantProfile);
router.patch('/update', authMiddleware, updateRestaurant);
router.get('/menu', authMiddleware, myMenu);
router.post('/menu/add', upload.single('image'), addMenuItem);
router.patch('/menu/update/:id', authMiddleware, updateMenuItem);
router.delete('/menu/delete/:id', authMiddleware, deleteMenuItem);

module.exports = router;
