import express from 'express';
const router = express.Router();
import { authUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/signup', registerUser);
router.post('/login', authUser);
router.route('/profile').put(protect, updateUserProfile);

export default router;
