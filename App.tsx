import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, FileText, Mail, Atom, Github, Palette, Cpu, Terminal, ShieldCheck, Sparkles, Database, Network } from 'lucide-react';
import Spotlight from './components/Spotlight';
import CloudGridBackground from './components/CloudGridBackground';
import BackgroundCode from './components/BackgroundCode';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import CertificateCard from './components/CertificateCard';
import SkillCard from './components/SkillCard';
import Socials from './components/Socials';
import LoadingScreen from './components/LoadingScreen';
import { Experience, Project, Section, Certificate } from './types';

const sections: Section[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
];

const experiences: Experience[] = [
  {
    id: 'freelance',
    year: 'Present',
    title: 'Front-end Web Developer',
    company: 'Self-employed',
    description: 'I build and customize responsive React interfaces for clients, translating their requirements into accessible layouts with Tailwind CSS.',
    technologies: ['React', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    id: 'exp1',
    year: 'May 2026 – Present',
    title: 'Warehouse Staff',
    company: 'Iron Peak Development Corporation',
    description: 'I track construction materials and equipment requests, prepare usage reports, and keep office computers running through setup, troubleshooting, and routine maintenance.',
    technologies: ['Reporting & Analysis', 'Management', 'IT Support', 'System Maintenance'],
  },
  {
    id: 'exp2',
    year: 'Nov 2023 – May 2026',
    title: 'Warehouse Staff - Equipment Supervisor',
    company: '2M Construction and Enterprises',
    description: 'I supervised equipment tracking across the warehouse and motorpool, processed material requests, and reported on resource usage.',
    technologies: ['Technical Support', 'Accounting', 'Operations Management', 'Inventory Tracking'],
  },
  {
    id: 'exp3',
    year: 'Jan 2023 – Apr 2023',
    title: 'IT Support Intern',
    company: 'House of Representatives - Philippines',
    description: 'Installed and configured office hardware, printers, and computers while providing technical support to staff to improve daily operational efficiency. Managed confidential databases for district community projects and financial assistance requests while assisting with local outreach distribution.',
    technologies: ['Microsoft Office', 'Graphic Design', 'IT Support', 'Database Management'],
  },
];

const projects: Project[] = [
  {
    id: 'proj1',
    code: 'MP_01_GEO',
    title: 'MAPAhayag',
    description: 'Explore Philippine census data on an interactive map, from the national view down to individual barangays where boundary data is available.',
    contribution: 'Building on tordecilla’s open-source map, MAPAhayag adds a React interface, geographic profiles, and barangay-level navigation.',
    technologies: ['React', 'TypeScript', 'D3.js', 'GeoJSON / PSGC'],
    link: 'https://mapahayag-ph.vercel.app/#/',
    githubLink: 'https://github.com/septriunii/mapahayag-project',
    image: '/assets/projects/mapahayag.webp',
  },
  {
    id: 'proj2',
    code: 'SC_02_EC',
    title: 'SwiftCart',
    description: 'Browse products by category, add items to a cart, and follow a purchase through checkout in this React storefront.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://swiftcart-io.vercel.app/',
    githubLink: 'https://github.com/septriunii/swiftcart.io',
    image: '/assets/projects/swiftcart.webp',
  },
  {
    id: 'proj3',
    code: 'RQ_03_MD',
    title: 'ReelQuest',
    description: 'Search the OMDb catalog for movies and series, filter the results, and save titles to a watchlist.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://reelquest-cyan.vercel.app/',
    githubLink: 'https://github.com/septriunii/reelQuest',
    image: '/assets/projects/reelquest.webp',
  },
  {
    id: 'proj4',
    code: 'QT_04_FIN',
    title: 'Quant Trading System',
    description: 'Test trading strategies against historical market data and inspect how signals, position sizing, and risk rules affect performance.',
    technologies: ['Python', 'Quantitative Finance', 'Backtesting', 'Algorithmic Trading', 'Data Analysis'],
    githubLink: 'https://github.com/septriunii/quant-trading-system',
    image: '/assets/aistudio/Screenshot_2026-11-10_150549_975fc01b.png',
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert1',
    year: 'Jul 2026',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    description: 'Earned a digital credential demonstrating foundational knowledge in core cybersecurity principles, threat intelligence, cryptography, and defense mechanisms through IBM SkillsBuild.',
    skills: ['Cybersecurity Fundamentals', 'Cyber Threat Intelligence (CTI)', 'Cryptography', 'Threat Groups', 'Social Engineering'],
    link: 'https://www.credly.com/badges/112f9239-1596-4f8f-b0d7-7930617f7edf/linked_in_profile',
  },
  {
    id: 'cert2',
    year: 'Dec 2024',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    description: 'Successfully completed coursework covering foundational concepts in network security, identifying potential threats, and understanding core protection strategies.',
    skills: ['Network Security', 'Threat Detection', 'Cyber Defense'],
    link: 'https://www.credly.com/badges/3c7b37db-8720-4439-82df-085d118bf183/linked_in_profile',
  },
  {
    id: 'cert3',
    year: 'Jan 2024',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    description: 'Demonstrates proficiency in core JavaScript fundamentals, object-oriented programming, functional programming, and algorithmic data structures.',
    skills: ['JavaScript', 'Data Structures', 'Algorithms', 'Problem Solving'],
    link: 'https://www.freecodecamp.org/certification/anton-alabado/javascript-algorithms-and-data-structures-v8',
  },
  {
    id: 'cert4',
    year: 'Jan 2024',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    description: 'Validates competence in building modern, screen-responsive web application layouts using structured HTML5 and standard CSS styling practices.',
    skills: ['Responsive Web Design', 'HTML5', 'CSS3', 'Layout Frameworks'],
    link: 'https://www.freecodecamp.org/certification/anton-alabado/responsive-web-design',
  },
];

const skills = [
  { name: "ReactJS", icon: Atom, category: "Frontend", strength: 5, tags: ["Hooks", "Context API", "SSR"] },
  { name: "Cyber Security", icon: ShieldCheck, category: "Security", strength: 4, tags: ["Network Security", "Pen Testing", "Encryption"] },
  { name: "Applied AI", icon: Sparkles, category: "AI Tools", strength: 4, tags: ["Prompt Engineering", "LLM APIs", "Automation"] },
  { name: "Git and GitHub", icon: Github, category: "Tools", strength: 5, tags: ["Version Control", "CI/CD", "Collaboration"] },
  { name: "C++", icon: Cpu, category: "Language", strength: 4, tags: ["OOP", "Memory Management", "STL"] },
  { name: "Python", icon: Terminal, category: "Language", strength: 3, tags: ["Automation", "Data Analysis", "Scripting"] },
  { name: "UI/UX Design", icon: Palette, category: "Design", strength: 4, tags: ["Figma", "Prototyping", "Accessibility"] },
  { name: "API & Data Integration", icon: Database, category: "Backend", strength: 5, tags: ["REST APIs", "Axios / Fetch", "Async Data", "JSON / Errors"] },
  { name: "Networking", icon: Network, category: "Infrastructure", strength: 4, tags: ["TCP/IP", "DNS / DHCP", "Routing & Switching"] },
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
      <CloudGridBackground />
      <BackgroundCode />

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none bg-noise mix-blend-overlay"></div>

      <div className="overflow-x-clip">
        <Spotlight />

        <div className="mx-auto min-h-screen max-w-screen-xl px-5 py-8 font-sans sm:px-8 md:px-12 md:py-12 lg:px-14 lg:py-0 relative z-20">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-20">
            
            {/* Left Column (Fixed) */}
            <header className="relative lg:sticky lg:top-0 lg:flex lg:self-start lg:min-h-[min(100svh,48rem)] lg:flex-col lg:justify-between lg:py-12 z-20">
              <div className="relative z-30">
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl font-extrabold tracking-tight text-textPrimary sm:text-5xl"
                >
                  Anton <span className="text-accent-teal">Alabado</span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 text-lg font-medium tracking-tight italic text-textPrimary sm:text-xl"
                >
                  Front-end developer
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 max-w-sm leading-relaxed text-textSecondary text-sm sm:text-[13.5px]"
                >
                  Dedicated front-end developer specializing in front-end development using React.js with an active focus on cybersecurity and secure system architecture. Skilled in connecting front-end systems with back-end architectures, while applying security principles and cyber defense practices to build secure, resilient software.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="profile-actions"
                >
                  <a href="#projects" className="profile-action profile-action-primary">
                    View projects <ArrowDownRight size={16} aria-hidden="true" />
                  </a>
                  <a href="/resume.txt" download="Anton_Alabado_Resume.txt" className="profile-action">
                    <FileText size={15} aria-hidden="true" /> Resume
                  </a>
                  <a href="mailto:anthonyalabado3712@gmail.com" className="profile-action">
                    <Mail size={15} aria-hidden="true" /> Contact Me
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Navigation sections={sections} />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 28 }}
                animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 hidden lg:block"
              >
                <Socials />
              </motion.div>
            </header>

            {/* Right Column (Scrollable) */}
            <main className="min-w-0 pt-7 md:pt-10 lg:py-12 z-20">
              <section id="projects" aria-label="Selected projects" className="mb-14 scroll-mt-5 lg:mb-20 lg:scroll-mt-12">
                <h2 className="sr-only">Projects</h2>
                <ProjectCard data={projects[0]} featured />
                <h3 className="project-list-title">More projects</h3>
                <div className="project-list">
                  {projects.slice(1).map((project) => (
                    <ProjectCard key={project.id} data={project} />
                  ))}
                </div>
              </section>
              
              <motion.section
                id="about" 
                initial={{ opacity: 0, x: 28 }}
                animate={isLoading ? { opacity: 0, x: 28 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 scroll-mt-16 md:mb-16 lg:mb-20 lg:scroll-mt-20" 
                aria-label="About me"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary mb-6">About</h2>
                <div className="text-textSecondary text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    Hello! I'm <b className="text-textPrimary">Anton Alabado</b>, a <span className="inline px-1 py-[1px] rounded-[2px] bg-accent-teal text-obsidian font-semibold [box-decoration-break:clone]">Front-End Web Developer</span> passionate about creating exceptional digital experiences. I hold a Bachelor’s degree in <span className="inline px-1 py-[1px] rounded-[2px] bg-accent-teal text-obsidian font-bold [box-decoration-break:clone]">Information Technology</span>, and my interest in web development began in high school when I was first introduced to it. Since then, I’ve continuously improved my skills through online courses and self-driven projects.
                  </p>
                  <p>
                    I focus on building visually appealing interfaces while maintaining <b className="text-textPrimary">clean, organized, and maintainable code</b>. By applying <span className="inline px-1 py-[1px] rounded-[2px] bg-accent-teal text-obsidian font-semibold [box-decoration-break:clone]">design thinking principles</span> and <span className="inline px-1 py-[1px] rounded-[2px] bg-accent-teal text-obsidian font-semibold [box-decoration-break:clone]">strong coding practices</span>, I aim to create user-friendly and reliable web applications.
                  </p>
                </div>
              </motion.section>

              <section 
                id="experience" 
                className="mb-12 scroll-mt-16 md:mb-16 lg:mb-20 lg:scroll-mt-20" 
                aria-label="Work experience"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Experience</h2>
                <div className="group/list">
                  {experiences.map((exp, index) => (
                    <ExperienceCard key={exp.id} data={exp} index={index} isLoading={isLoading} />
                  ))}
                </div>
              </section>

              <section 
                id="skills" 
                className="mb-12 scroll-mt-16 md:mb-16 lg:mb-20 lg:scroll-mt-20" 
                aria-label="Skills"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Skills</h2>
                
                <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.01]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {skills.map((skill, index) => (
                      <SkillCard 
                        key={index}
                        skill={skill}
                        index={index}
                        totalSkills={skills.length}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-textSecondary/40 italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse"></div>
                  <span>System core technologies verified and active</span>
                </div>
              </section>

              <section 
                id="certificates" 
                className="mb-12 scroll-mt-16 md:mb-16 lg:mb-20 lg:scroll-mt-20" 
                aria-label="Certificates"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Certificates</h2>
                <div className="group/list">
                  {certificates.map((cert, index) => (
                    <CertificateCard key={cert.id} data={cert} index={index} />
                  ))}
                </div>
              </section>

              <motion.footer 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 border-t border-white/5 text-sm text-textSecondary font-mono"
              >
                <div className="mb-6 lg:hidden"><Socials /></div>
                <p className="mb-2">
                   / {new Date().getFullYear()} / STABLE_BUILD
                </p>
                <p>
                  Built with React.js & Tailwind CSS.
                </p>
              </motion.footer>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
