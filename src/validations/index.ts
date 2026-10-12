import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(150, "Email is too long"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2).optional(),
  headline: z.string().min(5).optional(),
  bio: z.string().min(10).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  githubUsername: z.string().optional(),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().optional().nullable(),
  twitterUrl: z.string().optional().nullable(),
  avatarUrl: z.string().optional(),
  availableForWork: z.boolean().optional(),
  availabilityStatus: z.string().optional(),
  aboutApproach: z.string().optional(),
  whatIBuild: z.string().optional(),
  whatIAmLearning: z.string().optional(),
  whatIWantToBuildNext: z.string().optional(),
});

export const ProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  category: z.string(),
  status: z.enum(["CONCEPT", "IN_PROGRESS", "COMPLETED", "PUBLISHED"]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  thumbnailUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  demoUrl: z.string().optional().nullable(),
  problemStatement: z.string().optional().nullable(),
  proposedSolution: z.string().optional().nullable(),
  systemArchitecture: z.string().optional().nullable(),
  challengesLearned: z.string().optional().nullable(),
  futureRoadmap: z.string().optional().nullable(),
  targetAudience: z.string().optional().nullable(),
  order: z.number().int().default(0),
  technologies: z.array(z.string()).optional(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    isCompleted: z.boolean().default(false),
  })).optional(),
});

export const SkillSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string(),
  status: z.enum(["LEARNING", "PRACTICING", "PROFICIENT"]),
  ratingScore: z.number().min(1).max(100).optional().nullable(),
  order: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
});

export const MilestoneSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  category: z.string().optional().nullable(),
  milestoneDate: z.string().or(z.date()),
  isVerified: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const ExperienceSchema = z.object({
  type: z.enum(["EDUCATION", "LEARNING_MILESTONE", "PROJECT", "INTERNSHIP", "CERTIFICATION", "OTHER"]),
  title: z.string().min(2),
  organization: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(5),
  skillsUsed: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const ServiceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  deliverables: z.string(),
  technologies: z.string(),
  iconName: z.string().optional().nullable(),
  isEnabled: z.boolean().default(true),
  order: z.number().int().default(0),
});
