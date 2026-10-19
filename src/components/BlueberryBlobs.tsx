import React from 'react';

interface BlueberryBlobsProps {
  scrollProgress?: number;
}

export const BlueberryBlobs: React.FC<BlueberryBlobsProps> = ({ scrollProgress = 0 }) => {
  const p = Math.min(Math.max(scrollProgress, 0), 1);

  // In the introduction dark theme: pure black background
  // When scrolling down, the nebulae fade out smoothly to leave 100% pure black
  const blobsOpacity = Math.max(0, 1 - p * 1.5);
  const bloomScale = 1 + p * 0.4;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-black">
      {/* Central ambient cosmic aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: blobsOpacity * 0.9,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.12) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 80%)',
        }}
      />

      {/* Atmospheric Blueberry Blob 1 - Top Left */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full blur-[110px] animate-blob-1 pointer-events-none transition-all duration-300"
        style={{
          top: '12%',
          left: '18%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(37, 99, 235, 0.22) 55%, transparent 75%)',
          transform: `scale(${bloomScale})`,
        }}
      />

      {/* Atmospheric Blueberry Blob 2 - Center Right */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[105px] animate-blob-2 pointer-events-none transition-all duration-300"
        style={{
          top: '32%',
          right: '16%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.40) 0%, rgba(139, 92, 246, 0.22) 60%, transparent 75%)',
          transform: `scale(${bloomScale})`,
        }}
      />

      {/* Atmospheric Blueberry Blob 3 - Bottom Center Violet Accent */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full blur-[100px] animate-blob-3 pointer-events-none transition-all duration-300"
        style={{
          bottom: '16%',
          left: '36%',
          opacity: blobsOpacity,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(79, 70, 229, 0.20) 65%, transparent 75%)',
          transform: `scale(${bloomScale * 1.08})`,
        }}
      />
    </div>
  );
};
