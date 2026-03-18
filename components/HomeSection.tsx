"use client";

import { motion } from "framer-motion";

const clubQuotes = [
  "We do not wait for permission to build.",
  "Good ideas become real when teams commit.",
  "Learn in public, ship in public.",
  "From first commit to first users, we move together.",
  "Curiosity is our default setting.",
  "A beginner with momentum beats an expert without action.",
  "The club is a launchpad, not a classroom.",
  "Build nights turn strangers into teammates.",
  "Fast feedback creates fearless builders.",
  "Small weekly wins create big yearly outcomes.",
  "Your first project is your first superpower.",
  "Community is our compounding advantage.",
];

const titleCards = [
  {
    title: "Innovation First",
    text: "We believe in constantly exploring new ideas, technologies, and solutions. DevHive encourages members to think beyond limits and build things that make an impact.",
  },
  {
    title: "Learning by Building",
    text: "Theory is important, but building real projects is where true learning happens. We focus on hands-on experiences through hackathons, coding challenges, and project-based learning. ",
  },
  {
    title: "Collaboration Over Competition",
    text: "Great technology is rarely built alone. DevHive promotes teamwork, knowledge sharing, and collaborative innovation.",
  },
  {
    title: "Curiosity & Exploration",
    text: "Members are encouraged to experiment with emerging technologies like AI, Web3, Cloud Computing, Cybersecurity, and more.",
  },
  {
    title: "Growth Mindset",
    text: "Failure is part of the process. DevHive provides a safe environment where students can experiment, learn, and grow as developers and innovators.",
  },
];

export default function HomeSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-28 fx-fade-in-blur">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,190,202,0.18),transparent_70%)] fx-float-blur" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.h1
          className="mt-2 text-center font-grotesk text-[clamp(52px,9vw,104px)] font-extrabold leading-[0.92] tracking-[-3px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          DevHive Club
          <br />
          <span className="inline-block text-accent">Create • Build • Innovate</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-center text-white/65"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          Scroll this home view to explore club values, community quotes, and what makes DevHive a high-energy place to learn and ship.
        </motion.p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {titleCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="hover-zoom card-shimmer rounded-3xl border border-white/10 bg-[#181818] p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <h3 className="font-syne text-2xl font-bold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{card.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {clubQuotes.map((quote, index) => (
            <motion.blockquote
              key={quote}
              className="hover-zoom rounded-2xl border border-white/10 bg-[#131313] p-4 text-sm text-white/75"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
            >
              &ldquo;{quote}&rdquo;
            </motion.blockquote>
          ))}
        </div>
        <motion.article
          className="hover-zoom mt-8 rounded-3xl border border-white/10 bg-[#181818] p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
          </div>
          <p className="mb-5 font-syne text-3xl font-bold leading-tight">
            🌍 DevHive Community Vision <span className="text-accent"></span>
          </p>
          <h3>DevHive aims to build a collaborative ecosystem where creators, developers, and innovators come together to transform ideas into impactful solutions.
            We are not just a club — we are a community of builders shaping the future of technology.</h3>
        </motion.article>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
