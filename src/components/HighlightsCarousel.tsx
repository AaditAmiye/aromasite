import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SlideData {
  id: string;
  tag: string;
  headline: string;
  caption: string;
  badge: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'nano-nebulizer',
    tag: 'Dispersion Technology',
    headline: 'Cold-Air Nano Nebulizer with 0.1μm micro-dispersion. Pure essential oils, zero heat, zero water dilution.',
    caption: 'Twin-fluid acoustic nozzles fragment pure botanical extracts into microscopic droplets that remain suspended in ambient air currents for hours.',
    badge: '0.1μm Droplets',
  },
  {
    id: 'variable-aperture',
    tag: 'Mechanical Precision',
    headline: 'Precision Variable Aperture with multi-blade titanium iris. Seamless intensity control from intimate to expansive.',
    caption: 'Milled titanium aperture blades contract and expand dynamically, modulating vapor flow to match room dimensions and air circulation.',
    badge: 'Titanium Iris',
  },
  {
    id: 'a18-silicon',
    tag: 'Autonomous Intelligence',
    headline: 'A18 Olfactory Silicon with real-time air chemistry sensing. Calibrates diffusion automatically to human presence.',
    caption: 'Dual VOC and PM2.5 laser sensors scan ambient air 1,000 times per second, adapting micro-release to your daily circadian rhythm.',
    badge: '1,000Hz Sensors',
  },
  {
    id: 'acoustic-chamber',
    tag: 'Acoustic Architecture',
    headline: 'Patented whisper acoustic labyrinth. Operating sound floor below 18 dBA — quieter than a falling leaf.',
    caption: 'Spiral sound baffles absorb fluid cavitation resonance, delivering continuous olfactory transformation in total silence.',
    badge: '< 18 dBA Silent',
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide

export const HighlightsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  // Smooth progress bar update loop
  useEffect(() => {
    if (!isPlaying) return;

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        elapsedBeforePauseRef.current = 0;
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        setProgress(0);
        startTimeRef.current = Date.now();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [isPlaying, currentSlide]);

  const goToSlide = (idx: number) => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
    setCurrentSlide(idx);
    startTimeRef.current = Date.now();
  };

  const handleNext = () => {
    goToSlide((currentSlide + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto space-y-8 select-none">
      {/* 1. Header: "Get the highlights." + "Watch the film" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-1">Highlights</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Get the highlights.
          </h2>
        </div>

        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#2997ff] hover:text-[#0071e3] transition-colors cursor-pointer group"
        >
          <span>Watch the film</span>
          <span className="w-6 h-6 rounded-full border border-[#2997ff] flex items-center justify-center group-hover:bg-[#2997ff]/10 transition-all">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </span>
        </button>
      </div>

      {/* 2. Main Slideshow Carousel Track with Side Peeks */}
      <div className="relative group/carousel overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#161617] shadow-2xl">
        {/* Slides Track */}
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] h-[520px] sm:h-[620px] md:h-[680px]"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {SLIDES.map((slide, idx) => {
            return (
              <div
                key={slide.id}
                className="w-full flex-shrink-0 h-full relative overflow-hidden flex flex-col justify-between p-8 sm:p-14"
              >
                {/* Visual Backdrop Layer */}
                <div className="absolute inset-0 z-0">
                  {idx === 0 && (
                    <div className="relative w-full h-full bg-gradient-to-b from-[#18181b] via-[#121214] to-black flex items-center justify-center overflow-hidden">
                      {/* Integrated 3D Product Video Layer */}
                      <video
                        className="w-full h-full object-cover opacity-60 scale-105 filter contrast-125"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
                        <source src="/armoax2_web.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="relative w-full h-full bg-gradient-to-br from-[#2a1a1e] via-[#191418] to-black flex items-center justify-center overflow-hidden">
                      {/* Mechanical Titanium Iris Aperture (Reference from Apple camera) */}
                      <div className="relative w-72 sm:w-96 md:w-[440px] aspect-square rounded-full border border-white/10 p-3 sm:p-5 flex items-center justify-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9),0_0_60px_rgba(159,48,77,0.15)]">
                        {/* Outer Chiseled Bevel Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none" />
                        {/* Iris Blades Hub */}
                        <div className="relative w-48 sm:w-64 md:w-72 aspect-square rounded-full bg-black/90 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                          {/* 6 Rotating Iris Aperture Blades */}
                          {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <div
                              key={deg}
                              className="absolute w-36 sm:w-48 h-10 bg-gradient-to-r from-neutral-800 to-neutral-900 border-t border-white/15 origin-left rounded-r-lg shadow-lg transition-transform duration-1000"
                              style={{
                                transform: `rotate(${deg}deg) translate(28px, 12px)`,
                              }}
                            />
                          ))}
                          {/* Center Deep Lens Pupil */}
                          <div className="relative z-10 w-20 sm:w-28 aspect-square rounded-full bg-gradient-to-br from-indigo-950 via-purple-950/60 to-black border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.35)] flex items-center justify-center">
                            <div className="w-8 sm:w-12 aspect-square rounded-full bg-white/20 blur-sm animate-pulse" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="relative w-full h-full bg-gradient-to-br from-[#121c24] via-[#0d141b] to-black flex items-center justify-center overflow-hidden">
                      {/* A18 Olfactory Silicon Visual */}
                      <div className="relative w-64 sm:w-80 md:w-96 aspect-square rounded-3xl bg-neutral-950/90 border border-cyan-500/25 p-6 flex flex-col items-center justify-center shadow-[0_0_70px_rgba(6,182,212,0.18)]">
                        <div className="w-20 sm:w-24 aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent border border-cyan-400/40 flex items-center justify-center shadow-inner mb-4">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tracking-tighter">A18</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest mb-3">Olfactory Core</div>
                        {/* Live Frequency Sensor Wave */}
                        <div className="flex items-center gap-1.5 h-8">
                          {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 65].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full bg-cyan-400/80 animate-pulse"
                              style={{
                                height: `${h}%`,
                                animationDelay: `${i * 90}ms`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="relative w-full h-full bg-gradient-to-br from-[#1c1814] via-[#141210] to-black flex items-center justify-center overflow-hidden">
                      {/* Acoustic Silence Labyrinth */}
                      <div className="relative flex items-center justify-center">
                        {[160, 240, 320, 400, 480].map((dim, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border border-amber-500/20 transition-all duration-1000"
                            style={{
                              width: `${dim}px`,
                              height: `${dim}px`,
                              transform: `scale(${1 + (i % 2 === 0 ? 0.05 : -0.05)})`,
                              opacity: 1 - i * 0.18,
                            }}
                          />
                        ))}
                        <div className="relative z-10 px-5 py-2.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-mono tracking-wider shadow-2xl">
                          17.8 dBA • Whispering Labyrinth
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
                    </div>
                  )}
                </div>

                {/* Top Headline Text Overlay (Centered, Apple Pro style) */}
                <div className="relative z-10 text-center max-w-3xl mx-auto pt-2 sm:pt-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-neutral-300 mb-3 backdrop-blur-md border border-white/10">
                    {slide.tag}
                  </span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                    {slide.headline}
                  </h3>
                </div>

                {/* Bottom Caption & Specs Badge */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 max-w-4xl mx-auto w-full">
                  <p className="text-xs sm:text-sm text-neutral-300/90 max-w-xl text-center sm:text-left leading-relaxed">
                    {slide.caption}
                  </p>
                  <span className="px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md border border-white/20 whitespace-nowrap shadow-sm">
                    {slide.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Bottom Control Capsule (Exact match to Apple reference image) */}
      <div className="flex items-center justify-center pt-2">
        <div className="bg-[#1d1d1f]/90 border border-white/15 rounded-full px-5 py-2.5 flex items-center gap-4 backdrop-blur-xl shadow-2xl">
          {/* Progress Pill / Indicators */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((_, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="cursor-pointer py-1 group flex items-center"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {isCurrent ? (
                    /* Active expanded pill with filling progress bar */
                    <div className="w-10 sm:w-12 h-1.5 rounded-full bg-white/25 overflow-hidden relative">
                      <div
                        className="h-full bg-white rounded-full transition-[width] duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : (
                    /* Inactive dot */
                    <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/80 transition-colors" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-white/20" />

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* 4. Film Modal (when clicking "Watch the film") */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl">
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            >
              <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
              <source src="/armoax2_web.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};
