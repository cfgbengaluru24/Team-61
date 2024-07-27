import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwtUtils.js'; // Import utility function for JWT verification

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate users based on JWT
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer scheme

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Attach user information to request object
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error });
  }
};

// Middleware to check user roles
export const authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next(); // Proceed to next middleware or route handler
};

