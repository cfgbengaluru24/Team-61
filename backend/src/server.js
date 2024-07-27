import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import studentRouter from './routes/student.js';
import mentorRouter from './routes/mentor.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';

dotenv.config();  // Load environment variables

const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON bodies

// Route integrations
app.use('/students', studentRouter);
app.use('/mentors', mentorRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

