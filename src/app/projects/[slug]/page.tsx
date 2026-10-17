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
    <main className="min-h-screen bg-white text-[#64748B] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#1E3A5F] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Card */}
        <div className="premium-card p-8 sm:p-10 rounded-3xl mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#CBD5E1] bg-[#EEF4FA] text-[#1E3A5F]">
              Status: {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[#242424]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-[#E2E8F0]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-[#E2E8F0] hover:border-[#1E3A5F] text-[#1E3A5F] transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4 text-[#1E3A5F]" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1E3A5F] text-white hover:bg-[#162C48] transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            ) : (
              <span className="text-xs font-semibold text-[#94A3B8] py-2">
                • Concept implementation phase (Demo planned)
              </span>
            )}
          </div>
        </div>

        {/* Problem & Proposed Solution Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="premium-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-lg font-bold text-[#242424] mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#EF4444]" />
              <span>Problem Statement</span>
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {project.problemStatement || "Problem analysis documented during architecture design."}
            </p>
          </div>

          <div className="premium-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-lg font-bold text-[#242424] mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#1E3A5F]" />
              <span>Proposed Solution</span>
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {project.proposedSolution || "Engineered scalable solution utilizing modern full-stack patterns."}
            </p>
          </div>
        </div>

        {/* System Architecture & Technology Stack */}
        <div className="premium-card p-8 sm:p-10 rounded-3xl mb-10">
          <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#1E3A5F]" />
            <span>System Architecture & Technologies</span>
          </h2>

          <p className="text-sm text-[#64748B] leading-relaxed mb-6">
            {project.systemArchitecture || "Multi-tiered architecture built with Next.js App Router, modular API routes, and PostgreSQL persistence with Prisma ORM."}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies?.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F]"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Feature List (Built vs Planned Modules) */}
        {project.features && project.features.length > 0 && (
          <div className="premium-card p-8 sm:p-10 rounded-3xl mb-10">
            <h2 className="text-xl font-bold text-[#242424] mb-6 flex items-center gap-2.5">
              <Milestone className="w-5 h-5 text-[#1E3A5F]" />
              <span>Module Breakdown & Verification Status</span>
            </h2>

            <div className="space-y-3.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3.5"
                >
                  {feat.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#242424]">{feat.title}</h3>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          feat.isCompleted
                            ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                            : "bg-[#F1F5F9] text-[#64748B]"
                        }`}
                      >
                        {feat.isCompleted ? "Built" : "Planned Roadmap"}
                      </span>
                    </div>
                    {feat.description && (
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
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
          <div className="premium-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-base font-bold text-[#242424] mb-2.5 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#1E3A5F]" />
              <span>Engineering Challenges & Lessons</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {project.challengesLearned || "Iterative debugging, state management optimizations, and relational index tuning during schema changes."}
            </p>
          </div>

          <div className="premium-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-base font-bold text-[#242424] mb-2.5 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#059669]" />
              <span>Future Improvements</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {project.futureRoadmap || "Extending continuous deployment pipelines, automated integration testing suites, and AI model benchmarking."}
            </p>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-8 border-t border-[#E2E8F0]">
            <h3 className="text-lg font-bold text-[#242424] mb-6">Explore Other Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="premium-card p-5 rounded-2xl block group"
                >
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block mb-1">
                    {p.category}
                  </span>
                  <h4 className="text-base font-bold text-[#242424] group-hover:text-[#1E3A5F] transition-colors mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#64748B] line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
