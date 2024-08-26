import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [novels, setNovels] = useState([]);
    const [newNovel, setNewNovel] = useState({ title: '', description: '', category: '' });
    const [coverImage, setCoverImage] = useState(null);
    const [activeSection, setActiveSection] = useState('info');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            setNovels(response.data.novels || []); // Fetch and set the user's novels
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleNovelSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', newNovel.title);
            formData.append('description', newNovel.description);
            formData.append('category', newNovel.category);
            if (coverImage) {
                formData.append('coverImage', coverImage);
            }

            const response = await api.post('/users/novels', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setNovels([...novels, response.data]); // Add the newly created novel to the state
            setNewNovel({ title: '', description: '', category: '' });
            setCoverImage(null);
            setActiveSection('novels');
        } catch (error) {
            console.error('Failed to publish novel', error);
        }
    };

    const deleteNovel = async (novelId) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/users/novels/${novelId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNovels(novels.filter((novel) => novel.id !== novelId));
        } catch (error) {
            console.error('Failed to delete novel', error);
        }
    };

    const updateCoverImage = async (novelId) => {
        // Handle updating the cover image for a novel
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <div className="relative">
                <button
                    className="bg-gray-800 text-white py-2 px-4 rounded"
                    onClick={() => setActiveSection('dropdown')}
                >
                    Sections
                </button>
                {activeSection === 'dropdown' && (
                    <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg">
                        <a
                            onClick={() => handleSectionChange('info')}
                            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer"
                        >
                            Info
                        </a>
                        <a
                            onClick={() => handleSectionChange('create')}
                            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer"
                        >
                            Create Novel
                        </a>
                        <a
                            onClick={() => handleSectionChange('novels')}
                            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer"
                        >
                            Your Novels
                        </a>
                        <a
                            onClick={handleLogout}
                            className="block px-4 py-2 text-red-500 hover:bg-gray-400 cursor-pointer"
                        >
                            Logout
                        </a>
                    </div>
                )}
            </div>

            {activeSection === 'info' && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold">User Info</h3>
                    <p>Email: {user.email}</p>
                    <p>Number of Novels: {novels.length}</p>
                    <p>Username: {user.username}</p>
                </div>
            )}

            {activeSection === 'create' && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-4">Create a New Novel</h3>
                    <form onSubmit={handleNovelSubmit} className="bg-white p-6 rounded shadow-md">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={newNovel.title}
                                onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <textarea
                                id="description"
                                value={newNovel.description}
                                onChange={(e) => setNewNovel({ ...newNovel, description: e.target.value })}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                id="category"
                                value={newNovel.category}
                                onChange={(e) => setNewNovel({ ...newNovel, category: e.target.value })}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="coverImage" className="block text-gray-700">Cover Image</label>
                            <input
                                type="file"
                                id="coverImage"
                                onChange={(e) => setCoverImage(e.target.files[0])}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Publish
                        </button>
                    </form>
                </div>
            )}

            {activeSection === 'novels' && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-4">Your Novels</h3>
                    {novels.length > 0 ? (
                        novels.map((novel) => (
                            <div key={novel.id} className="border p-4 mb-4">
                                <h3 className="font-bold text-xl">
                                    <Link to={`/novel/${novel.id}`}>{novel.title}</Link> {/* Make the novel title clickable */}
                                </h3>
                                <img
                                    src={`http://localhost:5000${novel.coverImage}`}
                                    alt={novel.title}
                                    className="w-32 h-48 object-cover mb-2"
                                />
                                <button
                                    className="text-red-500 ml-4"
                                    onClick={() => deleteNovel(novel.id)}
                                >
                                    Delete Novel
                                </button>
                                <button
                                    className="text-blue-500 ml-4"
                                    onClick={() => updateCoverImage(novel.id)}
                                >
                                    Change Cover Image
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>You haven't created any novels yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

