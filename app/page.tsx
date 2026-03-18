"use client";

import AboutSection from "@/components/AboutSection";
import AnimatedParticles from "@/components/AnimatedParticles";
import ContactSection from "@/components/ContactSection";
import EntranceReveal from "@/components/EntranceReveal";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HomeSection from "@/components/HomeSection";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import TeamSection from "@/components/TeamSection";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Section = "home" | "about" | "events" | "projects" | "gallery" | "team" | "contact";
type MotionProfile = "subtle" | "medium" | "cinematic";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isMobile, setIsMobile] = useState(false);
  const motionProfile: MotionProfile = isMobile ? "medium" : "cinematic";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.motionProfile = motionProfile;

    return () => {
      delete document.body.dataset.motionProfile;
    };
  }, [motionProfile]);

  const sectionMap = useMemo(
    () => ({
      home: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <HomeSection />
        </EntranceReveal>
      ),
      about: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <AboutSection />
        </EntranceReveal>
      ),
      events: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <EventsSection />
        </EntranceReveal>
      ),
      projects: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <ProjectsSection motionProfile={motionProfile} />
        </EntranceReveal>
      ),
      gallery: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <GallerySection />
        </EntranceReveal>
      ),
      team: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <TeamSection onApplyNow={() => setActiveSection("contact")} />
        </EntranceReveal>
      ),
      contact: (
        <EntranceReveal profile={motionProfile} delay={0.08}>
          <ContactSection />
        </EntranceReveal>
      ),
    }),
    [motionProfile, setActiveSection],
  );

  return (
    <>
      <Loader />
      <AnimatedParticles profile={motionProfile} />
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="relative overflow-hidden">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.34, ease: [0.22, 0.9, 0.27, 1] }}
          >
            <div className="min-h-[70vh]">{sectionMap[activeSection]}</div>
          </motion.div>
        </AnimatePresence>
        <EntranceReveal profile={motionProfile} delay={0.14}>
          <Footer />
        </EntranceReveal>
      </main>
    </>
  );
}
