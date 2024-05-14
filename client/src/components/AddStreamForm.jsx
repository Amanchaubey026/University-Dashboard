/* eslint-disable react/prop-types */
import  { useState } from 'react';

function AddStreamForm({ addStream }) {
    const [streamName, setStreamName] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (streamName.trim() !== '') {
            addStream({ name: streamName });
            setStreamName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Enter stream name"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
                Add Stream
            </button>
        </form>
    );
}

export default AddStreamForm;
