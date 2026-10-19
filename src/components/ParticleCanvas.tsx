import React, { useEffect, useRef, useCallback } from 'react';

interface MicroParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  mass: number;
  bloomSpeed: number;
  bloomLift: number;
  bloomCos: number;
  bloomSin: number;
  curlVx: number;
  curlVy: number;
  phaseX: number;
  phaseY: number;
}

interface ParticleCanvasProps {
  scrollProgress?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<MicroParticle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mountTimeRef = useRef<number>(Date.now());
  const scrollProgressRef = useRef<number>(scrollProgress);

  // Cached viewport dimensions to eliminate getBoundingClientRect() layout thrashing in render loop
  const dimsRef = useRef<{ width: number; height: number; isMobile: boolean }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
    isMobile: false,
  });

  // Keep scrollProgress ref in sync without restarting the animation loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Store sharp text typography details for first-frame sharpness & smooth dilution
  const textConfigRef = useRef<{
    text: string;
    font: string;
    fontSize: number;
    centerX: number;
    centerY: number;
    width: number;
  }>({
    text: 'What if ChatGPT could generate Smells?',
    font: '600 36px "Plus Jakarta Sans"',
    fontSize: 36,
    centerX: 0,
    centerY: 0,
    width: 0,
  });

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
    const isMobile = width < 640;

    dimsRef.current = { width, height, isMobile };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // High-resolution offscreen canvas (2x sampling scale for retina sub-pixel density)
    const sampleScale = Math.max(dpr, 2);
    const offscreen = document.createElement('canvas');
    offscreen.width = Math.floor(width * sampleScale);
    offscreen.height = Math.floor(height * sampleScale);
    const octx = offscreen.getContext('2d');
    if (!octx) return;

    octx.scale(sampleScale, sampleScale);

    const singleText = 'What if ChatGPT could generate Smells?';

    // Bold, commanding typography on dark cosmic theme
    let fontSize = isMobile
      ? Math.min(Math.max(width / 13, 26), 42)
      : Math.min(Math.max(width / 18, 30), 58);

    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    let fontString = `600 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    octx.font = fontString;

    let textWidth = octx.measureText(singleText).width;

    // Ensure the single line stays comfortably within viewport margins with max font presence
    const maxAllowedWidth = isMobile ? width * 0.94 : width * 0.90;
    const minAllowedFont = isMobile ? 18 : 14;

    while (textWidth > maxAllowedWidth && fontSize > minAllowedFont) {
      fontSize -= 0.5;
      fontString = `600 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      octx.font = fontString;
      textWidth = octx.measureText(singleText).width;
    }

    octx.fillStyle = '#ffffff';

    const centerX = width / 2;
    const centerY = height * 0.50;

    // Save exact typography configuration for the sharp-then-dilute effect
    textConfigRef.current = {
      text: singleText,
      font: fontString,
      fontSize,
      centerX,
      centerY,
      width,
    };

    // Render blueprint line in high resolution
    octx.fillText(singleText, centerX, centerY);

    const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;
    const imgW = imgData.width;
    const imgH = imgData.height;

    // Exactly unchanged sampling parameters to preserve the exact particle count
    const sampleStep = isMobile ? 1.25 : 1.1;
    const particles: MicroParticle[] = [];

    for (let y = 0; y < imgH; y += sampleStep) {
      const py = Math.floor(y);
      const rowOffset = py * imgW * 4;
      for (let x = 0; x < imgW; x += sampleStep) {
        const px = Math.floor(x);
        const index = rowOffset + px * 4;
        const alpha = data[index + 3];

        if (alpha > 28) {
          const screenX = px / sampleScale;
          const screenY = py / sampleScale;
          const dxFromCenter = screenX - centerX;
          const dyFromCenter = screenY - centerY;
          const naturalAngle = Math.atan2(dyFromCenter, dxFromCenter);

          // Sub-pixel antialiasing edge factor for razor-sharp glyph edges
          const edgeFactor = alpha > 130 ? 1 : Math.max(0.65, alpha / 130);
          const baseSize = isMobile ? 1.15 : 1.05;

          const bloomAngle = naturalAngle + (Math.random() - 0.5) * 0.45;
          const swirlSense = Math.random() < 0.5 ? 1 : -1;

          // Precompute geometric trigonometry and vortex vectors once per particle:
          // Eliminates tens of thousands of Math.sin/Math.cos/getCurlNoise calls per frame in the animation loop
          particles.push({
            x: screenX,
            y: screenY,
            originX: screenX,
            originY: screenY,
            vx: 0,
            vy: 0,
            size: baseSize * edgeFactor,
            mass: 0.85 + Math.random() * 0.3,
            bloomSpeed: (isMobile ? 1.4 : 0.95) + Math.random() * 0.6,
            bloomLift: 0.5 + Math.random() * 0.6,
            bloomCos: Math.cos(bloomAngle),
            bloomSin: Math.sin(bloomAngle),
            curlVx: -Math.sin(bloomAngle) * (Math.random() * 0.8 + 0.6) * swirlSense,
            curlVy: Math.cos(bloomAngle) * (Math.random() * 0.8 + 0.6) * swirlSense,
            phaseX: Math.sin(screenY * 0.04) * 0.35,
            phaseY: Math.cos(screenX * 0.04) * 0.35,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    mountTimeRef.current = Date.now();
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

  // High-performance 60/120fps continuous render loop:
  // Decoupled from React render cycles with precomputed kinematics and zero DOM layout thrashing
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height, isMobile } = dimsRef.current;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const targetScroll = scrollProgressRef.current;

      // Silky smooth scroll bloom smoothing
      const bloomLerpSpeed = isMobile ? 0.36 : 0.22;
      currentScrollBloomRef.current += (targetScroll - currentScrollBloomRef.current) * bloomLerpSpeed;
      const bloom = currentScrollBloomRef.current;

      // Particle vanish factor as they scatter away
      const vanishFactor = Math.max(0, 1 - Math.pow(bloom * (isMobile ? 1.7 : 1.3), 1.25));

      // 1. DILUTION PHASE LOGIC:
      const elapsedSinceMount = now - mountTimeRef.current;
      let diluteFactor = 0;
      const holdTime = isMobile ? 280 : 350;
      const diluteDuration = isMobile ? 550 : 750;
      if (elapsedSinceMount < holdTime) {
        diluteFactor = 1.0;
      } else if (elapsedSinceMount < holdTime + diluteDuration) {
        const t = (elapsedSinceMount - holdTime) / diluteDuration;
        diluteFactor = Math.max(0, 1.0 - Math.pow(t, 1.4));
      }

      if (bloom > 0.005) {
        diluteFactor *= Math.max(0, 1 - bloom * 15);
      }
      if (mouse.isHovering) {
        diluteFactor = 0;
      }

      // 2. ULTRA-FAST PARTICLE UPDATE & RENDER
      if (vanishFactor > 0.005 && particles.length > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = vanishFactor;
        ctx.beginPath();

        const scatterDistanceMultiplier = isMobile ? 2.1 : 1.5;
        const bloomDistBase = bloom * (640 * scatterDistanceMultiplier);
        const vaporLiftBase = -bloom * (360 * scatterDistanceMultiplier);
        const curlBase = 55 * bloom;

        const sinTime = Math.sin(now * 0.002);
        const cosTime = Math.cos(now * 0.0025);

        const mouseHover = mouse.isHovering && bloom < 0.4;
        const mouseX = mouse.x;
        const mouseY = mouse.y;
        const mouseRadius = mouse.radius;
        const mouseRadiusSq = mouseRadius * mouseRadius;
        const mouseVx = mouse.vx;
        const mouseVy = mouse.vy;

        const springFactor = (isMobile ? 0.30 : 0.24);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          let targetX = p.originX;
          let targetY = p.originY;

          // Subtle organic Brownian breathing when resting
          if (bloom <= 0.001) {
            targetX += sinTime * p.phaseX;
            targetY += cosTime * p.phaseY;
          } else {
            // Expansive 3D particle scatter away into space on scroll
            const dist = bloomDistBase * p.bloomSpeed;
            targetX += p.bloomCos * dist + p.curlVx * curlBase;
            targetY += p.bloomSin * dist + vaporLiftBase * p.bloomLift + p.curlVy * curlBase;
          }

          // Fluid hover wake with fast bounding-box rejection (eliminates unnecessary math for 98% of particles)
          if (mouseHover) {
            const dxMouse = p.x - mouseX;
            if (dxMouse > -mouseRadius && dxMouse < mouseRadius) {
              const dyMouse = p.y - mouseY;
              if (dyMouse > -mouseRadius && dyMouse < mouseRadius) {
                const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
                if (distSq < mouseRadiusSq) {
                  const distMouse = Math.sqrt(distSq);
                  const u = 1 - distMouse / mouseRadius;
                  const w = u * u * (3 - 2 * u);
                  const scatterForce = (w * 6.5) / p.mass;
                  const invDist = 1 / (distMouse || 1);

                  p.vx += (dxMouse * invDist) * scatterForce + p.curlVx * (w * 4.8) + mouseVx * (w * 0.22);
                  p.vy += (dyMouse * invDist) * scatterForce + p.curlVy * (w * 4.8) + mouseVy * (w * 0.22);
                }
              }
            }
          }

          const dxOrigin = targetX - p.x;
          const dyOrigin = targetY - p.y;

          p.vx += (dxOrigin * springFactor) / p.mass;
          p.vy += (dyOrigin * springFactor) / p.mass;

          p.vx *= 0.77;
          p.vy *= 0.77;

          p.x += p.vx;
          p.y += p.vy;

          ctx.rect(p.x, p.y, p.size, p.size);
        }

        ctx.fill();
      }

      // 3. RENDER SHARP FIRST FRAME TEXT LAYER (DILUTES GRACEFULLY)
      if (diluteFactor > 0.005 && vanishFactor > 0.01 && textConfigRef.current.text) {
        ctx.save();
        ctx.font = textConfigRef.current.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = diluteFactor * vanishFactor;
        ctx.fillText(
          textConfigRef.current.text,
          textConfigRef.current.centerX,
          textConfigRef.current.centerY
        );
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Run continuously on native V-Sync without re-mounting on scroll

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
      mouseRef.current.vx = (currentX - prevX) * 0.7;
      mouseRef.current.vy = (currentY - prevY) * 0.7;
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
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full h-full cursor-pointer touch-none"
        title="What if ChatGPT could generate Smells?"
      />
    </div>
  );
};
