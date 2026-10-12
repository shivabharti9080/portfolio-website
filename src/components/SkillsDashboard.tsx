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
import { Cpu, Layers, Activity, Calendar, Sparkles, Filter } from "lucide-react";

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

const STATUS_COLORS: Record<string, string> = {
  LEARNING: "#60A5FA",     // Soft blue
  PRACTICING: "#F4B400",   // Accent yellow
  PROFICIENT: "#34C759",   // Success green
};

const PIE_COLORS = ["#F4B400", "#FFF4D6", "#34C759", "#60A5FA", "#A78BFA", "#F472B6", "#9CA3AF"];

export const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ categories, milestones }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"proficiency" | "radar" | "distribution" | "timeline">("proficiency");

  // Filtered skills for Bar Chart
  const barChartData = useMemo(() => {
    let list: { name: string; score: number; status: string; category: string }[] = [];

    categories.forEach((cat) => {
      if (selectedCategory === "All" || selectedCategory === cat.name) {
        cat.skills.forEach((s) => {
          // If ratingScore exists use it, otherwise derive meaningful representation from honest status
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

    return list.slice(0, 16); // Clean display
  }, [categories, selectedCategory]);

  // Radar Chart Data (Aggregate by categories)
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

  // Distribution Data (Category count)
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
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono text-[#F4B400] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 / TECHNICAL COMPETENCY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Interactive Skills Dashboard.
        </h2>
        <p className="mt-4 text-[#A1A1AA] text-base sm:text-lg max-w-2xl leading-relaxed">
          Honest technical overview categorized by developmental phases:{" "}
          <span className="text-[#60A5FA] font-medium">Learning</span>,{" "}
          <span className="text-[#F4B400] font-medium">Practicing</span>, and{" "}
          <span className="text-[#34C759] font-medium">Proficient</span>. Sourced dynamically from PostgreSQL database records.
        </p>
      </div>

      {/* Graph Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl glass-panel border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("proficiency")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === "proficiency"
              ? "bg-[#F4B400] text-black shadow-lg font-semibold"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Proficiency Index</span>
        </button>

        <button
          onClick={() => setActiveTab("radar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === "radar"
              ? "bg-[#F4B400] text-black shadow-lg font-semibold"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Category Radar</span>
        </button>

        <button
          onClick={() => setActiveTab("distribution")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === "distribution"
              ? "bg-[#F4B400] text-black shadow-lg font-semibold"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Skill Distribution</span>
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === "timeline"
              ? "bg-[#F4B400] text-black shadow-lg font-semibold"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Learning Milestones</span>
        </button>
      </div>

      {/* Main Glass Dashboard Surface */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl relative overflow-hidden">
        {/* TAB 1: Horizontal Bar Chart */}
        {activeTab === "proficiency" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Technological Competency & Learning Status</h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">Filter by category to explore verified competencies</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    selectedCategory === "All"
                      ? "bg-white/20 text-white font-semibold"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      selectedCategory === c.name
                        ? "bg-[#F4B400]/20 text-[#FFF4D6] border border-[#F4B400]/40 font-semibold"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" /> Learning
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4B400]" /> Practicing
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" /> Proficient
              </span>
            </div>

            {/* Bar Chart Container */}
            <div className="h-[440px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} stroke="#71717A" fontSize={11} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#D4D4D8"
                    fontSize={12}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="glass-panel bg-[#080808]/95 p-3 rounded-xl border-white/20 text-xs font-mono shadow-2xl">
                            <p className="text-white font-bold">{data.name}</p>
                            <p className="text-zinc-400 mt-0.5">Category: {data.category}</p>
                            <p className="mt-1 flex items-center gap-1.5">
                              Status:{" "}
                              <span
                                style={{ color: STATUS_COLORS[data.status] }}
                                className="font-semibold uppercase"
                              >
                                {data.status}
                              </span>
                            </p>
                            <p className="text-[#FFF4D6] mt-0.5">Score: {data.score} / 100</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="score"
                    radius={[0, 6, 6, 0]}
                    animationDuration={800}
                    fill="#F4B400"
                  >
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || "#F4B400"} />
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
              <h3 className="text-lg font-bold text-white">Full-Stack Competency Area Radar</h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Relative competency balance computed across all technical domains
              </p>
            </div>

            <div className="h-[440px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                  <PolarGrid stroke="#27272A" />
                  <PolarAngleAxis dataKey="subject" stroke="#A1A1AA" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#52525B" fontSize={10} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="glass-panel bg-[#080808]/95 p-3 rounded-xl border-white/20 text-xs font-mono shadow-2xl">
                            <p className="text-[#F4B400] font-bold">{data.subject}</p>
                            <p className="text-zinc-300 mt-1">Average Level: {data.A}%</p>
                            <p className="text-zinc-400">Total Skills: {data.skillCount}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#F4B400"
                    fill="#F4B400"
                    fillOpacity={0.25}
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
              <h3 className="text-lg font-bold text-white">Skill Distribution by Category</h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
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
                            <div className="glass-panel bg-[#080808]/95 p-3 rounded-xl border-white/20 text-xs font-mono shadow-2xl">
                              <p className="text-white font-bold">{data.name}</p>
                              <p className="text-[#F4B400] mt-1">{data.value} Recorded Skills</p>
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
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-zinc-200">{d.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#F4B400] font-bold">
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
              <h3 className="text-lg font-bold text-white">Documented Learning Milestones</h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Verified progression points added and managed via admin
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8 my-6">
              {milestones.map((ms, index) => {
                const dateStr = new Date(ms.milestoneDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                });
                return (
                  <div key={ms.id || index} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-[#F4B400] group-hover:scale-125 transition-transform" />

                    <div className="glass-panel p-5 rounded-2xl border-white/10 group-hover:border-[#F4B400]/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-[#F4B400] font-semibold">{dateStr}</span>
                        {ms.category && (
                          <span className="px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-zinc-400">
                            {ms.category}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-white mb-1.5">{ms.title}</h4>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
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
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="glass-panel p-6 rounded-2xl border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-bold text-white tracking-wide">{category.name}</h4>
                <span className="text-[11px] font-mono text-[#F4B400] bg-white/[0.04] px-2 py-0.5 rounded-md">
                  {category.skills.length} techs
                </span>
              </div>
              {category.description && (
                <p className="text-xs text-zinc-400 mb-4">{category.description}</p>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-zinc-200"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[skill.status] }}
                    />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
