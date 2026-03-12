import React, { useState, useEffect } from 'react';
import { FileText, Mail, Atom, Wind, Github, Palette, Cpu, Code2, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
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

// Data definitions - Restored to original placeholders
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
    description: 'Architected the core rendering engine for high-traffic real-time dashboards. Reduced latency by 40% through custom WASM implementations and optimized React reconciliation.',
    technologies: ['TypeScript', 'Rust', 'WebAssembly', 'React'],
  },
  {
    id: 'exp2',
    year: '2018 — 2021',
    title: 'Senior UI Engineer',
    company: 'Arclight Digital',
    description: 'Developed a comprehensive design system used by over 50 internal products, focusing on accessibility, performance, and atomic CSS principles.',
    technologies: ['Design Systems', 'Next.js', 'SCSS'],
  },
  {
    id: 'exp3',
    year: '2016 — 2018',
    title: 'Frontend Developer',
    company: 'Monolith Co.',
    description: 'Specialized in rapid prototyping and high-fidelity interaction design for Fortune 500 financial clients, utilizing GLSL for complex data visualizations.',
    technologies: ['JavaScript', 'GSAP', 'WebGL'],
  },
];

const projects: Project[] = [
  {
    id: 'proj1',
    code: 'PRJ_01_OS',
    title: 'Obsidian Shell v2',
    description: 'A headless terminal environment built for the browser, featuring customizable themes, plugin architecture, and integrated shell scripting support.',
    technologies: ['Vite', 'Xterm.js', 'Tailwind'],
  },
  {
    id: 'proj2',
    code: 'PRJ_02_GRPH',
    title: 'Spectra Graph',
    description: 'Visualizing complex datasets through force-directed graphs with specialized hardware acceleration for thousands of concurrent nodes.',
    technologies: ['D3.js', 'Inter', 'Three.js'],
  },
  {
    id: 'proj3',
    code: 'PRJ_03_MSH',
    title: 'Neural Mesh',
    description: 'Distributed computing visualization tool for monitoring node health and traffic patterns across multi-region server clusters.',
    technologies: ['Golang', 'WebGL', 'Redis'],
  },
  {
    id: 'proj4',
    code: 'PRJ_04_SYNC',
    title: 'Quantum Sync',
    description: 'High-performance state synchronization library for distributed systems, ensuring eventual consistency with minimal overhead.',
    technologies: ['TypeScript', 'WebSockets', 'Node.js'],
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
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
  },
  {
    id: 'cert3',
    year: '2021',
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
  },
];

