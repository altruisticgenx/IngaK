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
    <article
      className={`flex flex-col h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700/50 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-1 focus-within:ring-cyan-400 ${theme.border} ${theme.shadow}`}
      aria-labelledby={`project-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="h-20 sm:h-28 bg-slate-800 relative overflow-hidden shrink-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
        {visual}
        <div className="absolute bottom-2 left-2 sm:left-3 z-20">
          <div className={`inline-flex p-1.5 ${theme.bg} rounded-md text-white shadow-md`}>
            <Icon size={14} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 flex flex-col grow">
        <h3
          id={`project-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-sm sm:text-base font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors leading-tight"
        >
          {title}
        </h3>
        <p className="text-slate-400 text-xs mb-2 leading-relaxed grow line-clamp-2">{desc}</p>
        <ul className="flex flex-wrap gap-1 mt-auto" aria-label="Technologies used">
          {tags.map((tag) => (
            <li key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50 font-medium">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default React.memo(ProjectCard);
