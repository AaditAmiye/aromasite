import React, { useEffect, useState, useRef } from 'react';
import { BlueberryBlobs } from './components/BlueberryBlobs';
import { ParticleCanvas } from './components/ParticleCanvas';

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
    // 1. Native Window Scroll Listener
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        350
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
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
      setScrollProgress(newScroll / maxScroll);
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
      setScrollProgress(newScroll / maxScroll);
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Screen fades out smoothly to pure black on scroll
  // By scrollProgress >= 0.75, the screen is 100% pure black with no remaining elements
  const blackFadeProgress = Math.min(
    Math.max((scrollProgress - (isMobile ? 0.20 : 0.25)) / (isMobile ? 0.50 : 0.55), 0),
    1
  );

  return (
    <div
      className={`relative w-full bg-black ${
        isMobile ? 'min-h-[175vh]' : 'min-h-[220vh]'
      }`}
    >
      {/* Pinned Fullscreen Viewport */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
        {/* Ambient atmospheric blueberry/indigo/violet nebulae that fade out to pure black */}
        <BlueberryBlobs scrollProgress={scrollProgress} />

        {/* Center Text: "What if ChatGPT can generate Smells?" in the dark introduction theme */}
        {/* Particles scatter away outward into space on scroll */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <ParticleCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Pure Black Fadeout Layer: As you scroll down, screen smoothly transitions into 100% pure black */}
        <div
          className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-150 ease-out z-20"
          style={{
            opacity: blackFadeProgress,
          }}
        />
      </div>
    </div>
  );
}
