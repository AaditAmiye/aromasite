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
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [nextWord, setNextWord] = useState(WORDS[1]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Begin flip animation
      setIsFlipping(true);

      // Total flip animation is 400ms (200ms top fold + 200ms bottom fall)
      const completeTimer = setTimeout(() => {
        // Flip complete: commit new word to currentWord so BOTH halves show the new word
        setIndex((curr) => {
          const newIdx = (curr + 1) % WORDS.length;
          const upcomingIdx = (newIdx + 1) % WORDS.length;
          setCurrentWord(WORDS[newIdx]);
          setNextWord(WORDS[upcomingIdx]);
          return newIdx;
        });
        setIsFlipping(false);
      }, 420);

      return () => clearTimeout(completeTimer);
    }, 2200);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <span className="relative inline-flex items-center align-baseline select-none">
      {/* 
        FLIP CLOCK CARD CONTAINER:
        - Static width (w-[11.5ch] sm:w-[12ch] md:w-[12.2ch]) prevents card jumping
        - Full split flap mechanics: At rest, BOTH halves ALWAYS show currentWord.
      */}
      <div
        className="relative inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/15 bg-[#141416] shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22)] h-[1.32em] w-[11.5ch] sm:w-[12ch] md:w-[12.2ch] overflow-hidden"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Invisible spacer to maintain container height & baseline */}
        <span
          className="invisible whitespace-nowrap font-bold tracking-tight text-transparent px-1"
          aria-hidden="true"
        >
          {currentWord}
        </span>

        {/* 
          =======================================================
          A. AT REST: Both top and bottom halves show currentWord
          =======================================================
        */}
        {!isFlipping ? (
          <>
            {/* Top Half of currentWord */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#18181b]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {currentWord}
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
            </div>

            {/* Bottom Half of currentWord */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#141416]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {currentWord}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </>
        ) : (
          /* 
            =======================================================
            B. DURING FLIP: Mechanical transition to nextWord
            =======================================================
          */
          <>
            {/* 1. Behind Top Flap: Top half of nextWord revealed as top flap falls */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#18181b]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {nextWord}
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
            </div>

            {/* 2. Behind Bottom Flap: Bottom half of currentWord stays until covered */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#141416]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {currentWord}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* 3. Top Flap: Top half of currentWord folds DOWN (rotateX: 0 -> -90deg) */}
            <div
              key={`flip-top-${currentWord}`}
              className="absolute inset-0 z-20 overflow-hidden"
              style={{
                clipPath: 'inset(0 0 50% 0)',
                transformOrigin: '50% 50%',
                backfaceVisibility: 'hidden',
                animation: 'flipTopDown 200ms cubic-bezier(0.37, 0, 0.63, 1) forwards',
              }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#18181b]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {currentWord}
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
              <div
                className="absolute inset-0 bg-black/60 pointer-events-none"
                style={{ animation: 'shadowIn 200ms linear forwards' }}
              />
            </div>

            {/* 4. Bottom Flap: Bottom half of nextWord drops DOWN (rotateX: 90deg -> 0deg) */}
            <div
              key={`flip-bot-${nextWord}`}
              className="absolute inset-0 z-30 overflow-hidden"
              style={{
                clipPath: 'inset(50% 0 0 0)',
                transformOrigin: '50% 50%',
                backfaceVisibility: 'hidden',
                animation: 'flipBotDown 200ms 190ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                transform: 'rotateX(90deg)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center px-2 bg-[#141416]">
                <span className="text-white font-bold tracking-tight whitespace-nowrap">
                  {nextWord}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 bg-black/50 pointer-events-none"
                style={{ animation: 'shadowOut 200ms 190ms linear forwards' }}
              />
            </div>
          </>
        )}

        {/* 
          MECHANICAL CENTER SPLIT SLIT & PIVOT NOTCHES:
        */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] z-40 pointer-events-none" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2.5 rounded-r-full bg-black border-r border-y border-white/10 z-40 shadow-inner pointer-events-none" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2.5 rounded-l-full bg-black border-l border-y border-white/10 z-40 shadow-inner pointer-events-none" />
      </div>

      <style>{`
        @keyframes flipTopDown {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes flipBotDown {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }

        @keyframes shadowIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.65;
          }
        }

        @keyframes shadowOut {
          0% {
            opacity: 0.65;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};
