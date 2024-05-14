/* eslint-disable react/prop-types */
import  { useState } from 'react';

function AddSubjectForm({ addSubject }) {
    const [subjectName, setSubjectName] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if subjectName is not empty
        if (subjectName.trim() !== '') {
            addSubject({ name: subjectName });
            // Reset form after submission
            setSubjectName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
                Add Subject
            </button>
        </form>
    );
}

export default AddSubjectForm;
