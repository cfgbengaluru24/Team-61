// routes/mentor.js
import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { getStudentDetails, getVulnerableStudents, dropStudent } from '../controllers/mentorControllers';

const mentorRouter = express.Router();

// Get student details endpoint
mentorRouter.get('/getstudentdetails', authenticate, authorize(['mentor']), getStudentDetails);

// Get vulnerable students endpoint
mentorRouter.post('/getvulnerablestudents', authenticate, authorize(['mentor']), getVulnerableStudents);

// Drop student endpoint
mentorRouter.post('/dropstudent', authenticate, authorize(['mentor']), dropStudent);

export default mentorRouter;

