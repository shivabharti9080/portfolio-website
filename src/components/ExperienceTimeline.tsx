"use client";

import React from "react";
import { GraduationCap, Milestone, Briefcase, Award, Calendar } from "lucide-react";

interface TimelineEntry {
  id: string;
  type: "EDUCATION" | "LEARNING_MILESTONE" | "PROJECT" | "INTERNSHIP" | "CERTIFICATION" | "OTHER";
  title: string;
  organization?: string | null;
  location?: string | null;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent: boolean;
  description: string;
  skillsUsed?: string | null;
}

interface TimelineProps {
  timeline: TimelineEntry[];
}

const TYPE_ICONS: Record<string, any> = {
  EDUCATION: GraduationCap,
  LEARNING_MILESTONE: Milestone,
  PROJECT: Milestone,
  INTERNSHIP: Briefcase,
  CERTIFICATION: Award,
};

export const ExperienceTimeline: React.FC<TimelineProps> = ({ timeline }) => {
  return (
    <section
      id="experience"
      aria-label="Experience and Learning Progression Timeline"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>06 / TIMELINE & PROGRESSION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Education & Learning Milestones.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
          An authentic, verifiable journey detailing engineering education, technology milestones, and ongoing development tracks.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-[#CBD5E1] space-y-10">
        {timeline.map((item) => {
          const Icon = TYPE_ICONS[item.type] || Milestone;
          const startStr = new Date(item.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          });
          const endStr = item.isCurrent
            ? "Present"
            : item.endDate
            ? new Date(item.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Icon Node */}
              <div className="absolute -left-[37px] sm:-left-[53px] top-1 w-8 h-8 rounded-full bg-white border-2 border-[#1E3A5F] flex items-center justify-center text-[#1E3A5F] group-hover:scale-110 transition-transform shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Card */}
              <div className="premium-card p-6 sm:p-8 rounded-3xl group-hover:border-[#CBD5E1]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1E3A5F]">
                    {startStr} {endStr ? `— ${endStr}` : ""}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#EEF4FA] border border-[#CBD5E1]/60 text-[10px] font-semibold text-[#1E3A5F] uppercase tracking-wider">
                    {item.type.replace("_", " ")}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#242424] mb-1">{item.title}</h3>

                {item.organization && (
                  <p className="text-xs sm:text-sm font-semibold text-[#475569] mb-3">
                    {item.organization} {item.location ? `• ${item.location}` : ""}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.skillsUsed && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E2E8F0]">
                    {item.skillsUsed.split(",").map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-semibold text-[#1E3A5F]"
                      >
                        {sk.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
