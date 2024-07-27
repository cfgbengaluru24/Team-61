import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; 

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password,  } = req.body;

    try {
        const existingStudent = await prisma.student.findUnique({
            where: { email: email },
        });

        if (existingStudent) {
            return res.status(400).json({ error: 'Student already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await prisma.student.create({
            data: {
                name: name,
                email: email,
                passwordHash: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the student by email
        const student = await prisma.student.findUnique({
            where: { email: email },
        });

        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, student.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: student.id, email: student.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;



