import React, { useState, useEffect } from 'react';
import { TextParticleSystem } from './TextParticleSystem';
import { Sparkles } from 'lucide-react';

interface GlassTextHeroProps {
  scrollProgress: number;
  onExploreVideo?: () => void;
}

export const GlassTextHero: React.FC<GlassTextHeroProps> = ({
  scrollProgress,
  onExploreVideo: _onExploreVideo,
}) => {
  // Smoothly dissolve as user scrolls down towards the video
  const heroOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const heroScale = 1 - scrollProgress * 0.03;

  // Particle text formation states
  const [isFormed, setIsFormed] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Reveal formed text as particles lock into place
    const timer = setTimeout(() => {
      setTextOpacity(1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [key]);

  const handleReplay = () => {
    setIsFormed(false);
    setTextOpacity(0);
    setKey((prev) => prev + 1);
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 min-h-[380px] flex flex-col items-center justify-center select-none"
      style={{
        opacity: heroOpacity,
        transform: `scale(${heroScale})`,
        pointerEvents: heroOpacity > 0.05 ? 'auto' : 'none',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      }}
    >
      {/* 
        AMBIENT AMBER OPTICAL GLOW
        Matching image_d24d084e.png: warm amber-orange backlight centered behind the text on pure black
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl h-[65%] rounded-full pointer-events-none select-none blur-[95px] transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse at 50% 64%, rgba(234, 88, 12, 0.28) 0%, rgba(194, 65, 12, 0.16) 38%, rgba(120, 53, 15, 0.06) 68%, transparent 88%)',
          opacity: textOpacity > 0 ? 0.55 : 0.25,
        }}
        aria-hidden="true"
      />

      {/* 
        TYPOGRAPHY & PARTICLE STACK
      */}
      <div
        className="relative inline-block text-center cursor-pointer max-w-5xl w-full py-8"
        onClick={handleReplay}
        title="Click to re-form particles"
      >
        {/* 
          1. PARTICLE CANVAS:
          Line 1: Silvery platinum & smoked quartz motes
          Line 2: Fiery amber-orange motes
          Scatter dynamically on hover and snap back on leave
        */}
        <TextParticleSystem
          key={key}
          isFormed={isFormed}
          setIsFormed={setIsFormed}
          onFormed={() => setTextOpacity(1)}
        />

        {/* 
          2. THE FORMED GLASS TEXT (Matching image_d24d084e.png exactly):
          - Line 1 ("What if ChatGPT"): Smoked platinum & silvery-slate glass
          - Line 2 ("could generate Smells?"): Glowing radiant amber-orange glass
        */}
        <div
          className="relative transition-opacity duration-1000 ease-out"
          style={{
            opacity: textOpacity,
          }}
        >
          {/* Base Typography Container */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.12]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            }}
          >
            {/* LINE 1: What if ChatGPT (Smoked Silvery Quartz / Platinum Glass) */}
            <span
              className="block tracking-[-0.035em] relative"
              style={{
                background:
                  'linear-gradient(180deg, #d8dce8 0%, #a0a6b8 26%, #555b6c 58%, #282b36 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter:
                  'drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.55)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.95))',
              }}
            >
              What if ChatGPT
            </span>

            {/* LINE 2: could generate Smells? (Vibrant Radiant Amber-Orange Glass) */}
            <span
              className="block mt-1 sm:mt-2.5 tracking-[-0.035em] relative"
              style={{
                background:
                  'linear-gradient(180deg, #b83e10 0%, #d85414 24%, #ea580c 52%, #f97316 78%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter:
                  'drop-shadow(0px -1px 0px rgba(255, 205, 155, 0.65)) drop-shadow(0 4px 18px rgba(234, 88, 12, 0.45)) drop-shadow(0 10px 40px rgba(194, 65, 12, 0.25)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.95))',
              }}
            >
              could generate Smells?
            </span>
          </h1>

          {/* Top Bevel Highlight Overlay (Subtle iOS glass overhead glint) */}
          <div
            className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.12]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            }}
            aria-hidden="true"
          >
            <span
              className="block tracking-[-0.035em]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.20) 14%, transparent 45%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mixBlendMode: 'screen',
              }}
            >
              What if ChatGPT
            </span>
            <span
              className="block mt-1 sm:mt-2.5 tracking-[-0.035em]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 220, 180, 0.85) 0%, rgba(251, 146, 60, 0.35) 18%, transparent 50%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mixBlendMode: 'screen',
              }}
            >
              could generate Smells?
            </span>
          </div>

          {/* Precision 1px Optical Contour Rim */}
          <div
            className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.12]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            }}
            aria-hidden="true"
          >
            <span
              className="block tracking-[-0.035em]"
              style={{
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.16)',
                color: 'transparent',
                mixBlendMode: 'screen',
                opacity: 0.6,
              }}
            >
              What if ChatGPT
            </span>
            <span
              className="block mt-1 sm:mt-2.5 tracking-[-0.035em]"
              style={{
                WebkitTextStroke: '1px rgba(251, 146, 60, 0.25)',
                color: 'transparent',
                mixBlendMode: 'screen',
                opacity: 0.7,
              }}
            >
              could generate Smells?
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Re-form Indicator Button */}
      {isFormed && (
        <button
          onClick={handleReplay}
          className="mt-4 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 transition-all text-[11px] tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
          title="Re-synthesize particles"
        >
          <Sparkles className="w-3 h-3 text-orange-400" />
          <span>Reform Particles</span>
        </button>
      )}
    </div>
  );
};
