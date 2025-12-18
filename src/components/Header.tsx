import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Default to dark theme for consistency with portfolio
    document.documentElement.classList.add("dark");
    setIsDark(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/blog#articles" },
    { label: "About", href: "/about" },
    { label: "AI Chat", href: "/chat" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" || location.pathname === "/blog";
    return location.pathname === href;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-cyan-900/30 transition-shadow">
              <span className="text-white font-mono text-sm font-bold">IK</span>
            </div>
            <span className="text-lg font-bold text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors hidden sm:block">
              Perspective
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-cyan-400 bg-slate-800/50"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-slate-300" />
              ) : (
                <Moon className="h-4 w-4 text-slate-300" />
              )}
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden md:flex items-center text-sm font-semibold px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 transition-all hover:-translate-y-0.5"
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-slate-300" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 text-slate-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-4 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center gap-3 w-4/5 max-w-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-medium py-2 transition-colors ${
                isActive(item.href)
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 w-full px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg text-center shadow-lg shadow-cyan-900/30 hover:from-cyan-500 hover:to-blue-500 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;