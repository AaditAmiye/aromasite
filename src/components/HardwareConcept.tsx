import React from 'react';
import { Cpu, Wind, Droplets, Zap, ShieldCheck } from 'lucide-react';

export const HardwareConcept: React.FC = () => {
  return (
    <section id="hardware" className="relative z-20 w-full max-w-6xl mx-auto px-6 py-16">
      {/* Editorial Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
          <Cpu className="w-4 h-4 text-indigo-500" />
          <span>Speculative Hardware Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
          How Olfactory AI Generates Physical Scent
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Translating digital text generation into real volatile aroma molecules requires
          a microfluidic synthesis architecture combining four core systems.
        </p>
      </div>

      {/* 4 Clean Architectural Cards (No pill cliches, clean hairline borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            01. Sensory Embedding Encoder
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            A specialized multimodal transformer maps prompt nuances to human olfactory receptor
            activations across 400 unique olfactory receptor types ($OR1A1$ to $OR51E2$), resolving
            subtle adjectives like “crisp”, “damp”, and “creamy” into quantitative volatile targets.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            02. 64-Cartridge Primary Aroma Palette
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Just as RGB pixels produce millions of screen colors, 64 calibrated primary aroma compounds
            (terpenes, aldehydes, lactones, pyrazines, and musks) mix in real time to simulate up to
            85,000 distinct olfactory signatures.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-5">
            <Wind className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            03. Ultrasonic Picoliter Nebulization
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Piezoelectric mesh resonators vibrate at 2.4 MHz to atomize liquid aroma molecules into
            dry sub-micron aerosols that travel through a laminar airflow channel without wetting
            surfaces or clinging to fabrics.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            04. Active Negative-Ion Scavenger
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To prevent scent fatigue and aroma overlap between rapid ChatGPT generations, a built-in
            photocatalytic chamber neutralizes airborne molecules within 800 milliseconds between scent shifts.
          </p>
        </div>
      </div>
    </section>
  );
};
