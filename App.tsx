
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from './constants';

// Animation Wrapper Component
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#030712] text-white">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-indigo-900/20 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] md:w-[50%] h-[50%] bg-rose-900/20 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 glass border-b-0 border-white/5 px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-lg md:text-xl font-bold tracking-tighter gradient-text shrink-0 uppercase">
            {PORTFOLIO_DATA.name}
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-block px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all active:scale-95">
              Hire Me
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 py-6 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={closeMenu} className="text-white/70 hover:text-white transition-colors">{link.name}</a>
              ))}
              <a href="#contact" onClick={closeMenu} className="w-full text-center px-5 py-3 bg-white text-black font-bold rounded-xl">
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 md:pt-48 pb-16 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-mono text-indigo-400">
              OPEN FOR OPPORTUNITIES
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Building the next generation of <span className="gradient-text">digital apps.</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto md:mx-0">
              {PORTFOLIO_DATA.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="#projects" className="px-8 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 text-center">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all text-center">
                Contact Me
              </a>
            </div>
          </div>
          <div className="w-48 h-48 md:w-80 md:h-80 relative order-1 md:order-2">
             <div className="absolute inset-0 bg-indigo-600 rounded-3xl rotate-6 animate-pulse opacity-10 md:opacity-20"></div>
             <img 
               src="https://picsum.photos/400/400?grayscale" 
               alt={PORTFOLIO_DATA.name} 
               className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
             />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="w-16 md:w-20 h-1.5 bg-indigo-600 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <FadeInSection key={project.id} delay={index * 150}>
                <div className="group glass rounded-2xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 md:h-52 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold backdrop-blur">LIVE PREVIEW</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-indigo-600/20 text-indigo-300 rounded text-[10px] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <a href={project.links.github} className="text-xs font-bold text-white/50 hover:text-white transition-colors">Github</a>
                      <a href={project.links.live} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Case Study →</a>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-white/50 text-sm md:text-base">Modern stacks and cutting-edge technologies</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
              <FadeInSection key={idx} delay={idx * 100}>
                <div className="p-5 md:p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors h-full">
                  <h3 className="font-bold text-indigo-400 mb-4 font-mono text-xs tracking-widest uppercase">{skillGroup.category}</h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 md:space-y-3">
                    {skillGroup.items.map(item => (
                      <li key={item} className="text-white/70 flex items-center gap-2 group text-sm md:text-base">
                        <span className="shrink-0 w-1.5 h-1.5 bg-indigo-600 rounded-full group-hover:scale-150 transition-transform"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Work History</h2>
            <div className="w-16 md:w-20 h-1.5 bg-indigo-600 rounded-full"></div>
          </div>

          <div className="space-y-10 md:space-y-12">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <FadeInSection key={idx} delay={idx * 100}>
                <div className="relative pl-7 md:pl-8 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-indigo-600 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                  <div className="mb-1 text-xs md:text-sm font-mono text-indigo-400">{exp.period}</div>
                  <h3 className="text-lg md:text-xl font-bold">{exp.role}</h3>
                  <div className="text-white/40 font-medium mb-3 text-sm md:text-base">{exp.company}</div>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto glass p-6 md:p-12 rounded-2xl md:rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden sm:block">
             <svg className="w-32 md:w-48 h-32 md:h-48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
             </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Let's build something <span className="gradient-text">legendary.</span></h2>
          <p className="text-white/60 text-base md:text-lg mb-8 md:mb-10 max-w-lg mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex flex-col items-center gap-6">
            <a href={`mailto:${PORTFOLIO_DATA.email}`} className="w-full sm:w-auto px-8 md:px-10 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {PORTFOLIO_DATA.email}
            </a>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                 <span className="sr-only">GitHub</span>
                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 border-t border-white/5 text-center text-white/30 text-[10px] md:text-xs">
        <div className="max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
