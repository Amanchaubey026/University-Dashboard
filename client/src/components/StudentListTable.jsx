/* eslint-disable react/prop-types */


function StudentListTable({ students }) {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    {/* Add more columns as needed */}
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student._id}>
                        <td className="border border-gray-300 px-4 py-2">{student._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                        {/* Add more columns as needed */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentListTable;
