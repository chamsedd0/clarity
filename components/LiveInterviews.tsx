import React from 'react';
import { liveInterviews } from '../constants';
import { Interview } from '../types';
import { PlayIcon } from './icons/PlayIcon';

const StatusBadge: React.FC<{ status: 'Live' | 'Upcoming' | 'Past' }> = ({ status }) => {
  const baseClasses = 'absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1.5';
  
  if (status === 'Live') {
    return (
      <div className={`${baseClasses} bg-red-500 text-white`}>
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>LIVE</span>
      </div>
    );
  }
  if (status === 'Upcoming') {
    return <div className={`${baseClasses} bg-blue-500 text-white`}>UPCOMING</div>;
  }
  return null;
};

const InterviewCard: React.FC<{ interview: Interview }> = ({ interview }) => {
  const isPast = interview.status === 'Past';
  const buttonText = isPast ? 'Watch Replay' : 'Watch Live';
  
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img src={interview.guestImageUrl} alt={interview.guestName} className="w-full h-40 object-cover" />
        <StatusBadge status={interview.status} />
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500">{interview.datetime}</p>
        <h4 className="font-bold text-gray-800 mt-2 leading-tight">{interview.guestName}</h4>
        <p className="text-sm text-gray-600 mt-1">{interview.topic}</p>
        <a 
          href={interview.watchLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 w-full inline-flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            isPast 
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <PlayIcon />
          <span>{buttonText}</span>
        </a>
      </div>
    </div>
  );
};

const LiveInterviews: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Live Interviews</h2>
      <div className="flex space-x-6 pb-4 -mx-6 px-6 overflow-x-auto">
        {liveInterviews.map(interview => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </section>
  );
};

export default LiveInterviews;
