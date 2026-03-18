"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionProfile = "subtle" | "medium" | "cinematic";

type EntranceRevealProps = {
  children: ReactNode;
  delay?: number;
  profile?: MotionProfile;
};

const revealProfileConfig: Record<MotionProfile, { y: number; blur: number; duration: number; scale: number }> = {
  subtle: { y: 14, blur: 6, duration: 0.42, scale: 0.995 },
  medium: { y: 22, blur: 9, duration: 0.55, scale: 0.99 },
  cinematic: { y: 30, blur: 12, duration: 0.7, scale: 0.982 },
};

export default function EntranceReveal({ children, delay = 0, profile = "medium" }: EntranceRevealProps) {
  const config = revealProfileConfig[profile];

  return (
    <motion.div
      initial={{ opacity: 0, y: config.y, filter: `blur(${config.blur}px)`, scale: config.scale }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: config.duration, delay, ease: [0.22, 0.9, 0.27, 1] }}
    >
      {children}
    </motion.div>
  );
}
