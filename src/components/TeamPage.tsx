import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft, Cpu, Brain, Mail, Phone, MapPin } from 'lucide-react';

interface TeamPageProps {
  onBackToHome: () => void;
  onExploreFragrance?: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onBackToHome, onExploreFragrance }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll reveal animation specifically for the Team page:
  // Elements with .team-scroll-item smoothly reveal (fade + unblur + slide up) as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'blur-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8', 'blur-sm');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = containerRef.current?.querySelectorAll('.team-scroll-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-black text-white min-h-screen selection:bg-neutral-800 selection:text-white"
    >
      {/* Top Header Navigation bar spacer */}
      <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Aro - 1</span>
        </button>

        {/* Page Title & Mission */}
        <div className="space-y-4 max-w-3xl team-scroll-item opacity-0 translate-y-8 blur-sm transition-all duration-700 ease-out">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border-2 border-white/20 text-xs font-mono uppercase tracking-widest text-[#2997ff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership & Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            The Team
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-neutral-300 font-normal leading-relaxed">
            The builders, roboticists, and architects pioneering programmable atmosphere control at AromaxAI.
          </p>
        </div>

        {/* Two Founder Profiles Grid */}
        <div className="mt-14 sm:mt-20 space-y-16 sm:space-y-24">
          {/* PROFILE 1: Aaditya Maheshwari (CEO) */}
          <div className="team-scroll-item opacity-0 translate-y-8 blur-sm transition-all duration-700 ease-out rounded-[32px] sm:rounded-[40px] border-2 border-white/20 ring-1 ring-white/10 bg-gradient-to-b from-[#18181b] via-[#121214] to-black p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
              {/* Left Column: Portrait & Quick Meta */}
              <div className="lg:col-span-5 space-y-6">
                <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/25 ring-1 ring-white/10 bg-neutral-900 shadow-2xl relative group">
                  <img
                    src="/assets/aistudio/aaditya_maheshwari_opt.jpg?v=4"
                    alt="Aaditya Maheshwari, CEO at AromaxAI"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right Column: Bio, Creds, Vision */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-[#2997ff] mb-2">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Executive Leadership</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Aaditya Maheshwari
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-[#2997ff] mt-1">
                    CEO @ AromaxAI
                  </p>
                </div>

                {/* Credentials List with Small College Logo */}
                <div className="space-y-3.5 border-t border-b border-white/10 py-6">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <div className="w-6 h-6 rounded-md bg-white/10 p-0.5 flex items-center justify-center border border-white/20 flex-shrink-0 mt-0.5">
                      <img src="/assets/aistudio/nit_rr_logo.png" alt="NIT Raipur" className="w-full h-full object-contain" />
                    </div>
                    <span>
                      <strong className="text-white">Electrical Engineering</strong>, National Institute of Technology Raipur (NIT Raipur)
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <div className="w-6 h-6 rounded-md bg-white/10 p-0.5 flex items-center justify-center border border-white/20 flex-shrink-0 mt-0.5">
                      <img src="/assets/aistudio/nit_jsr_logo.png" alt="NIT Jamshedpur" className="w-full h-full object-contain" />
                    </div>
                    <span>
                      <strong className="text-white">Metallurgical and Materials Engineering</strong>, NIT Jamshedpur <span className="text-neutral-400">(dropped out)</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      B
                    </span>
                    <span>
                      <strong className="text-white">Co-founder</strong>, BIOH
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      H
                    </span>
                    <span>
                      <strong className="text-white">Executive Director</strong>, HelpMate NGO
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      ★
                    </span>
                    <span>
                      <strong className="text-white">Scholar @</strong> Tata Cummins, Reliance, Colgate and Aditya Birla Capital
                    </span>
                  </div>
                </div>

                {/* Personal Bio Paragraphs */}
                <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Aaditya is a builder at heart. He’s fascinated by the point where software leaves the screen and starts interacting with the physical world. From designing machines that don’t exist yet to exploring how AI can give computers a sense of smell, he enjoys taking ideas that seem a little out there and turning them into something real.
                  </p>
                  <p className="text-white font-medium pl-4 border-l-2 border-[#2997ff]">
                    At AromaxAI, he leads the product vision, business, partnerships and fundraising, while working to bring programmable scent into everyday life and immersive experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE 2: Aadit Amiye (CTO) */}
          <div className="team-scroll-item opacity-0 translate-y-8 blur-sm transition-all duration-700 ease-out rounded-[32px] sm:rounded-[40px] border-2 border-white/20 ring-1 ring-white/10 bg-gradient-to-b from-[#18181b] via-[#121214] to-black p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
              {/* Left Column: Portrait & Quick Meta */}
              <div className="lg:col-span-5 space-y-6">
                <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/25 ring-1 ring-white/10 bg-neutral-900 shadow-2xl relative group">
                  <img
                    src="/assets/aistudio/aadit_amiye_opt.jpg?v=4"
                    alt="Aadit Amiye, CTO at AromaxAI"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right Column: Bio, Creds, Vision */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 mb-2">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Technical Architecture</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Aadit Amiye
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-purple-400 mt-1">
                    CTO @ AromaxAI
                  </p>
                </div>

                {/* Credentials List with Small College Logo */}
                <div className="space-y-3.5 border-t border-b border-white/10 py-6">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <div className="w-6 h-6 rounded-md bg-white/10 p-0.5 flex items-center justify-center border border-white/20 flex-shrink-0 mt-0.5">
                      <img src="/assets/aistudio/nit_rr_logo.png" alt="NIT Raipur" className="w-full h-full object-contain" />
                    </div>
                    <span>
                      <strong className="text-white">Electrical Engineering</strong>, National Institute of Technology Raipur (NIT Raipur)
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      🥇
                    </span>
                    <span>
                      <strong className="text-white">SOF International Mathematics Olympiad &amp; National Science Olympiad</strong> Zonal Gold Medalist, 2024
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      ⚡
                    </span>
                    <span>
                      <strong className="text-white">Hardware engineering</strong>, PCB design and embedded systems
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      📐
                    </span>
                    <span>
                      <strong className="text-white">CAD, 3D modelling</strong> and rapid prototyping
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 flex-shrink-0 mt-0.5 text-xs font-bold">
                      &lt;/&gt;
                    </span>
                    <span>
                      <strong className="text-white">Full-stack development</strong>
                    </span>
                  </div>
                </div>

                {/* Personal Bio Paragraphs */}
                <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Aadit likes building things from the ground up. He moves between code, circuit boards and 3D models, helping turn ideas into hardware and software that actually work. From designing mechanical components and assembling prototypes to building AromaxAI’s software, he works across the entire product.
                  </p>
                  <p className="text-white font-medium pl-4 border-l-2 border-purple-400">
                    At AromaxAI, he leads the technical development of the platform, bringing its electronics, physical design and software together into one working system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact us Direct Box */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#141416] border-2 border-white/15 ring-1 ring-white/10 team-scroll-item opacity-0 translate-y-8 blur-sm transition-all duration-700 ease-out">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#2997ff] mb-1">
                Direct Communication
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Contact us</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                For partnerships, enterprise scent architecture, investment, or inquiries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:aaditya@aromaxai.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-xs text-white font-medium transition-all group"
              >
                <Mail className="w-3.5 h-3.5 text-[#2997ff]" />
                <span className="group-hover:text-[#2997ff] transition-colors">aaditya@aromaxai.com</span>
              </a>

              <a
                href="tel:+918827722507"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-xs text-white font-medium transition-all group"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="group-hover:text-emerald-400 transition-colors">+91 8827722507</span>
              </a>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-neutral-300 font-mono">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Raipur • India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner with Navigation Actions */}
        <div className="mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-[#161618] border-2 border-white/15 ring-1 ring-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 team-scroll-item opacity-0 translate-y-8 blur-sm transition-all duration-700 ease-out">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Experience Aro - 1</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Explore 30 programmable scent channels synchronized with millisecond precision.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              Discover Aro - 1
            </button>
            {onExploreFragrance && (
              <button
                onClick={onExploreFragrance}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 active:scale-95 transition-all cursor-pointer border border-white/15"
              >
                Fragrance Catalog ↗
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
