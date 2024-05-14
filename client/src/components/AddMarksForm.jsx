/* eslint-disable react/prop-types */
import  { useState } from 'react';

function AddMarksForm({ addMarks }) {
    const [formData, setFormData] = useState({
        studentId: '',
        streamId: '',
        subjectId: '',
        marks: '',
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addMarks(formData);
        // Reset form after submission
        setFormData({
            studentId: '',
            streamId: '',
            subjectId: '',
            marks: '',
        });
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
                type="text"
                placeholder="Stream ID"
                name="streamId"
                value={formData.streamId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
                type="text"
                placeholder="Subject ID"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
                type="text"
                placeholder="Marks"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
                Add Marks
            </button>
        </form>
    );
}

export default AddMarksForm;
