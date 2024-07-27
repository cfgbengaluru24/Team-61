const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const adminrouter = express.Router();
const JWT_SECRET = "jwtPassword";

// Admin login endpoint
// adminrouter.post('/login', async (req, res) => {
//     const { admin_email, password } = req.body;

//     try {
//         const admin = await prisma.admin.findUnique({
//             where: { admin_email }
//         });

//         if (!admin) {
//             return res.status(401).json({ msg: "Invalid email or password" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ msg: "Invalid email or password" });
//         }

//         const token = jwt.sign({ id: admin.admin_id }, JWT_SECRET);
//         return res.json({ msg: "Login successful", token: token });
//     } catch (e) {
//         res.status(500).json({ msg: "An error occurred", error: e.message });
//     }
// });

// Add mentor-student relation
adminrouter.post("/addrelation", async (req, res) => {
    const { student_email, mentor_email } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { student_email }
        });

        if (!student) {
            return res.status(401).json({ msg: "No student found" });
        }

        const mentor = await prisma.mentor.findUnique({
            where: { mentor_email }
        });

        if (!mentor) {
            return res.status(401).json({ msg: "No mentor found" });
        }

        const addrel = await prisma.student.update({
            where: { student_id: student.student_id },
            data: { mentor_id: mentor.mentor_id }
        });

        res.json({ msg: "Relation added successfully", student: addrel });
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});


// Delete mentor-student relation
adminrouter.post("/deleterelation", async (req, res) => {
    const { student_email } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { student_email: student_email }
        });

        if (!student) {
            return res.status(401).json({ msg: "No student found" });
        }

        const deleteRel = await prisma.student.update({
            where: { student_id: student.student_id },
            data: { mentor_id: null }
        });

        res.json({ msg: "Relation deleted successfully", student: deleteRel });
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Get mentor-student relation
adminrouter.get("/getrelation", async (req, res) => {
    const { student_email } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { student_email: student_email },
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

        if (!student) {
            return res.status(401).json({ msg: "No student found" });
        }

        res.json(student);
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Get student details
adminrouter.get("/getstudentdetails", async (req, res) => {
    const { student_id } = req.body;

    try {
        const student = await prisma.student.findUnique({
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

        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        res.json(student);
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Get mentor details
adminrouter.get("/getmentordetails", async (req, res) => {
    const { mentor_id } = req.body;

    try {
        const mentor = await prisma.mentor.findUnique({
            where: { mentor_id },
            include: {
                students: true
            }
        });

        if (!mentor) {
            return res.status(404).json({ msg: "Mentor not found" });
        }

        res.json(mentor);
    } catch (e) {
        res.status(500).json({ msg: "An error occurred", error: e.message });
    }
});

// Get vulnerable students
adminrouter.post("/getvulnerablestudents", async (req, res) => {
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

module.exports = adminrouter;
