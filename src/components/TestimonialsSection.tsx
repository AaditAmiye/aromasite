import React, { useRef, useEffect } from 'react';
import { User, Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#2997ff] border border-white/10 mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Early Access Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          Tested in Real Spaces.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg">
          Hear from community creators experiencing the future of atmosphere control.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Testimonial 1: Arpan Shrivastava (With Embedded Video) */}
        <div className="h-full rounded-[28px] sm:rounded-[36px] border border-white/15 bg-gradient-to-b from-[#18181a] via-[#121214] to-black p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header: Person Icon + Name + Stars */}
            <div className="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0071e3] to-[#40a9ff] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-2 ring-white/15">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Arpan Shrivastava
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    Early Adopter • Creative Technologist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Feedback Quote */}
            <div className="relative mb-6">
              <Quote className="w-8 h-8 text-white/10 absolute -top-2 -left-2 -z-0" />
              <p className="text-base sm:text-lg md:text-xl text-neutral-100 font-medium italic leading-relaxed pl-4 border-l-2 border-[#0071e3]">
                &ldquo;Very interactive and give good experience. Sync perfectly with video&rdquo;
              </p>
            </div>
          </div>

          {/* Video Container - Curved border, Apple aesthetic, looping seamlessly */}
          <div className="mt-2 w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/25 ring-1 ring-white/10 bg-black shadow-[0_16px_40px_rgba(0,0,0,0.9)] relative aspect-[16/9] sm:aspect-[16/10] flex items-center justify-center">
            <video
              ref={videoRef}
              src="/assets/aistudio/A001_10050109_D040__online-video-cutter.com__c6f7c6f7.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Testimonial 2: Shlok Pandey (With White Wall Photo) */}
        <div className="h-full rounded-[28px] sm:rounded-[36px] border border-white/15 bg-gradient-to-b from-[#18181a] via-[#121214] to-black p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header: Person Icon + Name + Stars */}
            <div className="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 ring-2 ring-white/15">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Shlok Pandey
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    Yoga &amp; Mindfulness Practitioner
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Feedback Quote */}
            <div className="relative mb-6">
              <Quote className="w-8 h-8 text-white/10 absolute -top-2 -left-2 -z-0" />
              <p className="text-base sm:text-lg md:text-xl text-neutral-100 font-medium italic leading-relaxed pl-4 border-l-2 border-emerald-400">
                &ldquo;Ai is working very fine. Help me in my yoga sessions&rdquo;
              </p>
            </div>
          </div>

          {/* Photo Container - The White Wall Photo */}
          <div className="mt-2 w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/25 ring-1 ring-white/10 bg-black shadow-[0_16px_40px_rgba(0,0,0,0.9)] relative aspect-[16/9] sm:aspect-[16/10] flex items-center justify-center">
            <img
              src="/assets/aistudio/IMG_8781_87a26e56.png"
              alt="AromaxAI unit in yoga and meditation room by Shlok Pandey"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

