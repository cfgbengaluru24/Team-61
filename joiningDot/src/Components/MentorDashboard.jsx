import React, { useState, useEffect } from 'react';
import './MentorPage.css';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MentorDashboard = () => {
    const mentor = {
        name: 'John Doe',
        id: 'M12345',
        role: 'Batch-1 Mentor'
    };

    const [students, setStudents] = useState([
        {
          "id": "S001",
          "name": "Alice Johnson",
          "attendance": {
            "totalClasses": 30,
            "classesAttended": 28
          },
          "grades": {
            "Test1": "A",
            "Test2": "B",
            "Test3": "A+",
            "Test4": "B-"
          }
        },
        {
          "id": "S002",
          "name": "Bob Smith",
          "attendance": {
            "totalClasses": 30,
            "classesAttended": 22
          },
          "grades": {
            "Test1": "B",
            "Test2": "C",
            "Test3": "B+",
            "Test4": "C+"
          }
        },
        {
          "id": "S003",
          "name": "Carol White",
          "attendance": {
            "totalClasses": 30,
            "classesAttended": 25
          },
          "grades": {
            "Test1": "A-",
            "Test2": "B+",
            "Test3": "A",
            "Test4": "A"
          }
        },
        {
          "id": "S004",
          "name": "David Brown",
          "attendance": {
            "totalClasses": 30,
            "classesAttended": 2
          },
          "grades": {
            "Test1": "A",
            "Test2": "A",
            "Test3": "B+",
            "Test4": "B"
          }
        }
      ]
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Feedback state
    const [feedbacks, setFeedbacks] = useState([]);
    const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
    const [errorFeedbacks, setErrorFeedbacks] = useState(null);

    // Fetch feedbacks
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                // Replace this URL with your API endpoint
                const response = await axios.get('https://api.example.com/feedbacks');
                setFeedbacks(response.data);
            } catch (err) {
                // setErrorFeedbacks('Failed to fetch feedbacks. Using demo data.');
                // Use demo data if fetching fails
                setFeedbacks([
                    { studentName: 'Alice Johnson', feedback: 'Great mentor! Very helpful.' },
                    { studentName: 'Bob Smith', feedback: 'The sessions could be more interactive.' },
                    { studentName: 'Carol White', feedback: 'Excellent guidance and support.' },
                    { studentName: 'David Brown', feedback: 'Needs to improve response time.' }
                ]);
            } finally {
                setLoadingFeedbacks(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const student = students.find(student => student.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setSelectedStudent(student || null);
    };

    const handleStudentClick = (studentName) => {
        setSearchTerm(studentName);
        const student = students.find(student => student.name === studentName);
        setSelectedStudent(student || null);
    };

    const getChartData = (grades) => {
        const labels = Object.keys(grades);
        const data = Object.values(grades).map(grade => {
            switch (grade) {
                case 'A': return 90;
                case 'B': return 80;
                case 'A+': return 95;
                case 'B-': return 70;
                case 'B+': return 85;
                case 'C': return 65;
                case 'C+': return 75;
                default: return 0;
            }
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Grades',
                    data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }
            ],
        };
    };

    const getPieData = (attendance) => {
        const present = attendance.classesAttended;
        const absent = attendance.totalClasses - attendance.classesAttended;

        return {
            labels: ['Present', 'Absent'],
            datasets: [
                {
                    data: [present, absent],
                    backgroundColor: ['#36a2eb', '#ff6384'],
                }
            ],
        };
    };

    const getLowAttendanceStudents = () => {
        return students.filter(student => {
            const percentage = (student.attendance.classesAttended / student.attendance.totalClasses) * 100;
            return percentage < 40;
        });
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid mentor-dash">
                    <div className="navbar-brand mentordetails">
                        <span className="mentor-name">{mentor.name}</span>
                        <span className="mentor-id">ID: {mentor.id}</span>
                        <span className="mentor-role">Role: {mentor.role}</span>
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

            <div className="container mt-3">
                <h2>Search Student</h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                {selectedStudent ? (
                    <div>
                        <div className="chart mt-3">
                            <h2>Grades for {selectedStudent.name}</h2>
                            <Line data={getChartData(selectedStudent.grades)} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Grades Over Tests' } } }} style={{ maxWidth: '100%' }} />
                        </div>
                        <div className="pie-chart mt-3">
                            <h2>Attendance for {selectedStudent.name}</h2>
                            <Pie data={getPieData(selectedStudent.attendance)} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Attendance Distribution' } } }} style={{ height: '250px' }} />
                            <p>Total Classes: {selectedStudent.attendance.totalClasses}</p>
                            <p>Classes Attended: {selectedStudent.attendance.classesAttended}</p>
                            <p>Classes Absent: {selectedStudent.attendance.totalClasses - selectedStudent.attendance.classesAttended}</p>
                        </div>
                    </div>
                ) : (
                    <p>No student found</p>
                )}

                <div className="student-list mt-3">
                    <h2>Students Enrolled</h2>
                    <ul className="list-group">
                        {students.map((student) => (
                            <li key={student.id} className="list-group-item" onClick={() => handleStudentClick(student.name)}>
                                {student.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="feedback-section mt-3">
                    <h2>Student Feedback</h2>
                    {loadingFeedbacks ? (
                        <p>Loading feedbacks...</p>
                    ) : errorFeedbacks ? (
                        <p>{errorFeedbacks}</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback, index) => (
                                    <tr key={index}>
                                        <td>{feedback.studentName}</td>
                                        <td>{feedback.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="low-attendance-section mt-3">
                    <h2>Students with Attendance Below 40%</h2>
                    {getLowAttendanceStudents().length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Total Classes</th>
                                    <th>Classes Attended</th>
                                    <th>Attendance (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getLowAttendanceStudents().map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>{student.attendance.totalClasses}</td>
                                        <td>{student.attendance.classesAttended}</td>
                                        <td>{((student.attendance.classesAttended / student.attendance.totalClasses) * 100).toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No students with attendance below 40%</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MentorDashboard;
