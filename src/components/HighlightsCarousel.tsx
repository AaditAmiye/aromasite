import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SlideData {
  id: string;
  img: string;
  title: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'library-scents',
    img: '/assets/aistudio/Library_of_Scents_with_Handheld_Vials_fd03d189.png',
    title: 'Library of Scents',
  },
  {
    id: 'on-device-pcb',
    img: '/assets/aistudio/IMG_9472_fcf9d0be.PNG',
    title: 'On-Device Processing',
  },
  {
    id: 'aromax-app-showcase',
    img: '/assets/aistudio/AromaxAI_Dark_App_Showcase_e15d788a.png',
    title: 'AromaxAI App & Scent Experience',
  },
];

const SLIDE_DURATION = 2600; // Faster auto-slide duration (2.6s per slide)

export const HighlightsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  // Touch swipe support for mobile and tablet
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

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
    <section className="w-full max-w-[1440px] mx-auto select-none px-3 sm:px-6">
      <ScrollReveal delay={0}>
        {/* 
          MAIN SLIDESHOW CAROUSEL:
          - Grey frame with rounded corners and border
          - Image centered horizontally and vertically
          - Responsive aspect ratio for phone and tablet
          - Mobile swipe gestures enabled
          - Background: rgb(29, 29, 31)
        */}
        <div
          className="relative group/carousel overflow-hidden rounded-[26px] sm:rounded-[38px] md:rounded-[44px] border border-white/10 shadow-2xl w-full aspect-[16/10] sm:aspect-[16/9] min-h-[240px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
          style={{ backgroundColor: 'rgb(29, 29, 31)' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides Track */}
          <div
            className="flex w-full h-full transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-9 relative"
                style={{ backgroundColor: 'rgb(29, 29, 31)' }}
              >
                {/* Inner curved card: smaller than grey box, curved edges, grey container acts as border */}
                <div className="w-full h-full rounded-[18px] sm:rounded-[26px] md:rounded-[32px] overflow-hidden bg-black border border-white/10 shadow-2xl relative flex items-center justify-center">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-contain object-center select-none pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Hover Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-30"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-30"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Floating Bottom Control Capsule */}
          <div className="absolute bottom-4 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-30 scale-90 sm:scale-100 flex items-center gap-2.5 sm:gap-3">
            {/* Progress Indicators Pill */}
            <div className="bg-black/80 border border-white/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 backdrop-blur-2xl shadow-2xl">
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
                      <div className="w-8 sm:w-12 h-1.5 rounded-full bg-white/25 overflow-hidden relative">
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

            {/* Play / Pause Toggle Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-black/95 border border-white/20 text-white flex items-center justify-center backdrop-blur-2xl transition-all cursor-pointer shadow-2xl active:scale-90"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              ) : (
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
