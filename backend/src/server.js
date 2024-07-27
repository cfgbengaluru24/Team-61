// app.js

import express from 'express';
import bodyParser from 'body-parser';
import studentAuthRoutes from './routes/student.js'; // Import student auth routes

const app = express();

app.use(express.json()); // Parse JSON bodies

// Use authentication and student routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentAuthRoutes); // Use student auth routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

