import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { ShareIcon } from '../components/icons/ShareIcon';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
  allArticles: Article[];
  onArticleSelect: (id: number) => void;
}

const RelatedArticleCard: React.FC<{ article: Article; onClick: () => void }> = ({ article, onClick }) => (
  <div onClick={onClick} className="cursor-pointer group">
    <div className="overflow-hidden rounded-xl mb-4">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
      />
    </div>
    <span className="text-sm font-semibold text-blue-600">{article.category}</span>
    <h4 className="mt-1 font-semibold text-gray-800 group-hover:text-purple-600 transition-colors leading-tight">
      {article.title}
    </h4>
  </div>
);

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack, allArticles, onArticleSelect }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    try {
      const storedComments = localStorage.getItem('nexus-news-comments');
      if (storedComments) {
        const allComments = JSON.parse(storedComments);
        setComments(allComments[article.id] || []);
      }
    } catch (error) {
      console.error("Failed to parse comments from localStorage", error);
    }
  }, [article.id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const comment: Comment = {
      id: new Date().toISOString(),
      articleId: article.id,
      author: 'Anonymous', // Placeholder author
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    try {
      const storedComments = localStorage.getItem('nexus-news-comments');
      const allComments = storedComments ? JSON.parse(storedComments) : {};
      allComments[article.id] = updatedComments;
      localStorage.setItem('nexus-news-comments', JSON.stringify(allComments));
    } catch (error) {
       console.error("Failed to save comments to localStorage", error);
    }

    setNewComment('');
  };
  
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeftIcon />
        <span>Back to news</span>
      </button>

      <article className="max-w-4xl mx-auto">
        <header>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-semibold text-blue-600">{article.category}</span>
            <span className="text-gray-400">&bull;</span>
            <span>{article.timestamp}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-tight">
            {article.title}
          </h1>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={article.authorAvatarUrl}
                alt={article.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{article.authorName}</p>
                <p className="text-sm text-gray-500">Content Author</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <button aria-label="Like article" className="p-2 rounded-full hover:bg-gray-200/70 transition-colors">
                    <HeartIcon />
                </button>
                 <button aria-label="Share article" className="p-2 rounded-full hover:bg-gray-200/70 transition-colors">
                    <ShareIcon />
                </button>
                 <button aria-label="Bookmark article" className="p-2 rounded-full hover:bg-gray-200/70 transition-colors">
                    <BookmarkIcon />
                </button>
            </div>
          </div>
        </header>

        <figure className="my-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl"
          />
        </figure>
        
        <div
          className="prose lg:prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags && article.tags.length > 0 && (
            <div className="mt-12 flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold">Tags:</h3>
                {article.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        )}
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-200 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map(related => (
              <RelatedArticleCard
                key={related.id}
                article={related}
                onClick={() => onArticleSelect(related.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Join the Conversation</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            rows={4}
            aria-label="Comment input"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </form>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="p-4 bg-gray-50/80 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">{comment.author}</p>
                  <p className="text-xs text-gray-500">{comment.timestamp}</p>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
