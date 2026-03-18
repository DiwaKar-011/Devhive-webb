"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Tile = {
  title: string;
  year: "2024" | "2023";
  tint: string;
  featured?: boolean;
};

const tiles: Tile[] = [
  { title: "Hackathon 24", year: "2024", tint: "from-slate-300/25 to-slate-200/0", featured: true },
  { title: "Workshop", year: "2024", tint: "from-cyan-400/20 to-cyan-200/0" },
  { title: "Demo Day", year: "2024", tint: "from-orange-400/20 to-orange-200/0" },
  { title: "Networking", year: "2023", tint: "from-purple-400/20 to-purple-200/0" },
  { title: "Build Nights", year: "2023", tint: "from-sky-400/20 to-sky-200/0" },
  { title: "Awards", year: "2024", tint: "from-pink-400/20 to-pink-200/0" },
  { title: "Guest Talks", year: "2023", tint: "from-emerald-400/20 to-emerald-200/0" },
];

const filters = ["All", "2024", "2023"] as const;

export default function GallerySection() {
  const [year, setYear] = useState<(typeof filters)[number]>("All");

  const visibleTiles = useMemo(
    () => (year === "All" ? tiles : tiles.filter((tile) => tile.year === year)),
    [year],
  );

  return (
    <section id="gallery" className="px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 space-y-4">
          <p className="text-sm text-accent">● Memories</p>
          <h2 className="font-syne text-5xl font-extrabold leading-tight">
            Photo <span className="italic text-accent">Gallery</span>
          </h2>
        </div>

        <div className="mb-6 flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setYear(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                year === filter
                  ? "border-accent bg-accent text-black"
                  : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid auto-rows-[160px] grid-cols-1 gap-4 md:grid-cols-3">
          {visibleTiles.map((tile, index) => (
            <motion.article
              key={`${tile.title}-${tile.year}`}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#151515] p-5 ${
                tile.featured ? "md:col-span-2 md:row-span-2 md:min-h-[300px]" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tile.tint}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="inline-flex w-fit rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/75">
                  {tile.year}
                </span>
                <span className="w-fit rounded-full border border-white/10 bg-black/50 px-3 py-1 text-sm text-white/80 transition group-hover:text-white">
                  {tile.title}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          className="mt-8 rounded-2xl border border-dashed border-white/25 px-5 py-3 text-white/70 transition hover:text-accent"
        >
          Submit Photos
        </button>
      </div>
    </section>
  );
}
