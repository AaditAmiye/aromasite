import React, { useEffect, useRef, useCallback } from 'react';
import { getCurlNoise } from '../utils/noise';

interface FlyoverParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  size: number;
  arcOffset: number;
  mass: number;
  group: 'introducing' | 'aromax';
  stagger: number;
}

interface IntroducingSceneProps {
  scrollProgress: number; // Global scroll progress [0, 1]
}

export const IntroducingScene: React.FC<IntroducingSceneProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<FlyoverParticle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const mouseRef = useRef<{
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    radius: number;
    isHovering: boolean;
  }>({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    radius: 95,
    isHovering: false,
  });

  // Helper used solely on the OFFSCREEN blueprint canvas to sample particle coordinates
  const drawTrackedBlueprint = (
    ctx: CanvasRenderingContext2D,
    text: string,
    centerX: number,
    centerY: number,
    letterSpacingPx: number
  ) => {
    let totalWidth = 0;
    const widths: number[] = [];
    for (let i = 0; i < text.length; i++) {
      const charWidth = ctx.measureText(text[i]).width;
      widths.push(charWidth);
      totalWidth += charWidth;
      if (i < text.length - 1) {
        totalWidth += letterSpacingPx;
      }
    }

    let currentX = centerX - totalWidth / 2;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], currentX + widths[i] / 2, centerY);
      currentX += widths[i] + letterSpacingPx;
    }
  };

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = Math.max(Math.floor(rect.width), 320);
    const height = Math.max(Math.floor(rect.height), 240);
    const isMobile = width < 640;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const centerX = width / 2;

    // Generous, bold typography sizes
    let introFontSize = isMobile
      ? Math.min(Math.max(width / 12, 28), 42)
      : Math.min(Math.max(width / 20, 30), 52);

    let aromaxFontSize = isMobile
      ? Math.min(Math.max(width / 14, 24), 36)
      : Math.round(introFontSize * 0.84);

    const lineGap = introFontSize * (isMobile ? 1.55 : 1.7);
    const introY = height * 0.46 - lineGap * 0.52;
    const aromaxY = height * 0.46 + lineGap * 0.52;

    const introFontString = `600 ${introFontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    const aromaxFontString = `600 ${aromaxFontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;

    const introLetterSpacing = introFontSize * (isMobile ? 0.20 : 0.26);
    const aromaxLetterSpacing = aromaxFontSize * (isMobile ? 0.18 : 0.22);

    const particles: FlyoverParticle[] = [];

    const generateFlyoverStart = (targetX: number, targetY: number) => {
      let startX: number;
      let startY: number;

      const edge = Math.floor(Math.random() * 4);
      const margin = 140;

      if (edge === 0) {
        startX = Math.random() * width;
        startY = -margin - Math.random() * 220;
      } else if (edge === 1) {
        startX = Math.random() * width;
        startY = height + margin + Math.random() * 220;
      } else if (edge === 2) {
        startX = -margin - Math.random() * 220;
        startY = Math.random() * height;
      } else {
        startX = width + margin + Math.random() * 220;
        startY = Math.random() * height;
      }

      const arcOffset = (Math.random() - 0.5) * 80;
      const mass = 0.85 + Math.random() * 0.35;
      const stagger = Math.random() * 0.18;

      return { startX, startY, arcOffset, mass, stagger };
    };

    // 1. Offscreen blueprint for "INTRODUCING" (used ONLY for sampling particle positions)
    const offscreenIntro = document.createElement('canvas');
    offscreenIntro.width = width;
    offscreenIntro.height = height;
    const octxIntro = offscreenIntro.getContext('2d');

    if (octxIntro) {
      octxIntro.textAlign = 'center';
      octxIntro.textBaseline = 'middle';
      octxIntro.font = introFontString;
      octxIntro.fillStyle = '#ffffff';

      drawTrackedBlueprint(octxIntro, 'INTRODUCING', centerX, introY, introLetterSpacing);

      const imgDataIntro = octxIntro.getImageData(0, 0, width, height);
      const dataIntro = imgDataIntro.data;
      const imgW = imgDataIntro.width;
      const imgH = imgDataIntro.height;
      // High-density sampling so particles alone form solid, continuous letters
      const step = isMobile ? 1.15 : 1.05;

      for (let y = 0; y < imgH; y += step) {
        const py = Math.floor(y);
        for (let x = 0; x < imgW; x += step) {
          const px = Math.floor(x);
          const index = (py * imgW + px) * 4;
          const alpha = dataIntro[index + 3];

          if (alpha > 45) {
            const fly = generateFlyoverStart(x, y);
            particles.push({
              x: fly.startX,
              y: fly.startY,
              originX: x,
              originY: y,
              startX: fly.startX,
              startY: fly.startY,
              vx: 0,
              vy: 0,
              size: isMobile ? 1.4 : 1.35,
              arcOffset: fly.arcOffset,
              mass: fly.mass,
              group: 'introducing',
              stagger: fly.stagger,
            });
          }
        }
      }
    }

    // 2. Offscreen blueprint for "Aromax AI" (used ONLY for sampling particle positions)
    const offscreenAromax = document.createElement('canvas');
    offscreenAromax.width = width;
    offscreenAromax.height = height;
    const octxAromax = offscreenAromax.getContext('2d');

    if (octxAromax) {
      octxAromax.textAlign = 'center';
      octxAromax.textBaseline = 'middle';
      octxAromax.font = aromaxFontString;
      octxAromax.fillStyle = '#ffffff';

      drawTrackedBlueprint(octxAromax, 'Aromax AI', centerX, aromaxY, aromaxLetterSpacing);

      const imgDataAromax = octxAromax.getImageData(0, 0, width, height);
      const dataAromax = imgDataAromax.data;
      const imgW = imgDataAromax.width;
      const imgH = imgDataAromax.height;
      const step = isMobile ? 1.15 : 1.05;

      for (let y = 0; y < imgH; y += step) {
        const py = Math.floor(y);
        for (let x = 0; x < imgW; x += step) {
          const px = Math.floor(x);
          const index = (py * imgW + px) * 4;
          const alpha = dataAromax[index + 3];

          if (alpha > 45) {
            const fly = generateFlyoverStart(x, y);
            particles.push({
              x: fly.startX,
              y: fly.startY,
              originX: x,
              originY: y,
              startX: fly.startX,
              startY: fly.startY,
              vx: 0,
              vy: 0,
              size: isMobile ? 1.4 : 1.35,
              arcOffset: fly.arcOffset,
              mass: fly.mass,
              group: 'aromax',
              stagger: fly.stagger,
            });
          }
        }
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    initParticles();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      }).catch(() => {
        initParticles();
      });
    }

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const container = containerRef.current;
    let observer: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        initParticles();
      });
      observer.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [initParticles]);

  // Main animation render loop: 100% PURE PARTICLES ONLY (No fake pre-rendered text)
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const isMobile = width < 640;

      ctx.clearRect(0, 0, width, height);

      const minTrigger = isMobile ? 0.14 : 0.20;
      if (scrollProgress < minTrigger) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      // Flyover progress timing
      const rawProgressIntro = isMobile
        ? Math.min(Math.max((scrollProgress - 0.16) / 0.22, 0), 1)
        : Math.min(Math.max((scrollProgress - 0.26) / 0.36, 0), 1);

      const rawProgressAromax = isMobile
        ? Math.min(Math.max((scrollProgress - 0.34) / 0.24, 0), 1)
        : Math.min(Math.max((scrollProgress - 0.54) / 0.36, 0), 1);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const now = Date.now();

      // Pure glowing starlight white particles make 100% of the text
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const baseProgress = p.group === 'introducing' ? rawProgressIntro : rawProgressAromax;

        const adjustedProgress = Math.min(
          Math.max((baseProgress - p.stagger * 0.35) / (1 - p.stagger * 0.35), 0),
          1
        );

        if (adjustedProgress <= 0) {
          continue;
        }

        const easeOut = 1 - Math.pow(1 - adjustedProgress, isMobile ? 3.4 : 3.8);

        const baseX = p.startX + (p.originX - p.startX) * easeOut;
        const baseY = p.startY + (p.originY - p.startY) * easeOut;

        const arcSine = Math.sin(adjustedProgress * Math.PI);
        const dx = p.originX - p.startX;
        const dy = p.originY - p.startY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = -dy / dist;
        const perpY = dx / dist;

        const targetFlightX = baseX + perpX * (p.arcOffset * arcSine);
        const targetFlightY = baseY + perpY * (p.arcOffset * arcSine);

        if (adjustedProgress < 0.98) {
          p.x = targetFlightX;
          p.y = targetFlightY;
          p.vx = 0;
          p.vy = 0;
        } else {
          // Particles have arrived: they form the solid letterforms and react elastically to the cursor
          let targetX = p.originX;
          let targetY = p.originY;

          if (mouse.isHovering) {
            const dxMouse = p.x - mouse.x;
            const dyMouse = p.y - mouse.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distMouse < mouse.radius) {
              const u = 1 - distMouse / mouse.radius;
              const w = u * u * (3 - 2 * u);

              const scatterForce = (w * 6.0) / p.mass;
              const angle = Math.atan2(dyMouse, dxMouse);

              const curl = getCurlNoise(p.x, p.y, now, 0.005);
              const vortexX = curl.vx * (w * 4.2);
              const vortexY = curl.vy * (w * 4.2);

              const impulseX = mouse.vx * (w * 0.2);
              const impulseY = mouse.vy * (w * 0.2);

              p.vx += Math.cos(angle) * scatterForce + vortexX + impulseX;
              p.vy += Math.sin(angle) * scatterForce + vortexY + impulseY;
            }
          }

          const dxOrigin = targetX - p.x;
          const dyOrigin = targetY - p.y;

          p.vx += (dxOrigin * (isMobile ? 0.28 : 0.22)) / p.mass;
          p.vy += (dyOrigin * (isMobile ? 0.28 : 0.22)) / p.mass;

          p.vx *= 0.78;
          p.vy *= 0.78;

          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.rect(p.x, p.y, p.size, p.size);
      }

      // Single GPU fill renders all particles simultaneously: the particles ONLY make the text!
      ctx.fill();

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scrollProgress]);

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

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const containerOpacity = Math.min(
    Math.max((scrollProgress - (isMobile ? 0.16 : 0.22)) / (isMobile ? 0.12 : 0.16), 0),
    1
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-opacity duration-150"
      style={{
        opacity: containerOpacity,
        pointerEvents: scrollProgress > (isMobile ? 0.22 : 0.28) ? 'auto' : 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-pointer touch-none"
        title="Introducing Aromax AI"
      />
    </div>
  );
};
