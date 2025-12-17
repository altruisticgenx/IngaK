import React, { useState, useEffect } from 'react';
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
];

const Navbar: React.FC<Props> = ({ activeSection, scrolled, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-3 shadow-xl shadow-slate-950/50' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigate('home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-white font-mono text-base sm:text-lg font-bold">IK</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors hidden sm:block">
              Inga Kaltak
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((link) => (
              <NavLink
                key={link.id}
                {...link}
                activeSection={activeSection}
                onClick={handleNavigate}
              />
            ))}
            <button
              onClick={() => handleNavigate('contact')}
              className="px-5 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm font-semibold hover:scale-105 active:scale-95 ml-4"
            >
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-1.5 text-slate-300 hover:text-white transition-colors z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-4 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-3 w-4/5 max-w-sm">
          {navItems.map((link) => (
            <NavLink
              key={link.id}
              {...link}
              activeSection={activeSection}
              onClick={handleNavigate}
              mobile
            />
          ))}
          <button
            onClick={() => handleNavigate('contact')}
            className="mt-6 w-full px-8 py-3 rounded-xl bg-cyan-600 text-white font-bold text-lg shadow-lg shadow-cyan-900/30 hover:bg-cyan-500 transition-colors"
          >
            Contact Me
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);
