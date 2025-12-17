import React from 'react';
import { BarChart3, Terminal, Cpu, Lock, Database, ExternalLink } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import ProjectCard from '@/components/portfolio/ui/ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-slate-900/30 relative">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Selected Initiatives"
          subtitle="Deploying secure, compliant technology in regulated environments."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <ProjectCard
            title="FERPA Compliance Dashboard"
            desc="Automated policy tracking for multiple school districts. Replaced manual audits with real-time dashboards ensuring Title IX & FERPA adherence."
            tags={['React', 'Python', 'Data Vis']}
            icon={BarChart3}
            color="blue"
            visual={
              <div className="w-full h-full p-2 sm:p-3 flex flex-col gap-1.5 opacity-40 group-hover:opacity-60 transition-all group-hover:scale-105 duration-700">
                <div className="w-full h-2 bg-slate-700 rounded mb-1" />
                <div className="flex gap-1">
                  <div className="w-1/3 h-10 sm:h-14 bg-slate-700 rounded" />
                  <div className="w-2/3 h-10 sm:h-14 bg-slate-700 rounded" />
                </div>
              </div>
            }
          />

          <ProjectCard
            title="Secure DIA Network Audit"
            desc="Authorized penetration testing for Defense Intelligence Agency networks. Identified critical vulnerabilities and delivered remediation plans within 48-hour SLAs."
            tags={['Metasploit', 'Burp Suite', 'Nmap']}
            icon={Terminal}
            color="purple"
            visual={
              <div className="w-full h-full p-2 sm:p-3 font-mono text-[8px] sm:text-[10px] text-green-500/50 group-hover:text-green-500/90 transition-all leading-tight">
                <span className="opacity-50">root@dia:~$</span> ./scan.sh
                <br />
                <span className="text-yellow-500/80">[!]</span> Target: 192.168.1.X
                <br />
                <span className="text-red-500/80">[+]</span> CVE-2024-XXXX
                <br />
                <span className="opacity-50">~$</span>{' '}
                <span className="animate-pulse">_</span>
              </div>
            }
          />

          <ProjectCard
            title="LLM Cost Optimization"
            desc="Integrated open-source models (Llama, Mistral) to replace proprietary APIs, reducing infrastructure costs by 40% while maintaining performance for policy summarization tasks."
            tags={['Llama 2', 'Mistral', 'DevOps']}
            icon={Cpu}
            color="green"
            visual={
              <div className="flex items-center justify-center h-full opacity-30 group-hover:opacity-50 transition-all group-hover:scale-110 duration-700">
                <Database size={40} className="text-slate-400" />
              </div>
            }
          />

          <ProjectCard
            title="Blockchain Identity Verification"
            desc="Designed a secure digital governance prototype utilizing blockchain for immutable identity verification, enhancing security protocols for sensitive user data."
            tags={['Blockchain', 'Cryptography', 'Prototyping']}
            icon={Lock}
            color="yellow"
            visual={
              <div className="flex items-center justify-center h-full opacity-30 group-hover:opacity-50 transition-all group-hover:rotate-12 duration-700">
                <Lock size={40} className="text-slate-400" />
              </div>
            }
          />
        </div>
      </div>

      {/* Floating button */}
      <a
        href="https://pilots4y0u.lovable.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/40 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        aria-label="Visit Pilots4You"
      >
        <ExternalLink size={14} />
      </a>
    </section>
  );
};

export default React.memo(Projects);
