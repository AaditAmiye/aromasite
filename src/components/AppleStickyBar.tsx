import React from 'react';

interface AppleStickyBarProps {
  isVisible: boolean;
  onBuyClick: () => void;
}

export const AppleStickyBar: React.FC<AppleStickyBarProps> = ({ isVisible, onBuyClick }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 bg-[#161617]/80 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-white font-semibold text-sm tracking-tight">Aromax AI</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden md:inline-block text-xs text-neutral-300 font-normal">
            From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡
          </span>
          <button
            onClick={onBuyClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-medium text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer shadow-sm"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
