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
    year: 'Present',
    title: 'FRONTEND WEB DEVELOPER',
    company: 'Self-Employed',
    description: 'I develop responsive and user-friendly web interfaces using modern frontend technologies such as React.js and Tailwind CSS. I build and customize websites based on client requirements, focusing on performance, accessibility, and clean UI/UX design.',
    technologies: ['React.js', 'Tailwind CSS', 'UI/UX Design', 'Responsive Design'],
  },
  {
    id: 'exp2',
    year: 'November 2023 – Present',
    title: 'WAREHOUSE–MOTORPOOL STAFF',
    company: '2M Construction and Enterprises',
    description: 'I manage daily warehouse and motorpool operations by monitoring construction materials and equipment, processing requests, and preparing usage reports to ensure proper tracking and availability of company resources. I also provide basic office IT support, including troubleshooting, computer setup, and routine system maintenance.',
    technologies: ['Operations Management', 'IT Support', 'Inventory Tracking', 'Troubleshooting'],
  },
  {
    id: 'exp3',
    year: 'January - April 2023',
    title: 'IT SUPPORT INTERN',
    company: 'Zamboanga Sibugay 2nd House of Representative District Office',
    description: 'I helped the office by handling IT-related tasks, which included troubleshooting and performing basic computer maintenance. In addition, I served as a data entry clerk, responsible for inputting and organizing confidential information within the office’s database. Through these experiences, I acquired insights into office operations and the company\'s culture',
    technologies: ['IT Support', 'Data Entry', 'Database Management', 'Computer Maintenance'],
  },
];

const projects: Project[] = [
  {
    id: 'proj1',
    code: 'SC_01_EC',
    title: 'SwiftCart',
    description: 'SwiftCart is an exquisite e-commerce website that showcases my prowess in JavaScript functions. With functioning features like an add-to-cart system, purchasing checkout, and dynamic page linking, it delivers a captivating browsing experience. Moreover, each restart surprises you with a fresh array of product displays, adding a touch of elegance to your shopping journey.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://septriunii.github.io/proj1.swiftcart.io/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fseptriunii.github.io%2Fproj1.swiftcart.io%2F?w=1280',
  },
  {
    id: 'proj2',
    code: 'AR_02_CB',
    title: 'AimRobotics',
    description: 'AimRobotics is a company brochure website showcasing my adept skill in website design. Highlighting my skill in website design, this project demonstrates my expertise in creating digital experiences. Prioritizing user-friendly navigation, engaging content, and an artfully designed layout, it effectively shows my ability to build impactful and visually pleasing online platforms that enhance businesses\' digital presence.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://septriunii.github.io/proj2.aimrobotics.io/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fseptriunii.github.io%2Fproj2.aimrobotics.io%2F?w=1280',
  },
  {
    id: 'proj3',
    code: 'RQ_03_MD',
    title: 'ReelQuest',
    description: 'ReelQuest is a movie search database that showcases my adeptness in harnessing the power of RESTful APIs to develop fully operational and dynamically engaging web applications. This skillful creation not only serves as a testament to my technical proficiency but also underscores my commitment to enhancing users\' entertainment journeys. By seamlessly integrating real-time data from APIs, ReelQuest offers an immersive experience, where users can explore an extensive collection of films.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://septriunii.github.io/proj3.reelquest.io/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fseptriunii.github.io%2Fproj3.reelquest.io%2F?w=1280',
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert1',
    year: '2023',
    title: 'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY',
    issuer: 'Dr. Aurelio Mendoza Memorial Colleges',
  },
  {
    id: 'cert2',
    year: '2024',
    title: 'JavaScript Algorithms and Data Structures (v8)',
    issuer: 'freeCodeCamp',
    link: 'https://www.freecodecamp.org/certification/anthony-alabado/javascript-algorithms-and-data-structures-v8',
  },
  {
    id: 'cert3',
    year: '2024',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    link: 'https://www.freecodecamp.org/certification/anthony-alabado/responsive-web-design',
  },
  {
    id: 'cert4',
    year: '2018',
    title: 'COMPUTER SYSTEM SERVICING NCII',
    issuer: 'Technical Education and Skills Development Authority',
  },
];

const skills = [
  { name: "ReactJS", icon: Atom, category: "Frontend", strength: 5, tags: ["Hooks", "Context API", "SSR"] },
  { name: "Tailwind CSS", icon: Wind, category: "Frontend", strength: 5, tags: ["Utility-first", "JIT", "Responsive"] },
  { name: "Javascript", icon: Code2, category: "Language", strength: 5, tags: ["ES6+", "Async/Await", "DOM"] },
  { name: "Python", icon: Terminal, category: "Language", strength: 3, tags: ["Automation", "Data Analysis", "Scripting"] },
  { name: "C++", icon: Cpu, category: "Language", strength: 4, tags: ["OOP", "Memory Management", "STL"] },
  { name: "Cybersecurity", icon: ShieldCheck, category: "Security", strength: 4, tags: ["Network Security", "Pen Testing", "Encryption"] },
  { name: "AI Integration", icon: Sparkles, category: "AI Tools", strength: 4, tags: ["Prompt Engineering", "LLM APIs", "Automation"] },
  { name: "Git/Github", icon: Github, category: "Tools", strength: 5, tags: ["Version Control", "CI/CD", "Collaboration"] },
  { name: "UI/UX Design", icon: Palette, category: "Design", strength: 4, tags: ["Figma", "Prototyping", "Accessibility"] },
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
                  A dedicated web developer focusing on front-end development specializing in React.js and Tailwind CSS. I am also well-versed in web development architecture and have a thorough understanding of how to integrate front-end interfaces with back-end systems.
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

                        <div className="flex flex-wrap gap-x-3 gap-y-1 opacity-30 group-hover:opacity-70 transition-opacity duration-500">
                          {skill.tags?.map((tag, i) => (
                            <span key={i} className="font-mono text-[8px] uppercase tracking-tighter text-textSecondary">
                              {tag}
                            </span>
                          ))}
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