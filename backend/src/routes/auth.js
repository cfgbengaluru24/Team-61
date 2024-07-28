import express from 'express';
import { login,studentSignup } from '../controllers/authControllers.js'; // Import the login controller

const router = express.Router();

// Route for login
router.post('/login', login);
router.post('/studentSignup', studentSignup);

export default router;

