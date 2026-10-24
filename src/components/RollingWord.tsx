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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((curr) => {
        setPrevIndex(curr);
        return (curr + 1) % WORDS.length;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Clean up outgoing word after animation completes
  useEffect(() => {
    if (prevIndex !== null) {
      const timeout = setTimeout(() => {
        setPrevIndex(null);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [prevIndex, index]);

  return (
    <span
      className="relative inline-flex h-[1.14em] overflow-hidden align-baseline select-none transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
      }}
    >
      {/* Invisible spacer so the parent naturally sizes smoothly for width changes */}
      <span
        className="invisible whitespace-nowrap pr-1"
        aria-hidden="true"
      >
        {WORDS[index]}
      </span>

      {/* Outgoing Word: Smoothly accelerates up with natural optical motion blur */}
      {prevIndex !== null && (
        <span
          key={`prev-${prevIndex}`}
          className="absolute inset-0 whitespace-nowrap text-white flex items-center"
          style={{
            animation: 'rollOutBlur 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          {WORDS[prevIndex]}
        </span>
      )}

      {/* Incoming Word: Rises from below, de-blurring into crisp focus */}
      <span
        key={`curr-${index}`}
        className="absolute inset-0 whitespace-nowrap text-white flex items-center"
        style={{
          animation: 'rollInBlur 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        {WORDS[index]}
      </span>

      <style>{`
        @keyframes rollInBlur {
          0% {
            transform: translateY(112%);
            opacity: 0;
            filter: blur(8px);
          }
          35% {
            opacity: 0.85;
            filter: blur(4px);
          }
          85% {
            transform: translateY(0%);
            filter: blur(0.5px);
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes rollOutBlur {
          0% {
            transform: translateY(0%);
            opacity: 1;
            filter: blur(0px);
          }
          40% {
            opacity: 0.55;
            filter: blur(3px);
          }
          100% {
            transform: translateY(-112%);
            opacity: 0;
            filter: blur(8px);
          }
        }
      `}</style>
    </span>
  );
};
