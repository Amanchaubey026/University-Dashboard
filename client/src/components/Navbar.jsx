import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken); 
            const response = await axios.post(
                'https://university-dashboard-f6fd.onrender.com/user/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log('Logout Response:', response); 
            localStorage.removeItem('accessToken');
            localStorage.removeItem('role');
            navigate('/auth');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    
    console.log(role); 

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">University Dashboard</Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <ul className={`md:flex ${isOpen ? "block" : "hidden"}`}>
                    {isLoggedIn && role === 'student' && (
                        <li>
                            <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
                        </li>
                    )}
                    {role === 'admin' && isLoggedIn && (
                        <>
                            <li className="mr-4">
                                <Link to="/streams" className="text-white hover:text-gray-200">STREAMS</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/subjects" className="text-white hover:text-gray-200">SUBJECTS</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/marks" className="text-white hover:text-gray-200">MARKS</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/student-list" className="text-white hover:text-gray-200">STUDENT LIST</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
