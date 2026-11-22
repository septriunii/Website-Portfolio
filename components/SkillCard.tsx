import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface SkillItem {
  name: string;
  icon: LucideIcon;
  category: string;
  strength: number;
  tags?: string[];
}

interface SkillCardProps {
  skill: SkillItem;
  index: number;
  totalSkills: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!<>?_=/[]';

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, totalSkills }) => {
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const titleOnly = skill.name === 'API Integration' || skill.name === 'Version Control';
  const frames = 18;

  const startScramble = () => {
    if (intervalRef.current !== null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let step = 1;
    setFrame(step);
    intervalRef.current = window.setInterval(() => {
      step++;
      if (step > frames) {
        window.clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setFrame(0);
      } else {
        setFrame(step);
      }
    }, 20);
  };

  useEffect(() => () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  }, []);

  const scramble = (text: string) => {
    if (!frame) return text;
    const start = Math.floor((frame - 1) * text.length / frames);
    const chars = titleOnly ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : CHARS;
    return Array.from(text, (char, i) => {
      if (i < start || !/[a-z0-9]/i.test(char)) return char;
      const glyph = chars[(char.charCodeAt(0) + frame * 7 + i * 13) % chars.length];
      return titleOnly && char === char.toLowerCase() ? glyph.toLowerCase() : glyph;
    }).join('');
  };
  const title = scramble(skill.name);
  const IconComponent = skill.icon;
  const isLastRowMd = Math.floor(index / 3) === Math.floor((totalSkills - 1) / 3);
  const isLastRowSm = Math.floor(index / 2) === Math.floor((totalSkills - 1) / 2);
  const isLastRowMobile = index === totalSkills - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        duration: 0.75, 
        delay: (index % 3) * 0.08, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={startScramble}
      className={`group relative p-3.5 sm:p-4 flex flex-col justify-between h-[130px] border-white/10 transition-colors duration-300 hover:bg-accent-teal/[0.04] cursor-default overflow-hidden select-none transform-gpu
        ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'} 
        ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'}
        ${isLastRowMobile ? 'border-b-0' : 'border-b'}
        ${isLastRowSm ? 'sm:border-b-0' : 'sm:border-b'}
        ${isLastRowMd ? 'md:border-b-0' : 'md:border-b'}
      `}
    >
      {/* Subtle Matrix glow background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start gap-1.5 relative z-10">
        <div className="space-y-1 min-w-0 flex-1">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-accent-teal/60 group-hover:text-accent-teal transition-colors truncate">
            {titleOnly ? skill.category : scramble(skill.category)} // {index + 1 < 10 ? '0' : ''}{index + 1}
          </span>
          <h3 aria-label={skill.name} className="break-words text-xs sm:text-[13px] lg:text-sm font-bold font-mono tracking-tighter text-textPrimary group-hover:text-accent-teal transition-colors">
            <span aria-hidden="true">{title.slice(0, -1)}<span className="whitespace-nowrap">{title.slice(-1)}<span className={frame ? 'text-accent-teal' : 'invisible'}>_</span></span></span>
          </h3>
        </div>
        <div className="text-textSecondary/30 group-hover:text-accent-teal transition-colors duration-300 flex-shrink-0 pt-0.5">
          <IconComponent size={18} strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300 relative z-10 overflow-hidden max-h-[34px]">
        {skill.tags?.map((tag, i) => (
          <span key={i} className="font-mono text-[8px] uppercase tracking-tighter text-textSecondary group-hover:text-accent-teal/80 whitespace-nowrap">
            #{titleOnly ? tag : scramble(tag)}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
