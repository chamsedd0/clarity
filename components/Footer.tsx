import React from 'react';
import { NexusNewsIcon } from './icons/NexusNewsIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50/50 border-t border-gray-200/80 px-6 md:px-8 lg:px-12 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3">
                <NexusNewsIcon />
                <span className="font-bold text-2xl text-gray-800 tracking-tight">Nexus News</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
                Bringing generations together to discuss mainstream topics and the latest events from around the world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Company</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-purple-600">About</a></li>
              <li><a href="#" className="hover:text-purple-600">Careers</a></li>
              <li><a href="#" className="hover:text-purple-600">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Legal</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-600">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nexus News. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-purple-600"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-purple-600"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-purple-600"><InstagramIcon /></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-purple-600"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
