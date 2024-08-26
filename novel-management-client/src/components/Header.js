import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
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
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
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

