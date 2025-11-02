import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArchivesPage from './pages/ArchivesPage';
import { allArticles } from './constants';

export type HomeView = 'articles' | 'podcasts' | 'live';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'article' | 'archives'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [homeView, setHomeView] = useState<HomeView>('articles');
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  const handleArticleSelect = (id: number) => {
    setSelectedArticleId(id);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const handleGoHome = (view: HomeView = 'articles') => {
    setSelectedArticleId(null);
    setHomeView(view);
    setCurrentPage('home');
  };
  
  const handleGoToArchives = (category?: string) => {
    setSelectedArticleId(null);
    setInitialCategory(category);
    setCurrentPage('archives');
    window.scrollTo(0, 0);
  };

  const selectedArticle = allArticles.find(a => a.id === selectedArticleId);

  const renderPage = () => {
    switch (currentPage) {
      case 'article':
        return selectedArticle ? (
          <ArticlePage 
            article={selectedArticle} 
            onBack={() => handleGoHome()}
            allArticles={allArticles}
            onArticleSelect={handleArticleSelect}
          />
        ) : <HomePage onArticleSelect={handleArticleSelect} view={homeView} />;
      case 'archives':
        return <ArchivesPage articles={allArticles} onArticleSelect={handleArticleSelect} initialCategory={initialCategory} />;
      case 'home':
      default:
        return <HomePage onArticleSelect={handleArticleSelect} view={homeView} />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto bg-white/80 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-indigo-200/20 overflow-hidden flex flex-col">
        <Header 
          onLogoClick={() => handleGoHome()} 
          onHomeViewChange={handleGoHome}
          onNavigateToArchives={handleGoToArchives}
          activeView={currentPage === 'home' ? homeView : 'articles'}
        />
        <main className="p-6 md:p-8 lg:p-12 flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
