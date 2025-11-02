import React from 'react';
import { liveInterviews } from '../constants';
import { Interview } from '../types';
import { PlayIcon } from './icons/PlayIcon';

const getStatusStyles = (status: Interview['status']) => {
  switch (status) {
    case 'Live':
      return {
        buttonClass: 'bg-red-600 hover:bg-red-500',
        buttonText: 'Watch Live',
      };
    case 'Upcoming':
      return {
        buttonClass: 'bg-blue-600 hover:bg-blue-500',
        buttonText: 'Set Reminder',
      };
    case 'Past':
    default:
      return {
        buttonClass: 'bg-gray-200 text-gray-800 hover:bg-white',
        buttonText: 'Watch Recording',
      };
  }
};

const InterviewCard: React.FC<{ interview: Interview }> = ({ interview }) => {
  const styles = getStatusStyles(interview.status);

  return (
    <a 
      href={interview.watchLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative block aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-200/40 transition-all duration-300 transform hover:-translate-y-1"
      aria-label={`Watch interview with ${interview.guestName} about ${interview.topic}`}
    >
      <img 
        src={interview.guestImageUrl} 
        alt={interview.guestName} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors duration-300 group-hover:from-black/90"></div>
      
      {(interview.status === 'Live' || interview.status === 'Upcoming') && (
        <div className="absolute top-4 left-4 z-10">
          {interview.status === 'Live' ? (
             <div className="flex items-center gap-2 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE
            </div>
          ) : (
             <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                UPCOMING
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="transition-transform duration-500 ease-out transform group-hover:-translate-y-14">
            <h4 className="text-xl font-bold leading-tight">{interview.topic}</h4>
            <p className="text-sm text-white/80 mt-1">
                {interview.guestName}, {interview.guestTitle}
            </p>
        </div>
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
           <div className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-full text-sm text-white transition-colors shadow-lg ${styles.buttonClass}`}>
                <PlayIcon className="h-5 w-5" />
                <span>{styles.buttonText}</span>
            </div>
        </div>
      </div>
    </a>
  );
};

const LiveInterviews: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Live Broadcasts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {liveInterviews.map(interview => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </section>
  );
};

export default LiveInterviews;