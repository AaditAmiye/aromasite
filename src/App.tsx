import { useEffect, useRef, useState } from 'react';
import { AppleBuyModal } from './components/AppleBuyModal';
import { AppleUnifiedNav } from './components/AppleUnifiedNav';
import { ProductFeatures } from './components/ProductFeatures';
import { RollingWord } from './components/RollingWord';

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // Guarantee autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled browser autoplay policy
      });
    }
  }, []);

  const openBuy = () => setIsBuyModalOpen(true);
  const closeBuy = () => setIsBuyModalOpen(false);

  return (
    <div className="relative w-full bg-black text-white selection:bg-neutral-800 selection:text-white">
      {/* Unified Matte Dark Apple Navigation & Sticky Dock */}
      <AppleUnifiedNav onBuyClick={openBuy} />

      {/* Interactive Apple Buy / Configuration Drawer */}
      <AppleBuyModal isOpen={isBuyModalOpen} onClose={closeBuy} />

      {/* SECTION 1: Starting Page — Pure Fullscreen Video on Pure Black Background */}
      <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center p-0 m-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover bg-black"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
          <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/mp4" />
          <source src="/armoax2_web.mp4" type="video/mp4" />
          <source src="/armoax2.mp4" type="video/mp4" />
          <source src="/armoax2.mov" type="video/quicktime" />
        </video>
      </section>

      {/* SECTION 2: Exactly as user starts scrolling — Apple iPhone 18 Pro layout */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen bg-black text-white pt-20 sm:pt-28 md:pt-36 pb-24 px-6 sm:px-10 md:px-16 lg:px-24"
      >
        <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">
          {/* Main Hero Header: Left Typography & Right Apple Pill Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-14 pt-4 pb-20 border-b border-neutral-900">
            {/* Left Product Title & Tagline */}
            <div className="space-y-2 sm:space-y-3 max-w-4xl">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight">
                Aromax AI
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12]">
                <div className="flex items-baseline gap-x-2.5 sm:gap-x-4 whitespace-nowrap">
                  <span>Your</span>
                  <RollingWord />
                </div>
                <div className="text-white whitespace-nowrap mt-1 sm:mt-1.5">
                  Your Atmosphere.
                </div>
              </h1>
            </div>

            {/* Right Apple Pricing Pill Capsule */}
            <div className="flex-shrink-0 self-start lg:self-end">
              <div className="bg-[#1d1d1f] border border-white/10 rounded-full pl-5 pr-2 py-2 sm:pl-7 sm:pr-3 sm:py-2.5 flex items-center gap-4 sm:gap-6 shadow-2xl backdrop-blur-md">
                <span className="text-xs sm:text-sm font-medium text-[#f5f5f7]/90 tracking-normal whitespace-nowrap">
                  From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡
                </span>
                <button
                  type="button"
                  onClick={openBuy}
                  className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-150 cursor-pointer shadow-sm hover:shadow-blue-500/20"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>

          {/* Apple-style Showcase & Deep Innovation Details */}
          <div className="pt-24">
            <ProductFeatures onBuyClick={openBuy} />
          </div>
        </div>
      </section>
    </div>
  );
}
