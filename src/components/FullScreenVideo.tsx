import React, { useRef, useEffect } from 'react';

interface FullScreenVideoProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay:', err);
        });
      }
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out select-none pointer-events-none overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain sm:object-cover bg-black"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src="/armoax2.mov" type="video/quicktime" />
        <source src="/armoax2.mp4" type="video/mp4" />
        <source src="armoax2.mov" type="video/quicktime" />
        <source src="armoax2.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
