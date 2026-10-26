import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Sparkles } from 'lucide-react';

export const WhyAromaxSection: React.FC = () => {
  return (
    <section className="w-full">
      <ScrollReveal delay={0}>
        <div className="rounded-[28px] sm:rounded-[38px] md:rounded-[44px] border border-white/15 bg-gradient-to-b from-[#18181a] via-[#111113] to-black p-5 sm:p-8 md:p-14 overflow-hidden shadow-2xl relative">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#2997ff] border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Olfactory Revolution</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Why AromaxAI?
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 mb-2 leading-tight">
              Because we are not a bottle. We are an algorithm.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed">
              We give you freedom to control your atmosphere.
            </p>
          </div>

          {/* Dual Feature Grid: Image of Box + Image of Cartridges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Box 1: Hardware Architecture & Box */}
            <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#141416]/90 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-2 sm:p-3">
                <img
                  src="/assets/aistudio/IMG_9467_915d33b7.PNG"
                  alt="Freedom to build your own scent library with AromaxAI hardware"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Freedom to build your own scent library
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Engineered with an ultra-responsive matrix array. Each slot communicates in real time with our algorithmic dispersion processor for surgical atmosphere tuning.
                </p>
              </div>
            </div>

            {/* Box 2: Type-C Cartridges */}
            <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#141416]/90 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-2 sm:p-3">
                <img
                  src="/assets/aistudio/IMG_9466_9e9c504e.PNG"
                  alt="AromaxAI Type-C Cartridges"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 space-y-2">
                {/* Specific required text below type c cartridges image */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Instant Scent Switching. Zero Lingering Heavy Oils.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Swap notes in less than a second. Pure atmospheric diffusion means no residue on your furnishings and no persistent background odors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
