import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArchivesPage from './pages/ArchivesPage'; // Import the new ArchivesPage
import { allArticles } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'article' | 'archives'>('home');
  const [selectedArticleId, setSelectedArticleId] = React.useState<number | null>(null);

  const handleArticleSelect = (id: number) => {
    setSelectedArticleId(id);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setSelectedArticleId(null);
    setCurrentPage('home');
  };
  
  const handleGoToArchives = () => {
    setSelectedArticleId(null);
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
            onBack={handleGoHome}
            allArticles={allArticles}
            onArticleSelect={handleArticleSelect}
          />
        ) : <HomePage onArticleSelect={handleArticleSelect} />;
      case 'archives':
        return <ArchivesPage articles={allArticles} onArticleSelect={handleArticleSelect} />;
      case 'home':
      default:
        return <HomePage onArticleSelect={handleArticleSelect} />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto bg-white/80 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-purple-200/20 overflow-hidden flex flex-col">
        <Header onLogoClick={handleGoHome} />
        <main className="p-6 md:p-8 lg:p-12 flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;