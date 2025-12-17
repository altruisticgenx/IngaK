import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const SectionTitle: React.FC<Props> = ({ title, subtitle, center = true }) => (
  <div className={`mb-10 md:mb-16 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-3 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-base text-slate-400 max-w-3xl mx-auto">{subtitle}</p>
    )}
  </div>
);

export default React.memo(SectionTitle);
