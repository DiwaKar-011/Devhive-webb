"use client";

import { motion } from "framer-motion";


const values = [
  { title: "Learn Fast", body: "Accelerate your learning through practical, hands-on sessions." },
  { title: "Ship Often", body: "Build and deploy real-world projects consistently." },
  { title: "Grow Together", body: "Collaborate, connect, and evolve within a supportive environment." },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm text-accent">● About</p>
        <h2 className="mt-3 font-syne text-5xl font-extrabold">
          Why DevHive?
        </h2>
        <h3 className="mt-2 text-xl font-medium text-white/80">
          More than a club — a launchpad for builders, innovators, and future tech leaders.
        </h3>

        <div className="mt-8 space-y-5">
          <p className="max-w-2xl text-white/65">
            <span className="font-bold text-white">Real-World Experience</span><br />
            Work on real projects, participate in hackathons, and gain practical skills beyond the classroom.
          </p>
          <p className="max-w-2xl text-white/65">
            <span className="font-bold text-white">Hands-on Learning</span><br />
            Explore technologies like AI, Web Development, Cloud, and Cybersecurity through guided workshops and mentorship.
          </p>
          <p className="max-w-2xl text-white/65">
            <span className="font-bold text-white">Collaborative Community</span><br />
            Engage with like-minded developers, share ideas, and grow within a strong technical community.
          </p>
          <p className="max-w-2xl text-white/65">
            <span className="font-bold text-white">Portfolio Development</span><br />
            Build impactful projects that strengthen your profile for internships and career opportunities.
          </p>
          <p className="max-w-2xl text-white/65">
            <span className="font-bold text-white">Leadership & Growth</span><br />
            Take initiative, lead teams, organize events, and develop essential leadership skills.
          </p>
        </div>

        <div className="mt-12">
          <h4 className="font-syne text-3xl font-bold mb-2">What Makes DevHive Different?</h4>
          <p className="max-w-3xl text-white/70">
            DevHive focuses on practical learning, collaboration, and continuous growth.<br /><br />
            We emphasize building real solutions, fostering innovation, and creating an environment where every member can develop both technical and professional skills.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              className="hover-zoom rounded-2xl border border-white/10 bg-[#181818] p-6"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <h3 className="font-syne text-2xl font-bold">{value.title}</h3>
              <p className="mt-2 text-sm text-white/65">{value.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
