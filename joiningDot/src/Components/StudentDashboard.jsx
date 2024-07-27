import React from 'react';
import './StudentDashboard.css';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StudentDashboard = () => {
    const totalClasses = 40; // Example total classes till date
    const attendedClasses = 35; // Example attended classes
    const absentClasses = totalClasses - attendedClasses;

    const lineChartData = {
        labels: ['Test1', 'Test2', 'Test3', 'Test4'],
        datasets: [
            {
                label: 'Score',
                data: [90, 85, 95, 80],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Subject Scores',
            },
        },
    };

    const pieChartData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: [87.5, 12.5], // Example data: 87.5% present, 12.5% absent
                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Attendance',
            },
        },
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">UserName</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-success" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container-fluid attendance">
                <h2>Grades</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Test1</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Test2</td>
                            <td>B</td>
                        </tr>
                        <tr>
                            <td>Test3</td>
                            <td>A+</td>
                        </tr>
                        <tr>
                            <td>Test4</td>
                            <td>B-</td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td>Cumulative</td>
                            <td>B+</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="chart-container">
                <div className="chart">
                    <h2>Subject Scores</h2>
                    <Line data={lineChartData} options={lineChartOptions}/>
                </div>

                <div className="pie-chart">
                    <h2>Attendance</h2>
                    <Pie data={pieChartData} options={pieChartOptions} />
                    <div className="attendance-details">
                        <p>Total Classes: {totalClasses}</p>
                        <p>Classes Attended: {attendedClasses}</p>
                        <p>Classes Absent: {absentClasses}</p>
                    </div>  
                </div>
            </div>

            <div className='feedback'>
                <p>Submit Feedback</p>
                <button type="button" className="btn btn-success">Submit Feedback</button>
            </div>
        </div>
    );
}

export default StudentDashboard;
