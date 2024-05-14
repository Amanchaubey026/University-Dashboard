import  { useState, useEffect } from 'react';
import axios from 'axios';

function MyProfilePage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('/api/profile'); // Assuming the endpoint to fetch profile data is '/api/profile'
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            {profile ? (
                <div>
                    <p><strong>Name:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {/* Add other profile details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MyProfilePage;
