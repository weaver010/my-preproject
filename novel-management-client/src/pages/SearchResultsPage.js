import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import NovelCard from '../components/NovelCard';

const SearchResultsPage = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await api.get(`/users/search?query=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Failed to fetch search results', error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultsPage;

