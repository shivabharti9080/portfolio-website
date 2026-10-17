"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, ArrowRight, Shield } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface NavbarProps {
  githubUrl?: string;
  resumeUrl?: string;
}

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  githubUrl = "https://github.com/shivabharti9080",
  resumeUrl = "/api/resume",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 px-4 sm:px-8 flex justify-center"
    >
      <nav
        aria-label="Primary Navigation"
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-white/90 border border-[#E2E8F0] shadow-sm backdrop-blur-md"
            : "bg-white/80 border border-transparent backdrop-blur-sm"
        }`}
      >
        {/* Logo with Initials */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] rounded-lg p-0.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:bg-[#162C48] transition-colors">
            <span>SB</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[#242424] group-hover:text-[#1E3A5F] transition-colors">
              Shiva Bharti
            </span>
            <span className="text-[11px] text-[#64748B] font-medium tracking-wide">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = isHome && activeSection === sectionId;
            const targetHref = isHome ? link.href : `/${link.href}`;

            return (
              <a
                key={link.name}
                href={targetHref}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#1E3A5F] font-semibold"
                    : "text-[#64748B] hover:text-[#242424] hover:bg-[#F5F7FA]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#EEF4FA] rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-xl text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F5F7FA] border border-transparent hover:border-[#E2E8F0] transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="/api/resume"
            download
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#1E3A5F] bg-[#EEF4FA] border border-[#CBD5E1]/60 hover:bg-[#E2E8F0]/70 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#1E3A5F]" />
            Resume
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C48] shadow-sm hover:shadow transition-all"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/admin"
            title="Admin Login"
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#1E3A5F] transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden p-2 rounded-xl text-[#242424] bg-[#F5F7FA] border border-[#E2E8F0]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-4 top-20 z-50 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#242424] hover:bg-[#F5F7FA] hover:text-[#1E3A5F] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-[#E2E8F0] my-2" />
              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#F5F7FA] border border-[#E2E8F0] text-[#242424]"
                >
                  <GithubIcon className="w-4 h-4 text-[#1E3A5F]" />
                  GitHub
                </a>
                <a
                  href="/api/resume"
                  download
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#EEF4FA] border border-[#CBD5E1] text-[#1E3A5F]"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C48] transition-colors mt-2"
              >
                <span>Contact Shiva</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
