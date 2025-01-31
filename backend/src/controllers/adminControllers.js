// controllers/adminControllers.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add mentor-student relation
export const addRelation = async (req, res) => {
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
};

// Delete mentor-student relation
export const deleteRelation = async (req, res) => {
    const { student_email } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { student_email }
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
};

// Get mentor-student relation
export const getRelation = async (req, res) => {
    const { student_email } = req.body;

    try {
        const student = await prisma.student.findUnique({
            where: { student_email },
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
};

// Get student details
export const getStudentDetails = async (req, res) => {
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
};

// Get mentor details
export const getMentorDetails = async (req, res) => {
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
};

// Get vulnerable students
export const getVulnerableStudents = async (req, res) => {
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
};

