import React, { useEffect, useRef } from 'react';

const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      // Reduced radius from 600px to 300px for a subtler effect
      spotlightRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(0, 240, 255, 0.15), transparent 80%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={spotlightRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(300px circle at 0px 0px, rgba(0, 240, 255, 0.15), transparent 80%)`
      }}
    />
  );
};

export default Spotlight;