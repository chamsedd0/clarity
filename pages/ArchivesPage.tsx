import React, { useState, useMemo, useEffect } from 'react';
import { Article } from '../types';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';
import { newsCategories } from '../constants';

interface ArchivesPageProps {
  articles: Article[];
  onArticleSelect: (id: number) => void;
  initialCategory?: string;
}

interface ArchiveArticleItemProps {
    article: Article;
    onArticleSelect: (id: number) => void;
    isSaved: boolean;
    onToggleSave: (id: number) => void;
}

const ArchiveArticleItem: React.FC<ArchiveArticleItemProps> = ({ article, onArticleSelect, isSaved, onToggleSave }) => (
  <div className="border-b border-gray-200/80 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
    <div className="flex-grow">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <span className="font-semibold text-indigo-600">{article.category}</span>
        <span className="text-gray-300">&bull;</span>
        <span>{article.timestamp}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-800 transition-colors">
        <button onClick={() => onArticleSelect(article.id)} className="text-left">
          {article.title}
        </button>
      </h3>
      <p className="mt-2 text-gray-600 line-clamp-2">{article.description}</p>
    </div>
    <div className="flex-shrink-0 flex items-center gap-2 md:gap-4">
       <button 
        onClick={() => onToggleSave(article.id)} 
        className="p-2 rounded-full hover:bg-gray-100 transition-colors" 
        aria-label={isSaved ? "Remove from Read Later" : "Save for Read Later"}
        title={isSaved ? "Remove from Read Later" : "Save for Read Later"}
      >
        <BookmarkIcon isFilled={isSaved} />
      </button>
      <button 
        onClick={() => onArticleSelect(article.id)}
        className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group"
      >
        <span>Read More</span>
        <div className="transform transition-transform group-hover:translate-x-1">
          <ArrowRightIcon />
        </div>
      </button>
    </div>
  </div>
);

const ArchivesPage: React.FC<ArchivesPageProps> = ({ articles, onArticleSelect, initialCategory }) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [readLaterIds, setReadLaterIds] = useState<Set<number>>(new Set());
  const [view, setView] = useState<'all' | 'readLater'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  
  useEffect(() => {
    try {
      const storedIds = localStorage.getItem('nexus-news-read-later');
      if (storedIds) {
        setReadLaterIds(new Set(JSON.parse(storedIds)));
      }
    } catch (error) {
      console.error("Failed to load read-later articles from localStorage", error);
    }
  }, []);

  // When initialCategory prop changes, update the state
  useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
  }, [initialCategory]);
  
  const handleToggleReadLater = (articleId: number) => {
    const newSet = new Set(readLaterIds);
    if (newSet.has(articleId)) {
      newSet.delete(articleId);
    } else {
      newSet.add(articleId);
    }
    setReadLaterIds(newSet);
    try {
      localStorage.setItem('nexus-news-read-later', JSON.stringify(Array.from(newSet)));
    } catch (error) {
      console.error("Failed to save read-later articles to localStorage", error);
    }
  };

  const displayArticles = useMemo(() => {
    let filteredArticles = view === 'readLater'
      ? articles.filter(a => readLaterIds.has(a.id))
      : articles;

    if (selectedCategory !== 'all') {
        filteredArticles = filteredArticles.filter(a => a.category === selectedCategory);
    }

    return [...filteredArticles].sort((a, b) => {
      // Since timestamps are strings like "4 hours ago", we sort by ID as a proxy for date.
      // A higher ID is considered newer.
      if (sortOrder === 'newest') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
  }, [articles, sortOrder, readLaterIds, view, selectedCategory]);

  const getTabClassName = (tabName: 'all' | 'readLater') => {
    const base = "px-3 py-2 font-semibold text-sm rounded-md transition-colors";
    if (view === tabName) {
      return `${base} bg-indigo-100 text-indigo-700`;
    }
    return `${base} text-gray-600 hover:bg-gray-100`;
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <header className="pb-6 border-b border-gray-200/80">
        <h1 className="text-4xl font-extrabold text-gray-900">Article Archives</h1>
        <p className="mt-2 text-lg text-gray-600">Browse through all our published content.</p>
      </header>

      <div className="my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="p-1 bg-gray-200/60 rounded-lg flex items-center space-x-1">
          <button onClick={() => setView('all')} className={getTabClassName('all')}>
            All Articles
          </button>
          <button onClick={() => setView('readLater')} className={getTabClassName('readLater')}>
            Read Later ({readLaterIds.size})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 self-end sm:self-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">Filter by:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm font-semibold border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {newsCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="text-sm font-semibold border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        {displayArticles.length > 0 ? (
            displayArticles.map(article => (
                <ArchiveArticleItem 
                    key={article.id} 
                    article={article} 
                    onArticleSelect={onArticleSelect}
                    isSaved={readLaterIds.has(article.id)}
                    onToggleSave={handleToggleReadLater}
                />
            ))
        ) : (
            <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700">
                    {view === 'readLater' ? "No Saved Articles" : "No Articles Found"}
                </h3>
                <p className="mt-2 text-gray-500">
                    {view === 'readLater' 
                        ? "You haven't saved any articles to read later yet." 
                        : "No articles match the current filter."}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ArchivesPage;
