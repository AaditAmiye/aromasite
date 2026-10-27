import React, { useState, useEffect } from 'react';
import { AromaxLogo } from './AromaxLogo';

interface AppleUnifiedNavProps {
  onBuyClick: () => void;
  onNavClick?: (item: string) => void;
  currentPage?: 'home' | 'fragrance';
}

const NAV_ITEMS = [
  'Aro - 1',
  'Fragrance',
  'Team',
  'Contact us',
];

export const AppleUnifiedNav: React.FC<AppleUnifiedNavProps> = ({
  onBuyClick,
  onNavClick,
  currentPage = 'home',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const activeItem = currentPage === 'fragrance' ? 'Fragrance' : 'Aro - 1';
  const [isBuyClicked, setIsBuyClicked] = useState(false);

  const handleBuy = () => {
    setIsBuyClicked(true);
    setTimeout(() => setIsBuyClicked(false), 350);
    onBuyClick();
  };

  // Track scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stage 1: Collapse menu items into logo and slide to left corner almost immediately on scroll
  const isScrolled = scrollY > 10;

  // Stage 2: Scrolled below the video (reveal sticky header, dissolve blob into header, show "Aromax AI")
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isBelowVideo = scrollY > windowHeight * 0.45;

  const handleItemClick = (item: string) => {
    if (onNavClick) {
      onNavClick(item);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 
        STICKY DOCKED HEADER BAR (Spans full viewport edge-to-edge):
        - Left corner: [Logo spacer] Aromax AI
        - Right corner: Pricing & Buy button
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-14 transition-all duration-300 ease-out select-none ${
          isBelowVideo
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/15 shadow-xl'
            : 'bg-transparent border-b border-transparent pointer-events-none'
        }`}
      >
        <div className="w-full h-full px-4 sm:px-8 flex items-center justify-between relative">
          {/* Left Corner: Spacer matching the docked logo (w-9 h-9) + "Aromax AI" */}
          <div
            onClick={handleScrollToTop}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            {/* Transparent spacer so "Aromax AI" sits right beside the docked logo */}
            <div className="w-9 h-9 flex-shrink-0" />
            <span
              className={`font-semibold text-xs sm:text-sm tracking-tight text-white transition-opacity duration-300 group-hover:text-neutral-300 ${
                isBelowVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              Aromax AI
            </span>
          </div>

          {/* Right Corner: Pricing & Buy button */}
          <div
            className={`flex items-center gap-3 sm:gap-6 flex-shrink-0 transition-all duration-300 ease-out ${
              isBelowVideo
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
          >
            <span className="hidden md:inline-block text-xs text-neutral-300 font-medium">
              From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡
            </span>
            <button
              type="button"
              onClick={handleBuy}
              className={`relative overflow-hidden bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-blue-500/30 ${
                isBuyClicked ? 'scale-90 brightness-125 ring-2 ring-white/50' : 'active:scale-95'
              }`}
            >
              Buy
            </button>
          </div>
        </div>
      </header>

      {/* 
        MORPHING & SLIDING NAVBAR:
        - Translucent frosted glass blur (bg-black/45 with backdrop-blur-2xl and specular rim)
      */}
      <nav
        aria-label="Aromax Navigation"
        className="fixed top-2.5 left-4 sm:left-8 z-50 pointer-events-auto select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isScrolled
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(calc(50vw - 16px - 50%), 0, 0)',
        }}
      >
        <div
          onClick={isScrolled ? handleScrollToTop : undefined}
          title={isScrolled ? 'Aromax AI — Click to scroll to top' : undefined}
          className={`relative flex items-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isBelowVideo
              ? 'bg-transparent border-transparent shadow-none p-0 cursor-pointer'
              : isScrolled
              ? 'w-9 h-9 rounded-full bg-black/50 border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-2xl justify-center cursor-pointer hover:border-white/35 active:scale-95'
              : 'h-9 rounded-full bg-black/45 border border-white/20 pl-1 pr-2 py-1 shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-2xl max-w-[96vw]'
          }`}
        >
          {/* Subtle depth blur backlight for natural motion */}
          {!isBelowVideo && isScrolled && (
            <div className="absolute -inset-1 rounded-full bg-white/[0.05] blur-sm pointer-events-none -z-10" />
          )}

          {/* 
            THE LOGO:
            - Locked at w-5 h-5 (20px), centered inside w-9 h-9.
            - Dead-centered, crisp white, transparent background.
          */}
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <AromaxLogo className="w-5 h-5" glow={false} />
          </div>

          {/* 
            MENU ITEMS:
            - Folds smoothly into the logo with cubic-bezier easing.
            - Expands smoothly when returning to top.
          */}
          <div
            className={`flex items-center gap-0.5 sm:gap-1.5 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolled
                ? 'max-w-0 opacity-0 pointer-events-none ml-0'
                : 'max-w-3xl opacity-100 pointer-events-auto ml-0.5 sm:ml-1'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-[#86868b] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
