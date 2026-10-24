import React from 'react';

interface AromaxLogoProps {
  className?: string;
  glow?: boolean;
}

export const AromaxLogo: React.FC<AromaxLogoProps> = ({
  className = 'w-5 h-5',
  glow = false,
}) => {
  return (
    <img
      src="/assets/aistudio/aromax_logo_clean.png"
      alt="Aromax AI Logo"
      className={`${className} object-contain flex-shrink-0 select-none pointer-events-none ${
        glow ? 'drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]' : ''
      }`}
    />
  );
};
