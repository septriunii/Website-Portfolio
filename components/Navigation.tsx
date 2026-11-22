import React, { useEffect, useState } from 'react';
import type { Section } from '../types';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!targets.length) return;

    const updateActiveSection = () => {
      const scrollTop = window.scrollY;
      let current = targets[0];
      if (scrollTop > 1) {
        const viewport = document.documentElement.clientHeight;
        if (scrollTop + viewport >= document.documentElement.scrollHeight - 1) {
          current = targets[targets.length - 1];
        } else {
          // Use one reading line in the content column in both scroll directions.
          const readingLine = viewport * 0.4;
          for (const section of targets.slice(1)) {
            if (section.getBoundingClientRect().top > readingLine) break;
            current = section;
          }
        }
      }
      setActiveSection(current.id);
    };

    updateActiveSection();
    const observer = new ResizeObserver(updateActiveSection);
    targets.forEach(section => observer.observe(section));
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      observer.disconnect();
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
