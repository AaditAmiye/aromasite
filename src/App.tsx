import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { FullScreenVideo } from './components/FullScreenVideo';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const explodeRef = useRef<(() => void) | null>(null);

  // Silky smooth inertia-based scroll engine
  useEffect(() => {
    let rafId: number | null = null;
    let isRunning = true;

    const maxScrollHeight = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 500);

    const updateLoop = () => {
      if (!isRunning) return;

      const maxScroll = maxScrollHeight();
      const target = Math.min(Math.max(targetScrollRef.current, 0), maxScroll);
      const current = currentScrollRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.3) {
        currentScrollRef.current += diff * 0.095;
      } else {
        currentScrollRef.current = target;
      }

      const progress = Math.min(Math.max(currentScrollRef.current / maxScroll, 0), 1);
      setScrollProgress(progress);

      // Keep native scroll in sync quietly
      window.scrollTo({ top: currentScrollRef.current, behavior: 'instant' as ScrollBehavior });

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    // Track native window scroll events (e.g. dragging scrollbar)
    const handleNativeScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Only sync if user dragged the native scrollbar directly
      if (Math.abs(scrollY - currentScrollRef.current) > 30) {
        targetScrollRef.current = scrollY;
        currentScrollRef.current = scrollY;
      }
    };

    // Trackpad and mouse wheel smoothing
    const handleWheel = (e: WheelEvent) => {
      const maxScroll = maxScrollHeight();
      targetScrollRef.current = Math.min(
        Math.max(targetScrollRef.current + e.deltaY * 0.9, 0),
        maxScroll
      );
    };

    // Mobile touch gestures
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const maxScroll = maxScrollHeight();
      targetScrollRef.current = Math.min(
        Math.max(targetScrollRef.current + deltaY * 1.85, 0),
        maxScroll
      );
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = maxScrollHeight();

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        targetScrollRef.current = Math.min(targetScrollRef.current + 250, maxScroll);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetScrollRef.current = Math.max(targetScrollRef.current - 250, 0);
      } else if (e.code === 'Space' && scrollProgress < 0.25) {
        e.preventDefault();
        if (explodeRef.current) {
          explodeRef.current();
        }
      }
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isRunning = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollProgress]);

  const handleScrollToBottom = useCallback(() => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      500
    );
    targetScrollRef.current = maxScroll;
  }, []);

  // Screen fades through pure black between 0.28 and 0.65
  const blackFadeOpacity = Math.min(
    Math.max((scrollProgress - 0.25) / 0.35, 0),
    1
  );

  return (
    <div className="relative w-full bg-black select-none text-slate-100 min-h-[240vh]">
      {/* Pinned Fullscreen Stage */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
        {/* 1. Pure Black Backdrop with Warm Amber Glow (fades smoothly on scroll) */}
        <AmbientBackdrop scrollProgress={scrollProgress} />

        {/* 2. Pure Particle Typography Centerpiece (reduces particles during scroll, crystallizes at rest) */}
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

        {/* 4. Fullscreen Video Player (always restarts from 0 and autoplays when entered) */}
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
