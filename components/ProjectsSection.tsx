"use client";

import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import InteractiveTilt from "./InteractiveTilt";

type Project = {
  id: string;
  name: string;
  branch: string;
  year: string;
  projectName: string;
  projectLink: string;
  githubLink: string;
  submittedAt: string;
};

type FormData = {
  name: string;
  branch: string;
  year: string;
  projectName: string;
  projectLink: string;
  githubLink: string;
};

type MotionProfile = "subtle" | "medium" | "cinematic";

type ProjectsSectionProps = {
  motionProfile?: MotionProfile;
};

const initialFormData: FormData = {
  name: "",
  branch: "",
  year: "",
  projectName: "",
  projectLink: "",
  githubLink: "",
};

export default function ProjectsSection({ motionProfile = "medium" }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [memberKey, setMemberKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const hasMemberKey = Boolean(memberKey.trim());

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        const result = await response.json();

        if (response.ok && Array.isArray(result.projects)) {
          setProjects(result.projects);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasMemberKey) {
      setIsSuccess(false);
      setStatusMessage("Member access key is required to upload projects.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-project-member-key": memberKey.trim(),
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Could not upload project.");
      }

      setProjects((prev) => [result.project as Project, ...prev]);
      setFormData(initialFormData);
      setIsSuccess(true);
      setStatusMessage("Project uploaded successfully. It is now visible to everyone.");
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!hasMemberKey) {
      setIsSuccess(false);
      setStatusMessage("Member access key is required to delete projects.");
      return;
    }

    setDeletingProjectId(projectId);
    setStatusMessage("");

    try {
      const response = await fetch(`/api/projects?id=${encodeURIComponent(projectId)}`, {
        method: "DELETE",
        headers: {
          "x-project-member-key": memberKey.trim(),
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Could not delete project.");
      }

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setIsSuccess(true);
      setStatusMessage("Project deleted successfully.");
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setDeletingProjectId(null);
    }
  };

  return (
    <section id="projects" className="px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm text-accent">● Projects</p>
        <h2 className="mt-3 font-syne text-5xl font-extrabold">
          What We <span className="italic text-accent">Ship</span>
        </h2>

        <motion.form
          className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-[#181818] p-6 md:grid-cols-2"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="md:col-span-2 font-syne text-2xl font-bold">Upload Your Project</h3>
          <input
            className="md:col-span-2 rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Member Access Key"
            type="password"
            value={memberKey}
            onChange={(event) => setMemberKey(event.target.value)}
            required
          />
          <p className="md:col-span-2 text-sm text-white/60">
            Only selected members can upload or delete projects.
          </p>
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Your Name"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Branch"
            value={formData.branch}
            onChange={(event) => setFormData((prev) => ({ ...prev, branch: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Year"
            value={formData.year}
            onChange={(event) => setFormData((prev) => ({ ...prev, year: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={(event) => setFormData((prev) => ({ ...prev, projectName: event.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2 md:col-span-2"
            placeholder="Project Link (optional if GitHub provided)"
            type="url"
            value={formData.projectLink}
            onChange={(event) => setFormData((prev) => ({ ...prev, projectLink: event.target.value }))}
          />
          <input
            className="rounded-xl border border-white/15 bg-[#111] px-4 py-3 outline-none ring-accent focus:ring-2 md:col-span-2"
            placeholder="GitHub Link (optional if Project Link provided)"
            type="url"
            value={formData.githubLink}
            onChange={(event) => setFormData((prev) => ({ ...prev, githubLink: event.target.value }))}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 w-fit rounded-full bg-accent px-5 py-2.5 font-semibold text-black transition hover:bg-[#c7ced9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload Project"}
          </button>
          {statusMessage ? (
            <p className={`md:col-span-2 text-sm ${isSuccess ? "text-emerald-400" : "text-rose-400"}`}>{statusMessage}</p>
          ) : null}
        </motion.form>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? <p className="text-white/65">Loading projects...</p> : null}
          {projects.map((project, index) => (
            <InteractiveTilt key={project.id} className="tilt-card" profile={motionProfile}>
              <motion.article
                className="hover-zoom rounded-3xl border border-white/10 bg-[#181818] p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <h3 className="font-syne text-2xl font-bold">{project.projectName}</h3>
                <p className="mt-2 text-white/70">by {project.name}</p>
                <p className="text-sm text-white/55">{project.branch} • {project.year}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  {project.projectLink || project.githubLink ? (
                    <a
                      href={project.projectLink || project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3 py-1.5 text-white/75 transition hover:text-accent"
                    >
                      View Link
                    </a>
                  ) : null}
                  {project.projectLink ? (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3 py-1.5 text-white/75 transition hover:text-accent"
                    >
                      Live Project
                    </a>
                  ) : null}
                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3 py-1.5 text-white/75 transition hover:text-accent"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {hasMemberKey ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deletingProjectId === project.id}
                      className="rounded-full border border-rose-300/40 px-3 py-1.5 text-rose-300 transition hover:bg-rose-300/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingProjectId === project.id ? "Deleting..." : "Delete"}
                    </button>
                  ) : null}
                </div>
                {project.projectLink ? (
                  <p className="mt-3 break-all text-xs text-white/50">Project: {project.projectLink}</p>
                ) : null}
                {project.githubLink ? (
                  <p className="mt-1 break-all text-xs text-white/50">GitHub: {project.githubLink}</p>
                ) : null}
              </motion.article>
            </InteractiveTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
