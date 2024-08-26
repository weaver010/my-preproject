import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const ChapterReaderPage = () => {
    const { novelId, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await api.get(`/novels/${novelId}/chapter/${chapterId}`);
                setChapter(response.data);
            } catch (error) {
                console.error('Failed to fetch chapter', error);
            }
        };

        fetchChapter();
    }, [novelId, chapterId]);

    if (!chapter) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{chapter.chapter.title}</h1>
            <div className="bg-gray-100 p-4 rounded">
                {chapter.chapter.content && <pre>{chapter.chapter.content}</pre>}
                {chapter.chapter.file && (
                    <a href={chapter.chapter.file} download className="text-blue-500">Download Chapter File</a>
                )}
            </div>
            <div className="mt-8 flex justify-between">
                {chapter.previousChapterId && (
                    <Link to={`/novel/${novelId}/chapter/${chapter.previousChapterId}`} className="text-blue-500">Previous Chapter</Link>
                )}
                {chapter.nextChapterId && (
                    <Link to={`/novel/${novelId}/chapter/${chapter.nextChapterId}`} className="text-blue-500">Next Chapter</Link>
                )}
            </div>
        </div>
    );
};

export default ChapterReaderPage;

