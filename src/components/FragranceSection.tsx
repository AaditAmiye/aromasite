import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Compass, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(true);
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
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
  }, [isMuted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      id="fragrance"
      className="w-full space-y-6 sm:space-y-8 select-none"
    >
      {/* Section Header */}
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

      {/* 
        Curved Border Video Presentation Card
        - Grey outer border frame with deep bevel
        - Inner curved container playing the video
        - Interactive hover state showing "Explore Fragrance" pill & atmosphere details
      */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-[26px] sm:rounded-[36px] md:rounded-[44px] border border-white/15 bg-gradient-to-b from-[#1d1d1f] to-[#111113] p-3 sm:p-5 md:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-500 hover:border-white/25"
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] min-h-[260px] sm:min-h-[420px] md:min-h-[500px] rounded-[18px] sm:rounded-[26px] md:rounded-[34px] overflow-hidden bg-black border border-white/10 shadow-2xl group flex items-center justify-center">
          {/* Main Atmosphere Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
          >
            <source src="/armoax2_web.mp4" type="video/mp4" />
            <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
            <source src="/armoax2.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none transition-opacity duration-500" />

          {/* Top Left Floating Tag */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fragrance Film</span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-mono">
              Cold Micro-Diffusion
            </span>
          </div>

          {/* Top Right Sound Toggle */}
          <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20">
            <button
              onClick={toggleSound}
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              )}
            </button>
          </div>

          {/* 
            Center Interactive "Explore Fragrance" Button
            - Elegant Apple frosted glass pill
            - Smoothly scales up and blooms on hover
          */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 p-4">
            <div
              className={`pointer-events-auto transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-90 opacity-90 sm:opacity-0 sm:translate-y-4'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowNotesModal(true)}
                className="group/btn relative px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 border border-white/30 hover:border-white/60 text-white backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center gap-3 transition-all duration-300 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0071e3] text-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-110">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                    <span>Explore Fragrance Notes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-white transition-colors" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400">
                    Discover 30 bespoke cold-diffused blends
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Banner inside the curved frame */}
          <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/10 text-neutral-300 text-[11px] sm:text-xs">
              <span className="font-semibold text-white">Atmosphere 01</span> • 100% Pure Botanical Concentrate
            </div>
            <div className="hidden md:flex items-center gap-2 pointer-events-auto">
              {FRAGRANCE_FAMILIES.map((fam, idx) => (
                <button
                  key={fam.name}
                  onClick={() => setActiveNoteIdx(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium backdrop-blur-md transition-all cursor-pointer border ${
                    activeNoteIdx === idx
                      ? 'bg-white text-black border-white shadow-md font-semibold'
                      : 'bg-black/60 text-neutral-300 border-white/15 hover:border-white/30'
                  }`}
                >
                  {fam.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Fragrance Notes Details Strip */}
        <div className="mt-4 sm:mt-5 p-3.5 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 transition-all duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: FRAGRANCE_FAMILIES[activeNoteIdx].accent }}
              />
              <span className="text-xs sm:text-sm font-semibold text-white">
                {FRAGRANCE_FAMILIES[activeNoteIdx].name}
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
                {FRAGRANCE_FAMILIES[activeNoteIdx].mood}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              {FRAGRANCE_FAMILIES[activeNoteIdx].notes}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowNotesModal(true)}
            className="text-xs text-[#2997ff] hover:text-[#70baff] font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View all 30 formulas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

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
