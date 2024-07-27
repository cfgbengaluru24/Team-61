import React from 'react';
import './MentorPage.css';

const MentorPage = () => {
    // Example mentor details
    const mentor = {
        name: 'John Doe',
        id: 'M12345',
        role: 'Batch-1 Mentor'
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
                        <form className="d-flex ml-auto" role="search">
                            <button className="btn btn-outline-success" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1>Welcome, {mentor.name}</h1>
                <p>Here you can manage your tasks and view your mentees.</p>
            </div>
        </div>
    );
}

export default MentorPage;
