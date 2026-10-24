import React, { useState, useEffect } from 'react';

const WORDS = [
  'Penthouse',
  'Living room',
  'Bedroom',
  'Office',
  'Restaurant',
  'Lounge',
  'Cafe',
  'Home theatre',
  'Club',
];

export const RollingWord: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);

      // Halfway through flip (top flap reaches 90deg), ensure bottom flap activates
      setTimeout(() => {
        // Flip completes at 420ms
        setTimeout(() => {
          setCurrentIndex((curr) => {
            const next = (curr + 1) % WORDS.length;
            setNextIndex((next + 1) % WORDS.length);
            return next;
          });
          setIsFlipping(false);
        }, 220);
      }, 200);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const currentWord = WORDS[currentIndex];
  const nextWord = WORDS[nextIndex];

  return (
    <span className="relative inline-flex items-center align-baseline select-none">
      {/* 
        FLIP CLOCK CARD HOUSING:
        Mechanical split-flap aesthetic with side hinge notches and center divider slit
      */}
      <div
        className="relative inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/15 bg-[#161618] shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] h-[1.28em] px-3.5 sm:px-5 overflow-hidden transition-[width] duration-300 ease-out"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Invisible spacer to maintain container width naturally for both words */}
        <span
          className="invisible whitespace-nowrap font-bold tracking-tight text-transparent px-1"
          aria-hidden="true"
        >
          {WORDS[isFlipping ? nextIndex : currentIndex]}
        </span>

        {/* 
          1. BACK TOP FLAP (Shows NEXT word waiting underneath)
        */}
        <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#18181b] rounded-t-xl sm:rounded-t-2xl">
          <div className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center px-3.5 sm:px-5">
            <span className="text-white font-bold tracking-tight whitespace-nowrap">
              {nextWord}
            </span>
          </div>
          {/* Top highlight specular rim */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
        </div>

        {/* 
          2. BACK BOTTOM FLAP (Shows CURRENT word waiting underneath until covered)
        */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#141416] rounded-b-xl sm:rounded-b-2xl">
          <div className="absolute inset-x-0 -top-[100%] h-[200%] flex items-center justify-center px-3.5 sm:px-5">
            <span className="text-white font-bold tracking-tight whitespace-nowrap">
              {currentWord}
            </span>
          </div>
          {/* Subtle bottom shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
        </div>

        {/* 
          3. ANIMATING TOP FLAP: Flips down on horizontal hinge (rotateX: 0 -> -90deg)
        */}
        <div
          key={`flip-top-${currentIndex}-${isFlipping}`}
          className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#18181b] rounded-t-xl sm:rounded-t-2xl z-20"
          style={{
            transformOrigin: '50% 100%',
            backfaceVisibility: 'hidden',
            animation: isFlipping
              ? 'flipTop 210ms cubic-bezier(0.37, 0, 0.63, 1) forwards'
              : 'none',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center px-3.5 sm:px-5">
            <span className="text-white font-bold tracking-tight whitespace-nowrap">
              {currentWord}
            </span>
          </div>
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
          {/* Shadow deepening as flap flips away */}
          <div
            className="absolute inset-0 bg-black/60 pointer-events-none transition-opacity"
            style={{
              animation: isFlipping ? 'shadowFadeIn 210ms linear forwards' : 'none',
              opacity: 0,
            }}
          />
        </div>

        {/* 
          4. ANIMATING BOTTOM FLAP: Falls down into place (rotateX: 90deg -> 0deg)
        */}
        <div
          key={`flip-bottom-${nextIndex}-${isFlipping}`}
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#141416] rounded-b-xl sm:rounded-b-2xl z-30"
          style={{
            transformOrigin: '50% 0%',
            backfaceVisibility: 'hidden',
            animation: isFlipping
              ? 'flipBottom 210ms 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
              : 'none',
            transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
          }}
        >
          <div className="absolute inset-x-0 -top-[100%] h-[200%] flex items-center justify-center px-3.5 sm:px-5">
            <span className="text-white font-bold tracking-tight whitespace-nowrap">
              {nextWord}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          {/* Shadow lifting as bottom flap lands */}
          <div
            className="absolute inset-0 bg-black/50 pointer-events-none"
            style={{
              animation: isFlipping
                ? 'shadowFadeOut 210ms 200ms linear forwards'
                : 'none',
              opacity: isFlipping ? 1 : 0,
            }}
          />
        </div>

        {/* 
          MECHANICAL CENTER SPLIT DIVIDER & PIVOT HINGES:
          - Crisp horizontal seam across the exact middle
          - Small circular side notches where the cards mount to the axle
        */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] z-40 pointer-events-none" />

        {/* Left Pivot Hinge Notch */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-r-full bg-black/90 border-r border-y border-white/10 z-40 shadow-inner pointer-events-none" />

        {/* Right Pivot Hinge Notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-l-full bg-black/90 border-l border-y border-white/10 z-40 shadow-inner pointer-events-none" />
      </div>

      <style>{`
        @keyframes flipTop {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flipBottom {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }

        @keyframes shadowFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.7;
          }
        }

        @keyframes shadowFadeOut {
          0% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};
