"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  ChevronDown,
  Terminal,
  Code2,
  Workflow,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface HeroProps {
  profile: {
    fullName: string;
    headline: string;
    avatarUrl?: string;
    email: string;
    phone: string;
    githubUrl: string;
    availableForWork: boolean;
    availabilityStatus: string;
  };
}

const ROLES = [
  "Full-Stack Developer",
  "Web Developer",
  "App Developer",
  "Automation Developer",
  "Aspiring AI Engineer",
];

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction and Overview"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ambient-glow-yellow rounded-full pointer-events-none blur-3xl opacity-60" />
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] ambient-glow-cream rounded-full pointer-events-none blur-3xl opacity-40" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border-white/10 text-xs font-mono text-zinc-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34C759]"></span>
            </span>
            <span>{profile.availabilityStatus || "Open to collaborations & projects"}</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            Engineering Ideas Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D6] via-[#F4B400] to-[#E5A800]">
              Digital Reality.
            </span>
          </motion.h1>

          {/* Dynamic Role Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 text-lg sm:text-xl font-medium text-zinc-300"
          >
            <span className="text-zinc-500 font-mono text-sm">role:</span>
            <div className="h-8 overflow-hidden relative inline-block min-w-[260px]">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="absolute text-[#F4B400] font-semibold"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </div>
          </motion.div>

          {/* Supporting Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed"
          >
            I&apos;m <strong className="text-white font-semibold">{profile.fullName}</strong>, a developer focused on full-stack applications, web development, mobile apps, automation, and artificial intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#080808] bg-[#F4B400] hover:bg-[#FFF4D6] shadow-[0_0_25px_rgba(244,180,0,0.35)] transition-all"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/api/resume"
              download
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-white glass-panel hover:border-[#F4B400]/40 hover:bg-white/[0.08] transition-all"
            >
              <Download className="w-4 h-4 text-[#F4B400]" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Quick shortcuts */}
          <div className="flex items-center gap-6 pt-2 text-xs font-mono text-zinc-400">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F4B400] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github/{profile.fullName.toLowerCase().replace(" ", "")}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 hover:text-[#F4B400] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Glass Profile Card & Floating Tech Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          {/* Decorative subtle border frame */}
          <div className="relative w-full max-w-sm rounded-3xl p-6 glass-panel border-white/15 shadow-2xl overflow-hidden group">
            {/* Ambient card highlight */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#F4B400]/15 rounded-full blur-2xl group-hover:bg-[#F4B400]/25 transition-all duration-500" />

            {/* Profile Avatar Image with Initials Fallback */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/10 mb-5">
              {!imageError ? (
                <Image
                  src={profile.avatarUrl || "/images/profile.jpg"}
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white">
                  <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-bold text-[#F4B400] mb-2">
                    SB
                  </div>
                  <span className="text-sm font-semibold">{profile.fullName}</span>
                </div>
              )}

              {/* Status pill inside image */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">Shiva Bharti</span>
                <span className="text-[#F4B400] font-semibold">Ready to Build</span>
              </div>
            </div>

            {/* Micro Details under Avatar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Location:</span>
                <span className="text-white font-medium">India</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Core Stack:</span>
                <span className="text-white font-medium">Next.js • TS • Flutter • AI</span>
              </div>
            </div>
          </div>

          {/* Floating Technology Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute -top-4 -left-6 items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border-white/15 shadow-xl text-xs font-mono text-zinc-200"
          >
            <Code2 className="w-4 h-4 text-[#F4B400]" />
            <span>Full-Stack Next.js</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border-white/15 shadow-xl text-xs font-mono text-zinc-200"
          >
            <Workflow className="w-4 h-4 text-[#34C759]" />
            <span>Python Automation</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden sm:flex absolute top-1/2 -right-8 items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border-white/15 shadow-xl text-xs font-mono text-zinc-200"
          >
            <Cpu className="w-4 h-4 text-[#FFF4D6]" />
            <span>Aspiring AI Eng</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <a href="#about" aria-label="Scroll to About section" className="p-1">
          <ChevronDown className="w-5 h-5 animate-bounce text-zinc-400" />
        </a>
      </div>
    </section>
  );
};
