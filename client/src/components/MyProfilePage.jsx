import  { useState, useEffect } from 'react';
import axios from 'axios';

function MyProfilePage() {
    const [profile, setProfile] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            // Handle case where access token is not available
            console.error('Access token not found in local storage.');
            return;
        }

        fetchProfile();
    }, [accessToken]); // Fetch profile whenever the access token changes

    const fetchProfile = async () => {
        try {
            const response = await axios.get('https://university-dashboard-f6fd.onrender.com/user/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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
