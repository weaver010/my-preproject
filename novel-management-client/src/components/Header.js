import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`); // Redirect to the search results page
    };

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-2xl font-bold">Novel Management</a>
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 rounded-l bg-gray-800 text-white"
                        placeholder="Search for novels..."
                    />
                    <button type="submit" className="p-2 bg-blue-500 rounded-r">
                        Search
                    </button>
                </form>
                <nav className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <a href="/profile">Profile</a>
                            <button onClick={handleLogout} className="text-red-500">Logout</button>
                        </>
                    ) : (
                        <>
                            <FaUser size={20} />
                            <div className="relative">
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20">
                                    <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-400">Login</a>
                                    <a href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-400">Sign Up</a>
                                </div>
                            </div>
                        </>
                    )}
                </nav>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-4 p-2 bg-gray-800 rounded-full text-white"
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </header>
    );
};

export default Header;

