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
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative bg-[#F5F7FA]/60 rounded-3xl my-8 border border-[#E2E8F0]"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FA] border border-[#CBD5E1]/70 text-xs font-semibold text-[#1E3A5F] mb-3">
          <Code className="w-3.5 h-3.5" />
          <span>05 / CAPABILITIES & FOCUS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242424] tracking-tight">
          Development Services & Areas of Focus.
        </h2>
        <p className="mt-3.5 text-[#64748B] text-base sm:text-lg max-w-2xl leading-relaxed">
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
              className="premium-card p-7 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FA] border border-[#CBD5E1]/60 flex items-center justify-center text-[#1E3A5F] mb-5 group-hover:scale-105 transition-transform shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-[#242424] mb-2 group-hover:text-[#1E3A5F] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#E2E8F0]">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-1">
                    Potential Deliverables:
                  </span>
                  {deliverablesList.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#475569]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & CTA */}
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-1">
                    Tech Stack:
                  </span>
                  <p className="text-xs font-semibold text-[#1E3A5F]">{service.technologies}</p>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] text-[#1E3A5F] transition-all"
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
