import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { FullScreenVideo } from './components/FullScreenVideo';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef(0);
  const touchStartY = useRef(0);
  const explodeRef = useRef<(() => void) | null>(null);

  // Silky smooth scroll listener supporting native window scroll, trackpad wheel, and touch
  useEffect(() => {
    let rafId: number | null = null;

    const scheduleProgressUpdate = (progress: number) => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollProgress(progress);
        rafId = null;
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scheduleProgressUpdate(progress);
      targetScrollRef.current = scrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + e.deltaY * 0.95, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      scheduleProgressUpdate(newScroll / maxScroll);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + deltaY * 2.2, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      scheduleProgressUpdate(newScroll / maxScroll);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const newScroll = Math.min(currentScroll + 240, maxScroll);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newScroll = Math.max(currentScroll - 240, 0);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
      } else if (e.code === 'Space' && scrollProgress < 0.25) {
        e.preventDefault();
        if (explodeRef.current) {
          explodeRef.current();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollProgress]);

  const handleScrollToBottom = useCallback(() => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      400
    );
    window.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }, []);

  // Screen fades through pure black between 0.30 and 0.65
  const blackFadeOpacity = Math.min(
    Math.max((scrollProgress - 0.25) / 0.35, 0),
    1
  );

  return (
    <div className="relative w-full bg-black select-none text-slate-100 min-h-[220vh]">
      {/* Pinned Fullscreen Stage */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
        {/* 1. Pure Black Backdrop with Warm Amber Glow (fades smoothly on scroll) */}
        <AmbientBackdrop scrollProgress={scrollProgress} />

        {/* 2. Pure Particle Typography Centerpiece (blooms & scatters smoothly on scroll) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-auto transition-opacity duration-150"
          style={{
            pointerEvents: scrollProgress < 0.4 ? 'auto' : 'none',
          }}
        >
          <ParticleCanvas
            scrollProgress={scrollProgress}
            onExplodeRef={explodeRef}
          />
        </div>

        {/* 3. Pure Black Intermediate Dissolve Layer */}
        <div
          className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-150 ease-out z-10"
          style={{
            opacity: blackFadeOpacity,
          }}
        />

        {/* 4. Fullscreen Video Player (fades in and autoplays when scrolled down, completely uninterrupted) */}
        <FullScreenVideo scrollProgress={scrollProgress} />

        {/* 5. Minimalist Scroll Prompt (visible only at the top) */}
        {scrollProgress < 0.15 && (
          <button
            onClick={handleScrollToBottom}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-white/40 hover:text-white transition-all duration-300 cursor-pointer group"
          >
            <span className="text-[10px] tracking-widest uppercase font-mono">
              Scroll Down
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-white/50 group-hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
