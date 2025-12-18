import React from 'react';
import { ChevronRight, Download, Shield, Brain, Sparkles, Zap, Code2 } from 'lucide-react';

type Props = {
  onNavigate: (id: string) => void;
};

const Hero: React.FC<Props> = ({ onNavigate }) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-8 sm:-left-16 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-cyan-500/20 rounded-full blur-[40px] sm:blur-[80px] animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-8 sm:-right-16 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-600/20 rounded-full blur-[40px] sm:blur-[80px] animate-float-delayed" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-[60px] sm:blur-[80px]" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-0">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            
            {/* Status Badge */}
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-dark text-cyan-400 text-[10px] sm:text-xs font-medium animate-slide-down stagger-1"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
              </span>
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
              <span>Open for Policy & AI Roles</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight animate-slide-up stagger-2"
            >
              <span className="block text-slate-100">Translating</span>
              <span className="block text-slate-100">Regulation into</span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-gradient">
                  Intelligent Code
                </span>
                <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform scale-x-0 animate-[scaleX_0.8s_ease-out_1s_forwards] origin-left" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed animate-slide-up stagger-3">
              AI Policy Researcher & Applied AI Engineer bridging{' '}
              <span className="text-cyan-400 font-medium">federal compliance</span> and{' '}
              <span className="text-blue-400 font-medium">cutting-edge automation</span>.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center lg:justify-start animate-slide-up stagger-4">
              {['NIST', 'LLM Integration', 'Secure Gov'].map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-[9px] sm:text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                >
                  <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-2 sm:gap-3 pt-1 sm:pt-2 justify-center lg:justify-start animate-slide-up stagger-5">
              <button
                onClick={() => onNavigate('projects')}
                className="group relative px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold text-[11px] sm:text-sm transition-all duration-300 shadow-md shadow-cyan-900/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-1 sm:gap-1.5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  View Work
                  <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                className="group px-3 sm:px-5 py-2 sm:py-2.5 glass-dark hover:bg-slate-800/80 text-slate-200 rounded-lg font-bold text-[11px] sm:text-sm transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/30 flex items-center justify-center gap-1 sm:gap-1.5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Download size={12} className="sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                One-Pager
              </button>
            </div>

            {/* Stats Row - Mobile */}
            <div className="grid grid-cols-3 gap-2 pt-2 lg:hidden animate-slide-up stagger-6">
              {[
                { value: '4+', label: 'Years' },
                { value: '12+', label: 'Projects' },
                { value: 'DoD', label: 'Cleared' },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-2 px-1 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <div className="text-base sm:text-lg font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Visual */}
          <div className="hidden lg:block perspective-2000 animate-scale-in stagger-4">
            <div className="relative preserve-3d animate-rotate-3d">
              {/* Code Terminal Card */}
              <div className="relative z-10 glass-dark rounded-xl p-4 shadow-xl shadow-cyan-900/20 hover-3d">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <Code2 size={12} className="text-cyan-400" />
                    policy_audit.py
                  </div>
                </div>

                {/* Code Content */}
                <div className="space-y-2 font-mono text-[10px] sm:text-xs leading-relaxed overflow-hidden">
                  <div className="flex">
                    <span className="text-purple-400 w-12">import</span>
                    <span className="text-slate-300">nist</span>
                    <span className="text-purple-400 px-1">as</span>
                    <span className="text-yellow-400">rmf</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 w-12">from</span>
                    <span className="text-slate-300">compliance</span>
                    <span className="text-purple-400 px-1">import</span>
                    <span className="text-yellow-400">Auditor</span>
                  </div>
                  <div className="h-2" />
                  <div className="text-slate-500 italic text-[9px]"># Auto Compliance Check</div>
                  <div>
                    <span className="text-blue-400">def</span>{' '}
                    <span className="text-yellow-300">assess</span>
                    <span className="text-slate-300">(d):</span>
                  </div>
                  <div className="pl-3 border-l border-cyan-500/30 space-y-1.5">
                    <div className="text-slate-300">ctrl = rmf.map(d)</div>
                    <div className="text-slate-300">gaps = Auditor.scan(ctrl)</div>
                    <div>
                      <span className="text-purple-400">return</span>{' '}
                      <span className="text-green-400">"Score: 98%"</span>
                    </div>
                  </div>
                  
                  {/* Typing Cursor */}
                  <div className="flex items-center gap-1 text-slate-400 pt-1">
                    <span className="text-cyan-400">{'>'}</span>
                    <span className="animate-blink">_</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Security */}
              <div className="absolute -top-3 -right-3 glass-dark p-2 rounded-lg shadow-lg animate-float z-20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-cyan-500/20 rounded-md animate-pulse-glow">
                    <Shield size={14} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Status</div>
                    <div className="text-xs font-bold text-slate-100">Cleared</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - AI */}
              <div className="absolute -bottom-3 -left-3 glass-dark p-2 rounded-lg shadow-lg animate-float-delayed z-20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-500/20 rounded-md">
                    <Brain size={14} className="text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Tech</div>
                    <div className="text-xs font-bold text-slate-100">LLM</div>
                  </div>
                </div>
              </div>

              {/* Stats Card - Desktop */}
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 glass-dark p-3 rounded-lg shadow-lg hidden xl:block">
                <div className="space-y-2">
                  {[
                    { value: '4+', label: 'Yrs' },
                    { value: '12+', label: 'Proj' },
                    { value: 'DoD', label: 'Clr' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-base font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 animate-fade-in stagger-7 hidden xs:flex">
        <span className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-3.5 h-6 sm:w-4 sm:h-7 rounded-full border border-slate-700 flex items-start justify-center p-1">
          <div className="w-0.5 h-1 sm:h-1.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
