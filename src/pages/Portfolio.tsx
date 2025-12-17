import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/portfolio/navigation/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Expertise from '@/sections/Expertise';
import Experience from '@/sections/Experience';
import Qualifications from '@/sections/Qualifications';
import Projects from '@/sections/Projects';
import Footer from '@/components/portfolio/layout/Footer';
import { debounce, type DebouncedFn } from '@/utils/debounce';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const debouncedScrollRef = useRef<DebouncedFn<() => void> | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
    
    // Set focus to the section for screen readers
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'expertise', 'experience', 'qualifications', 'projects', 'contact'];

    debouncedScrollRef.current = debounce(() => {
      setScrolled(window.scrollY > 20);

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -50 && rect.top < window.innerHeight / 3;
        }
        return false;
      });
      if (current) setActiveSection(current);
    }, 100);

    window.addEventListener('scroll', debouncedScrollRef.current);

    return () => {
      debouncedScrollRef.current?.cancel();
      if (debouncedScrollRef.current) {
        window.removeEventListener('scroll', debouncedScrollRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      
      <Navbar activeSection={activeSection} scrolled={scrolled} onNavigate={scrollToSection} />
      
      <main id="main-content" role="main">
        <Hero onNavigate={scrollToSection} />
        <About />
        <Expertise />
        <Experience />
        <Qualifications />
        <Projects />
      </main>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Portfolio;
