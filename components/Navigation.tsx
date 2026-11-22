import React, { useEffect, useRef, useState } from 'react';
import type { Section } from '../types';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const entries = sections.map(({ id }) => ({
      id,
      section: document.getElementById(id),
      link: navRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`),
    }));
    const updateActiveSection = () => {
      let current = sections[0].id;
      for (const { id, section, link } of entries) {
        if (!section || !link) continue;
        const bounds = link.getBoundingClientRect();
        if (section.getBoundingClientRect().top <= bounds.top + bounds.height / 2) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
        current = sections[sections.length - 1].id;
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
    <nav ref={navRef} className="section-nav" aria-label="Portfolio sections">
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
