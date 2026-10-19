import React, { useRef, useEffect } from 'react';

interface FullScreenVideoProps {
  scrollProgress: number;
}

export const FullScreenVideo: React.FC<FullScreenVideoProps> = ({
  scrollProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wasPlayingRef = useRef<boolean>(false);

  // Fade in starts at 0.55 and reaches 1.0 at 0.85
  const videoOpacity = Math.min(
    Math.max((scrollProgress - 0.55) / 0.30, 0),
    1
  );

  const shouldPlay = scrollProgress >= 0.70;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      // If entering video view from above, reset currentTime to 0 so it plays from the beginning every time
      if (!wasPlayingRef.current) {
        try {
          video.currentTime = 0;
        } catch {
          // ignore
        }
        wasPlayingRef.current = true;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay constraints
        });
      }
    } else {
      if (wasPlayingRef.current) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          // ignore
        }
        wasPlayingRef.current = false;
      }
    }
  }, [shouldPlay]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black pointer-events-none select-none transition-opacity duration-300 ease-out"
      style={{
        opacity: videoOpacity,
      }}
      aria-hidden={videoOpacity < 0.1}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover bg-black"
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src="/armoax2_web.mp4" type="video/mp4" />
        <source src="/armoax2.mp4" type="video/mp4" />
        <source src="/armoax2.mov" type="video/quicktime" />
      </video>

      {/* Subtle vignette over video edges for cinematic polish */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]" />
    </div>
  );
};
