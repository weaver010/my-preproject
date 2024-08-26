import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const ProfilePage = () => {
    const [newNovel, setNewNovel] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [coverImage, setCoverImage] = useState(null);

    const handleNovelSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();  // Create a FormData object for file upload
            formData.append('title', newNovel.title);
            formData.append('description', newNovel.description);
            formData.append('category', newNovel.category);
            if (coverImage) {
                formData.append('coverImage', coverImage);  // Append the cover image file
            }

            const response = await api.post('/users/novels', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'  // Set the content type to multipart/form-data
                }
            });

            // Reset the form after successful submission
            setNewNovel({ title: '', description: '', category: '' });
            setCoverImage(null);
        } catch (error) {
            console.error('Failed to publish novel', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Write a New Novel</h2>
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Publish</button>
            </form>
        </div>
    );
};

export default ProfilePage;

