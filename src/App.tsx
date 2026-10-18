import React, { useEffect, useState, useRef } from 'react';
import { BlueberryBlobs } from './components/BlueberryBlobs';
import { ParticleCanvas } from './components/ParticleCanvas';
import { IntroducingScene } from './components/IntroducingScene';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    // 1. Native Window Scroll Listener
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        600
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
      targetScrollRef.current = scrollY;
    };

    // 2. Wheel Event (Direct Trackpad / Mouse Wheel Listener for sandbox iframes)
    const handleWheel = (e: WheelEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        600
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + e.deltaY * 0.85, 0), maxScroll);
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
        600
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + deltaY * 1.5, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      setScrollProgress(newScroll / maxScroll);
    };

    // 4. Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        600
      );
      const currentScroll = window.scrollY || targetScrollRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        const newScroll = Math.min(currentScroll + 220, maxScroll);
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newScroll = Math.max(currentScroll - 220, 0);
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

  // Map global scroll [0, 1] to Scene 1 bloom/evaporation
  const scene1Bloom = Math.min(Math.max((scrollProgress - 0.06) / 0.32, 0), 1);

  return (
    <div className="relative min-h-[260vh] w-full">
      {/* Pinned Fullscreen Viewport: Pure Minimalist Center Text Experience */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        {/* Background blobs that transition smoothly from white into pure black on scroll */}
        <BlueberryBlobs scrollProgress={scrollProgress} />

        {/* Center Text 1: "What if ChatGPT can generate Smells?" (on white background, evaporates on scroll) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style={{
            opacity: Math.max(0, 1 - Math.max(0, scrollProgress - 0.20) * 5),
            pointerEvents: scrollProgress > 0.30 ? 'none' : 'auto',
          }}
        >
          <ParticleCanvas scrollProgress={scene1Bloom} />
        </div>

        {/* Center Text 2: "INTRODUCING" + "Aromax AI" flyover particles on black theme */}
        <IntroducingScene scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}
