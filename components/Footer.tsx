import { Github, Linkedin, MessageCircle, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#090909] px-6 py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <span className="relative block h-16 w-56 overflow-hidden rounded-md">
            <Image
              src="/DevHive_logo.png"
              alt="DevHive logo"
              fill
              sizes="224px"
              className="object-contain object-center opacity-90"
            />
          </span>
          <p className="max-w-xs text-sm text-white/60">A student tech club where ideas ship fast.</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.2em] text-white/40">Social</h4>
          <div className="flex flex-col gap-3 text-white/80">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-lg font-semibold transition hover:text-accent"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/cgcuniversity_devhiveclub/"
              className="inline-flex items-center gap-3 text-lg font-semibold transition hover:text-accent"
            >
              <MessageCircle size={24} />
              <span>Instagram</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-lg font-semibold transition hover:text-accent"
            >
              <Twitter size={24} />
              <span>Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/company/devhive-club/posts/?feedView=all&viewAsMember=true"
              className="inline-flex items-center gap-3 text-lg font-semibold transition hover:text-accent"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 DevHive.</p>
        <p>Made by the DevHive team.</p>
      </div>
    </footer>
  );
}
