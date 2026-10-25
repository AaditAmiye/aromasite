import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

const SCENT_MOMENTS = [
  'A morning coffee.',
  'A forest after rain.',
  'The warmth of a familiar kitchen.',
  'An atmosphere that exists only in your imagination.',
];

export const AroAISection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Play once when user scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasPlayed) {
          video.currentTime = 0;
          video.play().catch(() => {});
          setHasPlayed(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasPlayed]);

  const handleReplay = () => {
    if (videoRef.current) {
      setIsVideoEnded(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="rounded-[32px] sm:rounded-[44px] border border-white/10 bg-gradient-to-b from-[#18181b] via-[#121214] to-black p-8 sm:p-12 md:p-16 overflow-hidden relative shadow-2xl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Aro AI Video (Plays once, square 720x720 mascot) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden bg-black border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.06)] group">
            <video
              ref={videoRef}
              src="/assets/aistudio/IMG_9423_d65311ef.MP4"
              playsInline
              muted
              onEnded={() => setIsVideoEnded(true)}
              className="w-full h-full object-cover"
            />

            {/* Replay button when video ends */}
            {isVideoEnded && (
              <button
                onClick={handleReplay}
                className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            )}

            {/* Subtle frosted glass badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#2997ff] animate-pulse" />
              <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider">Aro AI</span>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Experience Scenarios */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#2997ff] border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aro AI Intelligence</span>
            </div>

            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Meet Aro AI.
              <span className="block text-neutral-400 font-semibold text-2xl sm:text-4xl mt-1">
                Your AI assistant that understands scent.
              </span>
            </h3>
          </div>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Describe a place, a memory, a mood, or a moment. AromaxAI’s intelligence uses its knowledge of scent notes, aroma chemistry, and the scents available on your device to help turn your description into a scent experience.
          </p>

          {/* Highlight Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <p className="text-white font-medium text-lg sm:text-xl tracking-tight">
              Not just a conversation about smell. A way to experience it.
            </p>
          </div>

          {/* Secondary Lead & Moments */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              It knows what your device can create.
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SCENT_MOMENTS.map((moment) => (
                <div
                  key={moment}
                  className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 text-neutral-200 text-sm font-medium flex items-center gap-3 hover:border-white/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] flex-shrink-0" />
                  <span>{moment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Tagline */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Describe it. Discover it. Smell it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
