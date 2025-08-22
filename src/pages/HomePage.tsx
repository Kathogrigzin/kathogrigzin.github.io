import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

interface HomePageProps {
  startMusic: () => void;
}

export default function HomePage({ startMusic }: HomePageProps) {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32 bg-gray-700 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/images/main-banner.png')` }}
        ></div>
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-chinese-title mb-4 drop-shadow-md">
            仁珍才旺諾布全集
          </h1>
          <h2 className="text-3xl md:text-4xl font-tibetan-title mb-4 drop-shadow-md">
            རིག་འཛིན་ཚེ་དབང་ནོར་བུའི་གསུང་འབུམ།
          </h2>
          <p className="text-xl md:text-2xl font-serif-italic tracking-wider mb-8 drop-shadow-md">
            Rigzin Tsewang Norbu's Collected Works
          </p>
          <p className="text-lg mt-12 max-w-xl mx-auto">
            深入了解清代西藏偉大學者、和平締造者
            <p>噶陀仁珍千寶才旺諾布的生平與著作</p>
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-chinese-title text-center mb-12">分冊書目</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categories.map(category => (
              <Link 
                to={`/category/${category.id}`} 
                key={category.id} 
                onClick={startMusic}
                className="relative block rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              >
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-chinese-title">{category.name}</h3>
                  <p className="opacity-90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
