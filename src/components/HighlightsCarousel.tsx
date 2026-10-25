import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SlideData {
  id: string;
  img: string;
  title: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'diffuser-collection',
    img: '/assets/aistudio/AromaxAI_Diffuser_Collection_6457b2ea.png',
    title: 'Aromax AI Diffuser Collection',
  },
  {
    id: 'library-scents',
    img: '/assets/aistudio/Library_of_Scents_with_Handheld_Vials_fd03d189.png',
    title: 'Library of Scents',
  },
  {
    id: 'on-device-pcb',
    img: '/assets/aistudio/On-Device_Processing_PCB_Module_edb2944f.png',
    title: 'On-Device Processing Module',
  },
  {
    id: 'type-c-cartridge',
    img: '/assets/aistudio/Your_Scents__Your_Choice_Cartridge_a580d9de.png',
    title: 'USB-C Plug-and-Play Cartridge',
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
    <section className="w-full max-w-[1440px] mx-auto space-y-6 sm:space-y-8 select-none px-4 sm:px-6">
      {/* 1. Header: "Get the highlights." + "Watch the film" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Get the highlights.
        </h2>

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

      {/* 2. Main Slideshow Carousel Track with Pure Sharp Images (Zero Fade, Zero Text Overlay) */}
      <div className="relative group/carousel overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 bg-black shadow-2xl">
        {/* Slides Track */}
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] aspect-[16/9] min-h-[440px] sm:min-h-[580px] lg:min-h-[680px]"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 h-full relative overflow-hidden bg-black flex items-center justify-center"
            >
              {/* Full Image: 100% natural contrast, zero fade/vignette overlay, fully fitting */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
          ))}
        </div>

        {/* Hover Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-xl z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 3. Floating Bottom Control Capsule (Apple reference design) */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black/75 border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-4 backdrop-blur-2xl shadow-2xl">
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
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Film Modal (when clicking "Watch the film") */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl">
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
