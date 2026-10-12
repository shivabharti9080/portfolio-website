"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  User,
  Inbox,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Save,
  Upload,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialProfile: any;
  initialProjects: any[];
  initialSkills: any[];
  initialMessages: any[];
  initialResume: any;
}

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialProfile,
  initialProjects,
  initialSkills,
  initialMessages,
  initialResume,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills" | "profile" | "inbox" | "resume">("overview");

  // State
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [skills, setSkills] = useState<any[]>(initialSkills);
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [resume, setResume] = useState(initialResume);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // New Project Modal State
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    summary: "",
    category: "Full-Stack Development",
    status: "CONCEPT",
    githubUrl: "https://github.com/shivabharti9080",
    demoUrl: "",
    isPublished: true,
  });

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.refresh();
  };

  // Profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("Profile updated successfully!");
      }
    } catch (err: any) {
      setStatusMsg("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([data.data, ...projects]);
        setShowNewProject(false);
        setNewProject({
          title: "",
          slug: "",
          summary: "",
          category: "Full-Stack Development",
          status: "CONCEPT",
          githubUrl: "https://github.com/shivabharti9080",
          demoUrl: "",
          isPublished: true,
        });
        setStatusMsg("Project created successfully!");
      }
    } catch (err) {
      setStatusMsg("Error creating project.");
    } finally {
      setSaving(false);
    }
  };

  // Toggle Project Publish
  const handleTogglePublish = async (proj: any) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !proj.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.map((p) => (p.id === proj.id ? { ...p, isPublished: !proj.isPublished } : p)));
      }
    } catch (e) {}
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {}
  };

  // Mark Message Read
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      });
      if (res.ok) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m)));
      }
    } catch (e) {}
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch (e) {}
  };

  // Resume Upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/resume", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
        setStatusMsg("New resume uploaded successfully!");
      } else {
        setStatusMsg(data.error || "Upload failed");
      }
    } catch (e) {
      setStatusMsg("Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center font-bold text-lg text-white">
              <span className="text-white">S</span>
              <span className="text-[#F4B400]">B</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Admin Console</h2>
              <span className="text-[10px] font-mono text-zinc-400">Shiva Bharti Portfolio</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "projects"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="text-xs font-mono opacity-80">{projects.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "skills"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4" />
                <span>Skills Dashboard</span>
              </div>
              <span className="text-xs font-mono opacity-80">{skills.reduce((acc, c) => acc + c.skills.length, 0)}</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Bio</span>
            </button>

            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "inbox"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Contact Inbox</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF4D4F] text-white">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "resume"
                  ? "bg-[#F4B400] text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Manager</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {statusMsg && (
          <div className="p-3.5 mb-6 rounded-2xl bg-[#34C759]/15 border border-[#34C759]/30 text-xs sm:text-sm text-emerald-300 flex items-center justify-between">
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg(null)} className="text-zinc-400 hover:text-white">✕</button>
          </div>
        )}

        {/* TAB: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Overview</h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">Live status of your portfolio records</p>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">Total Projects</span>
                <p className="text-3xl font-bold text-white mt-1">{projects.length}</p>
                <span className="text-[10px] font-mono text-[#F4B400] mt-2 block">
                  {projects.filter((p) => p.isPublished).length} Published
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">Total Skills</span>
                <p className="text-3xl font-bold text-white mt-1">
                  {skills.reduce((acc, c) => acc + c.skills.length, 0)}
                </p>
                <span className="text-[10px] font-mono text-[#34C759] mt-2 block">
                  Across {skills.length} Categories
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">Unread Inquiries</span>
                <p className="text-3xl font-bold text-white mt-1">{unreadMessagesCount}</p>
                <span className="text-[10px] font-mono text-[#60A5FA] mt-2 block">
                  {messages.length} Total Messages
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">Resume Status</span>
                <p className="text-sm font-bold text-white mt-2 truncate">
                  {resume.filename || "Active"}
                </p>
                <span className="text-[10px] font-mono text-emerald-400 mt-2 block">
                  Download Ready
                </span>
              </div>
            </div>

            {/* Quick Action Table */}
            <div className="glass-panel p-6 rounded-3xl border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Recent Project Case Studies</h2>
                <button
                  onClick={() => {
                    setActiveTab("projects");
                    setShowNewProject(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#F4B400] text-black text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Visibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 text-white font-medium">{p.title}</td>
                        <td className="py-3 text-zinc-300">{p.category}</td>
                        <td className="py-3 text-[#F4B400]">{p.status}</td>
                        <td className="py-3">
                          {p.isPublished ? (
                            <span className="text-[#34C759]">Published</span>
                          ) : (
                            <span className="text-zinc-500">Draft</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Projects</h1>
                <p className="text-xs font-mono text-zinc-400 mt-1">Add, update, or remove case studies</p>
              </div>
              <button
                onClick={() => setShowNewProject(!showNewProject)}
                className="px-4 py-2 rounded-xl bg-[#F4B400] text-black text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{showNewProject ? "Close Form" : "New Project"}</span>
              </button>
            </div>

            {/* Create Project Modal/Drawer */}
            {showNewProject && (
              <form onSubmit={handleCreateProject} className="glass-panel p-6 rounded-3xl border-white/20 space-y-4">
                <h2 className="text-base font-bold text-white mb-2">Create New Project</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Slug (URL) *</label>
                    <input
                      type="text"
                      required
                      value={newProject.slug}
                      onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Category</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-zinc-900"
                    >
                      <option value="CONCEPT">CONCEPT</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Summary *</label>
                  <textarea
                    required
                    rows={3}
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#F4B400] text-black text-xs font-bold"
                >
                  Save Project
                </button>
              </form>
            )}

            {/* Projects Table */}
            <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.02] border-b border-white/10">
                  <tr className="text-zinc-400">
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Live URL</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 text-white font-medium">{p.title}</td>
                      <td className="p-4 text-zinc-300">{p.category}</td>
                      <td className="p-4 text-[#F4B400]">{p.status}</td>
                      <td className="p-4">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-zinc-400 hover:text-white underline"
                        >
                          /{p.slug}
                        </a>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`px-2 py-1 rounded text-[11px] ${
                            p.isPublished
                              ? "bg-[#34C759]/20 text-[#34C759]"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {p.isPublished ? "Published" : "Draft"}
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1 rounded text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: Skills */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Skills Dashboard Config</h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">Configurable learning stages and display levels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((category) => (
                <div key={category.id} className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
                  <h2 className="text-base font-bold text-[#F4B400]">{category.name}</h2>
                  <div className="space-y-2">
                    {category.skills.map((sk: any) => (
                      <div
                        key={sk.id}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-white font-medium">{sk.name}</span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              sk.status === "PROFICIENT"
                                ? "text-[#34C759] bg-[#34C759]/10"
                                : sk.status === "PRACTICING"
                                ? "text-[#F4B400] bg-[#F4B400]/10"
                                : "text-[#60A5FA] bg-[#60A5FA]/10"
                            }`}
                          >
                            {sk.status}
                          </span>
                          <span className="text-zinc-400">{sk.ratingScore || 80}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Profile */}
        {activeTab === "profile" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Edit Profile & Contact Details</h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">Updates live values across all portfolio pages</p>
            </div>

            <form onSubmit={handleSaveProfile} className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profile.linkedinUrl || ""}
                    placeholder="https://linkedin.com/in/username"
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">Availability Status</label>
                <input
                  type="text"
                  value={profile.availabilityStatus}
                  onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">What I Build</label>
                  <textarea
                    rows={3}
                    value={profile.whatIBuild}
                    onChange={(e) => setProfile({ ...profile, whatIBuild: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">What I Am Learning</label>
                  <textarea
                    rows={3}
                    value={profile.whatIAmLearning}
                    onChange={(e) => setProfile({ ...profile, whatIAmLearning: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">What I Want to Build Next</label>
                  <textarea
                    rows={3}
                    value={profile.whatIWantToBuildNext}
                    onChange={(e) => setProfile({ ...profile, whatIWantToBuildNext: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F4B400] text-black text-xs font-bold hover:bg-[#FFF4D6] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save Profile Changes"}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB: Contact Inbox */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Contact Submissions</h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">Inquiries submitted from the public contact form</p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border-white/10 text-zinc-400 text-xs font-mono">
                  No contact messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-panel p-6 rounded-2xl border-white/10 space-y-3 transition-colors ${
                      !msg.isRead ? "border-l-4 border-l-[#F4B400]" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-[#F4B400] font-mono hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="text-xs font-bold text-zinc-300">Subject: {msg.subject}</h2>

                    <p className="text-xs text-zinc-300 whitespace-pre-wrap bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => handleToggleRead(msg.id, msg.isRead)}
                        className="text-xs font-mono text-zinc-400 hover:text-white"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-xs font-mono text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: Resume */}
        {activeTab === "resume" && (
          <div className="max-w-xl space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Resume Management</h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">Upload and replace current downloadable PDF resume</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-400 block">Current Active Resume:</span>
                  <span className="text-sm font-bold text-white mt-1 block">
                    {resume.filename || "Shiva_Bharti_Resume.pdf"}
                  </span>
                </div>
                <a
                  href="/api/resume"
                  download
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-[#FFF4D6] hover:bg-white/[0.08]"
                >
                  Download
                </a>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-2">
                  Upload New PDF Resume (Max 5MB)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-[#F4B400] rounded-2xl p-8 cursor-pointer transition-colors bg-white/[0.02]">
                  <Upload className="w-8 h-8 text-[#F4B400] mb-2" />
                  <span className="text-xs font-mono text-zinc-300">Click to select PDF document</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
