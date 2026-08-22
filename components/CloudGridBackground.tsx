import React, { useEffect, useState } from 'react';

const CloudGridBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 for gentle parallax
      const targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      const targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: targetX, y: targetY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Atmospheric Gradient Base */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#080d16] via-[#090e17] to-[#0a0a0a]"
      />

      {/* 2. Very Faint Grid Overlay */}
      <div 
        className="absolute inset-0 bg-faint-grid opacity-[0.45] transition-transform duration-700 ease-out"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 75%, transparent 100%)',
          transform: `translate3d(${mousePos.x * 4}px, ${mousePos.y * 4}px, 0)`
        }}
      />

      {/* 3. Fine Grid Intersection Crosses / Accents (Subtle High-Tech Touch) */}
      <div 
        className="absolute inset-0 bg-grid-dots opacity-[0.25]"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, rgba(0,0,0,1) 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, rgba(0,0,0,1) 20%, transparent 85%)',
        }}
      />

      {/* 4. Soft Vignette to blend into edges smoothly */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(10, 10, 10, 0.4) 85%, rgba(10, 10, 10, 0.8) 100%)'
        }}
      />
    </div>
  );
};

export default CloudGridBackground;
