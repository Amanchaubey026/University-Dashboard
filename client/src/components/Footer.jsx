function Footer() {
    return (
        <footer className="bg-blue-500 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p className="white mb-2">Stay Connected</p>
                <div className="flex justify-center mb-4">
                    <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <p className="white">© 2024 University Dashboard. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
