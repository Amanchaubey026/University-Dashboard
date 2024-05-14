import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                    <li className="mr-4">
                        <Link to="/streams" className="text-white hover:text-gray-200">Streams</Link>
                    </li>
                    <li className="mr-4">
                        <Link to="/subjects" className="text-white hover:text-gray-200">Subjects</Link>
                    </li>
                    <li className="mr-4">
                        <Link to="/marks" className="text-white hover:text-gray-200">Marks</Link>
                    </li>
                    <li>
                        <Link to="/student-list" className="text-white hover:text-gray-200">Student List</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
