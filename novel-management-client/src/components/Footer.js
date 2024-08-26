import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>© 2024 Novel Management. All rights reserved.</p>
                <nav className="mt-4">
                    <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
                    <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
                    <a href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

