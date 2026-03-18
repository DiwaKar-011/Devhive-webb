"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const durationMs = 1800;
    const holdAtFullMs = 220;
    let rafId = 0;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    const startedAt = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const linearProgress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(linearProgress);
      const nextValue = Math.round(eased * 100);

      setProgress(nextValue);

      if (linearProgress < 1) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      hideTimer = setTimeout(() => setIsVisible(false), holdAtFullMs);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-99999 grid place-items-center bg-[#090909]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 0.9, 0.27, 1] }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative z-10 flex flex-col items-center gap-3 text-center">
            <span className="relative block h-24 w-72 overflow-hidden rounded-md">
              <Image
                src="/DevHive_logo.png"
                alt="DevHive logo"
                fill
                sizes="288px"
                className="object-contain object-center opacity-95"
                priority
              />
            </span>
            <p className="text-sm text-white/60">Code. Build. Connect.</p>
            <div className="h-0.5 w-48 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.08 }}
              />
            </div>
            <p className="font-jetbrains text-xs text-white/55">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
