import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Zap, Cpu, Sparkles, Layers } from 'lucide-react';

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
              Because we are Not a bottle. We are An algorithm.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed">
              We give you freedom to control your atmosphere.
            </p>
          </div>

          {/* Dual Feature Grid: Image of Box + Image of Cartridges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Box 1: Hardware Architecture & Box */}
            <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#141416]/90 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative group overflow-hidden">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/aistudio/IMG_9467_915d33b7.PNG"
                  alt="Freedom to build your own scent library with AromaxAI hardware"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-neutral-300">
                  Freedom To Build
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2997ff]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>30 Type-C Connectors • Millisecond Precision</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Freedom to build your own scent library
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Engineered with an ultra-responsive matrix array. Each slot communicates in real time with our algorithmic dispersion processor for surgical atmosphere tuning.
                </p>
              </div>
            </div>

            {/* Box 2: Type-C Cartridges */}
            <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#141416]/90 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative group overflow-hidden">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/aistudio/IMG_9466_9e9c504e.PNG"
                  alt="AromaxAI Type-C Cartridges"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-emerald-400">
                  Plug &amp; Play
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Zero Residue • Rapid Transition</span>
                </div>
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

          {/* Bottom Highlights Strip */}
          <div className="mt-8 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-semibold text-sm mb-1">
                <Layers className="w-4 h-4 text-[#2997ff]" />
                <span>30-Channel Matrix</span>
              </div>
              <p className="text-xs text-neutral-400">
                Independent channel control eliminates muddy mixing and scent collisions.
              </p>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-semibold text-sm mb-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Zero Heat, Zero Water</span>
              </div>
              <p className="text-xs text-neutral-400">
                Preserves delicate aroma molecules without heat degradation or mold risk.
              </p>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-semibold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Algorithmic Harmony</span>
              </div>
              <p className="text-xs text-neutral-400">
                AI continuously balances concentration based on room size and airflow.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
