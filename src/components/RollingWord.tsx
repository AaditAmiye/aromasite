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
  const [isRotating, setIsRotating] = useState(false);
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [nextWord, setNextWord] = useState(WORDS[1]);

  useEffect(() => {
    // 1.8s total cycle: 500ms 3D cube rotation + 1.3s pause
    const interval = setInterval(() => {
      setIsRotating(true);

      const finishTimer = setTimeout(() => {
        setIndex((curr) => {
          const newIdx = (curr + 1) % WORDS.length;
          const upcomingIdx = (newIdx + 1) % WORDS.length;
          setCurrentWord(WORDS[newIdx]);
          setNextWord(WORDS[upcomingIdx]);
          return newIdx;
        });
        setIsRotating(false);
      }, 500);

      return () => clearTimeout(finishTimer);
    }, 1800);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <span
      className="relative inline-flex items-center align-baseline select-none transition-[width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] h-[1.24em]"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Invisible spacer: accurately sizes the container smoothly without layout jumps */}
      <span
        className="invisible whitespace-nowrap font-bold tracking-tight text-transparent px-1 pointer-events-none"
        aria-hidden="true"
      >
        {isRotating ? nextWord : currentWord}
      </span>

      {/* 
        3D CUBE ROTATION ENGINE:
        - The container rotates 90 degrees around its horizontal X axis (rotateX: 0 -> 90deg).
        - Face 1 (currentWord) is positioned on the FRONT face at translateZ(0.62em).
        - Face 2 (nextWord) is positioned on the BOTTOM face at rotateX(-90deg) translateZ(0.62em).
        - It physically rotates like an invisible cube with genuine 3D foreshortening.
      */}
      <span
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          animation: isRotating
            ? 'cubeTurn 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards'
            : 'none',
        }}
      >
        {/* 
          FACE 1: FRONT FACE (currentWord)
          Rotates from 0deg up and away into depth
        */}
        <span
          className="absolute inset-0 flex items-center justify-start whitespace-nowrap text-white font-bold tracking-tight px-1"
          style={{
            transform: 'rotateX(0deg) translateZ(0.62em)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <span>{currentWord}</span>
          {/* Subtle 3D cube face shading that darkens as the face rotates away */}
          <span
            className="absolute inset-0 pointer-events-none bg-black transition-opacity"
            style={{
              opacity: isRotating ? 0.6 : 0,
              transition: isRotating ? 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          />
        </span>

        {/* 
          FACE 2: BOTTOM FACE (nextWord)
          Rotates from -90deg up from underneath, landing flat into view
        */}
        <span
          className="absolute inset-0 flex items-center justify-start whitespace-nowrap text-white font-bold tracking-tight px-1"
          style={{
            transform: 'rotateX(-90deg) translateZ(0.62em)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <span>{nextWord}</span>
          {/* Subtle 3D cube face shading that clears to 0 as the face faces camera */}
          <span
            className="absolute inset-0 pointer-events-none bg-black transition-opacity"
            style={{
              opacity: isRotating ? 0 : 0.6,
              transition: isRotating ? 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          />
        </span>
      </span>

      <style>{`
        /* 90-degree orthogonal cube turn */
        @keyframes cubeTurn {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(90deg);
          }
        }
      `}</style>
    </span>
  );
};
