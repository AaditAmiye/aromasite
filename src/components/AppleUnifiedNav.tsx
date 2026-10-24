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
  const [activeItem, setActiveItem] = useState('Aro');

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

  // Determine transition states
  // 1. isScrollingAway: user started scrolling down past initial top view (collapse menu items)
  const isScrollingAway = scrollY > 40;

  // 2. isDocked: user has scrolled down into the product content area (dissolve pill, reveal full sticky bar)
  // Window inner height is roughly the video section height
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isDocked = scrollY > windowHeight * 0.85;

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
        STICKY TOP BAR DOCK (Appears when scrolled to product section):
        Matte dark charcoal (#161617) with border-b border-white/10
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-13 bg-[#161617]/90 backdrop-blur-xl border-b border-white/10 transition-opacity duration-300 ${
          isDocked ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: [Logo] Aromax AI */}
          <div
            onClick={handleScrollToTop}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Logo placeholder space to avoid duplicate render when docked */}
            <div className="w-5 h-5 flex-shrink-0" />
            <span className="text-white font-semibold text-sm tracking-tight group-hover:text-neutral-200 transition-colors">
              Aromax AI
            </span>
          </div>

          {/* Right: Pricing & Buy button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline-block text-xs text-neutral-300 font-medium">
              From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡
            </span>
            <button
              type="button"
              onClick={onBuyClick}
              className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-medium text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
            >
              Buy
            </button>
          </div>
        </div>
      </header>

      {/* 
        FLOATING / MORPHING PILL CONTAINER:
        - At Top: Centered pill with full matte texture (#161617 / #1d1d1f), 9 menu items.
        - Scrolling Down: Links smoothly collapse, pill translates to top-left.
        - When Docked: The pill's background and border dissolve completely to 0 opacity,
          positioning the Logo (w-5 h-5) seamlessly into the docked header beside "Aromax AI".
      */}
      <div
        className="fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
        style={{
          top: isDocked ? '14px' : isScrollingAway ? '14px' : '20px',
          left: isDocked
            ? 'calc(max(24px, (100vw - 80rem) / 2 + 24px))'
            : isScrollingAway
            ? '24px'
            : '50%',
          transform:
            !isScrollingAway && !isDocked ? 'translate3d(-50%, 0, 0)' : 'translate3d(0, 0, 0)',
        }}
      >
        <div
          onClick={isDocked || isScrollingAway ? handleScrollToTop : undefined}
          title={isDocked || isScrollingAway ? 'Aromax AI — Click to scroll to top' : undefined}
          className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDocked
              ? 'bg-transparent border-transparent shadow-none p-0 cursor-pointer'
              : isScrollingAway
              ? 'bg-[#161617]/95 border border-white/10 rounded-full px-3 py-2 shadow-2xl backdrop-blur-xl cursor-pointer hover:border-white/20'
              : 'bg-[#161617]/90 border border-white/10 rounded-full px-4 sm:px-5 py-2 shadow-2xl backdrop-blur-xl max-w-[94vw] lg:max-w-5xl'
          }`}
        >
          {/* Subtle dark matte card texture matching reference image */}
          {!isDocked && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
          )}

          {/* 
            AROMAX LOGO:
            - Exactly w-5 h-5 (20px) at all times so there is ZERO size transition or jumping!
            - Transparent background (only pure white star glyph).
          */}
          <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center relative z-10">
            <AromaxLogo className="w-5 h-5" glow={false} />
          </div>

          {/* 
            NAV ITEMS (Visible at top, smoothly collapses when scrolling away):
            Styled with exact colors and textures from reference image:
            - Active pill: bg-white text-black font-semibold rounded-full
            - Inactive: text-[#86868b] hover:text-white
          */}
          <div
            className={`flex items-center gap-1 sm:gap-2 ml-3 sm:ml-4 overflow-x-auto no-scrollbar transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrollingAway || isDocked
                ? 'opacity-0 max-w-0 ml-0 pointer-events-none scale-95'
                : 'opacity-100 max-w-4xl pointer-events-auto scale-100'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-[13px] tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer ${
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
      </div>
    </>
  );
};
