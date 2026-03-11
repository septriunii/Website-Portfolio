import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <div className="group relative flex flex-col p-5 rounded-lg transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-accent-teal/20 h-[320px] w-full overflow-hidden">
      {/* Compact Image Area */}
      <div className="relative w-full h-36 border border-white/10 rounded-md bg-[#0a0a0a] flex items-center justify-center overflow-hidden mb-4 group-hover:border-accent-teal/30 transition-colors duration-500">
        {/* Abstract Background for "Image" */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        
        <span className="relative z-10 font-mono text-xl font-bold text-white/10 tracking-tighter group-hover:text-accent-teal/20 transition-colors duration-500">
          {data.code}
        </span>

        {/* Description Overlay - Appears on Hover */}
        <div className="absolute inset-0 bg-obsidian/95 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-center transform translate-y-4 group-hover:translate-y-0">
          <p className="text-textSecondary text-xs leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow justify-center">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-textPrimary text-base group-hover:text-accent-teal transition-colors duration-300">
            {data.title}
          </h3>
          <span className="text-textSecondary group-hover:text-accent-teal transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
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