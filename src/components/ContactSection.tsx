"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

interface ContactProps {
  profile: {
    email: string;
    phone: string;
    githubUrl: string;
    linkedinUrl?: string | null;
  };
}

export const ContactSection: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSuccess(json.message || "Thank you! Your message was delivered successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(json.error || "Unable to send message. Please try again.");
      }
    } catch (err: any) {
      setError("Network error occurred. Please reach out directly via email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Shiva Bharti"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 ambient-glow-yellow rounded-full blur-3xl opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono text-[#F4B400] mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>07 / GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Something Meaningful.
        </h2>
        <p className="mt-4 text-[#A1A1AA] text-base sm:text-lg max-w-2xl leading-relaxed">
          Whether you want to discuss full-stack projects, mobile apps, automation workflows, or AI prototypes, feel free to send a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Direct Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-white/10 hover:border-[#F4B400]/40 transition-colors">
            <h3 className="text-base font-bold text-white mb-4">Direct Channels</h3>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4B400]/10 border border-[#F4B400]/30 flex items-center justify-center text-[#F4B400] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Email Address</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FFF4D6] transition-colors">
                    {profile.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#34C759]/10 border border-[#34C759]/30 flex items-center justify-center text-[#34C759] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Phone / Mobile</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FFF4D6] transition-colors">
                    {profile.phone}
                  </span>
                </div>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">GitHub Profile</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FFF4D6] transition-colors">
                    github.com/shivabharti9080
                  </span>
                </div>
              </a>

              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/30 flex items-center justify-center text-[#60A5FA] group-hover:scale-105 transition-transform">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FFF4D6] transition-colors">
                      Connect on LinkedIn
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="glass-panel p-6 rounded-3xl border-white/10 text-xs font-mono text-zinc-400 space-y-2">
            <p className="flex items-center gap-2 text-zinc-200 font-semibold">
              <Sparkles className="w-4 h-4 text-[#F4B400]" />
              Response Commitment
            </p>
            <p className="leading-relaxed">
              Messages are saved directly into the secure PostgreSQL database and trigger email alerts via Resend. I respond to authentic inquiries promptly.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 space-y-6"
          >
            {success && (
              <div className="p-4 rounded-2xl bg-[#34C759]/15 border border-[#34C759]/30 flex items-center gap-3 text-xs sm:text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center gap-3 text-xs sm:text-sm text-red-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-2">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Collaboration, Full-Stack Project, or Job Opportunity"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-2">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, idea, or questions..."
                className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder:text-zinc-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold text-[#080808] bg-[#F4B400] hover:bg-[#FFF4D6] shadow-[0_0_20px_rgba(244,180,0,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Sending Securely...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
