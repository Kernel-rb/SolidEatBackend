const { Router } = require('express');
const { registerUser, loginUser, userProfile, updateProfile} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/mon-compte',  authMiddleware ,userProfile);
router.patch('/edit-user',  authMiddleware ,  updateProfile);


module.exports = router;
