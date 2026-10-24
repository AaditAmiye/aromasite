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
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPreRolling, setIsPreRolling] = useState(false);

  useEffect(() => {
    // Faster, energetic rotation interval: every 1.5 seconds
    const interval = setInterval(() => {
      // 1. Anticipation cue: 140ms before the roll, set isPreRolling = true (creates visible pre-roll tension)
      setIsPreRolling(true);

      setTimeout(() => {
        setIsPreRolling(false);
        setIndex((curr) => {
          setPrevIndex(curr);
          return (curr + 1) % WORDS.length;
        });
      }, 140);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Clean up outgoing word right after the quick roll completes (500ms)
  useEffect(() => {
    if (prevIndex !== null) {
      const timeout = setTimeout(() => {
        setPrevIndex(null);
      }, 520);
      return () => clearTimeout(timeout);
    }
  }, [prevIndex, index]);

  return (
    <span
      className="relative inline-flex h-[1.14em] overflow-hidden align-baseline select-none transition-[width] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    >
      {/* Invisible spacer to maintain natural width without layout jumps */}
      <span
        className="invisible whitespace-nowrap pr-1"
        aria-hidden="true"
      >
        {WORDS[index]}
      </span>

      {/* Outgoing Word: Anticipation Dip + Fast High-Blur Roll Up */}
      {prevIndex !== null && (
        <span
          key={`prev-${prevIndex}`}
          className="absolute inset-0 whitespace-nowrap text-white flex items-center"
          style={{
            animation: 'rollOutFast 480ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
          }}
        >
          {WORDS[prevIndex]}
        </span>
      )}

      {/* Incoming Word: Fast Roll In from Bottom with Motion Blur to Sharp */}
      <span
        key={`curr-${index}`}
        className={`absolute inset-0 whitespace-nowrap text-white flex items-center transition-transform duration-140 ${
          isPreRolling ? 'translate-y-[3.5px] opacity-90 scale-[0.99]' : 'translate-y-0 opacity-100 scale-100'
        }`}
        style={
          prevIndex !== null
            ? {
                animation: 'rollInFast 480ms cubic-bezier(0.18, 0.9, 0.3, 1) forwards',
              }
            : undefined
        }
      >
        {WORDS[index]}
      </span>

      <style>{`
        /* Outgoing word: Dips down 3px for anticipation, then swiftly rolls up with heavy motion blur */
        @keyframes rollOutFast {
          0% {
            transform: translateY(0px);
            opacity: 1;
            filter: blur(0px);
          }
          18% {
            transform: translateY(3.5px);
            opacity: 0.95;
            filter: blur(0.5px);
          }
          45% {
            transform: translateY(-30%);
            opacity: 0.7;
            filter: blur(5px);
          }
          100% {
            transform: translateY(-120%);
            opacity: 0;
            filter: blur(10px);
          }
        }

        /* Incoming word: Shoots in from below with optical motion blur, then snaps into crisp focus */
        @keyframes rollInFast {
          0% {
            transform: translateY(120%);
            opacity: 0;
            filter: blur(10px);
          }
          40% {
            opacity: 0.85;
            filter: blur(4px);
          }
          80% {
            transform: translateY(-2px);
            filter: blur(0.5px);
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
            filter: blur(0px);
          }
        }
      `}</style>
    </span>
  );
};
