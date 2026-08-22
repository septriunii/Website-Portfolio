import React, { useEffect, useRef } from 'react';

const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!spotlightRef.current) return;
        // Finalized: Compact (270px radius), Subtle glow brightness (0.09 alpha), Indigo tint (129, 140, 248)
        spotlightRef.current.style.background = `radial-gradient(270px circle at ${x}px ${y}px, rgba(129, 140, 248, 0.09), transparent 80%)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={spotlightRef}
      id="ambient-hover-spotlight"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(270px circle at 0px 0px, rgba(129, 140, 248, 0.09), transparent 80%)`
      }}
    />
  );
};

export default Spotlight;
