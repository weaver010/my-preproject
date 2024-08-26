import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const NovelDetailPage = () => {
    const { id } = useParams();
    const [novel, setNovel] = useState(null);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchNovelDetails = async () => {
            try {
                const response = await api.get(`/novels/${id}`);
                setNovel(response.data);
                setChapters(response.data.chapters);
            } catch (error) {
                console.error('Failed to fetch novel details', error);
            }
        };

        fetchNovelDetails();
    }, [id]);

    if (!novel) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col items-center">
                <img src={novel.coverImage} alt={novel.title} className="w-64 h-96 object-cover mb-4" />
                <h1 className="text-4xl font-bold mb-4">{novel.title}</h1>
                <p className="text-lg mb-4">{novel.description}</p>
                <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                <ul className="list-disc">
                    {chapters.map(chapter => (
                        <li key={chapter.id}>
                            <Link to={`/novel/${novel.id}/chapter/${chapter.id}`}>{chapter.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NovelDetailPage;

