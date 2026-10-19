import React from 'react';

interface AmbientBackdropProps {
  scrollProgress?: number;
}

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({ scrollProgress = 0 }) => {
  // Glow fades smoothly into pure black as user scrolls down
  const glowOpacity = Math.max(0, 1 - scrollProgress * 2.2);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden bg-black z-0">
      {/* 1. Deep Pure Black Base */}
      <div className="absolute inset-0 bg-black" />

      {/* 2. Soft Horizontal Warm Amber Glow matching image_b5c7e97d.png */}
      <div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-[55%] w-[1100px] h-[480px] max-w-[98vw] rounded-full blur-[80px] transition-opacity duration-150"
        style={{
          opacity: glowOpacity,
          background:
            'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(200, 70, 10, 0.24) 0%, rgba(160, 48, 5, 0.14) 40%, rgba(80, 20, 0, 0.04) 70%, transparent 100%)',
        }}
      />

      {/* 3. Tighter Inner Warmth directly behind "could generate Smells?" */}
      <div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-[58%] w-[680px] h-[220px] max-w-[90vw] rounded-full blur-[50px] transition-opacity duration-150"
        style={{
          opacity: glowOpacity,
          background:
            'radial-gradient(circle, rgba(255, 95, 15, 0.22) 0%, rgba(220, 60, 5, 0.10) 50%, transparent 80%)',
        }}
      />

      {/* 4. Top Black Falloff ensuring upper space around silver text stays deep black */}
      <div
        className="absolute inset-x-0 top-0 h-[42%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.85) 50%, transparent 100%)',
        }}
      />

      {/* 5. Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.95)]"
      />
    </div>
  );
};
