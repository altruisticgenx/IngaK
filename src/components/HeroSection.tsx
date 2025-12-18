import { Instagram, Linkedin, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden my-6 md:my-12 animate-fade-in">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 p-6 sm:p-8 md:p-12 glass-dark border border-slate-700/50">
        {/* Left side - Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden animate-scale-in order-2 md:order-1 group">
          <img 
            alt="Hero" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="/lovable-uploads/184f0a98-46c9-4ef2-9b81-aec2466b04ef.png" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center space-y-4 md:space-y-6 order-1 md:order-2">
          <div className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-cyan-400 text-xs font-medium animate-slide-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Fresh Perspectives
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-100 animate-slide-up stagger-1">
              Journey Through Life's Spectrum
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl animate-slide-up stagger-2">
              Welcome to Perspective's Blog: A Realm of Reflection, Inspiration, and Discovery. 
              Where Words Illuminate Paths of Meaning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 animate-slide-up stagger-3">
            <a 
              href="#articles"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 hover:-translate-y-0.5"
            >
              Explore Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-cyan-500 bg-slate-800/50 hover:bg-slate-800 transition-all flex items-center justify-center hover:scale-110" 
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ik11/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-cyan-500 bg-slate-800/50 hover:bg-slate-800 transition-all flex items-center justify-center hover:scale-110" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;