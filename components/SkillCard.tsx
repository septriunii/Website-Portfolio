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
  const [displayName, setDisplayName] = useState(skill.name);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    if (intervalRef.current !== null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const started = performance.now();
    intervalRef.current = window.setInterval(() => {
      const progress = Math.min((performance.now() - started) / 800, 1);
      const position = Math.floor(progress * skill.name.length);
      const glyph = CHARS[Math.floor(Math.random() * CHARS.length)];
      setDisplayName(position < skill.name.length && skill.name[position] !== ' '
        ? skill.name.slice(0, position) + glyph + skill.name.slice(position + 1)
        : skill.name);
      if (progress === 1) {
        window.clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 48);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
      className={`group relative p-3.5 sm:p-4 flex flex-col justify-between skill-square border-white/10 transition-colors duration-300 hover:bg-accent-teal/[0.04] cursor-default overflow-hidden select-none transform-gpu
        ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'} 
        ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'}
        ${isLastRowMobile ? 'border-b-0' : 'border-b'}
        ${isLastRowSm ? 'sm:border-b-0' : 'sm:border-b'}
        ${isLastRowMd ? 'md:border-b-0' : 'md:border-b'}
      `}
    >
      {/* Subtle Matrix glow background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex justify-between items-start gap-1.5 relative z-10">
          <div className="space-y-1 min-w-0 flex-1">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-accent-teal/60 group-hover:text-accent-teal transition-colors truncate">
              {skill.category} // {index + 1 < 10 ? '0' : ''}{index + 1}
            </span>

          </div>
          <div className="text-textSecondary/30 group-hover:text-accent-teal transition-colors duration-300 flex-shrink-0 pt-0.5">
            <IconComponent size={18} strokeWidth={1.5} />
          </div>
        </div>

        <h3 aria-label={skill.name} className="mt-1 whitespace-nowrap font-bold font-mono tracking-tighter text-textPrimary group-hover:text-accent-teal transition-colors"
          style={{ fontSize: `min(0.875rem, ${155 / skill.name.length}cqw)` }}>
          <span aria-hidden="true">{displayName}</span>
        </h3>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300 relative z-10 overflow-hidden max-h-[34px]">
        {skill.tags?.map((tag, i) => (
          <span key={i} className="font-mono text-[8px] uppercase tracking-tighter text-textSecondary group-hover:text-accent-teal/80 whitespace-nowrap">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
