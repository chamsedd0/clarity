import React from 'react';
import { NexusNewsIcon } from './icons/NexusNewsIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  onLogoClick: () => void;
}

const navItems = ['All', 'News', 'Exclusives', 'Guides', 'Recommended'];

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="px-6 md:px-8 lg:px-12 py-4 border-b border-gray-200/80">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <button onClick={onLogoClick} className="flex items-center gap-2" aria-label="Go to homepage">
            <NexusNewsIcon />
            <span className="font-bold text-xl text-gray-800">Nexus News</span>
          </button>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <a href="#" key={item} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                <span>{item}</span>
                <PlusIcon />
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-purple-600">
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
              className="bg-gray-100/80 rounded-full py-2 pl-10 pr-4 text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              aria-label="Search articles"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;