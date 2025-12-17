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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[100px] animate-float-delayed" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-[120px]" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Status Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-cyan-400 text-xs sm:text-sm font-medium animate-slide-down stagger-1"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>Open for Policy & AI Engineering Roles</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight animate-slide-up stagger-2"
            >
              <span className="block text-slate-100">Translating</span>
              <span className="block text-slate-100">Regulation into</span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-gradient">
                  Intelligent Code
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform scale-x-0 animate-[scaleX_0.8s_ease-out_1s_forwards] origin-left" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up stagger-3">
              AI Policy Researcher & Applied AI Engineer bridging the gap between{' '}
              <span className="text-cyan-400 font-medium">federal compliance</span> and{' '}
              <span className="text-blue-400 font-medium">cutting-edge automation</span>.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start animate-slide-up stagger-4">
              {['NIST Frameworks', 'LLM Integration', 'Secure Governance'].map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs sm:text-sm text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                >
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-slide-up stagger-5">
              <button
                onClick={() => onNavigate('projects')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                aria-label="View my work and projects"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                className="group px-6 sm:px-8 py-3 sm:py-4 glass-dark hover:bg-slate-800/80 text-slate-200 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/30 flex items-center justify-center gap-2 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                aria-label="Download one-page resume"
              >
                <Download size={18} aria-hidden="true" />
                One-Pager
              </button>
            </div>

            {/* Stats Row - Mobile */}
            <div className="grid grid-cols-3 gap-4 pt-6 lg:hidden animate-slide-up stagger-6">
              {[
                { value: '4+', label: 'Years Exp' },
                { value: '12+', label: 'Projects' },
                { value: 'DoD', label: 'Cleared' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Visual */}
          <div className="hidden lg:block perspective-2000 animate-scale-in stagger-4">
            <div className="relative preserve-3d animate-rotate-3d">
              {/* Code Terminal Card */}
              <div className="relative z-10 glass-dark rounded-2xl p-6 shadow-2xl shadow-cyan-900/20 hover-3d">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <Code2 size={14} className="text-cyan-400" />
                    policy_audit.py
                  </div>
                </div>

                {/* Code Content */}
                <div className="space-y-3 font-mono text-xs sm:text-sm leading-relaxed overflow-hidden">
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
                  <div className="h-3" />
                  <div className="text-slate-500 italic"># Initializing Automated Compliance Check</div>
                  <div>
                    <span className="text-blue-400">def</span>{' '}
                    <span className="text-yellow-300">assess_risk</span>
                    <span className="text-slate-300">(data):</span>
                  </div>
                  <div className="pl-4 border-l-2 border-cyan-500/30 space-y-2">
                    <div className="text-slate-300">controls = rmf.map_controls(data)</div>
                    <div className="text-slate-300">gaps = TitleIX_Auditor.scan(controls)</div>
                    <div>
                      <span className="text-purple-400">return</span>{' '}
                      <span className="text-green-400">"Compliance Score: 98%"</span>
                    </div>
                  </div>
                  
                  {/* Typing Cursor */}
                  <div className="flex items-center gap-1 text-slate-400 pt-2">
                    <span className="text-cyan-400">{'>'}</span>
                    <span className="animate-blink">_</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Security */}
              <div className="absolute -top-4 -right-4 xl:-top-6 xl:-right-6 glass-dark p-3 xl:p-4 rounded-xl shadow-xl animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg animate-pulse-glow">
                    <Shield size={20} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Status</div>
                    <div className="text-sm font-bold text-slate-100">Security Cleared</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - AI */}
              <div className="absolute -bottom-4 -left-4 xl:-bottom-8 xl:-left-6 glass-dark p-3 xl:p-4 rounded-xl shadow-xl animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Brain size={20} className="text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tech</div>
                    <div className="text-sm font-bold text-slate-100">LLM Integrated</div>
                  </div>
                </div>
              </div>

              {/* Stats Card - Desktop */}
              <div className="absolute top-1/2 -right-16 xl:-right-24 transform -translate-y-1/2 glass-dark p-4 rounded-xl shadow-xl hidden xl:block">
                <div className="space-y-3">
                  {[
                    { value: '4+', label: 'Years' },
                    { value: '12+', label: 'Projects' },
                    { value: 'DoD', label: 'Cleared' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-7">
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
