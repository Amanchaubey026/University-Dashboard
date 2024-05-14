/* eslint-disable react/prop-types */

function StreamsTable({ streams, deleteStream }) {
    if (!Array.isArray(streams)) {
        // If streams is not an array, return null or display an error message
        return null;
    }

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {streams.map((stream) => (
                    <tr key={stream._id}>
                        <td className="border border-gray-300 px-4 py-2">{stream._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{stream.name}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                                onClick={() => deleteStream(stream._id)}
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

export default StreamsTable;

