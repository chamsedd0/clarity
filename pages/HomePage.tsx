import React from 'react';
import { featuredArticle, bottomArticles, recommendedArticles } from '../constants';
import { Article } from '../types';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

interface HomePageProps {
  onArticleSelect: (id: number) => void;
}

const RecommendedArticleCard: React.FC<{ article: Article; onArticleSelect: (id: number) => void; isFirst: boolean }> = ({ article, onArticleSelect, isFirst }) => {
  if (isFirst) {
    return (
      <div onClick={() => onArticleSelect(article.id)} className="group cursor-pointer relative rounded-2xl overflow-hidden h-56 text-white shadow-lg">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 p-4 w-full">
            <div className="flex items-center text-xs space-x-2">
                <span className="font-semibold">{article.category}</span>
                <span>&bull;</span>
                <span>{article.timestamp}</span>
            </div>
            <h4 className="font-semibold mt-1 leading-tight">{article.title}</h4>
        </div>
        <div className="absolute top-3 left-3 h-0.5 w-8 bg-white/50 rounded-full"></div>
      </div>
    );
  }

  return (
    <div onClick={() => onArticleSelect(article.id)} className="group cursor-pointer flex items-center gap-4">
      <div className="flex-grow">
        <div className="flex items-center text-xs space-x-2 text-gray-500">
            <span className="font-semibold text-purple-600">{article.category}</span>
            <span>&bull;</span>
            <span>{article.timestamp}</span>
        </div>
        <h4 className="font-semibold text-gray-800 mt-1 leading-tight group-hover:text-purple-700 transition-colors text-sm">{article.title}</h4>
      </div>
      <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
    </div>
  );
};


const HomePage: React.FC<HomePageProps> = ({ onArticleSelect }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[2fr_1fr] gap-x-8 gap-y-12">
      {/* Main Content */}
      <div className="lg:col-span-2 xl:col-span-1 relative">
        {/* Background Orb */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none z-0">
          <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute inset-20 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-300"></div>
        </div>

        <div className="relative z-10">
          {/* Featured Article */}
          <section className="mb-16">
            <span className="text-xs font-bold tracking-widest text-purple-700 uppercase">Best of the week</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 max-w-xl leading-tight">
              {featuredArticle.title}
            </h1>
            
             {featuredArticle.tags && (
                 <div className="mt-6 flex gap-3">
                     {featuredArticle.tags.map(tag => (
                         <span key={tag} className="text-sm text-gray-600 font-medium">{tag}</span>
                     ))}
                 </div>
             )}
            <button
              onClick={() => onArticleSelect(featuredArticle.id)}
              className="mt-8 inline-flex items-center gap-3 text-sm font-semibold bg-white pl-5 pr-3 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
            >
              <span>Read article</span>
              <div className="bg-gray-800 text-white rounded-full p-2 group-hover:bg-purple-600 transition-colors">
                <ArrowRightIcon />
              </div>
            </button>
          </section>

          {/* Bottom Articles */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {bottomArticles.map(article => (
                <div key={article.id} onClick={() => onArticleSelect(article.id)} className="group cursor-pointer">
                  <div className="h-0.5 w-8 bg-gray-300 rounded-full mb-4"></div>
                  <div className="flex items-center text-xs space-x-2 text-gray-500 mb-1.5">
                    <span>{article.category}</span>
                    <span>&bull;</span>
                    <span>{article.timestamp}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-tight">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recommended</h2>
          <a href="#" className="text-sm font-semibold text-purple-600 hover:underline">View all &gt;</a>
        </div>
        <div className="space-y-5">
            {recommendedArticles.map((article, index) => (
                <React.Fragment key={article.id}>
                    <RecommendedArticleCard article={article} onArticleSelect={onArticleSelect} isFirst={index === 0} />
                    {index > 0 && index < recommendedArticles.length -1 && <hr className="border-gray-200/60" />}
                </React.Fragment>
            ))}
        </div>
      </aside>
    </div>
  );
};

export default HomePage;