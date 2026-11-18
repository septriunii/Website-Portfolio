import React from 'react';
import { motion } from 'motion/react';
import { Experience } from '../types';

interface ExperienceCardProps {
  data: Experience;
  index: number;
  isLoading?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ data, index, isLoading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={isLoading ? { opacity: 0, x: 28 } : { opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.85, 
        delay: 0.2 + index * 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 px-6 py-5 rounded-lg transition-colors duration-300 bg-[#101b18]/50 hover:bg-[#15251e] hover:border-accent-teal/40 hover:shadow-lg mb-3 border border-[#314c40]/60"
    >
      <header className="font-mono text-xs font-semibold uppercase tracking-wide text-textSecondary mt-1">
        {data.year}
      </header>
      <div className="z-10">
        <h3 className="font-medium text-textPrimary text-base mb-2 group-hover:text-accent-teal transition-colors">
          {data.title} • {data.company}
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
    </motion.div>
  );
};

export default ExperienceCard;
