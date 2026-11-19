import type React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: LucideIcon;
  category: string;
  tags: string[];
}

const SkillCard: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <li className="skill-card">
      <div className="skill-card-heading">
        <h3>{skill.name}</h3>
        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <p className="skill-category">{skill.category}</p>
      <p className="skill-details">{skill.tags.join(' · ')}</p>
    </li>
  );
};

export default SkillCard;
