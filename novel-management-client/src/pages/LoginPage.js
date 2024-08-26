import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the token
            setIsAuthenticated(true); // Set the user as authenticated
            navigate('/profile'); // Redirect to profile page after login
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

