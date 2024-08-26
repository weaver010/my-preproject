import React, { useState } from 'react';
import api from '../api/axiosConfig';
import NovelCard from '../components/NovelCard';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/users/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Failed to search novels', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Search Novels</h2>
            <form onSubmit={handleSearch} className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="Search for novels by title, description, or category..."
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

