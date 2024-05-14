import  { useState, useEffect } from 'react';
import axios from 'axios';

function MyPerformancePage() {
    const [performance, setPerformance] = useState([]); // Initialize performance state as an empty array

    useEffect(() => {
        fetchPerformance();
    }, []);

    const fetchPerformance = async () => {
        try {
            const response = await axios.get('/api/performance'); // Assuming the endpoint to fetch performance data is '/api/performance'
            setPerformance(response.data);
        } catch (error) {
            console.error('Error fetching performance:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Performance</h2>
            {Array.isArray(performance) && performance.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                            {/* Add more columns if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {performance.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.subjectName}</td>
                                <td>{subject.marks}</td>
                                {/* Add more cells for additional data */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No performance data available.</p> 
            )}
        </div>
    );
}

export default MyPerformancePage;
