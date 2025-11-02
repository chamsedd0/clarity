import React, { useState, useEffect, useRef } from 'react';
import { NexusNewsIcon } from './icons/NexusNewsIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SearchIcon } from './icons/SearchIcon';
import { newsCategories } from '../constants';
import { HomeView } from '../App';

interface HeaderProps {
  onLogoClick: () => void;
  onHomeViewChange: (view: HomeView) => void;
  onNavigateToArchives: (category: string) => void;
  activeView: HomeView;
}

const topNavItems: { label: string, category: string }[] = [
    { label: 'News', category: 'World News' },
    { label: 'Exclusives', category: 'Exclusives' },
    { label: 'Guides', category: 'Guides' },
];

const subNavItems: { label: string, view: HomeView }[] = [
    { label: 'Latest Articles', view: 'articles' },
    { label: 'Podcasts', view: 'podcasts' },
    { label: 'Live Broadcasts', view: 'live' },
];

const Header: React.FC<HeaderProps> = ({ onLogoClick, onHomeViewChange, onNavigateToArchives, activeView }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      {/* Top Header */}
      <div className="px-6 md:px-8 lg:px-12 py-4 border-b border-gray-200/80">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            <button onClick={onLogoClick} className="flex items-center gap-2" aria-label="Go to homepage">
              <NexusNewsIcon />
              <span className="font-bold text-xl text-gray-800">Nexus News</span>
            </button>
            <nav className="hidden lg:flex items-center gap-6">
               <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                      <span>Categories</span>
                      <ChevronDownIcon />
                  </button>
                  {isCategoriesOpen && (
                      <div className="absolute top-full mt-3 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200/80">
                          {newsCategories.map(category => (
                              <button
                                  key={category}
                                  onClick={() => {
                                      onNavigateToArchives(category);
                                      setIsCategoriesOpen(false);
                                  }}
                                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                  {category}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
              {topNavItems.map(item => (
                <button 
                  key={item.label} 
                  onClick={() => onNavigateToArchives(item.category)}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <span>En</span>
                <ChevronDownIcon />
              </button>
            </div>
            <div className="relative">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Article name, tag, category..."
                className="bg-gray-100/80 rounded-full py-2 pl-10 pr-4 text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                aria-label="Search articles"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Navigation */}
      <div className="relative border-b border-gray-200/80">
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-8" aria-label="Secondary navigation">
            {subNavItems.map(item => (
              <button
                key={item.label}
                onClick={() => onHomeViewChange(item.view)}
                className={`py-3 text-sm font-semibold transition-colors border-b-2 ${
                  activeView === item.view
                    ? 'border-indigo-600 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Live Indicator - hidden on smaller screens to avoid overlap */}
        <div className="hidden sm:flex absolute left-6 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 items-center gap-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live now</span>
        </div>
      </div>
    </header>
  );
};

export default Header;