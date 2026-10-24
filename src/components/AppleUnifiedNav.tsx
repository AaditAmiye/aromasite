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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Aro');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Trigger when user scrolls past 60px down
          setIsScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-[#161617]/92 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-black/30 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between relative">
        {/* 
          LEFT: [Logo] Aromax AI
          - Permanent position & fixed size (w-5 h-5).
          - Perfectly vertically centered with the text.
          - Never moves or animates coordinates to prevent awkward jumping.
        */}
        <div
          onClick={handleScrollToTop}
          className="flex items-center gap-2.5 cursor-pointer select-none group z-10 flex-shrink-0"
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <AromaxLogo className="w-5 h-5" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight group-hover:text-neutral-300 transition-colors">
            Aromax AI
          </span>
        </div>

        {/* 
          CENTER: Navigation Pill
          - Uses exact colors and texture from reference image:
            bg-[#1d1d1f] matte dark titanium, border-[#2a2a2c], rounded-full.
            Active item: bg-white text-black font-semibold.
          - Smoothly dissolves (opacity-0 scale-95) on scroll down.
        */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 flex items-center transition-all duration-300 ease-out ${
            isScrolled
              ? 'opacity-0 scale-95 pointer-events-none'
              : 'opacity-100 scale-100 pointer-events-auto'
          }`}
        >
          <div className="bg-[#1d1d1f]/95 border border-[#2a2a2c] rounded-full px-3 py-1.5 flex items-center gap-1 sm:gap-1.5 shadow-2xl backdrop-blur-xl max-w-[85vw] overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer ${
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

        {/* 
          RIGHT: Pricing & Buy Button
          - Appears smoothly on scroll down.
          - Fades in seamlessly without layout jumps.
        */}
        <div
          className={`flex items-center gap-4 sm:gap-6 z-10 flex-shrink-0 transition-all duration-300 ease-out ${
            isScrolled
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-3 pointer-events-none'
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
  );
};
