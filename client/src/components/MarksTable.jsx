/* eslint-disable react/prop-types */
// import React from 'react';

function MarksTable({ marks, deleteMarks }) {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Student ID</th>
                    <th className="border border-gray-300 px-4 py-2">Stream ID</th>
                    <th className="border border-gray-300 px-4 py-2">Subject ID</th>
                    <th className="border border-gray-300 px-4 py-2">Marks</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {marks.map((mark) => (
                    <tr key={mark._id}>
                        <td className="border border-gray-300 px-4 py-2">{mark.studentId}</td>
                        <td className="border border-gray-300 px-4 py-2">{mark.streamId}</td>
                        <td className="border border-gray-300 px-4 py-2">{mark.subjectId}</td>
                        <td className="border border-gray-300 px-4 py-2">{mark.marks}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                                onClick={() => deleteMarks(mark._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MarksTable;
