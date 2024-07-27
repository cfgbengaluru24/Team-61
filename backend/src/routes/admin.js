// routes/admin.js
import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { addRelation, deleteRelation, getRelation, getStudentDetails, getMentorDetails, getVulnerableStudents } from '../controllers/adminControllers';

const adminRouter = express.Router();

// Add mentor-student relation endpoint
adminRouter.post('/addrelation', authenticate, authorize(['admin']), addRelation);

// Delete mentor-student relation endpoint
adminRouter.post('/deleterelation', authenticate, authorize(['admin']), deleteRelation);

// Get mentor-student relation endpoint
adminRouter.get('/getrelation', authenticate, authorize(['admin']), getRelation);

// Get student details endpoint
adminRouter.get('/getstudentdetails', authenticate, authorize(['admin']), getStudentDetails);

// Get mentor details endpoint
adminRouter.get('/getmentordetails', authenticate, authorize(['admin']), getMentorDetails);

// Get vulnerable students endpoint
adminRouter.post('/getvulnerablestudents', authenticate, authorize(['admin']), getVulnerableStudents);

export default adminRouter;