const skills = [
  { name: "ReactJS", icon: Atom, category: "Frontend", strength: 5 },
  { name: "Tailwind CSS", icon: Wind, category: "Frontend", strength: 5 },
  { name: "Javascript", icon: Code2, category: "Language", strength: 5 },
  { name: "Python", icon: Terminal, category: "Language", strength: 3 },
  { name: "C++", icon: Cpu, category: "Language", strength: 4 },
  { name: "Cybersecurity", icon: ShieldCheck, category: "Security", strength: 4 },
  { name: "AI Integration", icon: Sparkles, category: "AI Tools", strength: 4 },
  { name: "Git/Github", icon: Github, category: "Tools", strength: 5 },
  { name: "UI/UX Design", icon: Palette, category: "Design", strength: 4 },
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
      <BackgroundCode />

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none bg-noise mix-blend-overlay"></div>

      <div className={`transition-opacity duration-1000 delay-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Spotlight />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-20">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            {/* Left Column (Fixed) */}
            <header className="relative lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-16 z-20">
              <div className="relative z-30">
                <h1 className="text-4xl font-bold tracking-tight text-textPrimary sm:text-5xl">
                  Anthony <span className="text-accent-teal">Alabado</span>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-textPrimary sm:text-xl">
                  Frontend Web Developer
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-textSecondary text-base">
                  I’m a web developer focused on front-end development using ReactJS and Tailwind CSS, with a solid understanding of web architecture and front-end to back-end integration.
                </p>

                <div className="mt-5 flex flex-wrap gap-4">
                  <a 
                    href="/resume.txt" 
                    download="Anthony_Alabado_Resume.txt"
                    className="group relative inline-flex items-center justify-center w-44 py-3 font-mono text-sm font-medium text-obsidian transition-all duration-200 bg-accent-teal rounded-md hover:bg-accent-teal/90 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 focus:ring-offset-obsidian"
                  >
                    <span className="relative flex items-center gap-2">
                      <FileText size={16} />
                      Resume
                    </span>
                  </a>
                  <a href="mailto:anthonyalabado3712@gmail.com" 
                    className="group relative inline-flex items-center justify-center w-44 py-3 font-mono text-sm font-medium text-textPrimary transition-all duration-200 border border-white/20 rounded-md hover:bg-white/5 hover:border-accent-teal/50 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 focus:ring-offset-obsidian"
                  >
                    <span className="relative flex items-center gap-2">
                      <Mail size={16} />
                      Contact Me
                    </span>
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
                    Hello! I'm <b className="text-textPrimary">Anthony Alabado</b>, a <b className="text-textPrimary">Front-End Web Developer</b> passionate about creating exceptional digital experiences. I hold a <b className="text-textPrimary">Bachelor’s degree in Information Technology</b>, and my interest in web development began in high school when I was first introduced to it. Since then, I’ve continuously improved my skills through online courses and self-driven projects.
                  </p>
                  <p>
                    I focus on building visually appealing interfaces while maintaining <b className="text-textPrimary">clean, organized, and maintainable code</b>. By applying design thinking principles and strong coding practices, I aim to create user-friendly and reliable web applications.
                  </p>
                </div>
              </section>

              <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Experience</h2>
                <div className="group/list">
                  {experiences.map((exp) => (
                    <ExperienceCard key={exp.id} data={exp} />
                  ))}
                </div>
              </section>

              <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected projects">
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 group/list">
                  {projects.map((proj) => (
                    <ProjectCard key={proj.id} data={proj} />
                  ))}
                </div>
              </section>

              <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Skills">
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Skills</h2>
                
                <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.01]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {skills.map((skill, index) => (
                      <div 
                        key={index}
                        className={`group p-6 flex flex-col justify-between min-h-[140px] border-white/10 transition-all duration-500 hover:bg-accent-teal/[0.02]
                          ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'} 
                          ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'}
                          ${index < skills.length - 1 ? 'border-b' : ''}
                          ${index >= skills.length - 2 ? 'sm:border-b-0' : 'sm:border-b'}
                          ${index >= skills.length - 3 ? 'md:border-b-0' : 'md:border-b'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <span className="block font-mono text-[9px] uppercase tracking-widest text-accent-teal/50">
                              {skill.category} // 0{index + 1}
                            </span>
                            <h3 className="text-base font-medium text-textPrimary group-hover:text-accent-teal transition-colors">
                              {skill.name}
                            </h3>
                          </div>
                          <div className="text-textSecondary/20 group-hover:text-accent-teal/40 transition-colors duration-500">
                            <skill.icon size={24} strokeWidth={1} />
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div 
                                key={i}
                                className={`w-1.5 h-3 rounded-full transition-all duration-500 delay-[${i * 100}ms]
                                  ${i < skill.strength 
                                    ? 'bg-accent-teal/40 group-hover:bg-accent-teal group-hover:shadow-[0_0_8px_rgba(45,212,191,0.4)]' 
                                    : 'bg-white/5'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="font-mono text-[8px] text-textSecondary/30 uppercase tracking-tighter">
                            Status: Optimized
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-textSecondary/40 italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse"></div>
                  <span>System core technologies verified and active</span>
                </div>
              </section>

              <section id="certificates" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Certificates">
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Certificates</h2>
                <div className="group/list">
                  {certificates.map((cert) => (
                    <CertificateCard key={cert.id} data={cert} />
                  ))}
                </div>
              </section>

              <footer className="pt-10 border-t border-white/5 text-sm text-textSecondary font-mono">
                <p className="mb-2">
                   / {new Date().getFullYear()} / STABLE_BUILD
                </p>
                <p>
                  Loosely designed in Figma and coded in VS Code. <br />
                  Built with React.js & Tailwind CSS.
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