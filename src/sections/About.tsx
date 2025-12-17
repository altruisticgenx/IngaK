import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-slate-900/50 border-y border-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">About Me</h2>
        <p className="text-base sm:text-xl text-slate-400 leading-relaxed font-light">
          I specialize in the intersection of{' '}
          <span className="text-cyan-400 font-medium">Government Policy</span> and{' '}
          <span className="text-blue-400 font-medium">Artificial Intelligence</span>. With over 4 years
          of experience partnering with agencies like{' '}
          <span className="text-slate-200 font-semibold">DoD, DIA, DLA, and DOE</span>, I don't just
          write policy—I build the tools that enforce it. From crafting FERPA compliance dashboards to
          conducting penetration tests on classified networks, I deliver secure, compliant, and
          intelligent solutions.
        </p>
      </div>
    </section>
  );
};

export default React.memo(About);
