"use client";

import React from "react";
import {
  Code,
  Globe,
  Layout,
  Smartphone,
  Workflow,
  BarChart3,
  Cpu,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string;
  technologies: string;
  iconName?: string | null;
  isEnabled: boolean;
}

interface ServicesProps {
  services: ServiceItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Layout,
  Smartphone,
  Workflow,
  BarChart3,
  Cpu,
  Code,
};

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const enabledServices = services.filter((s) => s.isEnabled);

  return (
    <section
      id="services"
      aria-label="Areas of Focus and Development Services"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono text-[#F4B400] mb-3">
          <Code className="w-3.5 h-3.5" />
          <span>05 / CAPABILITIES & FOCUS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Development Services & Areas of Focus.
        </h2>
        <p className="mt-4 text-[#A1A1AA] text-base sm:text-lg max-w-2xl leading-relaxed">
          Presented honestly as core engineering specializations and practical capabilities rather than claimed agency client history.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enabledServices.map((service) => {
          const Icon = (service.iconName && ICON_MAP[service.iconName]) || Code;
          const deliverablesList = service.deliverables
            .split("\n")
            .filter((d) => d.trim().length > 0);

          return (
            <div
              key={service.id}
              className="glass-panel p-7 rounded-3xl border-white/10 hover:border-[#F4B400]/40 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#F4B400]/5 rounded-bl-full pointer-events-none group-hover:bg-[#F4B400]/10 transition-colors" />

              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-[#F4B400] mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFF4D6] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Potential Deliverables:
                  </span>
                  {deliverablesList.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759] mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & CTA */}
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Tech Stack:
                  </span>
                  <p className="text-xs font-mono text-[#F4B400]">{service.technologies}</p>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/10 hover:bg-[#F4B400] hover:text-black hover:border-transparent text-white transition-all"
                >
                  <span>Inquire for Collaboration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
