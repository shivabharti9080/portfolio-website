import React from "react";
import Link from "next/link";
import { Mail, Shield } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface FooterProps {
  profile: {
    fullName: string;
    email: string;
    githubUrl: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#64748B]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] text-white flex items-center justify-center font-bold">
            <span>SB</span>
          </div>
          <div>
            <span className="text-[#242424] font-bold">{profile.fullName}</span>
            <p className="text-[11px] text-[#64748B]">Engineering Ideas Into Digital Reality</p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-semibold">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1E3A5F] transition-colors"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[#1E3A5F] transition-colors">
            Email
          </a>
          <a href="/api/resume" download className="hover:text-[#1E3A5F] transition-colors">
            Resume
          </a>
          <Link href="/admin" className="text-[#94A3B8] hover:text-[#1E3A5F] transition-colors flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#E2E8F0] text-center text-[#94A3B8] text-[11px]">
        © {new Date().getFullYear()} Shiva Bharti. Engineered with Next.js App Router, Tailwind CSS, Prisma, and PostgreSQL.
      </div>
    </footer>
  );
};
