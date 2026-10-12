import React from "react";
import Link from "next/link";
import { Mail, Shield, Heart } from "lucide-react";
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
    <footer className="border-t border-white/10 bg-[#080808] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-zinc-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center font-bold text-white">
            <span className="text-white">S</span>
            <span className="text-[#F4B400]">B</span>
          </div>
          <div>
            <span className="text-white font-semibold">{profile.fullName}</span>
            <p className="text-[11px] text-zinc-400">Engineering Ideas Into Digital Reality</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
            Email
          </a>
          <a href="/api/resume" download className="hover:text-white transition-colors">
            Resume
          </a>
          <Link href="/admin" className="text-zinc-400 hover:text-[#F4B400] transition-colors flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-zinc-400 text-[11px]">
        © {new Date().getFullYear()} Shiva Bharti. Engineered with Next.js App Router, Tailwind CSS, Prisma, and PostgreSQL.
      </div>
    </footer>
  );
};
