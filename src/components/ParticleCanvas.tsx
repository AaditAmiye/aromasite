import React, { useEffect, useRef, useCallback } from 'react';
import { getCurlNoise } from '../utils/noise';

interface MicroParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  swirlSense: number;
  mass: number;
  bloomAngle: number;
  bloomSpeed: number;
  bloomLift: number;
}

interface ParticleCanvasProps {
  scrollProgress?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<MicroParticle[]>([]);
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

  const currentScrollBloomRef = useRef<number>(0);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Guaranteed integer pixel dimensions
    const width = Math.max(Math.floor(rect.width), 320);
    const height = Math.max(Math.floor(rect.height), 240);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // Offscreen canvas used as a geometric blueprint to sample micro-particle coordinates
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext('2d');
    if (!octx) return;

    const singleText = 'What if ChatGPT can generate Smells?';

    // Premium single-line typography sizing with dynamic scale-to-fit
    let fontSize = Math.min(Math.max(width / 22, 18), 48);
    if (width < 640) {
      fontSize = Math.min(Math.max(width / 18, 14), 22);
    }

    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.font = `600 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

    let textWidth = octx.measureText(singleText).width;

    // Ensure the single line stays comfortably within viewport margins
    while (textWidth > width * 0.88 && fontSize > 12) {
      fontSize -= 1;
      octx.font = `600 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      textWidth = octx.measureText(singleText).width;
    }

    octx.fillStyle = '#000000';

    const centerX = width / 2;
    const centerY = height * 0.50;

    // Render as a single unified line centered horizontally & vertically
    octx.fillText(singleText, centerX, centerY);

    const imgData = octx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const imgW = imgData.width;
    const imgH = imgData.height;

    // Ultra-dense sampling for smooth unbroken solid letterforms
    const step = 1.1;
    const particles: MicroParticle[] = [];

    for (let y = 0; y < imgH; y += step) {
      const py = Math.floor(y);
      for (let x = 0; x < imgW; x += step) {
        const px = Math.floor(x);
        // Guaranteed integer index for typed array lookup
        const index = (py * imgW + px) * 4;
        const alpha = data[index + 3];

        if (alpha > 40) {
          const dxFromCenter = x - centerX;
          const dyFromCenter = y - centerY;
          const naturalAngle = Math.atan2(dyFromCenter, dxFromCenter);

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: 1.25,
            swirlSense: Math.random() < 0.5 ? 1 : -1,
            mass: 0.85 + Math.random() * 0.3,
            bloomAngle: naturalAngle + (Math.random() - 0.5) * 0.4,
            bloomSpeed: 0.8 + Math.random() * 0.6,
            bloomLift: 0.5 + Math.random() * 0.6,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    // Run immediately
    initParticles();

    // Re-run once fonts are confirmed ready
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

    // Also observe container resize for responsive accuracy in iframes
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

  // Main animation loop: 100% PURE PARTICLES ONLY
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

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      currentScrollBloomRef.current += (scrollProgress - currentScrollBloomRef.current) * 0.22;
      const bloom = currentScrollBloomRef.current;
      const vanishFactor = Math.max(0, 1 - Math.pow(bloom * 1.35, 1.4));

      // Deep obsidian slate on white background
      const particleColor = bloom > 0.35 ? '#e2e8f0' : '#0f172a';

      ctx.fillStyle = particleColor;
      ctx.globalAlpha = vanishFactor;
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let targetX = p.originX;
        let targetY = p.originY;

        // Subtle organic Brownian breathing when resting
        if (bloom <= 0.001) {
          const brownianX = Math.sin(now * 0.002 + p.originY * 0.04) * 0.35;
          const brownianY = Math.cos(now * 0.0025 + p.originX * 0.04) * 0.35;
          targetX += brownianX;
          targetY += brownianY;
        }

        // Scroll bloom evaporation
        if (bloom > 0.001) {
          const curl = getCurlNoise(p.x, p.y, now, 0.0035);
          const bloomDist = bloom * 460 * p.bloomSpeed;
          const vaporLift = -bloom * 260 * p.bloomLift;

          targetX = p.originX + Math.cos(p.bloomAngle) * bloomDist + curl.vx * 30 * bloom;
          targetY = p.originY + Math.sin(p.bloomAngle) * bloomDist + vaporLift + curl.vy * 30 * bloom;
        }

        const dxOrigin = targetX - p.x;
        const dyOrigin = targetY - p.y;

        p.vx += (dxOrigin * 0.24) / p.mass;
        p.vy += (dyOrigin * 0.24) / p.mass;

        // Realistic fluid hover wake with natural curl noise vortices
        if (mouse.isHovering && bloom < 0.4) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius) {
            const u = 1 - distMouse / mouse.radius;
            const w = u * u * (3 - 2 * u);

            const scatterForce = (w * 6.5) / p.mass;
            const angle = Math.atan2(dyMouse, dxMouse);

            const curl = getCurlNoise(p.x, p.y, now, 0.006);
            const vortexX = curl.vx * (w * 4.8) * p.swirlSense;
            const vortexY = curl.vy * (w * 4.8) * p.swirlSense;

            const impulseX = mouse.vx * (w * 0.22);
            const impulseY = mouse.vy * (w * 0.22);

            p.vx += Math.cos(angle) * scatterForce + vortexX + impulseX;
            p.vy += Math.sin(angle) * scatterForce + vortexY + impulseY;
          }
        }

        p.vx *= 0.77;
        p.vy *= 0.77;

        p.x += p.vx;
        p.y += p.vy;

        if (vanishFactor > 0.01) {
          ctx.rect(p.x, p.y, p.size, p.size);
        }
      }

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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-pointer touch-none"
        title="What if ChatGPT can generate Smells?"
      />
    </div>
  );
};
