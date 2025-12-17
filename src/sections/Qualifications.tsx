import React from 'react';
import { GraduationCap, Award, Globe } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';

const Qualifications: React.FC = () => {
  return (
    <section id="qualifications" className="py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Qualifications & Education" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Education */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Education</h3>
            </div>
            <div className="mb-4">
              <div className="text-lg font-bold text-slate-200">Penn State University</div>
              <div className="text-slate-400 text-sm">2015 - 2019</div>
            </div>
            <div className="text-slate-400 text-sm">
              Bachelor's Degree in{' '}
              <span className="text-cyan-400 font-medium">Economics / Engineering</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Certifications</h3>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="font-bold text-slate-200">Advanced Cyber Threat Intelligence</span>
                <span className="text-sm text-slate-400">Cybrary • Sep 2024</span>
              </li>
              <li className="border-t border-slate-800 pt-4 flex flex-col">
                <span className="font-bold text-slate-200">Open-Source Intelligence (OSINT)</span>
                <span className="text-sm text-slate-400">Udemy • Jul 2024</span>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-green-500/50 transition-colors">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Languages</h3>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center">
                <span className="font-bold text-slate-200">English</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Native
                </span>
              </li>
              <li className="border-t border-slate-800 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-200">Croatian</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Native / Bilingual
                </span>
              </li>
              <li className="border-t border-slate-800 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-200">German</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Professional
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Qualifications);
