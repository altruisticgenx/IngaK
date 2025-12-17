import React from 'react';
import { Brain, FileText, Shield } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import SkillCard from '@/components/portfolio/ui/SkillCard';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Core Competencies"
          subtitle="A hybrid skillset designed for modern federal challenges, combining technical engineering with regulatory expertise."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <SkillCard
            title="AI & Machine Learning"
            icon={Brain}
            color="cyan"
            items={[
              'Open-source LLMs (Llama, Mistral)',
              'Prompt Engineering (GPT-4, Claude)',
              'Infrastructure Optimization',
              'Virtual Support Bots',
            ]}
          />
          <SkillCard
            title="Policy & Governance"
            icon={FileText}
            color="blue"
            items={[
              'NIST AI RMF Assessments',
              'FERPA / Title IX Compliance',
              'Federal Procurement',
              'Change Management Policies',
            ]}
          />
          <SkillCard
            title="Security & Analytics"
            icon={Shield}
            color="purple"
            items={[
              'Penetration Testing (Metasploit)',
              'Vulnerability Remediation',
              'OSINT Reconnaissance',
              'Quantitative Analytics',
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Expertise);
