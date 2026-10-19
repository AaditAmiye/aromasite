import React, { useEffect, useState, useRef } from 'react';
import { BlueberryBlobs } from './components/BlueberryBlobs';
import { ParticleCanvas } from './components/ParticleCanvas';
import { IntroducingScene } from './components/IntroducingScene';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef(0);
  const touchStartY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFadingToBlack, setIsFadingToBlack] = useState(false);

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
      if (isFadingToBlack) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
      targetScrollRef.current = scrollY;
    };

    // 2. Wheel Event (Direct Trackpad / Mouse Wheel Listener for sandbox iframes)
    const handleWheel = (e: WheelEvent) => {
      if (isFadingToBlack) return;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + e.deltaY * 0.85, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      setScrollProgress(newScroll / maxScroll);
    };

    // 3. Touch Drag Event for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (isFadingToBlack) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isFadingToBlack) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
      );
      const currentScroll = window.scrollY || targetScrollRef.current;
      const newScroll = Math.min(Math.max(currentScroll + deltaY * 2.3, 0), maxScroll);
      targetScrollRef.current = newScroll;

      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      setScrollProgress(newScroll / maxScroll);
    };

    // 4. Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFadingToBlack) return;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        400
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
  }, [isFadingToBlack]);

  // Handle "Explore Now" click: pure basic fade out to black with no music or animations
  const handleExploreClick = () => {
    setIsFadingToBlack(true);
  };

  // Map global scroll [0, 1] to Scene 1 bloom/evaporation
  const scene1Bloom = isMobile
    ? Math.min(Math.max((scrollProgress - 0.02) / 0.18, 0), 1)
    : Math.min(Math.max((scrollProgress - 0.06) / 0.32, 0), 1);

  // Faster transition out on mobile
  const scene1FadeOut = isMobile
    ? Math.max(0, 1 - Math.max(0, scrollProgress - 0.12) * 7)
    : Math.max(0, 1 - Math.max(0, scrollProgress - 0.20) * 5);

  // Fade-in progress for the "Explore Now" button when scrolled fully
  const exploreButtonProgress = Math.min(
    Math.max((scrollProgress - (isMobile ? 0.82 : 0.86)) / (isMobile ? 0.14 : 0.12), 0),
    1
  );

  return (
    <div className={`relative w-full ${isMobile ? 'min-h-[190vh]' : 'min-h-[260vh]'}`}>
      {/* Pinned Fullscreen Viewport: Pure Minimalist Center Text Experience */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        {/* Background blobs that transition smoothly from white into pure black on scroll */}
        <BlueberryBlobs scrollProgress={scrollProgress} />

        {/* Center Text 1: "What if ChatGPT can generate Smells?" (on white background, evaporates on scroll) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style={{
            opacity: scene1FadeOut,
            pointerEvents: scrollProgress > (isMobile ? 0.20 : 0.30) ? 'none' : 'auto',
          }}
        >
          <ParticleCanvas scrollProgress={scene1Bloom} />
        </div>

        {/* Center Text 2: "INTRODUCING" + "Aromax AI" flyover particles on black theme */}
        <IntroducingScene scrollProgress={scrollProgress} />

        {/* Beautiful Blurry Glass "Explore Now" Button (centered, compact size) */}
        <div
          className="absolute bottom-10 sm:bottom-12 inset-x-0 flex justify-center items-center pointer-events-none z-30 transition-all duration-500 ease-out"
          style={{
            opacity: exploreButtonProgress,
            transform: `translateY(${(1 - exploreButtonProgress) * 14}px)`,
          }}
        >
          <button
            onClick={handleExploreClick}
            aria-label="Explore Now"
            className="pointer-events-auto relative group px-5 py-2 sm:px-6 sm:py-2.5 rounded-full flex items-center gap-2 select-none cursor-pointer outline-hidden transition-all duration-200 active:scale-95 shadow-[0_4px_24px_0_rgba(0,0,0,0.4)]"
          >
            {/* Soft diffuse ambient glow behind glass */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-blue-500/25 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />

            {/* Liquid frosted glass background */}
            <div className="absolute inset-0 rounded-full bg-white/[0.08] group-hover:bg-white/[0.14] backdrop-blur-xl border border-white/20 group-hover:border-white/35 transition-colors" />

            {/* Subtle specular reflection highlight on top border */}
            <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Button Label & Icon */}
            <span className="relative z-10 text-xs sm:text-sm font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">
              Explore Now
            </span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 text-indigo-200 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* Pure Black Fadeout Layer: basic smooth fade out to pure black, no music, no overlays */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ease-in-out ${
          isFadingToBlack ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
}
