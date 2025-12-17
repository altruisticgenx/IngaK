import React, { useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ColorVariant } from '@/types/portfolio';

type Props = {
  icon: LucideIcon;
  color: ColorVariant;
  title: string;
  items: string[];
};

const SkillCard: React.FC<Props> = ({ icon: Icon, color, title, items }) => {
  const colorClasses = useMemo(() => ({
    cyan: 'text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500/20 border-cyan-500/50',
    blue: 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20 border-blue-500/50',
    purple: 'text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20 border-purple-500/50',
    green: 'text-green-400 bg-green-500/10 group-hover:bg-green-500/20 border-green-500/50',
    yellow: 'text-yellow-400 bg-yellow-500/10 group-hover:bg-yellow-500/20 border-yellow-500/50',
  }), []);

  const dotColors = useMemo(() => ({
    cyan: 'bg-cyan-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  }), []);

  const themeClasses = colorClasses[color] || colorClasses.cyan;
  const dotClass = dotColors[color] || dotColors.cyan;
  const [textColor, bgColor, hoverBgColor, borderColor] = themeClasses.split(' ');

  return (
    <div className={`bg-slate-900/50 border border-slate-800 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:${borderColor}`}>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${bgColor} ${hoverBgColor}`}>
        <Icon className={textColor} size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <ul className="space-y-2 text-slate-400 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${dotClass}`} />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(SkillCard);
