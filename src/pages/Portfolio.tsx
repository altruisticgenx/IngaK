import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '@/components/portfolio/navigation/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Expertise from '@/sections/Expertise';
import Experience from '@/sections/Experience';
import Qualifications from '@/sections/Qualifications';
import Projects from '@/sections/Projects';
import Articles from '@/sections/Articles';
import Footer from '@/components/portfolio/layout/Footer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const SECTIONS = [
  'home',
  'about',
  'expertise',
  'experience',
  'qualifications',
  'projects',
  'articles',
  'contact',
] as const;

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);

  // IntersectionObserver-based scroll spy (performance optimized)
  const handleSectionIntersection = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useIntersectionObserver(handleSectionIntersection, SECTIONS);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
    
    // Set focus to the section for screen readers
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }, []);

  // Simple scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        <Articles />
      </main>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default Portfolio;
