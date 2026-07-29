import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if description is long enough to trigger expansion
  const isLong = data.description.length > 120;

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`group relative flex flex-col p-5 rounded-xl transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-accent-teal/30 hover:shadow-lg hover:shadow-accent-teal/5 w-full overflow-hidden ${isExpanded ? 'md:col-span-2' : 'md:col-span-1'}`}>
      {/* Compact Image Area - Links to project */}
      <a 
        href={data.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative w-full h-40 border border-white/10 rounded-lg bg-[#0a0a0a] flex items-center justify-center overflow-hidden mb-4 group-hover:border-accent-teal/40 transition-colors duration-500 block"
      >
        {data.image ? (
          <img 
            src={data.image} 
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        )}
        
        {!data.image && (
          <span className="relative z-10 font-mono text-xl font-bold text-white/10 tracking-tighter group-hover:text-accent-teal/20 transition-colors duration-500">
            {data.code}
          </span>
        )}
      </a>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <a 
              href={data.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-textPrimary text-base hover:text-accent-teal transition-colors duration-300"
            >
              {data.title}
            </a>
            <a 
              href={data.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-textSecondary hover:text-accent-teal transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 p-1"
              title="Open project"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          <div className="mb-4">
            <p className={`text-textSecondary/80 text-xs leading-relaxed text-left transition-all ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {data.description}
            </p>
            {isLong && (
              <button
                type="button"
                onClick={toggleExpand}
                className="mt-1 font-mono text-[11px] text-accent-teal hover:underline focus:outline-none inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                {isExpanded ? 'Show less ▲' : 'more...'}
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-widest text-textSecondary/40 mb-2 font-mono font-semibold">Tech Stack</p>
          <ul className="flex flex-wrap gap-1.5">
            {data.technologies.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[9px] text-accent-teal/80 bg-accent-teal/5 px-2 py-0.5 rounded-md border border-accent-teal/10 hover:border-accent-teal/30 transition-colors duration-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;