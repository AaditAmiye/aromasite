import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  mass: number;
}

// Ambient floating aroma motes (subtle glowing orange embers)
interface AromaMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

interface ParticleCanvasProps {
  scrollProgress?: number;
  onExplodeRef?: React.MutableRefObject<(() => void) | null>;
}

const NUM_BUCKETS = 32;

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  scrollProgress = 0,
  onExplodeRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pre-rendered pristine text canvas (used when undisturbed for 100% vector-sharp text)
  const offscreenTextCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 32 pre-sorted color buckets for particle rendering (zero string allocations, zero GC stutter)
  const bucketsRef = useRef<Particle[][]>(Array.from({ length: NUM_BUCKETS }, () => []));
  const bucketColorsRef = useRef<string[]>([]);
  const motesRef = useRef<AromaMote[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const isExplodedRef = useRef<boolean>(false);
  const scrollProgressRef = useRef<number>(scrollProgress);
  const lastTimeRef = useRef<number>(0);

  // Track whether any particle is actively displaced or in motion
  const isDisplacedRef = useRef<boolean>(false);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  const mouseRef = useRef<{
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    isHovering: boolean;
  }>({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    isHovering: false,
  });

  const dimsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 1200,
    height: 700,
    dpr: 1,
  });

  // Precompute 32 static color strings: 16 for metallic silver gradient, 16 for fiery orange gradient
  const initBucketColors = useCallback(() => {
    const colors: string[] = [];

    // Line 1 Silver Gradient stops:
    // Top: #D5DCE4 [213, 220, 228] -> Mid: #677180 [103, 113, 128] -> Bottom: #242730 [36, 39, 48]
    for (let i = 0; i < 16; i++) {
      const t = i / 15;
      let r, g, b;
      if (t < 0.52) {
        const u = t / 0.52;
        r = Math.round(213 + (103 - 213) * u);
        g = Math.round(220 + (113 - 220) * u);
        b = Math.round(228 + (128 - 228) * u);
      } else {
        const u = (t - 0.52) / 0.48;
        r = Math.round(103 + (36 - 103) * u);
        g = Math.round(113 + (39 - 113) * u);
        b = Math.round(128 + (48 - 128) * u);
      }
      colors.push(`rgb(${r},${g},${b})`);
    }

    // Line 2 Fiery Orange Gradient stops:
    // Top: #C84618 [200, 70, 24] -> Mid: #F26C1C [242, 108, 28] -> Bottom: #FFA536 [255, 165, 54]
    for (let i = 0; i < 16; i++) {
      const t = i / 15;
      let r, g, b;
      if (t < 0.55) {
        const u = t / 0.55;
        r = Math.round(200 + (242 - 200) * u);
        g = Math.round(70 + (108 - 70) * u);
        b = Math.round(24 + (28 - 24) * u);
      } else {
        const u = (t - 0.55) / 0.45;
        r = Math.round(242 + (255 - 242) * u);
        g = Math.round(108 + (165 - 108) * u);
        b = Math.round(28 + (54 - 28) * u);
      }
      colors.push(`rgb(${r},${g},${b})`);
    }

    bucketColorsRef.current = colors;
  }, []);

  // Rasterize typography and populate particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = Math.max(Math.floor(rect.width), 320);
    const height = Math.max(Math.floor(rect.height), 240);

    dimsRef.current = { width, height, dpr };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    initBucketColors();

    // High resolution offscreen canvas for crisp sub-pixel text rasterization
    const sampleScale = Math.max(dpr, 2);
    const offscreen = document.createElement('canvas');
    offscreen.width = Math.floor(width * sampleScale);
    offscreen.height = Math.floor(height * sampleScale);
    const octx = offscreen.getContext('2d');
    if (!octx) return;

    octx.scale(sampleScale, sampleScale);

    const line1 = 'What if ChatGPT';
    const line2 = 'could generate Smells?';

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    // Line 2 is larger and bolder than Line 1 (matching reference image)
    let fontSize2 = isMobile
      ? Math.min(Math.max(width * 0.095, 34), 48)
      : isTablet
      ? Math.min(Math.max(width * 0.072, 48), 68)
      : Math.min(Math.max(width * 0.062, 54), 82);

    let fontSize1 = fontSize2 * 0.81;

    const fontFace = '"Inter", "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const maxAllowedWidth = isMobile ? width * 0.94 : width * 0.88;

    octx.font = `700 ${fontSize2}px ${fontFace}`;
    let w2 = octx.measureText(line2).width;

    while (w2 > maxAllowedWidth && fontSize2 > 18) {
      fontSize2 -= 1;
      fontSize1 = fontSize2 * 0.81;
      octx.font = `700 ${fontSize2}px ${fontFace}`;
      w2 = octx.measureText(line2).width;
    }

    const centerX = width / 2;
    const lineSpacing = fontSize2 * 0.98;
    const centerY = height * 0.5;
    const line1Y = centerY - lineSpacing * 0.52;
    const line2Y = centerY + lineSpacing * 0.52;

    octx.textAlign = 'center';
    octx.textBaseline = 'middle';

    // 1. RENDER LINE 1: "What if ChatGPT" (Metallic silver gradient)
    const grad1 = octx.createLinearGradient(
      centerX,
      line1Y - fontSize1 * 0.52,
      centerX,
      line1Y + fontSize1 * 0.52
    );
    grad1.addColorStop(0.0, '#D5DCE4');
    grad1.addColorStop(0.25, '#A0AAB8');
    grad1.addColorStop(0.52, '#677180');
    grad1.addColorStop(0.78, '#3E4450');
    grad1.addColorStop(1.0, '#242730');

    octx.fillStyle = grad1;
    octx.font = `700 ${fontSize1}px ${fontFace}`;
    octx.letterSpacing = '-0.02em';
    octx.fillText(line1, centerX, line1Y);

    // 2. RENDER LINE 2: "could generate Smells?" (Fiery orange gradient)
    const grad2 = octx.createLinearGradient(
      centerX,
      line2Y - fontSize2 * 0.52,
      centerX,
      line2Y + fontSize2 * 0.52
    );
    grad2.addColorStop(0.0, '#C84618');
    grad2.addColorStop(0.24, '#DE581C');
    grad2.addColorStop(0.55, '#F26C1C');
    grad2.addColorStop(0.82, '#FF8E24');
    grad2.addColorStop(1.0, '#FFA536');

    octx.fillStyle = grad2;
    octx.font = `700 ${fontSize2}px ${fontFace}`;
    octx.letterSpacing = '-0.02em';
    octx.fillText(line2, centerX, line2Y);

    // Store pristine rendered text canvas for 100% crisp solid text at rest
    offscreenTextCanvasRef.current = offscreen;

    // Read pixel data to create the particle system
    const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;
    const imgW = imgData.width;
    const imgH = imgData.height;

    // Ultra-dense sub-pixel sampling: 60,000+ micro-particles for ultra-crisp, flawless typography
    const step = isMobile ? 0.85 : 0.72;
    const buckets: Particle[][] = Array.from({ length: NUM_BUCKETS }, () => []);
    const baseParticleSize = isMobile ? 1.05 : 1.15;

    const lineMidpointY = (line1Y + line2Y) / 2;
    const line1Top = line1Y - fontSize1 * 0.52;
    const line1Height = fontSize1 * 1.04;
    const line2Top = line2Y - fontSize2 * 0.52;
    const line2Height = fontSize2 * 1.04;

    for (let y = 0; y < imgH; y += step) {
      const py = Math.floor(y);
      const rowOffset = py * imgW * 4;

      for (let x = 0; x < imgW; x += step) {
        const px = Math.floor(x);
        const index = rowOffset + px * 4;
        const alpha = data[index + 3];

        if (alpha > 20) {
          const screenX = px / sampleScale;
          const screenY = py / sampleScale;
          const normA = alpha / 255;

          // Assign to corresponding color bucket
          let bucketIndex = 0;
          if (screenY < lineMidpointY) {
            const frac = Math.min(Math.max((screenY - line1Top) / line1Height, 0), 1);
            bucketIndex = Math.min(15, Math.floor(frac * 16));
          } else {
            const frac = Math.min(Math.max((screenY - line2Top) / line2Height, 0), 1);
            bucketIndex = 16 + Math.min(15, Math.floor(frac * 16));
          }

          buckets[bucketIndex].push({
            x: screenX,
            y: screenY,
            originX: screenX,
            originY: screenY,
            vx: 0,
            vy: 0,
            size: baseParticleSize * (normA > 0.6 ? 1 : 0.85),
            mass: 0.85 + Math.random() * 0.3,
          });
        }
      }
    }

    bucketsRef.current = buckets;

    // Ambient floating aroma motes (subtle glowing orange embers)
    const motes: AromaMote[] = [];
    const moteCount = isMobile ? 25 : 45;
    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: centerX + (Math.random() - 0.5) * (w2 * 1.1),
        y: line2Y + (Math.random() - 0.2) * fontSize2 * 1.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45,
        size: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.1,
        maxAlpha: Math.random() * 0.45 + 0.15,
        life: Math.random() * 180,
        maxLife: Math.random() * 220 + 100,
      });
    }
    motesRef.current = motes;
  }, [initBucketColors]);

  // Explode shockwave action on click or spacebar
  const triggerExplosion = useCallback((clickX?: number, clickY?: number) => {
    isExplodedRef.current = true;
    isDisplacedRef.current = true;

    const { width, height } = dimsRef.current;
    const originX = clickX !== undefined ? clickX : width / 2;
    const originY = clickY !== undefined ? clickY : height * 0.5;

    const buckets = bucketsRef.current;
    for (let b = 0; b < NUM_BUCKETS; b++) {
      const list = buckets[b];
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const p = list[i];
        const dx = p.x - originX;
        const dy = p.y - originY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;

        const proxFactor = Math.max(0.3, 1 - dist / (width * 0.55));
        const speed = ((Math.random() * 22 + 10) * proxFactor) / p.mass;

        p.vx += Math.cos(angle) * speed;
        p.vy += Math.sin(angle) * speed - (Math.random() * 4 + 1.5);
      }
    }

    setTimeout(() => {
      isExplodedRef.current = false;
    }, 850);
  }, []);

  useEffect(() => {
    if (onExplodeRef) onExplodeRef.current = () => triggerExplosion();
  }, [triggerExplosion, onExplodeRef]);

  // Handle font ready & resize
  useEffect(() => {
    initParticles();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      }).catch(() => {});
    }

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  // High-performance 60/120fps render loop:
  // - On scroll: Pure smooth fade in / fade out with NO scattering!
  // - On hover/drag: Solid text is removed; particles immediately disperse and swirl away with 0ms delay!
  useEffect(() => {
    let active = true;

    const render = (time: number) => {
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = dimsRef.current;
      ctx.clearRect(0, 0, width, height);

      // Delta time calculation
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      lastTimeRef.current = time;

      const mouse = mouseRef.current;
      const buckets = bucketsRef.current;
      const bucketColors = bucketColorsRef.current;
      const motes = motesRef.current;
      const scrollProgress = scrollProgressRef.current;

      // On scroll: purely fade out smoothly into black (NO SCATTERING)
      const fadeOpacity = Math.max(0, 1 - scrollProgress * 2.3);

      if (fadeOpacity <= 0.005) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const mouseHover = mouse.isHovering && fadeOpacity > 0.4;
      const mouseX = mouse.x;
      const mouseY = mouse.y;
      const mouseVx = mouse.vx;
      const mouseVy = mouse.vy;

      // Repulsion field
      const repelRadius = 120;
      const repelRadiusSq = repelRadius * repelRadius;

      // Critically damped spring parameters (zero jitter)
      const springK = isExplodedRef.current ? 0.025 : 0.14;
      const friction = isExplodedRef.current ? 0.93 : 0.82;

      let anyParticleDisplacedThisFrame = false;

      // 1. Ambient Aroma Embers (fade cleanly on scroll without scattering)
      ctx.fillStyle = `rgba(255, 140, 36, ${0.35 * fadeOpacity})`;
      ctx.beginPath();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.life += 1;
        if (m.life > m.maxLife) {
          m.life = 0;
          m.x = width * 0.5 + (Math.random() - 0.5) * (width * 0.55);
          m.y = height * 0.55 + (Math.random() - 0.2) * 35;
          m.vx = (Math.random() - 0.5) * 0.35;
          m.vy = -0.25 - Math.random() * 0.5;
        }

        m.x += m.vx;
        m.y += m.vy;

        if (mouseHover) {
          const dx = m.x - mouseX;
          const dy = m.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < repelRadiusSq) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / repelRadius) * 2;
            m.vx += (dx / dist) * force;
            m.vy += (dy / dist) * force;
          }
        }

        ctx.rect(m.x, m.y, m.size, m.size);
      }
      ctx.fill();

      // 2. Physics Update for all particles (ONLY responds to hover/click, NO scroll scattering)
      for (let b = 0; b < NUM_BUCKETS; b++) {
        const list = buckets[b];
        const len = list.length;

        for (let i = 0; i < len; i++) {
          const p = list[i];

          const targetX = p.originX;
          const targetY = p.originY;

          // Zero-delay instantaneous mouse repulsion with high-speed bounding box test
          if (mouseHover) {
            const dx = p.x - mouseX;
            if (dx > -repelRadius && dx < repelRadius) {
              const dy = p.y - mouseY;
              if (dy > -repelRadius && dy < repelRadius) {
                const distSq = dx * dx + dy * dy;
                if (distSq < repelRadiusSq) {
                  const dist = Math.sqrt(distSq) || 1;
                  const u = 1 - dist / repelRadius;
                  const factor = u * u;
                  const repelForce = (factor * 11.5) / p.mass;
                  const invDist = 1 / dist;

                  p.vx += dx * invDist * repelForce + mouseVx * (factor * 0.25);
                  p.vy += dy * invDist * repelForce + mouseVy * (factor * 0.25);
                  anyParticleDisplacedThisFrame = true;
                }
              }
            }
          }

          // Hooke's Law Spring force returning to target
          const forceX = (targetX - p.x) * springK;
          const forceY = (targetY - p.y) * springK;

          p.vx = (p.vx + forceX / p.mass) * friction;
          p.vy = (p.vy + forceY / p.mass) * friction;

          p.x += p.vx;
          p.y += p.vy;

          // Deadband micro-snapping to eliminate microscopic sub-pixel float jitter
          const distToOrigin = Math.abs(p.x - p.originX) + Math.abs(p.y - p.originY);
          const velMag = Math.abs(p.vx) + Math.abs(p.vy);

          if (!mouseHover && !isExplodedRef.current && distToOrigin < 0.35 && velMag < 0.08) {
            p.x = p.originX;
            p.y = p.originY;
            p.vx = 0;
            p.vy = 0;
          } else if (distToOrigin > 0.4 || velMag > 0.05) {
            anyParticleDisplacedThisFrame = true;
          }
        }
      }

      isDisplacedRef.current = anyParticleDisplacedThisFrame || isExplodedRef.current || mouseHover;

      // 3. Render: Pure smooth fade on scroll with NO scattering
      ctx.globalAlpha = fadeOpacity;

      if (!isDisplacedRef.current && offscreenTextCanvasRef.current) {
        // Pristine vector text
        ctx.drawImage(offscreenTextCanvasRef.current, 0, 0, width, height);
      } else {
        // Active particles dispersing on hover with NO text underneath
        for (let b = 0; b < NUM_BUCKETS; b++) {
          const list = buckets[b];
          const len = list.length;
          if (len === 0) continue;

          ctx.fillStyle = bucketColors[b] || '#ffffff';
          ctx.beginPath();

          for (let i = 0; i < len; i++) {
            const p = list[i];
            ctx.rect(p.x, p.y, p.size, p.size);
          }

          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Instantaneous Mouse & Touch events (0ms delay)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const prevX = mouseRef.current.x === -9999 ? currentX : mouseRef.current.x;
    const prevY = mouseRef.current.y === -9999 ? currentY : mouseRef.current.y;

    mouseRef.current.vx = currentX - prevX;
    mouseRef.current.vy = currentY - prevY;
    mouseRef.current.x = currentX;
    mouseRef.current.y = currentY;
    mouseRef.current.isHovering = true;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    triggerExplosion(clickX, clickY);
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = e.touches[0];
      const currentX = t.clientX - rect.left;
      const currentY = t.clientY - rect.top;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.prevX = currentX;
      mouseRef.current.prevY = currentY;
      mouseRef.current.vx = 0;
      mouseRef.current.vy = 0;
      mouseRef.current.isHovering = true;
      triggerExplosion(currentX, currentY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = e.touches[0];
      const currentX = t.clientX - rect.left;
      const currentY = t.clientY - rect.top;
      const prevX = mouseRef.current.x === -9999 ? currentX : mouseRef.current.x;
      const prevY = mouseRef.current.y === -9999 ? currentY : mouseRef.current.y;
      mouseRef.current.vx = (currentX - prevX) * 0.75;
      mouseRef.current.vy = (currentY - prevY) * 0.75;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.isHovering = true;
    }
  };

  const handleTouchEnd = () => {
    mouseRef.current.isHovering = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
};
