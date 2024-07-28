import express from 'express';
import { login } from '../controllers/authControllers.js'; // Import the login controller

const router = express.Router();

// Route for login
router.post('/login', login);

export default router;

