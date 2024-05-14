import  { useState, useEffect } from 'react';
import AddStreamForm from '../components/AddStreamForm';
import StreamsTable from '../components/StreamsTable';
import axios from 'axios';

function StreamsPage() {
    const [streams, setStreams] = useState([]);

    // Function to fetch existing streams from the backend
    const fetchStreams = async () => {
        try {
            const response = await axios.get('https://university-dashboard-f6fd.onrender.com/user/streams');
            setStreams(response.data);
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    };

    // Fetch streams on component mount
    useEffect(() => {
        fetchStreams();
    }, []);

    const addStream = async (newStream) => {
        try {
            await axios.post('https://university-dashboard-f6fd.onrender.com/user/streams/add', newStream);
            fetchStreams(); // Refresh streams after adding
        } catch (error) {
            console.error('Error adding stream:', error);
        }
    };

    // Function to delete a stream
    const deleteStream = async (streamId) => {
        try {
            await axios.delete(`https://university-dashboard-f6fd.onrender.com/user/streams/delete/${streamId}`);
            fetchStreams(); // Refresh streams after deleting
        } catch (error) {
            console.error('Error deleting stream:', error);
        }
    };

    return (
        <div className="container h-screen mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Streams Management</h1>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Add New Stream</h2>
                <AddStreamForm addStream={addStream} />
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Existing Streams</h2>
                <StreamsTable streams={streams} deleteStream={deleteStream} />
            </div>
        </div>
    );
}

export default StreamsPage;
