import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add lecture feedback
export const addLectureFeedback = async (req, res) => {
  const { student_id } = req.params;
  const { feedback, lecture_id } = req.body;
  try {
    const newLectureFeedback = await prisma.lectureFeedback.create({
      data: {
        feedback,
        lecture_id,
        student_id,
      },
    });
    res.status(201).json(newLectureFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all lecture feedback for a student
export const getAllLectureFeedback = async (req, res) => {
  const { student_id } = req.params;
  try {
    const lectureFeedbacks = await prisma.lectureFeedback.findMany({
      where: {
        student_id,
      },
    });
    res.status(200).json(lectureFeedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get test scores for a student
export const getTestScores = async (req, res) => {
  const { student_id } = req.params;
  try {
    const testScores = await prisma.testScore.findMany({
      where: {
        student_id,
      },
    });
    res.status(200).json(testScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all test scores for a student
export const getAllTestScores = async (req, res) => {
  const { student_id } = req.params;
  try {
    const testScores = await prisma.testScore.findMany({
      where: {
        student_id,
      },
      orderBy: {
        test_date: 'desc', // Or any other sorting you need
      },
    });
    res.status(200).json(testScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add feedback for a student
export const addFeedback = async (req, res) => {
  const { student_id } = req.params;
  const { reason, attendance_id } = req.body;
  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        reason,
        student_id,
        attendance_id,
      },
    });
    res.status(200).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all feedback for a student
export const getAllFeedback = async (req, res) => {
  const { student_id } = req.params;
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        student_id,
      },
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

