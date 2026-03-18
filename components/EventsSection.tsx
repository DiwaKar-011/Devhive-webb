"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type EventType = "Hackathon" | "Workshop";

type EventItem = {
  title: string;
  description: string;
  date: string;
  seatsText: string;
  type: EventType;
  viewUrl?: string;
};

const filters = ["All", "Hackathon", "Workshop"] as const;

const events: EventItem[] = [
  {
    title: "Cypherverse",
    description: "Creative frontend sprint for interactive website builds.",
    date: "4 apr 2026",
    seatsText: "0/150 Team",
    type: "Hackathon",
    viewUrl: "https://cypherversee.netlify.app/",
  },
  {
    title: "Nirmaan",
    description: "24-hour build challenge in teams.",
    date: "Ended",
    seatsText: "Filled",
    type: "Hackathon",
  },
  {
    title: "Agnetic AI Bootcamp",
    description: "Hands-on AI product camp with guided implementation tracks.",
    date: "Ended",
    seatsText: "Filled",
    type: "Workshop",
  },
];

const typeStyles: Record<EventType, string> = {
  Hackathon: "bg-accent text-black",
  Workshop: "bg-[#939dac]/25 text-[#c5ccd6]",
};

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const visibleEvents = useMemo(() => {
    if (activeFilter === "All") {
      return events;
    }

    return events.filter((event) => event.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="events" className="px-6 pb-20 pt-28 fx-fade-in-blur">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 space-y-4">
          <p className="text-sm text-accent">● Upcoming</p>
          <h2 className="font-syne text-5xl font-extrabold leading-tight">
            Club <span className="font-extrabold text-accent">Events</span>
          </h2>
          <p className="max-w-xl text-white/65">
            Workshops, talks, and high-energy build nights for every skill level.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "border-accent bg-accent text-black"
                  : "border-white/20 bg-transparent text-white/70 hover:border-white/40 hover:text-white"
              } ${activeFilter === filter ? "fx-bounce-soft" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleEvents.map((event, index) => (
            <motion.article
              key={event.title}
              className="rounded-2xl border border-white/10 bg-[#181818] p-6 transition hover:border-[rgba(182,190,202,0.3)] hover:shadow-[0_20px_60px_rgba(182,190,202,0.12)]"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 0.9, 0.27, 1] }}
              whileHover={{ y: -8 }}
            >
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[event.type]}`}>
                {event.type}
              </span>
              <h3 className="mt-4 font-syne text-2xl font-bold">{event.title}</h3>
              <p className="mt-2 text-sm text-white/65">{event.description}</p>
              <p className="mt-4 text-sm text-white/70">
                {event.date} · {event.seatsText}
              </p>
              {event.viewUrl ? (
                <a
                  href={event.viewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.08] hover:bg-[#c7ced9] active:scale-[0.98]"
                >
                  View
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black/70 opacity-70"
                >
                  View
                </button>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
