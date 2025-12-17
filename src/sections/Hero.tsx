import React from 'react';
import { ChevronRight, Download, Shield, Brain } from 'lucide-react';

type Props = {
  onNavigate: (id: string) => void;
};

const Hero: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="pt-24 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div className="space-y-6 text-center md:text-left">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-400 mx-auto md:mx-0 shadow-sm"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Open for Policy & AI Engineering Roles
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight tracking-tighter"
          >
            Translating Regulation into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Intelligent Code
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            AI Policy Researcher & Applied AI Engineer bridging the gap between federal compliance and cutting-edge automation. Specializing in NIST frameworks, LLM integration, and secure digital governance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="View my work and projects"
            >
              View Work <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <button
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg font-bold transition-all border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Download one-page resume"
            >
              <Download size={18} aria-hidden="true" /> One-Pager
            </button>
          </div>
        </div>

        {/* Code Visual - Hidden on mobile, shown on tablet/desktop */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl transition-transform duration-500 hover:shadow-cyan-900/30">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-slate-500 font-mono">policy_audit.py</span>
            </div>
            <div className="space-y-3 font-mono text-xs leading-relaxed">
              <div className="flex">
                <span className="text-purple-400 w-16">import</span>
                <span className="text-slate-300">nist_framework</span>
                <span className="text-purple-400 px-2">as</span>
                <span className="text-yellow-400">rmf</span>
              </div>
              <div className="flex">
                <span className="text-purple-400 w-16">from</span>
                <span className="text-slate-300">compliance</span>
                <span className="text-purple-400 px-2">import</span>
                <span className="text-yellow-400">TitleIX_Auditor</span>
              </div>
              <div className="h-2" />
              <div className="text-slate-500 italic"># Initializing Automated Compliance Check</div>
              <div>
                <span className="text-blue-400">def</span>{' '}
                <span className="text-yellow-300">assess_risk</span>(data):
              </div>
              <div className="pl-6 border-l-2 border-slate-800 ml-1">
                <span className="text-slate-300">controls = rmf.map_controls(data)</span>
              </div>
              <div className="pl-6 border-l-2 border-slate-800 ml-1">
                <span className="text-slate-300">gaps = TitleIX_Auditor.scan(controls)</span>
              </div>
              <div className="pl-6 border-l-2 border-slate-800 ml-1">
                <span className="text-purple-400">return</span>{' '}
                <span className="text-green-400">"Compliance Score: 98%"</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-6 -right-6 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20 transition-all hover:scale-105">
            <div className="p-1.5 bg-cyan-500/20 rounded-lg">
              <Shield size={20} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Status</div>
              <div className="text-sm font-bold text-slate-100">Security Cleared</div>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-6 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20 transition-all hover:scale-105">
            <div className="p-1.5 bg-purple-500/20 rounded-lg">
              <Brain size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tech</div>
              <div className="text-sm font-bold text-slate-100">LLM Integrated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
