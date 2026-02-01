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

// Data definitions
const sections: Section[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
];

const experiences: Experience[] = [
  {
    id: 'exp1',
    year: '2021 — Present',
    title: 'Lead Systems Engineer',
    company: 'Flux Foundry',
    description: 'Architected the core rendering engine for high-traffic real-time dashboards. Reduced latency by 40% through custom WASM implementations.',
    technologies: ['TypeScript', 'Rust', 'WebAssembly', 'React'],
  },
  {
    id: 'exp2',
    year: '2018 — 2021',
    title: 'Senior UI Engineer',
    company: 'Arclight Digital',
    description: 'Developed a design system used by over 50 internal products, focusing on accessibility and atomic CSS principles.',
    technologies: ['Design Systems', 'Next.js', 'SCSS'],
  },
  {
    id: 'exp3',
    year: '2016 — 2018',
    title: 'Frontend Developer',
    company: 'Monolith Co.',
    description: 'Specialized in rapid prototyping and high-fidelity interaction design for Fortune 500 financial clients.',
    technologies: ['JavaScript', 'GSAP', 'WebGL'],
  },
];

const projects: Project[] = [
  {
    id: 'proj1',
    code: 'PRJ_01_OS',
    title: 'Obsidian Shell v2',
    description: 'A headless terminal environment built for the browser, featuring customizable themes and plugin architecture.',
    technologies: ['Vite', 'Xterm.js', 'Tailwind'],
  },
  {
    id: 'proj2',
    code: 'PRJ_02_GRPH',
    title: 'Spectra Graph',
    description: 'Visualizing complex datasets through force-directed graphs with specialized hardware acceleration.',
    technologies: ['D3.js', 'Inter', 'Three.js'],
  },
  {
    id: 'proj3',
    code: 'PRJ_03_MSH',
    title: 'Neural Mesh',
    description: 'Distributed computing visualization tool for monitoring node health across multi-region clusters.',
    technologies: ['Golang', 'WebGL', 'Redis'],
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert1',
    year: '2023',
    title: 'Advanced Kubernetes Operator',
    issuer: 'Cloud Native Computing Foundation',
  },
  {
    id: 'cert2',
    year: '2022',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
  },
  {
    id: 'cert3',
    year: '2021',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
  },
  {
    id: 'cert4',
    year: '2020',
    title: 'Professional Data Engineer',
    issuer: 'Google Cloud Platform',
  }
];

const skills = [
  "ReactJS", "Tailwind CSS", "TypeScript", "Next.js", "Web Architecture", 
  "Node.js", "PostgreSQL", "Docker", "Git", "REST APIs", 
  "HTML5", "CSS3", "JavaScript", "UI/UX Design"
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400); // 2.4 seconds to allow progress bar to complete visually

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      
      {/* Background Code - Global effect */}
      <BackgroundCode />

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none bg-noise mix-blend-overlay"></div>

      <div className={`transition-opacity duration-1000 delay-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Spotlight />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-20">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            {/* Left Column (Fixed) */}
            <header className="relative lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 z-20">
              <div className="relative z-30">
                <h1 className="text-4xl font-bold tracking-tight text-textPrimary sm:text-5xl">
                  Anthony <span className="text-accent-teal">Alabado</span>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-textPrimary sm:text-xl">
                  Front-End Web Developer
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-textSecondary text-base">
                  I am a dedicated web developer focusing on front-end development specializing in ReactJS and Tailwind CSS. I am well-versed in web development architecture and have a thorough understanding of how to integrate front-end interfaces with back-end systems.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex gap-4 w-full max-w-[280px]">
                  <a 
                    href="#" 
                    className="flex-1 inline-flex items-center justify-center py-3 border border-accent-teal/40 text-accent-teal font-mono text-xs font-bold tracking-widest transition-all duration-300 hover:bg-accent-teal hover:text-obsidian hover:border-accent-teal"
                  >
                    RESUME
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 inline-flex items-center justify-center py-3 border border-accent-teal/40 text-accent-teal font-mono text-xs font-bold tracking-widest transition-all duration-300 hover:bg-accent-teal hover:text-obsidian hover:border-accent-teal"
                  >
                    CONTACT ME
                  </a>
                </div>
                
                <Navigation sections={sections} />
              </div>

              <div className="relative z-30">
                <Socials />
              </div>
            </header>

            {/* Right Column (Scrollable) */}
            <main className="pt-24 lg:w-1/2 lg:py-24 z-20">
              
              <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
                <div className="text-textSecondary text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    Hello! I’m <b className="text-textPrimary font-medium">Anthony Alabado</b>, a Front-End Web Developer with a strong passion for creating engaging and user-focused digital experiences. I hold a Bachelor’s degree in Information Technology, and my interest in web development began in high school, where I was first introduced to the world of building for the web. Since then, I’ve continued learning through online courses and self-driven projects.
                  </p>
                  <p>
                    I specialize in crafting visually appealing interfaces backed by clean, maintainable code. <b className="text-textPrimary font-medium">Design thinking and code hygiene</b> are central to my workflow, allowing me to build well-structured, user-friendly experiences while continuously improving my skills and exploring new challenges.
                  </p>
                </div>
              </section>

              <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
                <div className="group/list">
                  {experiences.map((exp) => (
                    <ExperienceCard key={exp.id} data={exp} />
                  ))}
                </div>
              </section>

              <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected projects">
                <div className="group/list">
                  {projects.map((proj) => (
                    <ProjectCard key={proj.id} data={proj} />
                  ))}
                </div>
              </section>

              <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Skills">
                 <div className="flex flex-wrap gap-3">
                   {skills.map((skill, index) => (
                     <span key={index} className="font-mono text-sm text-accent-teal bg-accent-teal/10 px-4 py-2 rounded-md hover:bg-accent-teal/20 transition-colors cursor-default">
                       {skill}
                     </span>
                   ))}
                 </div>
              </section>

              <section id="certificates" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Certificates">
                <div className="group/list">
                  {certificates.map((cert) => (
                    <CertificateCard key={cert.id} data={cert} />
                  ))}
                </div>
              </section>

              <footer className="pt-10 border-t border-white/5 text-sm text-textSecondary font-mono">
                <p className="mb-2">
                   / 010110 
                </p>
                <p>
                  Designed in the void. Built with React.js & Tailwind. <br />
                  © 2024 Anthony Alabado. All systems nominal.
                </p>
              </footer>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;