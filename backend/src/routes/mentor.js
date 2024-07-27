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
