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
        400
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scheduleProgressUpdate(progress);
      targetScrollRef.current = scrollY;
    };

    // 2. Wheel Event Listener (Trackpad & mouse wheel response in iframe sandbox)
    const handleWheel = (e: WheelEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
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
        400
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
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        const newScroll = Math.min(currentScroll + 200, maxScroll);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newScroll = Math.max(currentScroll - 200, 0);
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

  // Smooth video reveal curve: starts fading in at 0.12, fully visible by 0.70
  const videoOpacity = Math.min(Math.max((scrollProgress - 0.12) / 0.58, 0), 1);

  const handleExploreVideo = () => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      400
    );
    window.scrollTo({ top: maxScroll, behavior: 'smooth' });
  };

  const handleReturnToTop = () => {
    targetScrollRef.current = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`relative w-full bg-black ${
        isMobile ? 'min-h-[190vh]' : 'min-h-[220vh]'
      }`}
    >
      {/* Pinned Fullscreen Viewport */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
        {/* Fullscreen Video Player - Streamed in high performance H.264 */}
        <FullScreenVideo
          opacity={videoOpacity}
          onReturnToTop={handleReturnToTop}
        />

        {/* iOS Glassmorphic Text Hero: ONLY the text "What if ChatGPT could generate Smells?" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <GlassTextHero
            scrollProgress={scrollProgress}
            onExploreVideo={handleExploreVideo}
          />
        </div>
      </div>
    </div>
  );
}
