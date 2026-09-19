import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Mail, Atom, Github, Palette, Cpu, Terminal, ShieldCheck, Sparkles, Database, Network } from 'lucide-react';
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
    year: 'May 2026 – Present',
    title: 'Warehouse Staff',
    company: 'Iron Peak Development Corporation',
    description: 'I manage daily warehouse and motorpool operations by monitoring construction materials and equipment, processing requests, and preparing usage reports to ensure proper tracking and availability of company resources. I also provide basic office IT support, including troubleshooting, computer setup, and routine system maintenance.',
    technologies: ['Reporting & Analysis', 'Management', 'IT Support', 'System Maintenance'],
  },
  {
    id: 'exp2',
    year: 'Nov 2023 – May 2026',
    title: 'Warehouse Staff - Equipment Supervisor',
    company: '2M Construction and Enterprises',
    description: 'I manage daily warehouse and motorpool operations by monitoring construction materials and equipment, processing requests, and preparing usage reports to ensure proper tracking and availability of company resources. I also provide basic office IT support, including troubleshooting, computer setup, and routine system maintenance.',
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
    code: 'SC_01_EC',
    title: 'SwiftCart',
    description: 'SwiftCart is an exquisite e-commerce website that showcases my prowess in JavaScript functions. With functioning features like an add-to-cart system, purchasing checkout, and dynamic page linking, it delivers a captivating browsing experience. Moreover, each restart surprises you with a fresh array of product displays, adding a touch of elegance to your shopping journey.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://swiftcart-io.vercel.app/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fswiftcart-io.vercel.app%2F?w=1280',
  },
  {
    id: 'proj2',
    code: 'CT_02_AI',
    title: 'Code Trace Explainer',
    description: 'Code Trace Explainer is an interactive code execution trace visualizer and natural language annotation engine. It empowers developers and students to step through algorithms line by line, inspect variable state mutations in real time, and build deep conceptual understanding with automated explanatory annotations and execution call stack tracing.',
    technologies: ['ReactJS', 'TypeScript', 'TailwindCSS', 'Execution Trace', 'UI/UX'],
    link: 'https://code-explainer-rust.vercel.app/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fcode-explainer-rust.vercel.app%2F?w=1280',
  },
  {
    id: 'proj3',
    code: 'RQ_03_MD',
    title: 'ReelQuest',
    description: 'ReelQuest is a movie search database that showcases my adeptness in harnessing the power of RESTful APIs to develop fully operational and dynamically engaging web applications. This skillful creation not only serves as a testament to my technical proficiency but also underscores my commitment to enhancing users\' entertainment journeys. By seamlessly integrating real-time data from APIs, ReelQuest offers an immersive experience, where users can explore an extensive collection of films.',
    technologies: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS'],
    link: 'https://reelquest-cyan.vercel.app/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Freelquest-cyan.vercel.app%2F?w=1280',
  },
  {
    id: 'proj4',
    code: 'SN_04_SEC',
    title: 'Secure Notes',
    description: 'Secure Notes is a privacy-first web application designed to demonstrate secure web development practices and defensive architecture. Built with salted password hashing via bcrypt, hardened session management with protected cookies, and strict role-based access control (RBAC) enforced on every request, it prevents unauthorized privilege escalation and protects sensitive user data.',
    technologies: ['ReactJS', 'TailwindCSS', 'Cybersecurity', 'Bcrypt', 'RBAC'],
    link: 'https://secure-notes-wine.vercel.app/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fsecure-notes-wine.vercel.app%2F?w=1280',
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

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-20">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            {/* Left Column (Fixed) */}
            <header className="relative lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-16 z-20">
              <div className="relative z-30">
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoading ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl font-extrabold tracking-tight text-textPrimary sm:text-5xl"
                >
                  Anthony <span className="text-accent-teal">Alabado</span>
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
                  className="mt-5 flex flex-wrap gap-4"
                >
                  <motion.a 
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/resume.txt" 
                    download="Anthony_Alabado_Resume.txt"
                    className="group relative inline-flex items-center justify-center w-44 py-3 font-mono text-sm font-medium text-obsidian transition-all duration-200 bg-accent-teal rounded-md hover:bg-accent-teal/90 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 focus:ring-offset-obsidian"
                  >
                    <span className="relative flex items-center gap-2">
                      <FileText size={16} />
                      Resume
                    </span>
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="mailto:anthonyalabado3712@gmail.com" 
                    className="group relative inline-flex items-center justify-center w-44 py-3 font-mono text-sm font-medium text-textPrimary transition-all duration-200 border border-white/20 rounded-md hover:bg-white/5 hover:border-accent-teal/50 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 focus:ring-offset-obsidian"
                  >
                    <span className="relative flex items-center gap-2">
                      <Mail size={16} />
                      Contact Me
                    </span>
                  </motion.a>
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
                className="relative z-30"
              >
                <Socials />
              </motion.div>
            </header>

            {/* Right Column (Scrollable) */}
            <main className="pt-24 lg:w-1/2 lg:py-24 z-20">
              
              <motion.section 
                id="about" 
                initial={{ opacity: 0, x: 28 }}
                animate={isLoading ? { opacity: 0, x: 28 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" 
                aria-label="About me"
              >
                <div className="text-textSecondary text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    Hello! I'm <b className="text-textPrimary">Anthony Alabado</b>, a <b className="text-textPrimary">Front-End Web Developer</b> passionate about creating exceptional digital experiences. I hold a <b className="text-textPrimary">Bachelor’s degree in Information Technology</b>, and my interest in web development began in high school when I was first introduced to it. Since then, I’ve continuously improved my skills through online courses and self-driven projects.
                  </p>
                  <p>
                    I focus on building visually appealing interfaces while maintaining <b className="text-textPrimary">clean, organized, and maintainable code</b>. By applying design thinking principles and strong coding practices, I aim to create user-friendly and reliable web applications.
                  </p>
                </div>
              </motion.section>

              <section 
                id="experience" 
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" 
                aria-label="Work experience"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Experience</h2>
                <div className="group/list">
                  {experiences.map((exp, index) => (
                    <ExperienceCard key={exp.id} data={exp} index={index} isLoading={isLoading} />
                  ))}
                </div>
              </section>

              <motion.section 
                id="projects" 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" 
                aria-label="Selected projects"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-textPrimary lg:sr-only mb-8">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start group/list">
                  {projects.map((proj) => (
                    <ProjectCard key={proj.id} data={proj} />
                  ))}
                </div>
              </motion.section>

              <section 
                id="skills" 
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" 
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
                className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" 
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