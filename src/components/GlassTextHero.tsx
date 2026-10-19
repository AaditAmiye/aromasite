import React from 'react';

interface GlassTextHeroProps {
  scrollProgress: number;
}

export const GlassTextHero: React.FC<GlassTextHeroProps> = ({ scrollProgress }) => {
  // Smoothly dissolve as user scrolls down towards the video
  const heroOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const heroScale = 1 - scrollProgress * 0.03;

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center select-none"
      style={{
        opacity: heroOpacity,
        transform: `scale(${heroScale})`,
        pointerEvents: heroOpacity > 0.05 ? 'auto' : 'none',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      }}
    >
      {/* 
        AUTHENTIC iOS SMOKED GLASS TYPOGRAPHY CONTAINER
        - Modeled after the iOS lockscreen glass clock (dark smoked quartz/graphite body with crisp white specular top-rim bevel).
        - Zero cheesy animations or sweeps.
        - Zero hover reflections or cursor tracking.
        - Pristine, static, professional luxury brand typography.
      */}
      <div className="relative inline-block text-center cursor-default max-w-5xl">
        {/* 
          LAYER 1: The Smoked Glass Core Body
          Dark translucent graphite/quartz gradient matching the iOS glass numerals
        */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              180deg,
              #5a5f6e 0%,
              #434755 26%,
              #2d303b 62%,
              #1e2027 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.9))',
          }}
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </h1>

        {/* 
          LAYER 2: Top Bevel Highlight (The Signature iOS Glass Specular Rim)
          In the iOS lockscreen clock, the top edge of every character catches soft overhead light
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.72) 0%,
              rgba(255, 255, 255, 0.22) 12%,
              rgba(255, 255, 255, 0.04) 26%,
              transparent 45%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>

        {/* 
          LAYER 3: Physical 1px Embossed Glass Edge Relief
          Precise sub-pixel top highlight (-1px) and bottom depth shadow (+2px)
          giving the exact tactile extruded glass feel of the iOS reference
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            color: 'transparent',
            filter:
              'drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.65)) drop-shadow(-1px 0px 0px rgba(255, 255, 255, 0.25)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.95))',
            opacity: 0.88,
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>

        {/* 
          LAYER 4: Precision 1px Optical Contour Rim
          Subtle glass edge definition
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.16)',
            color: 'transparent',
            mixBlendMode: 'screen',
            opacity: 0.7,
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>

        {/* 
          LAYER 5: Faint Warm Caustic Refraction at Base
          Subtle harmony with the luxury amber fragrance video
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              0deg,
              rgba(215, 170, 110, 0.16) 0%,
              rgba(215, 170, 110, 0.05) 15%,
              transparent 35%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>
      </div>
    </div>
  );
};
