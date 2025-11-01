import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

interface ArchivesPageProps {
  articles: Article[];
  onArticleSelect: (id: number) => void;
}

const ArchiveArticleItem: React.FC<{ article: Article; onArticleSelect: (id: number) => void }> = ({ article, onArticleSelect }) => (
  <div className="border-b border-gray-200/80 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
    <div className="flex-grow">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <span className="font-semibold text-purple-600">{article.category}</span>
        <span className="text-gray-300">&bull;</span>
        <span>{article.timestamp}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 hover:text-purple-800 transition-colors">
        <button onClick={() => onArticleSelect(article.id)} className="text-left">
          {article.title}
        </button>
      </h3>
      <p className="mt-2 text-gray-600 line-clamp-2">{article.description}</p>
    </div>
    <div className="flex-shrink-0">
      <button 
        onClick={() => onArticleSelect(article.id)}
        className="inline-flex items-center space-x-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors group"
      >
        <span>Read More</span>
        <div className="transform transition-transform group-hover:translate-x-1">
          <ArrowRightIcon />
        </div>
      </button>
    </div>
  </div>
);

const ArchivesPage: React.FC<ArchivesPageProps> = ({ articles, onArticleSelect }) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      // Since timestamps are strings like "4 hours ago", we sort by ID as a proxy for date.
      // A higher ID is considered newer.
      if (sortOrder === 'newest') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
  }, [articles, sortOrder]);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <header className="pb-6 border-b border-gray-200/80">
        <h1 className="text-4xl font-extrabold text-gray-900">Article Archives</h1>
        <p className="mt-2 text-lg text-gray-600">Browse through all our published content.</p>
      </header>

      <div className="my-6 flex justify-end">
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="text-sm font-semibold border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      
      <div>
        {sortedArticles.map(article => (
          <ArchiveArticleItem key={article.id} article={article} onArticleSelect={onArticleSelect} />
        ))}
      </div>
    </div>
  );
};

export default ArchivesPage;
