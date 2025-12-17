import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    { label: "Articles", href: "/#articles" },
    { label: "Work", href: "/Work" },
    { label: "Projects", href: "/Projects" },
    { label: "About", href: "/about" },
    { label: "AI Chat", href: "/chat" },
  ];

  return (
    <header className="fixed top-2 left-2 right-2 z-50 md:top-3 md:left-3 md:right-3">
      <nav className="max-w-5xl mx-auto" role="navigation" aria-label="Main navigation">
        {/* Main Nav Container - 3D effect */}
        <div 
          className="
            relative flex items-center justify-between 
            h-10 md:h-11 px-2 md:px-3
            bg-gradient-to-b from-[hsl(var(--surface-elevated))] to-[hsl(var(--background))]
            rounded-2xl md:rounded-full
            border border-border/40
            shadow-[0_4px_0_0_hsl(var(--border)),0_6px_12px_-4px_hsl(var(--shadow-soft)/0.2)]
            hover:shadow-[0_2px_0_0_hsl(var(--border)),0_4px_8px_-2px_hsl(var(--shadow-soft)/0.15)]
            hover:translate-y-[2px]
            transition-all duration-200
          "
        >
          {/* Logo - Compact 3D */}
          <a href="/" className="flex items-center gap-1 group">
            <div 
              className="
                w-6 h-6 md:w-7 md:h-7 
                bg-gradient-to-br from-primary to-primary/80
                rounded-lg
                flex items-center justify-center
                shadow-[0_2px_0_0_hsl(var(--primary)/0.5)]
                group-hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.5)]
                group-hover:translate-y-[1px]
                transition-all duration-150
              "
            >
              <span className="text-primary-foreground font-bold text-xs md:text-sm">I</span>
            </div>
            <span className="text-sm md:text-base font-bold font-serif text-foreground">.K</span>
          </a>

          {/* Desktop Nav - Pill buttons */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  relative text-xs font-medium px-3 py-1.5
                  text-muted-foreground hover:text-foreground
                  rounded-full
                  hover:bg-muted/50
                  active:bg-muted
                  active:translate-y-[1px]
                  transition-all duration-150
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle - 3D button */}
            <button
              onClick={toggleTheme}
              className="
                w-7 h-7 md:w-8 md:h-8
                flex items-center justify-center
                rounded-lg
                bg-muted/50 hover:bg-muted
                shadow-[0_2px_0_0_hsl(var(--border))]
                hover:shadow-[0_1px_0_0_hsl(var(--border))]
                hover:translate-y-[1px]
                active:shadow-none active:translate-y-[2px]
                transition-all duration-150
              "
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 text-foreground" />
              ) : (
                <Moon className="h-3.5 w-3.5 md:h-4 md:w-4 text-foreground" />
              )}
            </button>

            {/* CTA - 3D primary button */}
            <a
              href="#join"
              className="
                hidden md:flex items-center
                text-xs font-semibold px-4 py-1.5
                bg-gradient-to-b from-primary to-primary/90
                text-primary-foreground
                rounded-full
                shadow-[0_3px_0_0_hsl(var(--primary)/0.6),0_4px_8px_-2px_hsl(var(--primary)/0.3)]
                hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.6),0_2px_4px_-1px_hsl(var(--primary)/0.2)]
                hover:translate-y-[2px]
                active:shadow-none active:translate-y-[3px]
                transition-all duration-150
              "
            >
              Join
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="
                md:hidden
                w-7 h-7
                flex items-center justify-center
                rounded-lg
                bg-muted/50 hover:bg-muted
                shadow-[0_2px_0_0_hsl(var(--border))]
                hover:shadow-[0_1px_0_0_hsl(var(--border))]
                hover:translate-y-[1px]
                active:shadow-none active:translate-y-[2px]
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 text-foreground" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4 text-foreground" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - 3D dropdown */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu" 
            className="
              md:hidden mt-1
              bg-gradient-to-b from-[hsl(var(--surface-elevated))] to-[hsl(var(--background))]
              rounded-xl
              border border-border/40
              shadow-[0_4px_0_0_hsl(var(--border)),0_8px_16px_-4px_hsl(var(--shadow-soft)/0.2)]
              overflow-hidden
              animate-fade-in
            "
          >
            <div className="p-2 space-y-0.5">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    flex items-center px-3 py-2
                    text-sm font-medium text-foreground
                    rounded-lg
                    hover:bg-muted/50
                    active:bg-muted active:translate-y-[1px]
                    transition-all duration-150
                  "
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile CTA */}
              <a
                href="#join"
                className="
                  flex items-center justify-center
                  mt-2 mx-1 py-2
                  text-sm font-semibold
                  bg-gradient-to-b from-primary to-primary/90
                  text-primary-foreground
                  rounded-lg
                  shadow-[0_3px_0_0_hsl(var(--primary)/0.6)]
                  hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.6)]
                  hover:translate-y-[2px]
                  active:shadow-none active:translate-y-[3px]
                  transition-all duration-150
                "
              >
                Join Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
