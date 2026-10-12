import React from "react";
import { getAdminSession } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import {
  getProfileData,
  getSkillsData,
  getProjectsData,
} from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";



export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    return <AdminLogin />;
  }

  // Load all data including unpublished projects and contact messages
  const [profile, skills, projects] = await Promise.all([
    getProfileData(),
    getSkillsData(),
    getProjectsData({ onlyPublished: false }),
  ]);

  let messages: any[] = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {}

  let resume: any = { filename: "Shiva_Bharti_Resume.pdf" };
  try {
    const r = await prisma.resumeAsset.findFirst({
      where: { isCurrent: true },
      orderBy: { uploadedAt: "desc" },
    });
    if (r) resume = r;
  } catch (e) {}

  return (
    <AdminDashboardClient
      initialProfile={profile}
      initialProjects={projects}
      initialSkills={skills}
      initialMessages={messages}
      initialResume={resume}
    />
  );
}
