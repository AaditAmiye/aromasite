import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTeamPage?: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, onNavigateToTeamPage }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#161618] border-2 border-white/20 ring-1 ring-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 space-y-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative max-h-[92vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AromaxAI Team</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Minds Behind Aro - 1
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Founders and hardware-software architects redefining how humanity experiences smell.
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

        {/* Two Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Aaditya Maheshwari */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border-2 border-white/15 ring-1 ring-white/5 space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 ring-1 ring-white/10 flex-shrink-0 bg-neutral-900">
                  <img
                    src="/assets/aistudio/aaditya_maheshwari_opt.jpg"
                    alt="Aaditya Maheshwari"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Aaditya Maheshwari</h4>
                  <p className="text-xs font-semibold text-[#2997ff]">CEO @ AromaxAI</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src="/assets/aistudio/nit_jsr_logo.png" alt="NIT Jamshedpur" className="w-4 h-4 object-contain" />
                    <span className="text-[10px] text-neutral-400 font-mono">NIT Jamshedpur</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Aaditya is a builder at heart. He’s fascinated by the point where software leaves the screen and starts interacting with the physical world. At AromaxAI, he leads the product vision, business, partnerships and fundraising.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-neutral-400 space-y-1">
              <div>• Metallurgical and Materials Engineering, NIT Jamshedpur (dropped out)</div>
              <div>• Co-founder, BIOH • Executive Director, HelpMate NGO</div>
              <div>• Scholar @ Tata Cummins, Reliance, Colgate and Aditya Birla Capital</div>
            </div>
          </div>

          {/* Aadit Amiye */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border-2 border-white/15 ring-1 ring-white/5 space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 ring-1 ring-white/10 flex-shrink-0 bg-neutral-900">
                  <img
                    src="/assets/aistudio/aadit_amiye_opt.jpg"
                    alt="Aadit Amiye"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Aadit Amiye</h4>
                  <p className="text-xs font-semibold text-purple-400">CTO @ AromaxAI</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src="/assets/aistudio/nit_rr_logo.png" alt="NIT Raipur" className="w-4 h-4 object-contain" />
                    <span className="text-[10px] text-neutral-400 font-mono">NIT Raipur</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Aadit likes building things from the ground up. He moves between code, circuit boards and 3D models. At AromaxAI, he leads technical development, unifying electronics, physical design and software.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-neutral-400 space-y-1">
              <div>• Electrical Engineering, NIT Raipur</div>
              <div>• SOF IMO &amp; NSO Zonal Gold Medalist 2024</div>
              <div>• Hardware engineering, PCB design &amp; Full-stack</div>
            </div>
          </div>
        </div>

        {/* Lab Footer Note */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Raipur • India • Olfactory Synthesis Lab in Grasse, France</span>
          <div className="flex items-center gap-2">
            {onNavigateToTeamPage && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTeamPage();
                }}
                className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-all cursor-pointer border border-white/15"
              >
                View Full Team Page ↗
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex-shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
