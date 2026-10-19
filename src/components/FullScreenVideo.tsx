import React, { useRef, useEffect, useState } from 'react';
import { ArrowUp, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface FullScreenVideoProps {
  opacity: number;
  onReturnToTop: () => void;
}

export const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ opacity, onReturnToTop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Play/pause based on visibility and handle user-interaction autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (opacity > 0.05) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((err) => {
            console.warn('Autoplay prevented, awaiting user interaction:', err);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [opacity, isMuted]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const isInteractive = opacity > 0.3;

  return (
    <div
      className="fixed inset-0 w-full h-full z-20 overflow-hidden bg-black transition-opacity duration-300 ease-out"
      style={{
        opacity: opacity,
        pointerEvents: isInteractive ? 'auto' : 'none',
      }}
    >
      {/* Background Cinematic Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onError={() => setHasError(true)}
      >
        <source src="/armoax2.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Luxury subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Fallback indicator if video fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-6 text-center">
          <p className="text-sm font-light text-zinc-400 mb-3">Video stream initialization...</p>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play();
              }
            }}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-full hover:bg-white/10"
          >
            Retry Playback
          </button>
        </div>
      )}

      {/* Top Bar: Return to Title & Title Badge */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium">
            Aroma X2 &bull; Olfactory Engine
          </span>
        </div>

        <button
          onClick={onReturnToTop}
          className="group px-4 py-2 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg"
          aria-label="Return to Title"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span>Title</span>
        </button>
      </div>

      {/* Center Big Play Button if paused */}
      {!isPlaying && isInteractive && (
        <div
          onClick={handleTogglePlay}
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-25 bg-black/20"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-2xl">
            <Play className="w-6 h-6 ml-1 fill-white" />
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-6 left-6 right-6 z-30 pointer-events-auto flex items-center justify-between">
        {/* Play/Pause & Audio Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/90 flex items-center justify-center transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={handleToggleMute}
            className="px-3.5 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/90 flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-400 hidden sm:inline">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 hidden sm:inline">Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Minimal Timeline indicator */}
        <div className="w-32 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400/90 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
