import { useEffect, useState, useRef } from 'react';
import { GlassTextHero } from './components/GlassTextHero';
import { FullScreenVideo } from './components/FullScreenVideo';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef(0);
  const touchStartY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const scheduleProgressUpdate = (progress: number) => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollProgress(progress);
        rafId = null;
      });
    };

    // 1. Native Window Scroll Listener
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        350
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scheduleProgressUpdate(progress);
      targetScrollRef.current = scrollY;
    };

    // 2. Wheel Event Listener (Immediate trackpad & mouse wheel response in sandbox iframes)
    const handleWheel = (e: WheelEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        350
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + e.deltaY * 0.9, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      scheduleProgressUpdate(newScroll / maxScroll);
    };

    // 3. Touch Drag Event for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        350
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + deltaY * 2.2, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      scheduleProgressUpdate(newScroll / maxScroll);
    };

    // 4. Keyboard Navigation (Arrow keys, space, page down)
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        350
      );
      const currentScroll = window.scrollY || targetScrollRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        const newScroll = Math.min(currentScroll + 180, maxScroll);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newScroll = Math.max(currentScroll - 180, 0);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
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
  }, []);

  // Screen fades smoothly to pure black on scroll as video reveals
  const blackFadeProgress = Math.min(
    Math.max((scrollProgress - (isMobile ? 0.20 : 0.25)) / (isMobile ? 0.50 : 0.55), 0),
    1
  );

  // When scrolled down, transition into fullscreen video playback
  const isVideoActive = scrollProgress >= 0.88;

  const handleCloseVideo = () => {
    targetScrollRef.current = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
  };

  return (
    <div
      className={`relative w-full bg-black ${
        isMobile ? 'min-h-[185vh]' : 'min-h-[230vh]'
      }`}
    >
      {/* Pinned Fullscreen Viewport - 100% Solid Black with ONLY the Glass Text */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
        {/* iOS Glassmorphic Text Hero: ONLY the text "What if ChatGPT could generate Smells?" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
          <GlassTextHero scrollProgress={scrollProgress} />
        </div>

        {/* Pure Black Fadeout Layer: As you scroll down, transitions smoothly to video */}
        <div
          className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-150 ease-out z-20"
          style={{
            opacity: blackFadeProgress,
          }}
        />

        {/* Fullscreen Video Player: Plays automatically on scroll with no controls */}
        <FullScreenVideo
          isVisible={isVideoActive}
          onClose={handleCloseVideo}
        />
      </div>
    </div>
  );
}
