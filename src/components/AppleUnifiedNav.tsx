import React, { useState, useEffect } from 'react';
import { AromaxLogo } from './AromaxLogo';

interface AppleUnifiedNavProps {
  onBuyClick: () => void;
  onNavClick?: (item: string) => void;
}

const NAV_ITEMS = [
  'Store',
  'Aro',
  'For homes',
  'Entertainment',
  'For business',
  'AI',
  'Fragrance',
  'Support',
  'Contact us',
];

export const AppleUnifiedNav: React.FC<AppleUnifiedNavProps> = ({
  onBuyClick,
  onNavClick,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [dockOffset, setDockOffset] = useState<number>(0);
  const [activeItem, setActiveItem] = useState('Aro');

  // Compute exact pixel delta from screen center (50vw) to the left edge of max-w-7xl
  useEffect(() => {
    const updateOffset = () => {
      const vw = window.innerWidth;
      const contentLeft = vw > 1280 ? (vw - 1280) / 2 + 24 : 24;
      const targetDelta = contentLeft - vw / 2;
      setDockOffset(targetDelta);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Track window scroll
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

  // Stage 1: Trigger collapse & slide when scrolled past 30px
  const isScrolled = scrollY > 30;

  // Stage 2: Scrolled below the video (reveal sticky header, dissolve circle blob into header, show "Aromax AI")
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isBelowVideo = scrollY > windowHeight * 0.72;

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === 'Store') {
      onBuyClick();
      return;
    }
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
        STICKY DOCKED HEADER BAR (Below video):
        Fades in smoothly when scrolling into the product section
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-14 transition-all duration-300 ease-out select-none ${
          isBelowVideo
            ? 'bg-[#161617]/92 backdrop-blur-2xl border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between relative">
          {/* Left placeholder for the docked logo (w-9 h-9) + "Aromax AI" text */}
          <div
            onClick={handleScrollToTop}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            {/* Transparent spacer so text sits right next to the slid logo */}
            <div className="w-9 h-9 flex-shrink-0" />
            <span
              className={`font-semibold text-sm tracking-tight text-white transition-opacity duration-300 group-hover:text-neutral-300 ${
                isBelowVideo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              Aromax AI
            </span>
          </div>

          {/* Right Buy bar & pricing */}
          <div
            className={`flex items-center gap-4 sm:gap-6 flex-shrink-0 transition-all duration-300 ease-out ${
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
              onClick={onBuyClick}
              className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-medium text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
            >
              Buy
            </button>
          </div>
        </div>
      </header>

      {/* 
        CENTERED TO LEFT-DOCK SLIDING PILL NAVBAR:
        - At Top: Horizontally centered at 50% with transform: translateX(-50%).
        - On Scroll: Everything folds/collapses into the logo, and it slides smoothly with blur depth to dockOffset.
        - Below Video: The circle blob dissolves away, leaving the logo seamlessly in place.
      */}
      <nav
        aria-label="Aromax Navigation"
        className="fixed top-2.5 z-50 pointer-events-auto select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: '50%',
          transform: isScrolled
            ? `translate3d(${dockOffset}px, 0, 0)`
            : 'translate3d(-50%, 0, 0)',
        }}
      >
        <div
          onClick={isScrolled ? handleScrollToTop : undefined}
          title={isScrolled ? 'Aromax AI — Click to scroll to top' : undefined}
          className={`relative flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBelowVideo
              ? 'bg-transparent border-transparent shadow-none p-0 cursor-pointer'
              : isScrolled
              ? 'w-9 h-9 rounded-full bg-[#1d1d1f]/95 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl justify-center cursor-pointer hover:scale-105 active:scale-95'
              : 'h-9 rounded-full bg-[#1d1d1f]/95 border border-[#2a2a2c] pl-1 pr-2.5 py-1 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl max-w-[94vw]'
          }`}
        >
          {/* Ambient blur depth glow layer when in motion */}
          {!isBelowVideo && isScrolled && (
            <div className="absolute -inset-1 rounded-full bg-white/[0.06] blur-sm pointer-events-none -z-10" />
          )}

          {/* 
            THE LOGO:
            - Exactly w-5 h-5 (20px), centered inside w-9 h-9.
            - Never changes size or internal alignment.
          */}
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <AromaxLogo className="w-5 h-5" glow={false} />
          </div>

          {/* 
            MENU ITEMS:
            - Collapse and fold into the logo when scrolled (max-w-0 opacity-0).
            - Expand smoothly back out when returning to top.
          */}
          <div
            className={`flex items-center gap-1 sm:gap-1.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? 'max-w-0 opacity-0 pointer-events-none ml-0 scale-90'
                : 'max-w-3xl opacity-100 pointer-events-auto ml-1 scale-100'
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
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer ${
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
