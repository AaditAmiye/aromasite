import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FragranceSectionProps {
  onExploreClick?: () => void;
}

const FRAGRANCE_FAMILIES = [
  {
    name: 'Citrus & Daylight',
    notes: 'Calabrian Bergamot • Sicilian Lemon • White Neroli',
    mood: 'Awakening & Clarity',
    accent: '#facc15',
  },
  {
    name: 'Deep Woods & Rain',
    notes: 'Japanese Hinoki • Wet Cedar • Petrichor Earth',
    mood: 'Grounding & Sanctuary',
    accent: '#34d399',
  },
  {
    name: 'Smoked Santal & Tea',
    notes: 'Australian Sandalwood • Oolong Mist • Warm Amber',
    mood: 'Contemplative Calm',
    accent: '#f97316',
  },
  {
    name: 'Midnight Floral',
    notes: 'Night Jasmine • Dark Orchid • Velvet Vanilla',
    mood: 'Intimate Atmosphere',
    accent: '#c084fc',
  },
];

export const FragranceSection: React.FC<FragranceSectionProps> = ({ onExploreClick }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      id="fragrance"
      className="w-full space-y-6 sm:space-y-8 select-none"
    >
      {/* Section Header with Apple Scroll Reveal */}
      <ScrollReveal delay={0}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-4xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#2997ff] border border-white/10 mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fragrance</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Scent made visible.
            </h3>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            Crafted by world-class noses. Vaporized into microscopic cold clouds without heat or degradation, preserving the delicate top notes of every extract.
          </p>
        </div>
      </ScrollReveal>

      {/* 
        Curved Border Video Presentation Card
        - Grey outer border frame with smooth Apple bevel
        - Inner curved container playing the fragrance film
        - Optimized for phones (aspect-video / fluid height so nothing is cut off)
        - Darkens smoothly on hover
        - Sound / mute toggle removed as requested
      */}
      <ScrollReveal delay={120}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-[24px] sm:rounded-[36px] md:rounded-[44px] border border-white/15 bg-gradient-to-b from-[#1d1d1f] to-[#111113] p-2.5 sm:p-5 md:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-500 hover:border-white/25 group"
        >
          {/* Inner Curved Video Frame with fluid responsive aspect ratio preventing mobile cutoff */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[16px] sm:rounded-[26px] md:rounded-[34px] overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
            {/* Main Fragrance Video */}
            <video
              ref={videoRef}
              src="/assets/aistudio/IMG_9419_2ec26605.MP4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className={`w-full h-full object-cover sm:object-cover object-center select-none pointer-events-none transition-all duration-700 ease-out ${
                isHovered ? 'scale-105 brightness-[0.70]' : 'brightness-100'
              }`}
            />

            {/* Darkening Hover Overlay ("make it black a little on hover") */}
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
                isHovered ? 'opacity-40' : 'opacity-10'
              }`}
            />
          </div>

          {/* Action bar below the video: Explore More button and fragrance formulation note */}
          <div className="mt-4 sm:mt-5 pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 sm:px-3">
            <div className="text-center sm:text-left space-y-0.5">
              <p className="text-white text-sm sm:text-base font-semibold">
                Hydrosol-based scent formulations
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Cold ultrasonic vapor preserving the delicate natural architecture of every botanical note.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNotesModal(true)}
              className="group/btn relative px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-neutral-200 active:scale-95 border border-white/20 flex items-center gap-2.5 transition-all duration-300 cursor-pointer font-medium text-xs sm:text-sm tracking-wide shadow-lg flex-shrink-0"
            >
              <span>Explore More</span>
              <ArrowUpRight className="w-4 h-4 text-black/75 group-hover/btn:text-black transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Scent Notes Overlay Modal */}
      {showNotesModal && (
        <div
          onClick={() => setShowNotesModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#161617] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 text-white shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">Olfactory Architecture</p>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">Fragrance Collections</h4>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              {FRAGRANCE_FAMILIES.map((fam) => (
                <div
                  key={fam.name}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fam.accent }} />
                      {fam.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">{fam.mood}</span>
                  </div>
                  <p className="text-xs text-neutral-300">{fam.notes}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400">Standard fit for all 30 Aro - 1 pods</span>
              <div className="flex items-center gap-2">
                {onExploreClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotesModal(false);
                      onExploreClick();
                    }}
                    className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                  >
                    Configure Aro - 1
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowNotesModal(false)}
                  className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
