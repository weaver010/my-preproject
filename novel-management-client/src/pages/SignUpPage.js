import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/register', { username, email, password });
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Sign up failed', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;

