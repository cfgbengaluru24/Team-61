import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js'; // Import authentication and authorization middleware
import {
  getTestScores,
  getAllTestScores,
  addLectureFeedback,
  getAllLectureFeedback,
  addFeedback,
  getAllFeedback,
} from '../controllers/studentController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Apply authorization middleware for student routes
router.use(authorize(['student'])); // Only students can access these routes

// Route to get test scores
router.get('/:student_id/test-scores', getTestScores);

// Route to get all test scores
router.get('/:student_id/all-test-scores', getAllTestScores);

// Route to add lecture feedback
router.post('/:student_id/lectures/feedback', addLectureFeedback);

// Route to get all lecture feedback for a student
router.get('/:student_id/lectures/feedback', getAllLectureFeedback);

// Route to add feedback
router.post('/:student_id/feedback', addFeedback);

// Route to get all feedback for a student
router.get('/:student_id/feedback', getAllFeedback);

export default router;

