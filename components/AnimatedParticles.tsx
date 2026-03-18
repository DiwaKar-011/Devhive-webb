"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type MotionProfile = "subtle" | "medium" | "cinematic";

type AnimatedParticlesProps = {
  profile?: MotionProfile;
};

const particleProfileConfig: Record<MotionProfile, { count: number; linkDistance: number; velocity: number; opacity: number }> = {
  subtle: { count: 34, linkDistance: 96, velocity: 0.22, opacity: 0.6 },
  medium: { count: 52, linkDistance: 112, velocity: 0.31, opacity: 0.72 },
  cinematic: { count: 76, linkDistance: 132, velocity: 0.42, opacity: 0.86 },
};

export default function AnimatedParticles({ profile = "medium" }: AnimatedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let isPageVisible = true;

    const config = particleProfileConfig[profile];

    const particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.velocity,
      vy: (Math.random() - 0.5) * config.velocity,
      r: Math.random() * 1.8 + 0.8,
    });

    const init = () => {
      particles.length = 0;
      const densityScale = Math.min(1, Math.max(0.45, (width * height) / (1920 * 1080)));
      const targetCount = Math.max(20, Math.floor(config.count * densityScale));

      for (let i = 0; i < targetCount; i += 1) {
        particles.push(createParticle());
      }
    };

    const tick = () => {
      if (!isPageVisible) {
        animationFrameId = window.requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182, 190, 202, ${config.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.linkDistance) {
            const alpha = (1 - distance / config.linkDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(182, 190, 202, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [profile]);

  return <canvas ref={canvasRef} aria-hidden className="particles-canvas" />;
}
