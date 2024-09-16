import express from 'express';
import { register, getUser, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);  // Register route
router.get('/user', authMiddleware, getUser);  // Get user route
router.post('/logout', authMiddleware, logout);  // Logout route

export default router;
