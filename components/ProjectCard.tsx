import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 p-6 rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/5 hover:shadow-lg mb-4 border border-transparent">
      <div className="mt-1">
        <div className="w-full h-[60px] border-2 border-borderCast rounded bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
           <span className="font-mono text-[10px] text-[#444]">{data.code}</span> 
        </div>
      </div>
      <div className="z-10">
        <h3 className="font-medium text-textPrimary text-base mb-2 group-hover:text-accent-teal transition-colors">
          {data.title}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 ml-1">
            ↗
          </span>
        </h3>
        <p className="text-textSecondary text-sm leading-relaxed mb-4">
          {data.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {data.technologies.map((tech) => (
            <li
              key={tech}
              className="font-mono text-xs text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;