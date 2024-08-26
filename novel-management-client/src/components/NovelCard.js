import React from 'react';
import { Link } from 'react-router-dom';

const NovelCard = ({ novel }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
                src={`http://localhost:5000${novel.coverImage || ''}`}  // Ensure the correct path to the cover image
                alt={novel.title} 
                className="w-full h-56 object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}  // Fallback image if loading fails
            />
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{novel.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{novel.description.slice(0, 100)}...</p>
                <Link to={`/novel/${novel.id}`} className="text-blue-500 hover:text-blue-700">Read More</Link>
            </div>
        </div>
    );
};

export default NovelCard;

