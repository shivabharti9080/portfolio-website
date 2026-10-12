import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectsData } from "@/services/portfolioService";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Cpu,
  CheckCircle2,
  Clock,
  Target,
  Wrench,
  Milestone,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Case Study | Shiva Bharti`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Shiva Bharti Portfolio`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjectsData();
  const relatedProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#080808] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] ambient-glow-yellow rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#F4B400] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 mb-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F4B400]">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/15 bg-white/[0.04] text-zinc-200">
              Status: {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/[0.05] border border-white/15 hover:border-[#F4B400] text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#F4B400]" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F4B400] text-black hover:bg-[#FFF4D6] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            ) : (
              <span className="text-xs font-mono text-zinc-500 py-2">
                • Concept implementation phase (Demo planned)
              </span>
            )}
          </div>
        </div>

        {/* Problem & Proposed Solution Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2 text-red-400">
              <Target className="w-5 h-5 text-red-400" />
              <span>Problem Statement</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.problemStatement || "Problem analysis documented during architecture design."}
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2 text-emerald-400">
              <Cpu className="w-5 h-5 text-[#34C759]" />
              <span>Proposed Solution</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.proposedSolution || "Engineered scalable solution utilizing modern full-stack patterns."}
            </p>
          </div>
        </div>

        {/* System Architecture & Technology Stack */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#F4B400]" />
            <span>System Architecture & Technologies</span>
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            {project.systemArchitecture || "Multi-tiered architecture built with Next.js App Router, modular API routes, and PostgreSQL persistence with Prisma ORM."}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies?.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-[#FFF4D6]"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Feature List (Built vs Planned Modules) */}
        {project.features && project.features.length > 0 && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 mb-10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
              <Milestone className="w-5 h-5 text-[#F4B400]" />
              <span>Module Breakdown & Verification Status</span>
            </h2>

            <div className="space-y-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3.5"
                >
                  {feat.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#34C759] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{feat.title}</h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          feat.isCompleted
                            ? "bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/30"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {feat.isCompleted ? "Built" : "Planned Roadmap"}
                      </span>
                    </div>
                    {feat.description && (
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {feat.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Challenges & Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-base font-bold text-white mb-2.5 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#F4B400]" />
              <span>Engineering Challenges & Lessons</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.challengesLearned || "Iterative debugging, state management optimizations, and relational index tuning during schema changes."}
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-base font-bold text-white mb-2.5 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#34C759]" />
              <span>Future Improvements</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.futureRoadmap || "Extending continuous deployment pipelines, automated integration testing suites, and AI model benchmarking."}
            </p>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-8 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Explore Other Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="glass-panel p-5 rounded-2xl border-white/10 hover:border-[#F4B400]/40 transition-colors block group"
                >
                  <span className="text-[11px] font-mono text-[#F4B400] uppercase block mb-1">
                    {p.category}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FFF4D6] transition-colors mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
