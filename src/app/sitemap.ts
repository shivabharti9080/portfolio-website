import { MetadataRoute } from "next";
import { getProjectsData } from "@/services/portfolioService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.AUTH_URL || "https://shivabharti.dev";
  const projects = await getProjectsData({ onlyPublished: true });

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
