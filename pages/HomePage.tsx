import React, { useEffect, useRef } from 'react';
import { featuredArticle, bottomArticles, recommendedArticles, latestPodcasts } from '../constants';
import { Article, Podcast } from '../types';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { PlayIcon } from '../components/icons/PlayIcon';
import { HeadphonesIcon } from '../components/icons/HeadphonesIcon';
import LiveInterviews from '../components/LiveInterviews';
import { HomeView } from '../App';

interface HomePageProps {
  onArticleSelect: (id: number) => void;
  view: HomeView;
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
            <span className="font-semibold text-indigo-600">{article.category}</span>
            <span>&bull;</span>
            <span>{article.timestamp}</span>
        </div>
        <h4 className="font-semibold text-gray-800 mt-1 leading-tight group-hover:text-indigo-700 transition-colors text-sm">{article.title}</h4>
      </div>
      <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
    </div>
  );
};

const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => (
    <a
      href={podcast.listenLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen to ${podcast.title}`}
      className="block relative flex-shrink-0 w-80 h-[400px] rounded-3xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-200/50"
    >
      <img src={podcast.imageUrl} alt={podcast.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/90" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNzUiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZGh0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] mix-blend-soft-light" aria-hidden="true"></div>
      <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
        <ClockIcon />
        <span>{podcast.duration}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="transition-transform duration-500 ease-out transform group-hover:-translate-y-10">
          <h4 className="text-2xl font-bold leading-tight transition-colors group-hover:text-indigo-300">
            {podcast.title}
          </h4>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
            <p className="text-sm text-white/80 line-clamp-2">
              {podcast.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600/90 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-indigo-600 transition-colors shadow-lg transform group-hover:scale-100 scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                <HeadphonesIcon />
                <span>Listen Now</span>
            </div>
          </div>
        </div>
      </div>
    </a>
);

const PodcastsSection: React.FC = () => {
  return (
    <section id="podcasts-section" className="mt-16 scroll-mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Latest Podcasts</h2>
      <div className="flex space-x-8 pb-4 -mx-6 px-6 overflow-x-auto hide-scrollbar">
        {latestPodcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </section>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onArticleSelect, view }) => {
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerOffset = 120; // Approx height of the header
    const elementIdMap: Record<HomeView, string> = {
      articles: 'main-content-start',
      podcasts: 'podcasts-section',
      live: 'live-interviews-section',
    };

    const elementId = elementIdMap[view];
    if (elementId === 'main-content-start') {
        if(mainContentRef.current) {
            const elementPosition = mainContentRef.current.offsetTop;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    } else {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    }
  }, [view]);

  return (
    <div ref={mainContentRef} id="main-content-start" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[2fr_1fr] gap-x-8 gap-y-12">
        {/* Main Content */}
        <div className="lg:col-span-2 xl:col-span-1 relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-200/20">
          {/* Background Video */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
            />
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            {/* Featured Article */}
            <section className="mb-16">
              <span className="text-xs font-bold tracking-widest text-indigo-700 uppercase">Best of the week</span>
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
                <div className="bg-gray-800 text-white rounded-full p-2 group-hover:bg-indigo-600 transition-colors">
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
                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight">
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
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline">View all &gt;</a>
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
      <PodcastsSection />
      <div id="live-interviews-section" className="mt-16 scroll-mt-24">
        <LiveInterviews />
      </div>
    </div>
  );
};

export default HomePage;