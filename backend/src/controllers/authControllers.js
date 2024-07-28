import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js'; // Import the utility function

const prisma = new PrismaClient();

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT with role information
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


//stsudentSignup Controller
export const studentSignup = async (req, res) => {
  const { email, password, name, reg_no, phone_number, college_name, role = 'student' } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { student_email: email },
    });

    if (existingStudent) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Fetch college ID
    const college = await prisma.college.findUnique({
      where: { college_name },
    });

    if (!college) {
      return res.status(400).json({ message: 'College not found' });
    }

    const clg_id = college.college_id;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use a transaction to create both the student and user records
    const [newStudent, newUser] = await prisma.$transaction([
      prisma.student.create({
        data: {
          student_email: email,
          name,
          reg_no,
          phone_number,
          enrolled: true,
          is_dropped: false,
          clg_id,
        },
      }),
      prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      }),
    ]);

    // Generate JWT with role information
    const token = generateToken({
      user_id: newUser.user_id,
      role: newUser.role,
      email: newUser.email,
    });

    res.status(201).json({ message: 'Signup successful', token, student: newStudent });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
