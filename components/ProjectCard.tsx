import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Check if description is long enough to trigger expansion
  const isLong = data.description.length > 120;

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const imageContent = (
    <div className="relative w-full h-36 border border-white/10 rounded-lg bg-[#0a0a0a] flex items-center justify-center overflow-hidden group-hover:border-accent-teal/40 transition-colors duration-500">
      {data.image && !imgError ? (
        <img 
          src={data.image} 
          alt={data.title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/30 via-transparent to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
      )}
      
      {(!data.image || imgError) && (
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span className="font-mono text-xl font-bold text-accent-teal/60 tracking-wider group-hover:text-accent-teal transition-colors duration-500">
            {data.code}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-textSecondary/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {data.link ? 'Live Application' : 'In Development'}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="group relative flex flex-col p-5 rounded-xl transition-colors duration-300 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-accent-teal/30 hover:shadow-lg hover:shadow-accent-teal/5 w-full h-[420px] overflow-hidden">
      {/* Animated Image Container that glides to top and collapses */}
      <div 
        className={`w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
          isExpanded 
            ? 'max-h-0 opacity-0 -translate-y-full mb-0 pointer-events-none scale-95' 
            : 'max-h-48 opacity-100 translate-y-0 mb-3.5 scale-100'
        }`}
      >
        {data.link ? (
          <a 
            href={data.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block"
            tabIndex={isExpanded ? -1 : 0}
          >
            {imageContent}
          </a>
        ) : (
          imageContent
        )}
      </div>
      
      {/* Content Area - moves smoothly to top when image collapses */}
      <div className="flex flex-col flex-grow justify-between min-h-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2 gap-2 flex-shrink-0">
            {data.link ? (
              <a 
                href={data.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-textPrimary text-base hover:text-accent-teal transition-colors duration-300"
              >
                {data.title}
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-medium text-textPrimary text-base">
                  {data.title}
                </span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 tracking-wider">
                  Upcoming
                </span>
              </div>
            )}

            {data.link && (
              <a 
                href={data.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-textSecondary hover:text-accent-teal transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 p-1 flex-shrink-0"
                title="Open project"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>

          <div className="flex flex-col min-h-0">
            <div 
              className={`text-textSecondary/80 text-xs leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isExpanded 
                  ? 'max-h-[220px] overflow-y-auto pr-1' 
                  : 'max-h-[58px] overflow-hidden line-clamp-3'
              }`}
            >
              <p>{data.description}</p>
            </div>
            {isLong && (
              <button
                type="button"
                onClick={toggleExpand}
                className="mt-1.5 font-mono text-[11px] text-accent-teal hover:underline focus:outline-none inline-flex items-center gap-1 font-medium cursor-pointer self-start transition-colors duration-200"
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Show less ▲' : 'more...'}
              </button>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 pt-2.5 mt-2 border-t border-white/5">
          <p className="text-[9px] uppercase tracking-widest text-textSecondary/40 mb-1.5 font-mono font-semibold">Tech Stack</p>
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