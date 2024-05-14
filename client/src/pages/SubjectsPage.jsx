import  { useState, useEffect } from 'react';
import AddSubjectForm from '../components/AddSubjectForm';
import SubjectsTable from '../components/StreamsTable';
import axios from 'axios';

function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);

    // Function to fetch existing subjects from the backend
    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    // Fetch subjects on component mount
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Function to add a new subject
    const addSubject = async (newSubject) => {
        try {
            await axios.post('http://localhost:3000/user/subjects/add', newSubject);
            fetchSubjects(); // Refresh subjects after adding
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    // Function to delete a subject
    const deleteSubject = async (subjectId) => {
        try {
            await axios.delete(`http://localhost:3000/user/subjects/delete/${subjectId}`);
            fetchSubjects(); // Refresh subjects after deleting
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <div className="container h-screen mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Subjects Management</h1>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Add New Subject</h2>
                <AddSubjectForm addSubject={addSubject} />
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Existing Subjects</h2>
                <SubjectsTable subjects={subjects} deleteSubject={deleteSubject} />
            </div>
        </div>
    );
}

export default SubjectsPage;
