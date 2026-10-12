import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsDashboard } from "@/components/SkillsDashboard";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { GitHubSection } from "@/components/GitHubSection";
import { Services } from "@/components/Services";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import {
  getProfileData,
  getSkillsData,
  getProjectsData,
  getServicesData,
  getTimelineData,
  getLearningMilestonesData,
} from "@/services/portfolioService";


export default async function HomePage() {
  const [profile, skillCategories, projects, services, timeline, milestones] =
    await Promise.all([
      getProfileData(),
      getSkillsData(),
      getProjectsData({ onlyPublished: true }),
      getServicesData(),
      getTimelineData(),
      getLearningMilestonesData(),
    ]);

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-[#F4B400]/30 selection:text-[#FFF4D6]">
      {/* Floating Glass Navigation */}
      <Navbar githubUrl={profile.githubUrl} />

      {/* Hero Section */}
      <Hero profile={profile as any} />

      {/* About Section */}
      <About profile={profile as any} />

      {/* Skills Dashboard with Interactive Graphs */}
      <SkillsDashboard categories={skillCategories as any} milestones={milestones as any} />

      {/* Featured Projects Showcase with Case Studies */}
      <ProjectShowcase projects={projects as any} />

      {/* GitHub REST API Integration */}
      <GitHubSection username={profile.githubUsername || "shivabharti9080"} />

      {/* Development Services & Focus Areas */}
      <Services services={services as any} />

      {/* Experience & Learning Progression Timeline */}
      <ExperienceTimeline timeline={timeline as any} />

      {/* Contact Section with Functional Form */}
      <ContactSection profile={profile as any} />

      {/* Footer */}
      <Footer profile={profile as any} />
    </main>
  );
}
