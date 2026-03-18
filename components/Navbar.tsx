"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const sections = [
  "home",
  "about",
  "events",
  "projects",
  "team",
] as const;

type Section = (typeof sections)[number] | "contact" | "gallery";

type NavbarProps = {
  activeSection: Section;
  onNavigate: (section: Section) => void;
};

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed left-1/2 top-4 z-50 w-[min(96vw,1040px)] -translate-x-1/2 rounded-full bg-[#101010]/75 px-4 py-3 backdrop-blur-xl transition-colors ${
        scrolled ? "border border-white/10" : "border border-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2"
          aria-label="DevHive home"
        >
          <span className="relative block h-10 w-12 overflow-hidden rounded-md">
            <Image
              src="/DevHive_mark.png"
              alt="DevHive logo"
              fill
              sizes="48px"
              className="object-contain object-center opacity-95"
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] text-white/90">DEVHIVE</span>
        </button>

        <nav className="flex max-w-[60vw] items-center gap-1 overflow-x-auto rounded-full bg-[#181818] p-1">
          {sections.map((id) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`rounded-full px-3 py-2 text-xs capitalize transition-colors ${
                  isActive
                    ? "bg-[#f0f0f0] text-black"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {id}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.04] hover:bg-[#c7ced9]"
        >
          Join the Hive
        </button>
      </div>
    </motion.header>
  );
}
