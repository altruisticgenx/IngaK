import React, { useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ColorVariant } from '@/types/portfolio';

type Props = {
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  color: ColorVariant;
  visual: React.ReactNode;
};

const ProjectCard: React.FC<Props> = ({ title, desc, tags, icon: Icon, color, visual }) => {
  const colorMap = useMemo(() => ({
    blue: { bg: 'bg-blue-600', border: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-900/10' },
    purple: { bg: 'bg-purple-600', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-900/10' },
    green: { bg: 'bg-green-600', border: 'hover:border-green-500/50', shadow: 'hover:shadow-green-900/10' },
    yellow: { bg: 'bg-yellow-600', border: 'hover:border-yellow-500/50', shadow: 'hover:shadow-yellow-900/10' },
    cyan: { bg: 'bg-cyan-600', border: 'hover:border-cyan-500/50', shadow: 'hover:shadow-cyan-900/10' },
  }), []);

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${theme.border} ${theme.shadow}`}>
      <div className="h-32 sm:h-48 bg-slate-800 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
        {visual}
        <div className="absolute bottom-4 left-4 sm:left-6 z-20">
          <div className={`inline-flex p-2 ${theme.bg} rounded-lg text-white shadow-lg`}>
            <Icon size={20} />
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed grow">{desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
