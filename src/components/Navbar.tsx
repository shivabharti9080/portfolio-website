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
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8 flex justify-center`}
    >
      <nav
        aria-label="Primary Navigation"
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between ${
          isScrolled
            ? "glass-panel bg-[#080808]/85 border-white/15 shadow-2xl backdrop-blur-xl"
            : "bg-white/[0.02] border border-white/10 backdrop-blur-md"
        }`}
      >
        {/* Minimal initials logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#F4B400] rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center font-bold text-lg tracking-wider text-white group-hover:border-[#F4B400] transition-colors">
            <span className="text-white">S</span>
            <span className="text-[#F4B400]">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#FFF4D6] transition-colors">
              Shiva Bharti
            </span>
            <span className="text-[10px] text-[#A1A1AA] tracking-wider uppercase font-mono">
              Full-Stack Eng
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = isHome && activeSection === sectionId;
            const targetHref = isHome ? link.href : `/${link.href}`;

            return (
              <a
                key={link.name}
                href={targetHref}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-lg shadow-inner"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href="/api/resume"
            download
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#FFF4D6] bg-white/[0.05] border border-white/15 hover:border-[#F4B400]/50 hover:bg-white/[0.08] transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#F4B400]" />
            Resume
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold text-[#080808] bg-[#F4B400] hover:bg-[#FFF4D6] shadow-[0_0_15px_rgba(244,180,0,0.3)] transition-all font-mono"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/admin"
            title="Admin Login"
            className="p-1.5 rounded-lg text-white/30 hover:text-[#F4B400] transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden p-2 rounded-xl text-white bg-white/[0.05] border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 glass-panel bg-[#080808]/95 border-white/20 rounded-2xl p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-medium text-white hover:bg-white/[0.06] hover:text-[#F4B400] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center justify-between gap-3 pt-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/[0.05] border border-white/10 text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="/api/resume"
                  download
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/[0.05] border border-white/10 text-[#FFF4D6]"
                >
                  <FileText className="w-4 h-4 text-[#F4B400]" />
                  Resume
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-[#080808] bg-[#F4B400] hover:bg-[#FFF4D6] transition-colors mt-2"
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
