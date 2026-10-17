"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectFeature {
  title: string;
  description?: string | null;
  isCompleted: boolean;
}

interface ProjectTechnology {
  name: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  status: "CONCEPT" | "IN_PROGRESS" | "COMPLETED" | "PUBLISHED";
  isFeatured: boolean;
  isPublished: boolean;
  thumbnailUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  problemStatement?: string | null;
  proposedSolution?: string | null;
  technologies?: ProjectTechnology[];
  features?: ProjectFeature[];
}

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

const CATEGORIES = [
  "All",
  "Full-Stack Development",
  "Mobile Applications",
  "Automation",
  "Artificial Intelligence",
  "Data Analytics",
  "Startup Products",
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  CONCEPT: { label: "Concept", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]" },
  IN_PROGRESS: { label: "In Progress", color: "text-[#D97706]", bg: "bg-[#FFFBEB]", border: "border-[#FDE68A]" },
  COMPLETED: { label: "Completed", color: "text-[#059669]", bg: "bg-[#ECFDF5]", border: "border-[#A7F3D0]" },
  PUBLISHED: { label: "Published", color: "text-[#1E3A5F]", bg: "bg-[#EEF4FA]", border: "border-[#CBD5E1]" },
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies?.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      aria-label="Project Portfolio and Technical Case Studies"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>03 / FEATURED PROJECTS & CASE STUDIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Engineered Digital Products.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
          Detailed case studies and engineering architectural breakdowns across full-stack systems, mobile apps, automation pipelines, and AI concepts.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#1E3A5F] text-white shadow-sm"
                  : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#242424]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-10 pr-4 py-2 rounded-xl premium-input text-xs sm:text-sm placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const statusConfig = STATUS_CONFIG[project.status] || STATUS_CONFIG.CONCEPT;

            return (
              <motion.div
                key={project.id || project.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="group premium-card rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-[#242424] mb-2 group-hover:text-[#1E3A5F] transition-colors">
                    {project.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Feature Highlights */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-4 space-y-1.5 pt-3 border-t border-[#E2E8F0]">
                      <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-1">
                        Module Roadmap:
                      </span>
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[#475569]">
                          {feat.isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
                          )}
                          <span className="truncate">{feat.title}</span>
                          <span className="text-[10px] text-[#94A3B8] font-medium">
                            {feat.isCompleted ? "(Built)" : "(Planned)"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-semibold text-[#1E3A5F]"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-semibold text-[#64748B]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#162C48] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Repository"
                        className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F1F5F9] transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F1F5F9] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 premium-card rounded-3xl">
          <p className="text-[#64748B] text-sm">No projects found matching the filter.</p>
        </div>
      )}
    </section>
  );
};
