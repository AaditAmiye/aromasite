import React from 'react';

interface BlueberryBlobsProps {
  scrollProgress?: number;
}

export const BlueberryBlobs: React.FC<BlueberryBlobsProps> = ({ scrollProgress = 0 }) => {
  const p = Math.min(Math.max(scrollProgress, 0), 1);

  // In the introduction dark theme: pure black background
  // When scrolling down, the nebulae fade out smoothly to leave 100% pure black
  const blobsOpacity = Math.max(0, 1 - p * 1.5);
  const bloomScale = 1 + p * 0.35;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-black">
      {/* Central ambient cosmic aura - pre-blurred radial gradient for zero GPU fill-rate overhead */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          opacity: blobsOpacity * 0.9,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.14) 0%, rgba(30, 27, 75, 0.25) 45%, rgba(15, 23, 42, 0.15) 65%, transparent 80%)',
        }}
      />

      {/* Atmospheric Blueberry Blob 1 - Top Left */}
      <div
        className="absolute w-[620px] h-[620px] rounded-full pointer-events-none animate-blob-1 will-change-transform"
        style={{
          top: '10%',
          left: '16%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.38) 0%, rgba(37, 99, 235, 0.18) 35%, rgba(29, 78, 216, 0.08) 55%, transparent 72%)',
          transform: `scale3d(${bloomScale}, ${bloomScale}, 1)`,
        }}
      />

      {/* Atmospheric Blueberry Blob 2 - Center Right */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full pointer-events-none animate-blob-2 will-change-transform"
        style={{
          top: '30%',
          right: '14%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.34) 0%, rgba(124, 58, 237, 0.16) 38%, rgba(79, 70, 229, 0.06) 58%, transparent 72%)',
          transform: `scale3d(${bloomScale}, ${bloomScale}, 1)`,
        }}
      />

      {/* Atmospheric Blueberry Blob 3 - Bottom Center Violet Accent */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-blob-3 will-change-transform"
        style={{
          bottom: '14%',
          left: '34%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.30) 0%, rgba(109, 40, 217, 0.14) 38%, rgba(67, 56, 202, 0.05) 58%, transparent 72%)',
          transform: `scale3d(${bloomScale * 1.05}, ${bloomScale * 1.05}, 1)`,
        }}
      />
    </div>
  );
};
