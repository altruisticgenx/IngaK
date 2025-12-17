import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import type { NavItem } from '@/types/portfolio';

type Props = {
  activeSection: string;
  scrolled: boolean;
  onNavigate: (id: string) => void;
};

const navItems: NavItem[] = [
  { name: 'About', id: 'about' },
  { name: 'Expertise', id: 'expertise' },
  { name: 'Experience', id: 'experience' },
  { name: 'Qualifications', id: 'qualifications' },
  { name: 'Projects', id: 'projects' },
  { name: 'Articles', id: 'articles' },
];

// External link for Blog
const blogLink = { name: 'Blog', href: '/blog' };
const chatLink = { name: 'AI Chat', href: '/chat' };

const Navbar: React.FC<Props> = ({ activeSection, scrolled, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  const handleNavigate = useCallback((id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  }, [onNavigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-3 shadow-xl shadow-slate-950/50' : 'bg-transparent border-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <button
            className="flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg"
            onClick={() => handleNavigate('home')}
            aria-label="Go to home section"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-white font-mono text-base sm:text-lg font-bold" aria-hidden="true">IK</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors hidden sm:block">
              Inga Kaltak
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8" role="menubar" aria-label="Main menu">
            {navItems.map((link) => (
              <NavLink
                key={link.id}
                {...link}
                activeSection={activeSection}
                onClick={handleNavigate}
              />
            ))}
            <a
              href={blogLink.href}
              className="font-medium text-sm text-slate-400 hover:text-cyan-400 transition-all duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
            >
              {blogLink.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href={chatLink.href}
              className="font-medium text-sm text-slate-400 hover:text-cyan-400 transition-all duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
            >
              {chatLink.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={() => handleNavigate('contact')}
              className="px-5 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm font-semibold hover:scale-105 active:scale-95 ml-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Navigate to contact section"
            >
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-1.5 text-slate-300 hover:text-white transition-colors z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-4 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-3 w-4/5 max-w-sm" role="menu">
          {navItems.map((link) => (
            <NavLink
              key={link.id}
              {...link}
              activeSection={activeSection}
              onClick={handleNavigate}
              mobile
            />
          ))}
          <a
            href={blogLink.href}
            className="text-3xl py-3 w-full text-center font-medium text-slate-400 hover:text-cyan-300 transition-all duration-300"
            role="menuitem"
          >
            {blogLink.name}
          </a>
          <a
            href={chatLink.href}
            className="text-3xl py-3 w-full text-center font-medium text-slate-400 hover:text-cyan-300 transition-all duration-300"
            role="menuitem"
          >
            {chatLink.name}
          </a>
          <button
            onClick={() => handleNavigate('contact')}
            className="mt-6 w-full px-8 py-3 rounded-xl bg-cyan-600 text-white font-bold text-lg shadow-lg shadow-cyan-900/30 hover:bg-cyan-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label="Navigate to contact section"
          >
            Contact Me
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);
