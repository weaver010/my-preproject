import React from 'react';

const HeroSection = ({ featuredNovels }) => {
    return (
        <section className="bg-gray-800 text-white p-8">
            <h2 className="text-3xl font-bold mb-6">Featured Novels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredNovels.map(novel => (
                    <div key={novel.id} className="bg-gray-700 p-4 rounded-lg">
                        <img src={novel.coverImage} alt={novel.title} className="w-full h-64 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-bold">{novel.title}</h3>
                        <p className="text-gray-300">{novel.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HeroSection;

