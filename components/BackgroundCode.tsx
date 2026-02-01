import React, { useEffect, useRef } from 'react';

const SOURCE_CODE = `
import React, { useState, useEffect } from 'react';
import Spotlight from './components/Spotlight';
import BackgroundCode from './components/BackgroundCode';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import CertificateCard from './components/CertificateCard';
import Socials from './components/Socials';
import LoadingScreen from './components/LoadingScreen';
import { Experience, Project, Section, Certificate } from './types';

const sections: Section[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
];

const experiences: Experience[] = [
  { id: 'exp1', year: '2021', title: 'Lead Systems Engineer', company: 'Flux Foundry' },
  { id: 'exp2', year: '2018', title: 'Senior UI Engineer', company: 'Arclight Digital' }
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      <Spotlight />
      <BackgroundCode />
    </div>
  );
};
`.trim();

// Tokenize code into chunks
const CODE_CHUNKS = SOURCE_CODE.split(/\s+/).filter(word => word.length > 1);

const BackgroundCode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      text: string;
      opacity: number;
    }> = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.floor((canvas.width * canvas.height) / 2000);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: CODE_CHUNKS[Math.floor(Math.random() * CODE_CHUNKS.length)],
          opacity: Math.random() * 0.005 + 0.001 
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '10px "Roboto Mono", monospace';
      
      particles.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 250;
        
        let currentOpacity = p.opacity;
        if (distance < radius) {
          const factor = 1 - distance / radius;
          const glowIntensity = Math.pow(factor, 3) * 0.06; 
          currentOpacity = p.opacity + glowIntensity;
        }

        ctx.fillStyle = `rgba(94, 234, 212, ${currentOpacity})`;
        ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(init, 100);
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[6000] opacity-50"
    />
  );
};

export default BackgroundCode;