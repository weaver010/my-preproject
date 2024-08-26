import React from 'react';
import { Link } from 'react-router-dom';

const NovelCard = ({ novel }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={novel.coverImage || 'https://via.placeholder.com/150'} alt={novel.title} className="w-full h-56 object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{novel.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{novel.description.slice(0, 100)}...</p>
                <Link to={`/novel/${novel.id}`} className="text-blue-500 hover:text-blue-700">Read More</Link>
            </div>
        </div>
    );
};

export default NovelCard;

