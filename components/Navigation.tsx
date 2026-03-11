import React, { useEffect, useState } from 'react';
import { Section } from '../types';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Detection offset

      // Find the section that is currently in view
      // We iterate in reverse to find the "lowest" section that has passed the scroll threshold
      const currentSection = [...sections].reverse().find((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          return scrollPosition >= element.offsetTop;
        }
        return false;
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky header/padding
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className="hidden lg:block mt-10">
      <ul className="w-max">
        {sections.map((section) => (
          <li key={section.id} className="group flex items-center py-2">
            <a
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={`flex items-center text-xs tracking-widest uppercase font-mono font-bold transition-all duration-300 group hover:text-textPrimary ${
                activeSection === section.id ? 'text-textPrimary' : 'text-textSecondary'
              }`}
            >
              <span
                className={`mr-4 h-px bg-current transition-all duration-300 ${
                  activeSection === section.id ? 'w-16' : 'w-8 group-hover:w-16'
                }`}
              ></span>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
