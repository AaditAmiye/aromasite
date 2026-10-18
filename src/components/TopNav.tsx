import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface TopNavProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onScrollToSynthesizer: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  soundEnabled,
  onToggleSound,
  onScrollToSynthesizer,
}) => {
  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-8 border-b border-indigo-100/60">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="/"
        className="text-lg font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow-sm shadow-indigo-300"></span>
        Olfactory AI
      </a>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
        <a
          href="#experience"
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          Particle Realm
        </a>
        <a
          href="#synthesizer"
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          Scent Prompt
        </a>
        <a
          href="#accords"
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          Aroma Accords
        </a>
        <a
          href="#hardware"
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          Synthesis Spec
        </a>
      </nav>

      {/* Zone 3: 1 primary action + sound toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
          title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-indigo-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <button
          onClick={onScrollToSynthesizer}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-indigo-600 shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          Generate Smell
        </button>
      </div>
    </header>
  );
};
