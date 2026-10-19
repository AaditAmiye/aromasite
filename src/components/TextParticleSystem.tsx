import React, { useEffect, useRef } from 'react';

interface TextParticleSystemProps {
  onFormed?: () => void;
  isFormed: boolean;
  setIsFormed: (formed: boolean) => void;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  ease: number;
  delay: number;
  isLine2: boolean;
}

export const TextParticleSystem: React.FC<TextParticleSystemProps> = ({
  onFormed,
  isFormed,
  setIsFormed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const mouseRef = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -9999,
    y: -9999,
    active: false,
    prevX: -9999,
    prevY: -9999,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Line 1: Smoked platinum & silvery quartz palette matching image_d24d084e.png
    const colorsLine1 = [
      { fill: '#ffffff', glow: 'rgba(255, 255, 255, 0.95)' },
      { fill: '#e2e8f0', glow: 'rgba(226, 232, 240, 0.85)' },
      { fill: '#cbd5e1', glow: 'rgba(203, 213, 225, 0.75)' },
      { fill: '#94a3b8', glow: 'rgba(148, 163, 184, 0.65)' },
      { fill: '#64748b', glow: 'rgba(100, 116, 139, 0.55)' },
    ];

    // Line 2: Glowing vibrant amber-orange palette matching image_d24d084e.png
    const colorsLine2 = [
      { fill: '#f97316', glow: 'rgba(249, 115, 22, 0.95)' },
      { fill: '#ea580c', glow: 'rgba(234, 88, 12, 0.95)' },
      { fill: '#fb923c', glow: 'rgba(251, 146, 60, 0.90)' },
      { fill: '#fdba74', glow: 'rgba(253, 186, 116, 0.85)' },
      { fill: '#c2410c', glow: 'rgba(194, 65, 12, 0.80)' },
      { fill: '#ffedd5', glow: 'rgba(255, 237, 213, 0.90)' },
    ];

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Render text offscreen to sample particle targets
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      // Responsive font sizing strictly aligned with CSS
      let fontSize = 84;
      if (width < 440) fontSize = 36;
      else if (width < 640) fontSize = 52;
      else if (width < 768) fontSize = 66;
      else if (width < 1024) fontSize = 76;

      const lineHeight = fontSize * 1.14;
      const font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", system-ui, sans-serif`;

      offCtx.font = font;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#ffffff';

      const line1 = 'What if ChatGPT';
      const line2 = 'could generate Smells?';

      const centerY = height / 2;
      const y1 = centerY - lineHeight * 0.54;
      const y2 = centerY + lineHeight * 0.54;

      offCtx.fillText(line1, width / 2, y1);
      offCtx.fillText(line2, width / 2, y2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      const newParticles: Particle[] = [];
      const density = width < 640 ? 3 : 3;

      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 120) {
            // Line 1 is above centerY, Line 2 is below centerY
            const isLine2 = y > centerY - lineHeight * 0.05;
            const palette = isLine2 ? colorsLine2 : colorsLine1;
            const colorObj = palette[Math.floor(Math.random() * palette.length)];

            // Initial cloud spawn: scattered in space
            const angle = Math.random() * Math.PI * 2;
            const distance = 140 + Math.random() * Math.max(width, height) * 0.45;
            const spawnX = width / 2 + Math.cos(angle) * distance;
            const spawnY = height / 2 + Math.sin(angle) * distance;

            newParticles.push({
              x: spawnX,
              y: spawnY,
              targetX: x,
              targetY: y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              radius: Math.random() * 1.5 + 0.95,
              color: colorObj.fill,
              glowColor: colorObj.glow,
              alpha: Math.random() * 0.35 + 0.65,
              ease: Math.random() * 0.04 + 0.05,
              delay: Math.random() * 0.6,
              isLine2,
            });
          }
        }
      }

      particlesRef.current = newParticles;
      startTimeRef.current = Date.now();
      setIsFormed(false);
    };

    initParticles();

    // Mouse & Touch Tracking for Interactive Particle Scattering
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        mouseRef.current.x = touch.clientX - rect.left;
        mouseRef.current.y = touch.clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    // Burst scattering on click / touch tap
    const handlePointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 260) {
          const power = Math.max(0, 1 - dist / 260);
          const force = power * (Math.random() * 25 + 20);
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    canvas.addEventListener('mousedown', handlePointerDown);

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Main 60-120fps Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Trigger formed state at ~1.8s
      if (!isFormed && elapsed > 1.8) {
        setIsFormed(true);
        if (onFormed) onFormed();
      }

      const isScatteringActive = mouse.active;
      const mouseSpeedX = mouse.x - mouse.prevX;
      const mouseSpeedY = mouse.y - mouse.prevY;
      const mouseSpeed = Math.min(Math.sqrt(mouseSpeedX * mouseSpeedX + mouseSpeedY * mouseSpeedY), 25);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (elapsed < p.delay) {
          // Floating before assembly
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.4;
        } else {
          // Physical spring-elastic return to target letter coordinates
          const homeDx = p.targetX - p.x;
          const homeDy = p.targetY - p.y;
          const spring = 0.082;
          const friction = 0.86;

          p.vx += homeDx * spring;
          p.vy += homeDy * spring;
          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;
        }

        // DYNAMIC PARTICLE SCATTERING EFFECT
        if (isScatteringActive) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const scatterRadius = 145;

          if (mdist < scatterRadius && mdist > 0) {
            const normalizedDist = 1 - mdist / scatterRadius;
            const repelForce = Math.pow(normalizedDist, 1.6) * (18 + mouseSpeed * 0.5);
            const repelAngle = Math.atan2(mdy, mdx);

            // Tangential curl creates real fluid aroma turbulence
            const curl = (i % 2 === 0 ? 1 : -1) * 0.35;
            p.vx += Math.cos(repelAngle + curl) * repelForce;
            p.vy += Math.sin(repelAngle + curl) * repelForce;
          }
        }

        // Draw glowing particle
        const homeDistance = Math.hypot(p.x - p.targetX, p.y - p.targetY);
        const particleAlpha = Math.min(1, p.alpha * (homeDistance > 3 ? 1.0 : 0.82));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = particleAlpha;
        ctx.shadowBlur = homeDistance > 4 ? p.radius * 3.5 : p.radius * 1.5;
        ctx.shadowColor = p.glowColor;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerLeave);
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [onFormed, isFormed, setIsFormed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-20 cursor-pointer"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
};
