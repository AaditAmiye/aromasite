import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const SCENT_MOMENTS = [
  'A morning coffee.',
  'A forest after rain.',
  'The warmth of a familiar kitchen.',
  'An atmosphere that exists only in your imagination.',
];

export const AroAISection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    // Ensure it keeps playing seamlessly when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/10 bg-gradient-to-b from-[#18181b] via-[#121214] to-black p-5 sm:p-10 md:p-16 overflow-hidden relative shadow-2xl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Aro AI Video (Loops continuously, square mascot, no controls) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden bg-black border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.06)] group">
            <video
              ref={videoRef}
              src="/assets/aistudio/IMG_9423_d65311ef.MP4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-full object-cover pointer-events-none select-none"
            />

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
