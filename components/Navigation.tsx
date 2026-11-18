import React, { useEffect, useState } from 'react';
import type { Section } from '../types';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id));
    const updateActiveSection = () => {
      const threshold = Math.min(window.innerHeight / 3, 200);
      let current = sections[0].id;
      for (const element of elements) {
        if (element && element.getBoundingClientRect().top <= threshold) current = element.id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sections]);

  return (
    <nav className="section-nav" aria-label="Portfolio sections">
      <ul>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
