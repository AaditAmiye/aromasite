import { useEffect, useRef, useState } from 'react';
import { AppleBuyModal } from './components/AppleBuyModal';
import { AppleUnifiedNav } from './components/AppleUnifiedNav';
import { ProductFeatures } from './components/ProductFeatures';
import { RollingWord } from './components/RollingWord';
import { ScrollReveal } from './components/ScrollReveal';
import { FragrancePage } from './components/FragrancePage';
import { TeamPage } from './components/TeamPage';
import { TeamModal } from './components/TeamModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'fragrance' | 'team'>('home');
  const [displayPage, setDisplayPage] = useState<'home' | 'fragrance' | 'team'>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isBuyBtnPressed, setIsBuyBtnPressed] = useState(false);

  // Guarantee autoplay on mount for both mobile and desktop videos on home page
  useEffect(() => {
    if (displayPage !== 'home') return;
    const playVideo = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {});
    };

    playVideo(desktopVideoRef.current);
    playVideo(mobileVideoRef.current);
  }, [displayPage]);

  // Settle animation on page switching: fade off old page, switch DOM & scroll, fade in new page
  const transitionToPage = (newPage: 'home' | 'fragrance' | 'team') => {
    if (newPage === displayPage && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsTransitioning(true);
    setCurrentPage(newPage);

    setTimeout(() => {
      setDisplayPage(newPage);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 280);
  };

  const openBuy = () => {
    setIsBuyBtnPressed(true);
    setTimeout(() => {
      setIsBuyBtnPressed(false);
      setIsBuyModalOpen(true);
    }, 140);
  };
  const closeBuy = () => setIsBuyModalOpen(false);

  const handleNavClick = (item: string) => {
    if (item === 'Aro - 1') {
      transitionToPage('home');
    } else if (item === 'Fragrance') {
      transitionToPage('fragrance');
    } else if (item === 'Team') {
      transitionToPage('team');
    } else if (item === 'Contact us') {
      setIsContactModalOpen(true);
    }
  };

  const handleExploreFragrance = () => {
    transitionToPage('fragrance');
  };

  return (
    <div className="relative w-full bg-black text-white selection:bg-neutral-800 selection:text-white min-h-screen">
      {/* Unified Matte Dark Apple Navigation & Sticky Dock with updated items: Aro - 1, Fragrance, Team, Contact us */}
      <AppleUnifiedNav
        currentPage={currentPage}
        onBuyClick={openBuy}
        onNavClick={handleNavClick}
      />

      {/* Interactive Apple Buy / Configuration Drawer */}
      <AppleBuyModal isOpen={isBuyModalOpen} onClose={closeBuy} />

      {/* Dedicated Team Showcase Modal */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onNavigateToTeamPage={() => transitionToPage('team')}
      />

      {/* Dedicated Contact Us Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Page Content with smooth settle transition (fade off old elements, fade in new elements) */}
      <div
        className={`w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isTransitioning
            ? 'opacity-0 scale-[0.99] filter blur-[3px] pointer-events-none'
            : 'opacity-100 scale-100 filter blur-0 pointer-events-auto'
        }`}
      >
        {displayPage === 'team' ? (
          /* 
            DEDICATED TEAM PAGE:
            - Aaditya Maheshwari (CEO) & Aadit Amiye (CTO)
            - NIT Raipur & NIT Jamshedpur logos
            - Scroll-appearing text animations
          */
          <TeamPage
            onBackToHome={() => transitionToPage('home')}
            onExploreFragrance={() => transitionToPage('fragrance')}
          />
        ) : displayPage === 'fragrance' ? (
          /* 
            FRAGRANCE PAGE:
            - Fullscreen loop video at top without text overlays
            - Discover your atmosphere headline
            - Library of Scents Handheld Vials image with rounded corners and distinct border
            - Individual scent cards with explore modal
            - Curated collections
            - Interactive Scent Finder with 30+ notes
          */
          <FragrancePage
            onBackToHome={() => transitionToPage('home')}
            onOpenBuyModal={openBuy}
          />
        ) : (
          /* 
            ARO - 1 MAIN HOME PAGE
          */
          <>
            {/* SECTION 1: Starting Page — Pure Fullscreen Video on Pure Black Background */}
            <section className="relative w-full h-[100dvh] min-h-[100dvh] bg-black overflow-hidden flex items-center justify-center p-0 m-0">
              {/* Mobile Phone Hero Video */}
              <video
                ref={mobileVideoRef}
                className="block md:hidden w-full h-full object-cover bg-black"
                autoPlay
                playsInline
                muted
                loop
                preload="auto"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              >
                <source src="/assets/aistudio/aromax_mob__online-video-cutter.com__2cd2fff9.mp4" type="video/mp4" />
                <source src="/assets/aistudio/Timeline_1_a1aa5ac5.mov" type="video/quicktime" />
              </video>

              {/* Desktop / Tablet Hero Video */}
              <video
                ref={desktopVideoRef}
                className="hidden md:block w-full h-full object-cover bg-black"
                autoPlay
                playsInline
                muted
                loop
                preload="auto"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              >
                <source src="/assets/aistudio/___online-video-cutter.com__acbc7330.mp4" type="video/mp4" />
                <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
                <source src="/armoax2_web.mp4" type="video/mp4" />
                <source src="/armoax2.mp4" type="video/mp4" />
              </video>
            </section>

            {/* SECTION 2: Exactly as user starts scrolling — Apple iPhone 18 Pro layout */}
            <section
              ref={heroRef}
              className="relative w-full min-h-screen bg-black text-white pt-16 sm:pt-24 md:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 lg:px-24"
            >
              <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">
                {/* Main Hero Header: Left Typography & Right Apple Pill Bar */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-14 pt-4 pb-14 sm:pb-20 border-b border-neutral-900">
                  {/* Left Product Title & Tagline */}
                  <ScrollReveal delay={0} className="space-y-2 sm:space-y-3 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300">
                      <span>Aromax AI</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#2997ff] font-semibold">Aro - 1</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.14]">
                      <div className="flex items-baseline gap-x-2 sm:gap-x-4 whitespace-nowrap">
                        <span>Your</span>
                        <RollingWord />
                      </div>
                      <div className="text-white whitespace-nowrap mt-1 sm:mt-1.5">
                        Your Atmosphere.
                      </div>
                    </h1>
                  </ScrollReveal>

                  {/* Right Apple Pricing Pill Capsule */}
                  <ScrollReveal delay={120} className="flex-shrink-0 self-start lg:self-end w-full sm:w-auto">
                    <div className="bg-[#1d1d1f] border border-white/10 rounded-full pl-4 pr-1.5 py-1.5 sm:pl-7 sm:pr-3 sm:py-2.5 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 shadow-2xl backdrop-blur-md max-w-full">
                      <span className="text-[11px] sm:text-xs md:text-sm font-medium text-[#f5f5f7]/90 tracking-normal truncate sm:whitespace-nowrap">
                        From ₹20000.00* or ₹1667.00/mo.‡
                      </span>
                      <button
                        type="button"
                        onClick={openBuy}
                        className={`bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-blue-500/25 flex-shrink-0 ${
                          isBuyBtnPressed
                            ? 'scale-90 brightness-125 ring-4 ring-[#0071e3]/40'
                            : 'active:scale-95'
                        }`}
                      >
                        Buy
                      </button>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Apple-style Showcase & Deep Innovation Details */}
                <div className="pt-12 sm:pt-20 md:pt-24">
                  <ProductFeatures
                    onBuyClick={openBuy}
                    onExploreFragrance={handleExploreFragrance}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
