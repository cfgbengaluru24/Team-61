import React, { useState, useEffect } from 'react';
import './MentorStudentMapping.css'; // Optional: For styling

const MentorStudentMapping = () => {
    const [mappings, setMappings] = useState([]);
    const [mentorId, setMentorId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [editMapping, setEditMapping] = useState(null);

    useEffect(() => {
        // Load existing mappings
        fetchMappings();
    }, []);

    const fetchMappings = async () => {
        // Fetch mappings from an API or data source
        // Example:
        // const response = await fetch('/api/mappings');
        // const data = await response.json();
        // setMappings(data);
        setMappings([
            { id: 1, mentorId: 'M1', studentId: 'S1' },
            { id: 2, mentorId: 'M2', studentId: 'S2' },
        ]); // Mock data
    };

    const getNextId = () => {
        // Determine the next ID based on existing data
        return mappings.length > 0 ? Math.max(...mappings.map(mapping => mapping.id)) + 1 : 1;
    };

    const handleCreate = async () => {
        // Create a new mapping
        const newMapping = { mentorId, studentId, id: getNextId() };
        // Send POST request to create mapping
        // await fetch('/api/mappings', {
        //     method: 'POST',
        //     body: JSON.stringify(newMapping),
        // });
        setMappings([...mappings, newMapping]);
        setMentorId('');
        setStudentId('');
    };

    const handleUpdate = async () => {
        if (editMapping) {
            // Update existing mapping
            const updatedMapping = { ...editMapping, mentorId, studentId };
            // Send PUT request to update mapping
            // await fetch(`/api/mappings/${editMapping.id}`, {
            //     method: 'PUT',
            //     body: JSON.stringify(updatedMapping),
            // });
            setMappings(mappings.map(mapping => (mapping.id === editMapping.id ? updatedMapping : mapping)));
            setEditMapping(null);
            setMentorId('');
            setStudentId('');
        }
    };

    const handleDelete = async (id) => {
        // Delete mapping
        // await fetch(`/api/mappings/${id}`, {
        //     method: 'DELETE',
        // });
        setMappings(mappings.filter(mapping => mapping.id !== id));
    };

    const handleEdit = (mapping) => {
        setMentorId(mapping.mentorId);
        setStudentId(mapping.studentId);
        setEditMapping(mapping);
    };

    return (
        <div className="mentor-student-mapping">
            <h2>Mentor-Student Mapping</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editMapping ? handleUpdate() : handleCreate();
                }}
            >
                <div>
                    <label>Mentor ID:</label>
                    <input
                        type="text"
                        value={mentorId}
                        onChange={(e) => setMentorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Student ID:</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editMapping ? 'Update Mapping' : 'Create Mapping'}
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mentor ID</th>
                        <th>Student ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mappings.map(mapping => (
                        <tr key={mapping.id}>
                            <td>{mapping.id}</td>
                            <td>{mapping.mentorId}</td>
                            <td>{mapping.studentId}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(mapping)}
                                    className="btn btn-warning"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(mapping.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Placeholder for Student Details Section */}
            <div className="mentor-student-mapping">
                <h3>Student Details</h3>
                {/* Content for student details will be added later */}
            </div>
        </div>
    );
};

export default MentorStudentMapping;
