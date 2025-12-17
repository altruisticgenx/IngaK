import React, { useMemo } from 'react';
import type { ColorVariant } from '@/types/portfolio';

type Props = {
  role: string;
  company: string;
  period: string;
  items: string[];
  color: ColorVariant;
  isLast?: boolean;
};

const ExperienceItem: React.FC<Props> = ({ role, company, period, items, color, isLast = false }) => {
  const borderColors = useMemo(() => ({
    cyan: 'border-cyan-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
  }), []);

  const textColors = useMemo(() => ({
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  }), []);

  return (
    <div className="relative pl-6 md:pl-0 group">
      {/* Desktop Center Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-1/2 -ml-px w-0.5 h-full bg-slate-800 top-0 group-hover:bg-slate-700 transition-colors" />
      )}
      {/* Mobile Left Line */}
      {!isLast && (
        <div className="md:hidden absolute left-3 w-0.5 h-full bg-slate-800 top-3" />
      )}

      <div className="md:flex items-start justify-between">
        {/* Left Side (Desktop) / Top (Mobile) */}
        <div className="md:w-[45%] md:text-right mb-2 md:mb-0 relative">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">{role}</h3>
          <div className={`${textColors[color]} font-medium mt-1 text-sm sm:text-base`}>{company}</div>
          <div className="text-slate-500 text-xs mt-1 font-mono">{period}</div>
        </div>

        {/* Center Dot */}
        <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 md:w-5 md:h-5 rounded-full bg-slate-950 border-4 ${borderColors[color]} z-10 shadow-lg shadow-slate-950 mt-1.5 md:mt-2 transition-transform group-hover:scale-125`} />

        {/* Right Side (Desktop) / Bottom (Mobile) */}
        <div className="md:w-[45%] pl-4 md:pl-0 pt-2 md:pt-0">
          <ul className="space-y-1.5 text-slate-400 text-sm list-disc pl-4 marker:text-slate-600">
            {items.map((item, i) => (
              <li key={i} className="leading-snug">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExperienceItem);
