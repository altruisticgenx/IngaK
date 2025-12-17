import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import type { NavItem } from "@/types/portfolio";

type Props = {
  activeSection: string;
  scrolled: boolean;
  onNavigate: (id: string) => void;
};

const navItems: NavItem[] = [
  { name: "About", id: "about" },
  { name: "Expertise", id: "expertise" },
  { name: "Experience", id: "experience" },
  { name: "Qualifications", id: "qualifications" },
  { name: "Projects", id: "projects" },
  { name: "Articles", id: "articles" },
];

const blogLink = { name: "Blog", href: "/blog" };
const chatLink = { name: "AI Chat", href: "/chat" };

const Navbar: React.FC<Props> = ({ activeSection, scrolled, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    firstElement?.focus();
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isMenuOpen]);

  const handleNavigate = useCallback(
    (id: string) => {
      onNavigate(id);
      setIsMenuOpen(false);
    },
    [onNavigate]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-slate-950/90 backdrop-blur-md border-slate-800 py-2 shadow-lg shadow-slate-950/40"
            : "bg-transparent border-transparent py-3"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4">
          {/* Logo */}
          <button
            className={cn(
              "flex items-center gap-1.5 rounded-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            )}
            onClick={() => handleNavigate("home")}
            aria-label="Go to home section"
          >
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md",
                "bg-gradient-to-tr from-cyan-600 to-blue-700 shadow-md shadow-blue-900/20"
              )}
            >
              <span className="text-xs font-bold text-white" aria-hidden="true">
                IK
              </span>
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-100 sm:inline">
              Inga Kaltak
            </span>
          </button>

          {/* Desktop Links */}
          <div
            className="hidden items-center gap-4 md:flex lg:gap-5"
            role="menubar"
            aria-label="Main menu"
          >
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
              className={cn(
                "relative text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              )}
            >
              {blogLink.name}
            </a>

            <a
              href={chatLink.href}
              className={cn(
                "relative text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              )}
            >
              {chatLink.name}
            </a>

            <button
              onClick={() => handleNavigate("contact")}
              className={cn(
                "ml-2 rounded-full border border-cyan-500/30 px-4 py-1.5 text-xs font-semibold text-cyan-400",
                "transition-all hover:scale-105 hover:bg-cyan-500/10 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              )}
              aria-label="Navigate to contact section"
            >
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            ref={menuButtonRef}
            className={cn(
              "relative z-50 p-1 text-slate-300 transition-colors hover:text-white md:hidden",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            )}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          isMenuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="flex w-4/5 max-w-xs flex-col items-center gap-2" role="menu">
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
            className="w-full py-2 text-center text-xl font-medium text-slate-400 transition-colors hover:text-cyan-300"
            role="menuitem"
          >
            {blogLink.name}
          </a>

          <a
            href={chatLink.href}
            className="w-full py-2 text-center text-xl font-medium text-slate-400 transition-colors hover:text-cyan-300"
            role="menuitem"
          >
            {chatLink.name}
          </a>

          <button
            onClick={() => handleNavigate("contact")}
            className={cn(
              "mt-4 w-full rounded-lg bg-cyan-600 px-6 py-2.5 text-base font-bold text-white shadow-lg shadow-cyan-900/30",
              "transition-colors hover:bg-cyan-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            )}
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
