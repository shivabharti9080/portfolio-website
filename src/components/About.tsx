"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Compass, Target, Lightbulb, Rocket, BrainCircuit } from "lucide-react";

interface AboutProps {
  profile: {
    fullName: string;
    bio: string;
    aboutApproach: string;
    whatIBuild: string;
    whatIAmLearning: string;
    whatIWantToBuildNext: string;
  };
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section
      id="about"
      aria-label="About Me and Engineering Philosophy"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>01 / ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Practical Thinking. Scalable Craft.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
          I am driven by the journey of converting concepts into clean, resilient code—from the backend schema layer all the way to intuitive user interfaces.
        </p>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Narrative & Approach */}
        <div className="lg:col-span-7 space-y-6">
          <div className="premium-card p-8 rounded-3xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2.5">
              <Lightbulb className="w-5 h-5 text-[#1E3A5F]" />
              <span>Engineering Journey & Mindset</span>
            </h3>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-4">
              My path in technology started with a genuine fascination for how digital systems run behind the screen. As a full-stack developer, I combine modern web frameworks like <strong className="text-[#242424] font-semibold">Next.js</strong> and <strong className="text-[#242424] font-semibold">React</strong> with structured backend architectures built on <strong className="text-[#242424] font-semibold">Node.js, PostgreSQL</strong>, and <strong className="text-[#242424] font-semibold">Prisma</strong>.
            </p>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-4">
              I believe in honesty and real execution: no fabricated accolades or overinflated claims. Instead, I focus on steady, day-to-day skill expansion—building cross-platform mobile prototypes with <strong className="text-[#242424] font-semibold">Flutter & Dart</strong>, automating tedious repetitive tasks with <strong className="text-[#242424] font-semibold">Python scripts & webhooks</strong>, and pursuing foundational mastery in <strong className="text-[#242424] font-semibold">Machine Learning & AI APIs</strong>.
            </p>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F]">
                #ProblemSolver
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F]">
                #FullStackEngineering
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F]">
                #AspiringAIEngineer
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F]">
                #ContinuousLearner
              </span>
            </div>
          </div>

          {/* Career Objectives & Vision */}
          <div className="premium-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2.5">
              <Target className="w-5 h-5 text-[#10B981]" />
              <span>Career Ambitions & Core Focus</span>
            </h3>

            <ul className="space-y-3.5 text-sm text-[#64748B]">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1E3A5F] mt-2 flex-shrink-0" />
                <span><strong className="text-[#242424] font-semibold">Aspiring AI Engineer:</strong> Developing deep expertise in machine learning math, model integration, and intelligent agent workflows.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1E3A5F] mt-2 flex-shrink-0" />
                <span><strong className="text-[#242424] font-semibold">Production-Quality Full-Stack Applications:</strong> Architecting responsive web systems with high accessibility, clean code, and type-safe databases.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1E3A5F] mt-2 flex-shrink-0" />
                <span><strong className="text-[#242424] font-semibold">Practical Automation:</strong> Building scheduled background jobs, webhook integrations, and data processing utilities to remove friction.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1E3A5F] mt-2 flex-shrink-0" />
                <span><strong className="text-[#242424] font-semibold">Startup Collaboration:</strong> Partnering with developers, founders, and teams to build meaningful digital products from scratch.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Three Configurable Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: What I Build */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] border border-[#CBD5E1]/60 flex items-center justify-center text-[#1E3A5F] mb-4">
              <Code className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#242424] mb-2">What I Build</h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {profile.whatIBuild}
            </p>
          </motion.div>

          {/* Card 2: What I Am Learning */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] border border-[#CBD5E1]/60 flex items-center justify-center text-[#1E3A5F] mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#242424] mb-2">What I Am Learning</h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {profile.whatIAmLearning}
            </p>
          </motion.div>

          {/* Card 3: What I Want to Build Next */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] mb-4">
              <Rocket className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#242424] mb-2">What I Want to Build Next</h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {profile.whatIWantToBuildNext}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
