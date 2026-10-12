import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  INITIAL_PROFILE,
  INITIAL_SKILL_CATEGORIES,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TIMELINE,
  INITIAL_LEARNING_MILESTONES,
} from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Shiva Bharti Portfolio Database Seeding...");

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "shivaharti9080@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminSecurePassword2026!";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Shiva Bharti",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      name: "Shiva Bharti",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Profile
  await prisma.profile.upsert({
    where: { id: INITIAL_PROFILE.id },
    update: { ...INITIAL_PROFILE },
    create: { ...INITIAL_PROFILE },
  });
  console.log("✅ Profile seeded.");

  // 3. Skill Categories and Skills
  for (const cat of INITIAL_SKILL_CATEGORIES) {
    const createdCat = await prisma.skillCategory.upsert({
      where: { name: cat.name },
      update: {
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      },
    });

    for (const sk of cat.skills) {
      await prisma.skill.upsert({
        where: { id: sk.id },
        update: {
          name: sk.name,
          categoryId: createdCat.id,
          status: sk.status as any,
          ratingScore: sk.ratingScore,
          isFeatured: sk.isFeatured,
          order: sk.order,
        },
        create: {
          id: sk.id,
          name: sk.name,
          categoryId: createdCat.id,
          status: sk.status as any,
          ratingScore: sk.ratingScore,
          isFeatured: sk.isFeatured,
          order: sk.order,
        },
      });
    }
  }
  console.log("✅ Skill categories and skills seeded.");

  // 4. Learning Milestones
  for (const ms of INITIAL_LEARNING_MILESTONES) {
    await prisma.learningMilestone.upsert({
      where: { id: ms.id },
      update: {
        title: ms.title,
        category: ms.category,
        description: ms.description,
        milestoneDate: ms.milestoneDate,
        isVerified: ms.isVerified,
        order: ms.order,
      },
      create: {
        id: ms.id,
        title: ms.title,
        category: ms.category,
        description: ms.description,
        milestoneDate: ms.milestoneDate,
        isVerified: ms.isVerified,
        order: ms.order,
      },
    });
  }
  console.log("✅ Learning milestones seeded.");

  // 5. Projects
  for (const p of INITIAL_PROJECTS) {
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        category: p.category,
        status: p.status as any,
        isFeatured: p.isFeatured,
        isPublished: p.isPublished,
        problemStatement: p.problemStatement,
        proposedSolution: p.proposedSolution,
        systemArchitecture: p.systemArchitecture,
        challengesLearned: p.challengesLearned,
        futureRoadmap: p.futureRoadmap,
        targetAudience: p.targetAudience,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        order: p.order,
      },
      create: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        category: p.category,
        status: p.status as any,
        isFeatured: p.isFeatured,
        isPublished: p.isPublished,
        problemStatement: p.problemStatement,
        proposedSolution: p.proposedSolution,
        systemArchitecture: p.systemArchitecture,
        challengesLearned: p.challengesLearned,
        futureRoadmap: p.futureRoadmap,
        targetAudience: p.targetAudience,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        order: p.order,
      },
    });

    // Technologies
    await prisma.projectTechnology.deleteMany({ where: { projectId: project.id } });
    for (const tech of p.technologies) {
      await prisma.projectTechnology.create({
        data: {
          projectId: project.id,
          name: tech,
        },
      });
    }

    // Features
    await prisma.projectFeature.deleteMany({ where: { projectId: project.id } });
    for (let i = 0; i < p.features.length; i++) {
      const feat = p.features[i];
      await prisma.projectFeature.create({
        data: {
          projectId: project.id,
          title: feat.title,
          description: feat.description,
          isCompleted: feat.isCompleted,
          order: i + 1,
        },
      });
    }
  }
  console.log("✅ Projects, technologies, and features seeded.");

  // 6. Services
  for (const s of INITIAL_SERVICES) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        description: s.description,
        deliverables: s.deliverables,
        technologies: s.technologies,
        iconName: s.iconName,
        isEnabled: s.isEnabled,
        order: s.order,
      },
      create: {
        id: s.id,
        title: s.title,
        description: s.description,
        deliverables: s.deliverables,
        technologies: s.technologies,
        iconName: s.iconName,
        isEnabled: s.isEnabled,
        order: s.order,
      },
    });
  }
  console.log("✅ Services seeded.");

  // 7. Timeline / Experience
  for (const exp of INITIAL_TIMELINE) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {
        type: exp.type as any,
        title: exp.title,
        organization: exp.organization,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.description,
        skillsUsed: exp.skillsUsed,
        order: exp.order,
      },
      create: {
        id: exp.id,
        type: exp.type as any,
        title: exp.title,
        organization: exp.organization,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.description,
        skillsUsed: exp.skillsUsed,
        order: exp.order,
      },
    });
  }
  console.log("✅ Timeline items seeded.");

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
