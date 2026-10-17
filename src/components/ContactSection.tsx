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
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>07 / GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Let&apos;s Build Something Meaningful.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
          Whether you want to discuss full-stack projects, mobile apps, automation workflows, or AI prototypes, feel free to send a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Direct Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="premium-card p-6 rounded-3xl">
            <h3 className="text-base font-bold text-[#242424] mb-4">Direct Channels</h3>

            <div className="space-y-3.5">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#EEF4FA] hover:border-[#CBD5E1] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E3A5F] group-hover:scale-105 transition-transform shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#94A3B8] block uppercase tracking-wider">Email Address</span>
                  <span className="text-xs sm:text-sm font-bold text-[#242424] group-hover:text-[#1E3A5F] transition-colors">
                    {profile.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#EEF4FA] hover:border-[#CBD5E1] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#059669] group-hover:scale-105 transition-transform shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#94A3B8] block uppercase tracking-wider">Phone / Mobile</span>
                  <span className="text-xs sm:text-sm font-bold text-[#242424] group-hover:text-[#1E3A5F] transition-colors">
                    {profile.phone}
                  </span>
                </div>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#EEF4FA] hover:border-[#CBD5E1] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E3A5F] group-hover:scale-105 transition-transform shadow-xs">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#94A3B8] block uppercase tracking-wider">GitHub Profile</span>
                  <span className="text-xs sm:text-sm font-bold text-[#242424] group-hover:text-[#1E3A5F] transition-colors">
                    github.com/shivabharti9080
                  </span>
                </div>
              </a>

              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#EEF4FA] hover:border-[#CBD5E1] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform shadow-xs">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#94A3B8] block uppercase tracking-wider">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-bold text-[#242424] group-hover:text-[#1E3A5F] transition-colors">
                      Connect on LinkedIn
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="premium-card p-6 rounded-3xl text-xs text-[#64748B] space-y-2">
            <p className="flex items-center gap-2 text-[#242424] font-bold">
              <Sparkles className="w-4 h-4 text-[#1E3A5F]" />
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
            className="premium-card p-8 sm:p-10 rounded-3xl space-y-6"
          >
            {success && (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-3 text-xs sm:text-sm text-[#065F46]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-3 text-xs sm:text-sm text-[#991B1B]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#242424] mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl premium-input text-sm placeholder:text-[#94A3B8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242424] mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-3 rounded-xl premium-input text-sm placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242424] mb-2">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Collaboration, Full-Stack Project, or Engineering Role"
                className="w-full px-4 py-3 rounded-xl premium-input text-sm placeholder:text-[#94A3B8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242424] mb-2">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, idea, or questions..."
                className="w-full px-4 py-3 rounded-xl premium-input text-sm placeholder:text-[#94A3B8] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C48] shadow-sm hover:shadow transition-all disabled:opacity-50"
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
