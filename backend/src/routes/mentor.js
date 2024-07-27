<<<<<<< HEAD
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const mentorrouter = express.Router();
const JWT_SECRET = "jwtPassword";



// Get student details endpoint
mentorrouter.get("/getstudentdetails", async (req, res) => {
    const { student_id } = req.body;

    try {
        const studentfound = await prisma.student.findUnique({
            where: { student_id },
            include: {
                college: true,
                mentor: true,
                attendance: true,
                tests: true,
                test_score: true,
                feedback: true,
                lecture_feedback: true
            }
        });

        if (!studentfound) {
            return res.status(404).json({ msg: "Student not found" });
        }

        res.json(studentfound);
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Get vulnerable students endpoint
mentorrouter.post("/getvulnerablestudents", async (req, res) => {
    const { student_id } = req.body;

    try {
        const attendances = await prisma.attendance.findMany({
            where: { student_id }
        });

        if (!attendances || attendances.length === 0) {
            return res.status(404).json({ msg: "No attendance records found for the student" });
        }

        const totalClasses = attendances.length;
        const presentCount = attendances.filter(att => att.ispresent).length;
        const averageAttendance = presentCount / totalClasses;
        const isVulnerable = averageAttendance < 0.75;

        res.json({ student_id, averageAttendance, isVulnerable });
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Drop student endpoint
mentorrouter.post("/dropstudent", async (req, res) => {
    const { student_id, is_dropped } = req.body;

    try {
        const foundStudent = await prisma.student.findUnique({
            where: { student_id }
        });

        if (!foundStudent) {
            return res.status(404).json({ msg: "Student not found" });
        }

        const updatedStudent = await prisma.student.update({
            where: { student_id },
            data: { is_dropped }
        });

        res.json({ msg: "Student drop status updated", student: updatedStudent });
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

module.exports = mentorrouter;
=======
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



>>>>>>> 62d0586e63b590723505ab0b25cab20f63d62013
