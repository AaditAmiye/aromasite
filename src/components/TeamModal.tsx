import React from 'react';
import { X, Sparkles, Award, Cpu, Droplets, Brain } from 'lucide-react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEAM_MEMBERS = [
  {
    name: 'Aadit Manas',
    role: 'Founder & Chief Architect',
    bio: 'Pioneered algorithmic aroma synthesis and multi-channel atmospheric dispersion systems.',
    icon: Brain,
    accent: '#2997ff',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Head of Olfactory Chemistry',
    bio: 'Former senior nose and perfume chemist in Grasse. Leads zero-degradation cold hydrosol formulation.',
    icon: Droplets,
    accent: '#f43f5e',
  },
  {
    name: 'Karan Shenoy',
    role: 'VP of Hardware & Acoustic Engineering',
    bio: 'Ex-aerospace fluid dynamicist. Designed the 30-slot micro-vial ultrasonic matrix and whisper fan array.',
    icon: Cpu,
    accent: '#10b981',
  },
  {
    name: 'Mira Sundaram',
    role: 'Director of AI & Atmospheric Software',
    bio: 'Neural aroma mapping and frame-locked video-scent sync algorithms for immersive environments.',
    icon: Award,
    accent: '#a855f7',
  },
];

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#161618] border-2 border-white/20 ring-1 ring-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 space-y-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aromax AI Team</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Minds Behind Aro - 1
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Engineers, master noses, and fluid dynamicists redefining how humanity experiences smell.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEAM_MEMBERS.map((member) => {
            const IconComponent = member.icon;
            return (
              <div
                key={member.name}
                className="p-5 rounded-2xl bg-white/[0.03] border-2 border-white/15 ring-1 ring-white/5 hover:border-white/30 transition-all space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-inner"
                    style={{ backgroundColor: `${member.accent}25`, border: `1px solid ${member.accent}50` }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: member.accent }} />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    Aromax Labs
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{member.name}</h4>
                  <p className="text-xs font-medium" style={{ color: member.accent }}>
                    {member.role}
                  </p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            );
          })}
        </div>

        {/* Lab Footer Note */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Headquartered in Bangalore, India • Olfactory Synthesis Lab in Grasse, France</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex-shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
