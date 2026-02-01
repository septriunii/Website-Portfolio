import React, { useEffect, useState } from 'react';
import { Section } from '../types';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    // We use a broader detection area to ensure sections are caught during fast scrolls
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Viewport margin: Top -20% (ignore header area), Bottom -45% (trigger when section enters upper half)
        rootMargin: '-20% 0px -45% 0px', 
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

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
    <nav className="hidden lg:block mt-16">
      <ul className="w-max">
        {sections.map((section) => (
          <li key={section.id} className="group flex items-center py-3">
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
