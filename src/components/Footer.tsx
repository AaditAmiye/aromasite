import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 w-full border-t border-slate-200/80 bg-white/60 backdrop-blur-md mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
          <span>Olfactory AI</span>
          <span aria-hidden="true">·</span>
          <span>Digital Scent & Particle Simulation</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#experience" className="hover:text-slate-900 transition-colors">
            Particle Field
          </a>
          <a href="#synthesizer" className="hover:text-slate-900 transition-colors">
            Olfactory Accords
          </a>
          <a href="#hardware" className="hover:text-slate-900 transition-colors">
            Hardware Architecture
          </a>
        </div>

        <div className="text-slate-400">
          © {new Date().getFullYear()} Olfactory AI Research. All sensory models speculative.
        </div>
      </div>
    </footer>
  );
};
