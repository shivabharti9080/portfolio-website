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
  ExternalLink,
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#242424] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E2E8F0] p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-base shadow-xs">
              <span>SB</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#242424]">Admin Console</h2>
              <span className="text-[11px] text-[#64748B]">Shiva Bharti Portfolio</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "overview"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "projects"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="text-xs font-bold opacity-80">{projects.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "skills"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4" />
                <span>Skills Dashboard</span>
              </div>
              <span className="text-xs font-bold opacity-80">{skills.reduce((acc, c) => acc + c.skills.length, 0)}</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "profile"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Bio</span>
            </button>

            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "inbox"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Contact Inbox</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4444] text-white">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "resume"
                  ? "bg-[#1E3A5F] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#242424] hover:bg-[#F1F5F9]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Manager</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[#1E3A5F] bg-[#EEF4FA] border border-[#CBD5E1]/60 hover:bg-[#E2E8F0] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[#EF4444] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {statusMsg && (
          <div className="p-3.5 mb-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs sm:text-sm text-[#065F46] flex items-center justify-between">
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg(null)} className="text-[#059669] hover:text-[#047857]">✕</button>
          </div>
        )}

        {/* TAB: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">System Overview</h1>
              <p className="text-xs text-[#64748B] mt-1">Live status of your portfolio records</p>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="premium-card p-5 rounded-2xl">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Total Projects</span>
                <p className="text-3xl font-bold text-[#242424] mt-1">{projects.length}</p>
                <span className="text-[11px] font-semibold text-[#1E3A5F] mt-2 block">
                  {projects.filter((p) => p.isPublished).length} Published
                </span>
              </div>

              <div className="premium-card p-5 rounded-2xl">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Total Skills</span>
                <p className="text-3xl font-bold text-[#242424] mt-1">
                  {skills.reduce((acc, c) => acc + c.skills.length, 0)}
                </p>
                <span className="text-[11px] font-semibold text-[#059669] mt-2 block">
                  Across {skills.length} Categories
                </span>
              </div>

              <div className="premium-card p-5 rounded-2xl">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Unread Inquiries</span>
                <p className="text-3xl font-bold text-[#242424] mt-1">{unreadMessagesCount}</p>
                <span className="text-[11px] font-semibold text-[#2563EB] mt-2 block">
                  {messages.length} Total Messages
                </span>
              </div>

              <div className="premium-card p-5 rounded-2xl">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Resume Status</span>
                <p className="text-sm font-bold text-[#242424] mt-2 truncate">
                  {resume.filename || "Active"}
                </p>
                <span className="text-[11px] font-semibold text-[#059669] mt-2 block">
                  Download Ready
                </span>
              </div>
            </div>

            {/* Quick Action Table */}
            <div className="premium-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#242424]">Recent Project Case Studies</h2>
                <button
                  onClick={() => {
                    setActiveTab("projects");
                    setShowNewProject(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#162C48] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                      <th className="pb-3 font-semibold">Title</th>
                      <th className="pb-3 font-semibold">Category</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Visibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {projects.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 text-[#242424] font-bold">{p.title}</td>
                        <td className="py-3 text-[#64748B]">{p.category}</td>
                        <td className="py-3 text-[#1E3A5F] font-semibold">{p.status}</td>
                        <td className="py-3">
                          {p.isPublished ? (
                            <span className="text-[#059669] font-semibold">Published</span>
                          ) : (
                            <span className="text-[#94A3B8]">Draft</span>
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
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">Manage Projects</h1>
                <p className="text-xs text-[#64748B] mt-1">Add, update, or remove case studies</p>
              </div>
              <button
                onClick={() => setShowNewProject(!showNewProject)}
                className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#162C48] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{showNewProject ? "Close Form" : "New Project"}</span>
              </button>
            </div>

            {/* Create Project Drawer */}
            {showNewProject && (
              <form onSubmit={handleCreateProject} className="premium-card p-6 rounded-3xl space-y-4">
                <h2 className="text-base font-bold text-[#242424] mb-2">Create New Project</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#242424] block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#242424] block mb-1">Slug (URL) *</label>
                    <input
                      type="text"
                      required
                      value={newProject.slug}
                      onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#242424] block mb-1">Category</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#242424] block mb-1">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl premium-input text-xs bg-white"
                    >
                      <option value="CONCEPT">CONCEPT</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#242424] block mb-1">Summary *</label>
                  <textarea
                    required
                    rows={3}
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold hover:bg-[#162C48] transition-colors"
                >
                  Save Project
                </button>
              </form>
            )}

            {/* Projects Table */}
            <div className="premium-card rounded-3xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr className="text-[#64748B]">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Live URL</th>
                    <th className="p-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFC]">
                      <td className="p-4 text-[#242424] font-bold">{p.title}</td>
                      <td className="p-4 text-[#64748B]">{p.category}</td>
                      <td className="p-4 text-[#1E3A5F] font-semibold">{p.status}</td>
                      <td className="p-4">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#1E3A5F] hover:underline font-semibold"
                        >
                          /{p.slug}
                        </a>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            p.isPublished
                              ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                              : "bg-[#F1F5F9] text-[#64748B]"
                          }`}
                        >
                          {p.isPublished ? "Published" : "Draft"}
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1 rounded text-[#EF4444] hover:bg-[#FEF2F2]"
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">Skills Dashboard Config</h1>
              <p className="text-xs text-[#64748B] mt-1">Configurable learning stages and display levels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((category) => (
                <div key={category.id} className="premium-card p-6 rounded-2xl space-y-4">
                  <h2 className="text-base font-bold text-[#1E3A5F]">{category.name}</h2>
                  <div className="space-y-2">
                    {category.skills.map((sk: any) => (
                      <div
                        key={sk.id}
                        className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
                      >
                        <span className="text-[#242424] font-semibold">{sk.name}</span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              sk.status === "PROFICIENT"
                                ? "text-[#059669] bg-[#ECFDF5]"
                                : sk.status === "PRACTICING"
                                ? "text-[#D97706] bg-[#FFFBEB]"
                                : "text-[#2563EB] bg-[#EFF6FF]"
                            }`}
                          >
                            {sk.status}
                          </span>
                          <span className="text-[#64748B] font-medium">{sk.ratingScore || 80}%</span>
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">Edit Profile & Contact Details</h1>
              <p className="text-xs text-[#64748B] mt-1">Updates live values across all portfolio pages</p>
            </div>

            <form onSubmit={handleSaveProfile} className="premium-card p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profile.linkedinUrl || ""}
                    placeholder="https://linkedin.com/in/username"
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242424] mb-1.5">Availability Status</label>
                <input
                  type="text"
                  value={profile.availabilityStatus}
                  onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242424] mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">What I Build</label>
                  <textarea
                    rows={3}
                    value={profile.whatIBuild}
                    onChange={(e) => setProfile({ ...profile, whatIBuild: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">What I Am Learning</label>
                  <textarea
                    rows={3}
                    value={profile.whatIAmLearning}
                    onChange={(e) => setProfile({ ...profile, whatIAmLearning: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1.5">What I Want to Build Next</label>
                  <textarea
                    rows={3}
                    value={profile.whatIWantToBuildNext}
                    onChange={(e) => setProfile({ ...profile, whatIWantToBuildNext: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl premium-input text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold hover:bg-[#162C48] transition-colors shadow-xs"
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">Contact Submissions</h1>
              <p className="text-xs text-[#64748B] mt-1">Inquiries submitted from the public contact form</p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="premium-card p-12 text-center rounded-3xl text-[#64748B] text-xs">
                  No contact messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`premium-card p-6 rounded-2xl space-y-3 transition-colors ${
                      !msg.isRead ? "border-l-4 border-l-[#1E3A5F]" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#242424]">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-[#1E3A5F] font-semibold hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="text-xs font-bold text-[#475569]">Subject: {msg.subject}</h2>

                    <p className="text-xs text-[#64748B] whitespace-pre-wrap bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => handleToggleRead(msg.id, msg.isRead)}
                        className="text-xs font-semibold text-[#64748B] hover:text-[#1E3A5F]"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-xs font-semibold text-[#EF4444] hover:underline"
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">Resume Management</h1>
              <p className="text-xs text-[#64748B] mt-1">Upload and replace current downloadable PDF resume</p>
            </div>

            <div className="premium-card p-8 rounded-3xl space-y-6">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#64748B] block">Current Active Resume:</span>
                  <span className="text-sm font-bold text-[#242424] mt-1 block">
                    {resume.filename || "Shiva_Bharti_Resume.pdf"}
                  </span>
                </div>
                <a
                  href="/api/resume"
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#1E3A5F] hover:bg-[#EEF4FA] shadow-xs"
                >
                  Download
                </a>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242424] mb-2">
                  Upload New PDF Resume (Max 5MB)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#CBD5E1] hover:border-[#1E3A5F] rounded-2xl p-8 cursor-pointer transition-colors bg-[#F8FAFC]">
                  <Upload className="w-8 h-8 text-[#1E3A5F] mb-2" />
                  <span className="text-xs font-semibold text-[#475569]">Click to select PDF document</span>
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
