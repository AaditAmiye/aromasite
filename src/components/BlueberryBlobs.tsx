import React from 'react';

interface BlueberryBlobsProps {
  scrollProgress?: number;
}

export const BlueberryBlobs: React.FC<BlueberryBlobsProps> = ({ scrollProgress = 0 }) => {
  const p = Math.min(Math.max(scrollProgress, 0), 1);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Transition from pristine gallery white (#fbfcfd) to pure black (#000000)
  // Reaches deep black faster on mobile to match the accelerated scatter duration
  const darkRatio = isMobile
    ? Math.min(Math.max((p - 0.02) / 0.22, 0), 1)
    : Math.min(Math.max((p - 0.05) / 0.35, 0), 1);
  const bgR = Math.round(251 - darkRatio * 251);
  const bgG = Math.round(252 - darkRatio * 252);
  const bgB = Math.round(253 - darkRatio * 253);
  const currentBg = `rgb(${bgR}, ${bgG}, ${bgB})`;

  const bloomScale = 1 + p * 0.35;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Background canvas that darkens into pure black */}
      <div
        className="absolute inset-0 transition-colors duration-150 ease-out"
        style={{ backgroundColor: currentBg }}
      />

      {/* Light theme soft radial wash (fades out as it darkens) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - darkRatio * 1.6),
          background: 'radial-gradient(ellipse at 50% 45%, rgba(238, 242, 255, 0.75) 0%, rgba(248, 250, 252, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* Atmospheric Blueberry Blob 1 - Top Left */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full blur-[100px] animate-blob-1 pointer-events-none transition-all duration-300"
        style={{
          top: '14%',
          left: '20%',
          background: darkRatio > 0.25
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(37, 99, 235, 0.22) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(59, 130, 246, 0.14) 55%, transparent 75%)',
          transform: `scale(${bloomScale})`,
        }}
      />

      {/* Atmospheric Blueberry Blob 2 - Center Right */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full blur-[95px] animate-blob-2 pointer-events-none transition-all duration-300"
        style={{
          top: '34%',
          right: '18%',
          background: darkRatio > 0.25
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.40) 0%, rgba(139, 92, 246, 0.22) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(129, 140, 248, 0.12) 60%, transparent 75%)',
          transform: `scale(${bloomScale})`,
        }}
      />

      {/* Atmospheric Blueberry Blob 3 - Bottom Center Violet Accent */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full blur-[90px] animate-blob-3 pointer-events-none transition-all duration-300"
        style={{
          bottom: '18%',
          left: '38%',
          background: darkRatio > 0.25
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(79, 70, 229, 0.20) 65%, transparent 75%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(99, 102, 241, 0.10) 65%, transparent 75%)',
          transform: `scale(${bloomScale * 1.08})`,
        }}
      />
    </div>
  );
};
