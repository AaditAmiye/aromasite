import React, { useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface FullScreenVideoProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ isVisible, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires user gesture
        });
      }
    } else if (!isVisible && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 w-full h-full z-30 transition-opacity duration-700 ease-in-out bg-black ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Cinematic Fullscreen Luxury Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
      >
        <source src="/armoax2.mp4" type="video/mp4" />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-in-a-dark-space-42664-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle Return to Text Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer"
        aria-label="Return to top"
      >
        <ArrowUp className="w-3.5 h-3.5" />
        <span>Return</span>
      </button>
    </div>
  );
};
