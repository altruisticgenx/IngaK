import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

type Props = {
  onNavigate: (id: string) => void;
};

const Footer: React.FC<Props> = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-900/10 blur-[100px] pointer-events-none rounded-t-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">Let's Connect</h2>
        <p className="text-base text-slate-400 mb-10 max-w-xl mx-auto md:text-lg">
          Currently available for consulting engagements in AI policy, automated compliance systems, and secure infrastructure design.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
          <a
            href="mailto:inga.kaltak@example.com"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all group hover:-translate-y-1 text-sm sm:text-base"
          >
            <Mail className="group-hover:scale-110 transition-transform" size={18} />
            <span className="font-medium">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ik11/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all group hover:-translate-y-1 text-sm sm:text-base"
          >
            <Linkedin className="group-hover:scale-110 transition-transform" size={18} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all group hover:-translate-y-1 text-sm sm:text-base"
          >
            <Github className="group-hover:scale-110 transition-transform" size={18} />
            <span className="font-medium">GitHub</span>
          </a>
        </div>

        <div className="text-slate-600 text-xs sm:text-sm border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>&copy; {new Date().getFullYear()} Inga Kaltak. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Designed for GovTech & AI Compliance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
