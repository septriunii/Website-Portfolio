import React, { useState, useEffect, useRef } from 'react';
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
  const [displayCategory, setDisplayCategory] = useState(skill.category);
  const [displayTags, setDisplayTags] = useState<string[]>(skill.tags || []);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Keep state synced if skill prop changes
  useEffect(() => {
    setDisplayName(skill.name);
    setDisplayCategory(skill.category);
    setDisplayTags(skill.tags || []);
  }, [skill]);

  const startScramble = () => {
    setIsScrambling(true);
    let frame = 0;
    const totalFrames = 18; // ~350ms total animation

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      frame++;
      const ratio = frame / totalFrames;

      // Scramble Name
      const revealNameCount = Math.floor(ratio * skill.name.length);
      let newName = '';
      for (let i = 0; i < skill.name.length; i++) {
        if (i < revealNameCount) {
          newName += skill.name[i];
        } else if (skill.name[i] === ' ') {
          newName += ' ';
        } else {
          newName += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayName(newName);

      // Scramble Category
      const revealCatCount = Math.floor(ratio * skill.category.length);
      let newCat = '';
      for (let i = 0; i < skill.category.length; i++) {
        if (i < revealCatCount) {
          newCat += skill.category[i];
        } else if (skill.category[i] === ' ') {
          newCat += ' ';
        } else {
          newCat += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayCategory(newCat);

      // Scramble Tags
      if (skill.tags) {
        const newTags = skill.tags.map((tag) => {
          const revealTagCount = Math.floor(ratio * tag.length);
          let scrambledTag = '';
          for (let i = 0; i < tag.length; i++) {
            if (i < revealTagCount) {
              scrambledTag += tag[i];
            } else if (tag[i] === ' ') {
              scrambledTag += ' ';
            } else {
              scrambledTag += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
          return scrambledTag;
        });
        setDisplayTags(newTags);
      }

      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayName(skill.name);
        setDisplayCategory(skill.category);
        if (skill.tags) setDisplayTags(skill.tags);
        setIsScrambling(false);
      }
    }, 20);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const IconComponent = skill.icon;

  return (
    <div
      onMouseEnter={startScramble}
      className={`group relative p-3.5 sm:p-4 flex flex-col justify-between h-[130px] border-white/10 transition-colors duration-300 hover:bg-accent-teal/[0.04] cursor-default overflow-hidden select-none
        ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'} 
        ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'}
        ${index < totalSkills - 1 ? 'border-b' : ''}
        ${index >= totalSkills - 2 ? 'sm:border-b-0' : 'sm:border-b'}
        ${index >= totalSkills - 3 ? 'md:border-b-0' : 'md:border-b'}
      `}
    >
      {/* Subtle Matrix glow background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start gap-1.5 relative z-10">
        <div className="space-y-1 min-w-0 flex-1">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-accent-teal/60 group-hover:text-accent-teal transition-colors truncate">
            {displayCategory} // 0{index + 1}
          </span>
          <h3 className="text-xs sm:text-[13px] lg:text-sm font-bold font-mono tracking-tighter text-textPrimary group-hover:text-accent-teal transition-colors whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-0.5">
            <span className="truncate">{displayName}</span>
            {isScrambling && (
              <span className="animate-pulse text-accent-teal font-mono text-xs flex-shrink-0">_</span>
            )}
          </h3>
        </div>
        <div className="text-textSecondary/30 group-hover:text-accent-teal transition-colors duration-300 flex-shrink-0 pt-0.5">
          <IconComponent size={18} strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300 relative z-10 overflow-hidden max-h-[30px]">
        {displayTags.map((tag, i) => (
          <span key={i} className="font-mono text-[8px] uppercase tracking-tighter text-textSecondary group-hover:text-accent-teal/80 whitespace-nowrap">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
