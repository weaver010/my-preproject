import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import NovelCard from '../components/NovelCard';

const HomePage = () => {
    const [popularNovels, setPopularNovels] = useState([]);
    const [newestNovels, setNewestNovels] = useState([]);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await api.get('/users/home');
                setPopularNovels(response.data.popularNovels);
                setNewestNovels(response.data.newestNovels);
            } catch (error) {
                console.error('Failed to fetch novels', error);
            }
        };

        fetchNovels();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Popular Novels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularNovels.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Newest Novels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newestNovels.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;

