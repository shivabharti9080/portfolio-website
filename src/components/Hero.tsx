"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  ChevronDown,
  Code2,
  Workflow,
  Cpu,
  Sparkles,
  CheckCircle2,
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
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F8FAFC] to-white"
    >
      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span>{profile.availabilityStatus || "Open to collaborations & projects"}</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#242424] leading-[1.14]"
          >
            Engineering Ideas Into{" "}
            <span className="text-[#1E3A5F] underline decoration-[#1E3A5F]/20 decoration-wavy decoration-2 underline-offset-8">
              Digital Reality.
            </span>
          </motion.h1>

          {/* Dynamic Role Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-medium text-[#64748B]"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-[#94A3B8] font-mono">Specializing in:</span>
            <div className="h-8 overflow-hidden relative inline-block min-w-[270px]">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="absolute text-[#1E3A5F] font-bold"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </div>
          </motion.div>

          {/* Supporting Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed"
          >
            I&apos;m <strong className="text-[#242424] font-semibold">{profile.fullName}</strong>, a developer focused on full-stack applications, web development, mobile apps, automation, and artificial intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#1E3A5F] hover:bg-[#162C48] shadow-sm hover:shadow transition-all"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/api/resume"
              download
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-[#1E3A5F] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
            >
              <Download className="w-4 h-4 text-[#1E3A5F]" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Quick shortcuts */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-medium text-[#64748B]">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#1E3A5F]" />
              <span>github/{profile.fullName.toLowerCase().replace(/\s+/g, "")}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#1E3A5F]" />
              <span>{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile Card & Clean Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          {/* Profile Card */}
          <div className="relative w-full max-w-sm rounded-3xl p-5 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow group">
            {/* Avatar Image Frame */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0] mb-4">
              {!imageError ? (
                <Image
                  src={profile.avatarUrl || "/images/profile.jpg"}
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8FAFC] text-[#242424]">
                  <div className="w-20 h-20 rounded-full bg-[#EEF4FA] border border-[#CBD5E1] flex items-center justify-center text-2xl font-bold text-[#1E3A5F] mb-2">
                    SB
                  </div>
                  <span className="text-sm font-semibold">{profile.fullName}</span>
                </div>
              )}

              {/* Status pill inside image */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-white/95 border border-[#E2E8F0] shadow-sm flex items-center justify-between text-xs">
                <span className="text-[#242424] font-semibold">Shiva Bharti</span>
                <span className="text-[#1E3A5F] font-bold">Ready to Build</span>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="space-y-1.5 px-1">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-medium">Location:</span>
                <span className="text-[#242424] font-semibold">India</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-medium">Core Stack:</span>
                <span className="text-[#1E3A5F] font-semibold">Next.js • TS • Flutter • AI</span>
              </div>
            </div>
          </div>

          {/* Floating Technology Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute -top-4 -left-6 items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm text-xs font-semibold text-[#242424]"
          >
            <Code2 className="w-4 h-4 text-[#1E3A5F]" />
            <span>Full-Stack Next.js</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm text-xs font-semibold text-[#242424]"
          >
            <Workflow className="w-4 h-4 text-[#10B981]" />
            <span>Python Automation</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden sm:flex absolute top-1/2 -right-8 items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm text-xs font-semibold text-[#242424]"
          >
            <Cpu className="w-4 h-4 text-[#1E3A5F]" />
            <span>Aspiring AI Eng</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <a href="#about" aria-label="Scroll to About section" className="p-1">
          <ChevronDown className="w-5 h-5 animate-bounce text-[#64748B]" />
        </a>
      </div>
    </section>
  );
};
