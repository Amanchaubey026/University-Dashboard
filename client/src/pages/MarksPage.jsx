// MarksPage.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import AddMarksForm from '../components/AddMarksForm';
import MarksTable from '../components/MarksTable';

function MarksPage() {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async () => {
        try {
            const response = await axios.get('/http://localhost:3000/user/marks');
            setMarks(response.data);
        } catch (error) {
            console.error('Error fetching marks:', error);
        }
    };

    const addMarks = async (newMark) => {
        try {
            await axios.post('http://localhost:3000/user/marks/add', newMark);
            fetchMarks();
        } catch (error) {
            console.error('Error adding marks:', error);
        }
    };

    const deleteMarks = async (markId) => {
        try {
            await axios.delete(`http://localhost:3000/user/marks/delete/${markId}`);
            fetchMarks();
        } catch (error) {
            console.error('Error deleting marks:', error);
        }
    };

    return (
        <div className='h-screen'>
            <h2 className="text-2xl font-bold mb-4 ">Marks Management</h2>
            <AddMarksForm addMarks={addMarks} />
            {Array.isArray(marks) && marks.length > 0 ? (
                <MarksTable marks={marks} deleteMarks={deleteMarks} />
            ) : (
                <p>No marks found.</p>
            )}
        </div>
    );
}

export default MarksPage;
