import React, { useEffect, useState } from 'react';

// Global cache for transparent logo data URL
let cachedTransparentLogoUrl: string | null = null;

interface AromaxLogoProps {
  className?: string;
  glow?: boolean;
}

export const AromaxLogo: React.FC<AromaxLogoProps> = ({
  className = 'w-5 h-5',
  glow = false,
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(cachedTransparentLogoUrl);

  useEffect(() => {
    if (cachedTransparentLogoUrl) {
      setLogoUrl(cachedTransparentLogoUrl);
      return;
    }

    const img = new Image();
    img.src = '/assets/aistudio/Green_White_Professional_Minimal_Brand_Logo__1__6aff5600.jpg';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      // Find precise bounding box of the white star
      let minX = w, maxX = 0, minY = h, maxY = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const brightness = (d[idx] + d[idx + 1] + d[idx + 2]) / 3;
          if (brightness > 60) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (minX >= maxX || minY >= maxY) return;

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const maxDim = Math.max(cropW, cropH);

      // Create cropped canvas with completely transparent background
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = maxDim;
      finalCanvas.height = maxDim;
      const fctx = finalCanvas.getContext('2d');
      if (!fctx) return;

      const fData = fctx.createImageData(maxDim, maxDim);
      const offsetX = Math.floor((maxDim - cropW) / 2);
      const offsetY = Math.floor((maxDim - cropH) / 2);

      for (let y = 0; y < cropH; y++) {
        for (let x = 0; x < cropW; x++) {
          const srcIdx = ((minY + y) * w + (minX + x)) * 4;
          const dstIdx = ((offsetY + y) * maxDim + (offsetX + x)) * 4;

          const r = d[srcIdx];
          const g = d[srcIdx + 1];
          const b = d[srcIdx + 2];
          const brightness = (r + g + b) / 3;

          // Pure white output with anti-aliasing; completely transparent background
          if (brightness > 55) {
            const alpha = Math.min(Math.max((brightness - 55) / (200 - 55), 0), 1) * 255;
            fData.data[dstIdx] = 255;
            fData.data[dstIdx + 1] = 255;
            fData.data[dstIdx + 2] = 255;
            fData.data[dstIdx + 3] = Math.round(alpha);
          } else {
            fData.data[dstIdx + 3] = 0; // 100% transparent background
          }
        }
      }

      fctx.putImageData(fData, 0, 0);
      const dataUrl = finalCanvas.toDataURL('image/png');
      cachedTransparentLogoUrl = dataUrl;
      setLogoUrl(dataUrl);
    };
  }, []);

  return (
    <div className={`inline-flex items-center justify-center flex-shrink-0 ${className} select-none`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Aromax AI Logo"
          className="w-full h-full object-contain pointer-events-none"
          style={glow ? { filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))' } : undefined}
        />
      ) : (
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
};
