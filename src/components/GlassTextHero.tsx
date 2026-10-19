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
        AMBIENT AMBER OPTICAL GLOW (Subtle warm perfume aura matching the film)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-2xl h-[55%] rounded-full pointer-events-none select-none blur-[95px] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(249, 115, 22, 0.28) 0%, rgba(217, 119, 6, 0.16) 40%, rgba(180, 83, 9, 0.05) 70%, transparent 90%)',
        }}
        aria-hidden="true"
      />

      {/* 
        AUTHENTIC iOS SMOKED & AMBER-ORANGE GLASS TYPOGRAPHY CONTAINER
        - Preserves the iOS lockscreen glass embossed structure (crisp white specular top rim, dark smoked body).
        - Infuses a luminous warm amber-orange refraction in the lower half and edge bevels, harmonizing with the luxury perfume film.
        - Zero cheesy hover reflections or moving sweep bars.
      */}
      <div className="relative inline-block text-center cursor-default max-w-5xl">
        {/* 
          LAYER 1: The Smoked Glass Core with Amber-Orange Refraction
          Transitions from frosted smoked slate/quartz at top to rich warm amber crystal at bottom
        */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              176deg,
              #a3abbd 0%,
              #5c6273 20%,
              #363a48 42%,
              #42291e 62%,
              #9a4014 78%,
              #d95b16 90%,
              #f97316 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter:
              'drop-shadow(0 4px 18px rgba(0, 0, 0, 0.95)) drop-shadow(0 8px 30px rgba(234, 88, 12, 0.22))',
          }}
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </h1>

        {/* 
          LAYER 2: Internal Luminous Amber-Orange Caustic Glow
          Adds vibrant depth and backlit radiance to the lower letters like liquid perfume
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              180deg,
              transparent 25%,
              rgba(251, 146, 60, 0.15) 50%,
              rgba(249, 115, 22, 0.65) 75%,
              rgba(234, 88, 12, 0.85) 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mixBlendMode: 'color-dodge',
            opacity: 0.9,
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>

        {/* 
          LAYER 3: Top Bevel Highlight (The Signature iOS Glass Specular White Rim)
          Maintains the crisp white reflection on the upper edge of every character
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            background: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.85) 0%,
              rgba(255, 255, 255, 0.28) 10%,
              rgba(255, 255, 255, 0.05) 24%,
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
          LAYER 4: Dual Bevel Relief: White Top Rim + Warm Orange Bottom Rim
          Sub-pixel top highlight (-1px) and warm amber-orange bottom edge (+1.5px)
          giving the physical 3D embossed glass effect of the iOS reference
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            color: 'transparent',
            filter:
              'drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.75)) drop-shadow(-1px 0px 0px rgba(255, 255, 255, 0.28)) drop-shadow(0px 1.5px 1px rgba(251, 146, 60, 0.55)) drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.95))',
            opacity: 0.92,
          }}
          aria-hidden="true"
        >
          <span className="block">What if ChatGPT</span>
          <span className="block mt-1 sm:mt-2.5">could generate Smells?</span>
        </div>

        {/* 
          LAYER 5: Fine 1px Optical Glass Contour Rim
          Gives crisp outer boundary definition to the molded glass
        */}
        <div
          className="absolute inset-0 pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.12]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.18)',
            color: 'transparent',
            mixBlendMode: 'screen',
            opacity: 0.65,
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
