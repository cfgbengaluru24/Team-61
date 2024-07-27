import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './MentorPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const MentorPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get('https://api.example.com/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid mentor-dash">
                    <div className="navbar-brand mentordetails">
                        <span className="mentor-name">John Doe</span>
                        <span className="mentor-id">ID: M12345</span>
                        <span className="mentor-role">Role: Batch-1 Mentor</span>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex ms-auto" role="search">
                            <button className="btn btn-outline-success" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1>Student Data</h1>
                <StudentTable students={students} />
                <StudentCharts students={students} />
            </div>
        </div>
    );
};

const StudentTable = ({ students }) => (
    <div className="student-table">
        <h2>Student List</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.id}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const StudentCharts = ({ students }) => {
    const gradesData = {
        labels: ['Test1', 'Test2', 'Test3', 'Test4'],
        datasets: students.map(student => ({
            label: student.name,
            data: student.grades,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        })),
    };

    const attendanceData = {
        labels: ['Classes Attended', 'Classes Absent'],
        datasets: students.map(student => ({
            label: student.name,
            data: [student.attendance.attended, student.attendance.total - student.attendance.attended],
            backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        })),
    };

    return (
        <div className="student-charts">
            <h2>Grades</h2>
            <Line data={gradesData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Student Grades' } } }} />
            <h2>Attendance</h2>
            <Pie data={attendanceData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Student Attendance' } } }} />
        </div>
    );
};

export default MentorPage;
