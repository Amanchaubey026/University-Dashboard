import  { useState, useEffect } from 'react';
import axios from 'axios';

function MyPerformancePage() {
    const [performance, setPerformance] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            // Handle case where access token is not available
            console.error('Access token not found in local storage.');
            return;
        }

        fetchPerformance();
    }, [accessToken]); // Fetch performance whenever the access token changes

    const fetchPerformance = async () => {
        try {
            const response = await axios.get('https://university-dashboard-f6fd.onrender.com/user/myperformance', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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
