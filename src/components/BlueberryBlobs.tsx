import React from 'react';

interface BlueberryBlobsProps {
  scrollProgress?: number;
}

/**
 * Atmospheric Deep Blueberry & Dark Indigo Ambient Glow
 * Provides the rich, dark, luminous substrate that shines through
 * the transparent glass typography, exactly like an Apple iOS OLED wallpaper.
 * Smoothly dissolves into pure black on scroll.
 */
export const BlueberryBlobs: React.FC<BlueberryBlobsProps> = ({ scrollProgress = 0 }) => {
  // Dissolves smoothly as user scrolls towards bottom
  const opacity = Math.max(0, 1 - scrollProgress * 1.8);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-black transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Central subtle sapphire backlight directly illuminating the glass text from behind */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(65, 80, 140, 0.22) 0%, rgba(35, 45, 95, 0.12) 40%, rgba(15, 20, 45, 0.05) 70%, transparent 100%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Floating Organic Midnight Blueberry Orb 1 (Top Left) */}
      <div
        className="absolute -top-16 left-[15%] w-[550px] h-[550px] rounded-full animate-blob-1"
        style={{
          background:
            'radial-gradient(circle, rgba(50, 40, 120, 0.25) 0%, rgba(30, 25, 80, 0.12) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Floating Organic Royal Indigo Orb 2 (Right Center) */}
      <div
        className="absolute top-[30%] -right-12 w-[600px] h-[600px] rounded-full animate-blob-2"
        style={{
          background:
            'radial-gradient(circle, rgba(40, 60, 130, 0.22) 0%, rgba(20, 35, 90, 0.10) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Floating Subtle Violet Caustic Orb 3 (Bottom Center) */}
      <div
        className="absolute -bottom-20 left-[30%] w-[650px] h-[450px] rounded-full animate-blob-3"
        style={{
          background:
            'radial-gradient(ellipse, rgba(70, 35, 110, 0.18) 0%, rgba(30, 20, 60, 0.08) 55%, transparent 75%)',
          filter: 'blur(95px)',
        }}
      />

      {/* Subtle Apple OLED Vignette Grid / Texture */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.5) 75%, #000000 100%)',
        }}
      />
    </div>
  );
};
