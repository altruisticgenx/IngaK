import React from 'react';
import { BarChart3, Terminal, Cpu, Lock, Database } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import ProjectCard from '@/components/portfolio/ui/ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-24 px-4 sm:px-6 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Selected Initiatives"
          subtitle="Deploying secure, compliant technology in regulated environments."
        />

        <div className="grid sm:grid-cols-2 gap-8">
          <ProjectCard
            title="FERPA Compliance Dashboard"
            desc="Automated policy tracking for multiple school districts. Replaced manual audits with real-time dashboards ensuring Title IX & FERPA adherence."
            tags={['React', 'Python', 'Data Vis']}
            icon={BarChart3}
            color="blue"
            visual={
              <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-3 opacity-40 group-hover:opacity-60 transition-all group-hover:scale-105 duration-700">
                <div className="w-full h-4 bg-slate-700 rounded mb-2" />
                <div className="flex gap-2">
                  <div className="w-1/3 h-20 sm:h-24 bg-slate-700 rounded" />
                  <div className="w-2/3 h-20 sm:h-24 bg-slate-700 rounded" />
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
              <div className="w-full h-full p-6 sm:p-8 font-mono text-xs text-green-500/50 group-hover:text-green-500/90 transition-all leading-tight">
                <span className="opacity-50">root@dia-server:~$</span> ./scan_vuln.sh
                <br />
                <span className="text-yellow-500/80">[!]</span> Target identified: 192.168.1.X
                <br />
                <span className="text-red-500/80">[+]</span> Critical Vuln: CVE-2024-XXXX
                <br />
                <span className="opacity-50">root@dia-server:~$</span>{' '}
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
                <Database size={80} className="text-slate-400" />
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
                <Lock size={80} className="text-slate-400" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
