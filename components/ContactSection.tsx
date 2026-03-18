"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  roleInterest: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  roleInterest: "",
  message: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Could not send your application.");
      }

      setIsSuccess(true);
      setStatusMessage("Application sent successfully. We will contact you soon.");
      setFormData(initialFormData);
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 pb-24 pt-28">
      <motion.div
        className="hover-zoom mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-[#181818] p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm text-accent">● Contact</p>
        <h2 className="mt-3 font-syne text-5xl font-extrabold">
          Join the <span className="italic text-accent">Hive</span>
        </h2>
        <p className="mt-3 text-white/65">Tell us what you want to build and we will help you find a squad.</p>

        <form className="mt-6 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Name"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <select
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2 md:col-span-2"
            value={formData.roleInterest}
            onChange={(event) => setFormData((prev) => ({ ...prev, roleInterest: event.target.value }))}
            required
          >
            <option value="" disabled>
              Role interest
            </option>
            <option value="Developer">Tech</option>
            <option value="Designer">Design</option>
            <option value="Community">PR</option>
            <option value="Events">Events</option>
            <option value="Events">Social Media</option>
          </select>
          <textarea
            className="min-h-28 rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2 md:col-span-2"
            placeholder="What do you want to build?"
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="hover-zoom md:col-span-2 w-fit rounded-full bg-accent px-5 py-2.5 font-semibold text-black transition hover:bg-[#c7ced9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Application"}
          </button>
          {statusMessage ? (
            <p className={`md:col-span-2 text-sm ${isSuccess ? "text-emerald-400" : "text-rose-400"}`}>{statusMessage}</p>
          ) : null}
        </form>
      </motion.div>
    </section>
  );
}
