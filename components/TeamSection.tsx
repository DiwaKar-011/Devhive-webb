"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

type TeamSectionProps = {
  onApplyNow: () => void;
};

type Member = {
  name: string;
  role: string;
  initials: string;
  color: string;
};

const members: Member[] = [
  {
    name: "Nishtha Jain",
    role: "President",
    initials: "NJ",
    color: "bg-slate-400/30 text-slate-200",
  },
  {
    name: "Himanshu Siwach",
    role: "Vice President",
    initials: "HS",
    color: "bg-teal-400/30 text-teal-200"
  },
  {
    name: "Khushboo Bansal",
    role: "Secretary",
    initials: "KB",
    color: "bg-violet-400/30 text-violet-200",
  },
  {
    name: "Parag Shrivastava",
    role: "Tech Head",
    initials: "PM",
    color: "bg-sky-400/30 text-sky-200",
  },
  {
    name: "Dhairya Ahuja",
    role: "PR Head",
    initials: "DA",
    color: "bg-orange-400/30 text-orange-200",
  },
  {
    name: "Alis Thakur",
    role: "Event Head",
    initials: "AT",
    color: "bg-pink-400/30 text-pink-200",
  },
  {
    name: "Abhitesh",
    role: "Event Head",
    initials: "A",
    color: "bg-pink-400/30 text-pink-200",
  },
];

export default function TeamSection({ onApplyNow }: TeamSectionProps) {
  return (
    <section id="team" className="px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 space-y-4">
          <p className="text-sm text-accent">● The Builders</p>
          <h2 className="font-syne text-5xl font-extrabold">
            Meet the <span className="italic text-accent">Team</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              className="group rounded-3xl border border-white/10 bg-[#181818] p-6 transition hover:border-[rgba(182,190,202,0.32)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -8 }}
            >
              <div className={`mb-4 grid h-16 w-16 place-items-center rounded-full font-syne text-xl font-bold ${member.color}`}>
                {member.initials}
              </div>
              <h3 className="font-syne text-2xl font-bold">{member.name}</h3>
              <p className="text-sm text-white/60">{member.role}</p>
              <div className="mt-5 flex gap-3 text-white/65">
                <a href="#" className="transition hover:text-accent" aria-label={`${member.name} GitHub`}>
                  <Github size={16} />
                </a>
                <a href="#" className="transition hover:text-accent" aria-label={`${member.name} LinkedIn`}>
                  <Linkedin size={16} />
                </a>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#181818] p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,190,202,0.22),transparent_70%)]" />
            <h3 className="relative z-10 font-syne text-3xl font-bold">Want to join the team?</h3>
            <p className="relative z-10 mt-3 text-white/65">Contribute to events, projects, design, or community.</p>
            <button
              type="button"
              onClick={onApplyNow}
              className="relative z-10 mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.04] hover:bg-[#c7ced9]"
            >
              Apply Now
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
