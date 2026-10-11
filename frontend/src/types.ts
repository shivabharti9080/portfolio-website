export type Skill = {
  name: string;
  category: string;
  level: number;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  status: 'Planned' | 'In Development' | 'Prototype' | 'Completed';
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
  fullDescription: string;
  features: string[];
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  positioning: string;
  status: string;
  accent: string;
  website?: string;
  social?: string;
};

export type ExperienceItem = {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  type: 'Education' | 'Project' | 'Learning' | 'Achievement';
};

export type AiModel = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'Available' | 'Coming Soon' | 'Prototype';
  dataset?: string;
  inputs: string[];
};

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
