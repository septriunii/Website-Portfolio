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
        spotlightRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(var(--color-accent-rgb, 94, 234, 212), 0.10), transparent 80%)`;
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
        background: `radial-gradient(280px circle at 0px 0px, rgba(var(--color-accent-rgb, 94, 234, 212), 0.10), transparent 80%)`
      }}
    />
  );
};

export default Spotlight;
