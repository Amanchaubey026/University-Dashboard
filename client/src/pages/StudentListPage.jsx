// StudentListPage.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import StudentListTable from '../components/StudentListTable';

function StudentListPage() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/studentList');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    return (
        <div className="p-4 h-screen">
            <h2 className="text-2xl font-bold mb-4">Student List</h2>
            {Array.isArray(students) && students.length > 0 ? (
                <StudentListTable students={students} />
            ) : (
                <p>No students found.</p>
            )}
        </div>
    );
}

export default StudentListPage;
