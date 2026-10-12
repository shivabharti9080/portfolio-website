// src/services/portfolioService.ts
import { prisma } from "@/lib/prisma";
import {
  INITIAL_PROFILE,
  INITIAL_SKILL_CATEGORIES,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TIMELINE,
  INITIAL_LEARNING_MILESTONES,
} from "@/lib/seed-data";

export async function getProfileData() {
  try {
    const profile = await prisma.profile.findFirst();
    if (profile) return profile;
  } catch (error) {
    console.warn("DB not connected, using default profile data:", (error as any).message);
  }
  return INITIAL_PROFILE;
}

export async function getSkillsData() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    if (categories.length > 0) return categories;
  } catch (error) {
    console.warn("DB not connected, using seed skill categories:", (error as any).message);
  }
  return INITIAL_SKILL_CATEGORIES;
}

export async function getProjectsData(options: { onlyPublished?: boolean } = { onlyPublished: true }) {
  try {
    const where = options.onlyPublished ? { isPublished: true } : {};
    const projects = await prisma.project.findMany({
      where,
      include: {
        technologies: true,
        features: {
          orderBy: { order: "asc" },
        },
        images: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    if (projects.length > 0) return projects;
  } catch (error) {
    console.warn("DB not connected, using seed projects:", (error as any).message);
  }

  // Format seed projects to match relations
  return INITIAL_PROJECTS.map((p) => ({
    ...p,
    technologies: p.technologies.map((t, idx) => ({ id: `tech_${idx}`, name: t, projectId: p.id, category: null })),
    features: p.features.map((f, idx) => ({ id: `feat_${idx}`, title: f.title, description: f.description, isCompleted: f.isCompleted, order: idx, projectId: p.id })),
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

export async function getProjectBySlug(slug: string, options: { onlyPublished?: boolean } = { onlyPublished: true }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: true,
        features: {
          orderBy: { order: "asc" },
        },
        images: {
          orderBy: { order: "asc" },
        },
      },
    });
    if (project) {
      if (options.onlyPublished && !project.isPublished) return null;
      return project;
    }
  } catch (error) {
    console.warn("DB not connected, searching seed projects:", (error as any).message);
  }

  const found = INITIAL_PROJECTS.find((p) => p.slug === slug);
  if (!found) return null;
  if (options.onlyPublished && !found.isPublished) return null;

  return {
    ...found,
    technologies: found.technologies.map((t, idx) => ({ id: `tech_${idx}`, name: t, projectId: found.id, category: null })),
    features: found.features.map((f, idx) => ({ id: `feat_${idx}`, title: f.title, description: f.description, isCompleted: f.isCompleted, order: idx, projectId: found.id })),
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getServicesData() {
  try {
    const services = await prisma.service.findMany({
      where: { isEnabled: true },
      orderBy: { order: "asc" },
    });
    if (services.length > 0) return services;
  } catch (error) {
    console.warn("DB not connected, using seed services:", (error as any).message);
  }
  return INITIAL_SERVICES;
}

export async function getTimelineData() {
  try {
    const timeline = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    if (timeline.length > 0) return timeline;
  } catch (error) {
    console.warn("DB not connected, using seed timeline:", (error as any).message);
  }
  return INITIAL_TIMELINE;
}

export async function getLearningMilestonesData() {
  try {
    const milestones = await prisma.learningMilestone.findMany({
      orderBy: { milestoneDate: "asc" },
    });
    if (milestones.length > 0) return milestones;
  } catch (error) {
    console.warn("DB not connected, using seed milestones:", (error as any).message);
  }
  return INITIAL_LEARNING_MILESTONES;
}
