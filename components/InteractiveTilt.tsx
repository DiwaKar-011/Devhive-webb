"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

type MotionProfile = "subtle" | "medium" | "cinematic";

type InteractiveTiltProps = {
  children: ReactNode;
  className?: string;
  profile?: MotionProfile;
};

const tiltProfileConfig: Record<MotionProfile, { maxTilt: number; stiffness: number; damping: number }> = {
  subtle: { maxTilt: 4, stiffness: 150, damping: 19 },
  medium: { maxTilt: 7, stiffness: 170, damping: 16 },
  cinematic: { maxTilt: 10, stiffness: 190, damping: 14 },
};

export default function InteractiveTilt({ children, className, profile = "medium" }: InteractiveTiltProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = tiltProfileConfig[profile];
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: config.stiffness, damping: config.damping, mass: 0.35 });
  const springY = useSpring(rotateY, { stiffness: config.stiffness, damping: config.damping, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * config.maxTilt * 2);
    rotateX.set((0.5 - py) * config.maxTilt * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </motion.div>
  );
}
