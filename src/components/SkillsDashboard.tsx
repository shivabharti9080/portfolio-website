"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Cpu, Layers, Activity, Calendar, CheckCircle2 } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  status: "LEARNING" | "PRACTICING" | "PROFICIENT";
  ratingScore?: number | null;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  skills: SkillItem[];
}

interface LearningMilestone {
  id: string;
  title: string;
  category?: string | null;
  description: string;
  milestoneDate: string | Date;
  isVerified: boolean;
}

interface SkillsDashboardProps {
  categories: SkillCategory[];
  milestones: LearningMilestone[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  LEARNING: { label: "Learning", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  PRACTICING: { label: "Practicing", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  PROFICIENT: { label: "Proficient", color: "#1E3A5F", bg: "#EEF4FA", border: "#CBD5E1" },
};

const PIE_COLORS = ["#1E3A5F", "#2563EB", "#0284C7", "#0D9488", "#10B981", "#6366F1", "#8B5CF6"];

export const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ categories, milestones }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"proficiency" | "radar" | "distribution" | "timeline">("proficiency");

  // Filtered skills for Bar Chart
  const barChartData = useMemo(() => {
    let list: { name: string; score: number; status: string; category: string }[] = [];

    categories.forEach((cat) => {
      if (selectedCategory === "All" || selectedCategory === cat.name) {
        cat.skills.forEach((s) => {
          const fallbackScore = s.status === "PROFICIENT" ? 85 : s.status === "PRACTICING" ? 65 : 45;
          list.push({
            name: s.name,
            score: s.ratingScore || fallbackScore,
            status: s.status,
            category: cat.name,
          });
        });
      }
    });

    return list.slice(0, 16);
  }, [categories, selectedCategory]);

  // Radar Chart Data
  const radarChartData = useMemo(() => {
    return categories.map((cat) => {
      const scores = cat.skills.map((s) => s.ratingScore || (s.status === "PROFICIENT" ? 85 : s.status === "PRACTICING" ? 65 : 45));
      const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 50;
      return {
        subject: cat.name,
        A: avg,
        fullMark: 100,
        skillCount: cat.skills.length,
      };
    });
  }, [categories]);

  // Distribution Data
  const distributionData = useMemo(() => {
    return categories.map((cat) => ({
      name: cat.name,
      value: cat.skills.length,
    }));
  }, [categories]);

  return (
    <section
      id="skills"
      aria-label="Interactive Skills Dashboard and Proficiency Graphs"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative bg-[#F5F7FA]/60 rounded-3xl my-8 border border-[#E2E8F0]"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 / TECHNICAL COMPETENCY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Interactive Skills Dashboard.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
          Honest technical overview categorized by developmental phases:{" "}
          <span className="text-[#2563EB] font-semibold">Learning</span>,{" "}
          <span className="text-[#D97706] font-semibold">Practicing</span>, and{" "}
          <span className="text-[#1E3A5F] font-semibold">Proficient</span>.
        </p>
      </div>

      {/* Graph Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm w-fit">
        <button
          onClick={() => setActiveTab("proficiency")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "proficiency"
              ? "bg-[#1E3A5F] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#242424] hover:bg-[#F8FAFC]"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Proficiency Index</span>
        </button>

        <button
          onClick={() => setActiveTab("radar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "radar"
              ? "bg-[#1E3A5F] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#242424] hover:bg-[#F8FAFC]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Category Radar</span>
        </button>

        <button
          onClick={() => setActiveTab("distribution")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "distribution"
              ? "bg-[#1E3A5F] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#242424] hover:bg-[#F8FAFC]"
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Skill Distribution</span>
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "timeline"
              ? "bg-[#1E3A5F] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#242424] hover:bg-[#F8FAFC]"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Learning Milestones</span>
        </button>
      </div>

      {/* Main Card Surface */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl shadow-sm">
        {/* TAB 1: Horizontal Bar Chart */}
        {activeTab === "proficiency" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-lg font-bold text-[#242424]">Technological Competency & Learning Status</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Filter by category to explore verified competencies</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === "All"
                      ? "bg-[#1E3A5F] text-white"
                      : "bg-[#F1F5F9] text-[#64748B] hover:text-[#242424]"
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === c.name
                        ? "bg-[#1E3A5F] text-white"
                        : "bg-[#F1F5F9] text-[#64748B] hover:text-[#242424]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-6 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#64748B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Learning
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" /> Practicing
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" /> Proficient
              </span>
            </div>

            {/* Bar Chart Container */}
            <div className="h-[440px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#475569"
                    fontSize={12}
                    tickLine={false}
                    width={120}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const statusObj = STATUS_CONFIG[data.status] || STATUS_CONFIG.LEARNING;
                        return (
                          <div className="bg-white p-3 rounded-xl border border-[#CBD5E1] text-xs shadow-md">
                            <p className="text-[#242424] font-bold">{data.name}</p>
                            <p className="text-[#64748B] mt-0.5">Category: {data.category}</p>
                            <p className="mt-1 flex items-center gap-1.5">
                              Status:{" "}
                              <span
                                style={{ color: statusObj.color }}
                                className="font-semibold uppercase"
                              >
                                {data.status}
                              </span>
                            </p>
                            <p className="text-[#1E3A5F] font-bold mt-0.5">Score: {data.score} / 100</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="score"
                    radius={[0, 6, 6, 0]}
                    animationDuration={600}
                    fill="#1E3A5F"
                  >
                    {barChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_CONFIG[entry.status]?.color || "#1E3A5F"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: Radar Chart */}
        {activeTab === "radar" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#242424]">Full-Stack Competency Area Radar</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Relative competency balance computed across all technical domains
              </p>
            </div>

            <div className="h-[440px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-xl border border-[#CBD5E1] text-xs shadow-md">
                            <p className="text-[#1E3A5F] font-bold">{data.subject}</p>
                            <p className="text-[#242424] mt-1 font-semibold">Average Level: {data.A}%</p>
                            <p className="text-[#64748B]">Total Skills: {data.skillCount}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#1E3A5F"
                    fill="#1E3A5F"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 3: Category Distribution */}
        {activeTab === "distribution" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#242424]">Skill Distribution by Category</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Number of documented skills across technical domains
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={120}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-xl border border-[#CBD5E1] text-xs shadow-md">
                              <p className="text-[#242424] font-bold">{data.name}</p>
                              <p className="text-[#1E3A5F] font-bold mt-1">{data.value} Recorded Skills</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="md:col-span-5 space-y-2.5">
                {distributionData.map((d, idx) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                      />
                      <span className="text-sm font-semibold text-[#242424]">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#1E3A5F]">
                      {d.value} skills
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Learning Journey Milestones */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#242424]">Documented Learning Milestones</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Verified progression points added and managed via admin
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-[#CBD5E1] space-y-8 my-6">
              {milestones.map((ms, index) => {
                const dateStr = new Date(ms.milestoneDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                });
                return (
                  <div key={ms.id || index} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1E3A5F] group-hover:scale-125 transition-transform" />

                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] group-hover:border-[#CBD5E1] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-[#1E3A5F]">{dateStr}</span>
                        {ms.category && (
                          <span className="px-2.5 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#64748B]">
                            {ms.category}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-[#242424] mb-1.5">{ms.title}</h4>
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        {ms.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Categorized Skills Grid Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="premium-card p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-base font-bold text-[#242424] tracking-tight">{category.name}</h4>
                <span className="text-[11px] font-semibold text-[#1E3A5F] bg-[#EEF4FA] px-2.5 py-0.5 rounded-md border border-[#CBD5E1]/60">
                  {category.skills.length} techs
                </span>
              </div>
              {category.description && (
                <p className="text-xs text-[#64748B] mb-4">{category.description}</p>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => {
                  const statusObj = STATUS_CONFIG[skill.status] || STATUS_CONFIG.LEARNING;
                  return (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#242424]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: statusObj.color }}
                      />
                      <span>{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
