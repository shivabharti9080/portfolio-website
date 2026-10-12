import { NextResponse } from "next/server";


export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "shivabharti9080";
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Shiva-Bharti-Portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}`);
      return NextResponse.json({
        success: true,
        data: [],
        message: "GitHub API limit reached or repositories temporarily unavailable. Direct profile link is active.",
        profileUrl: `https://github.com/${username}`,
      });
    }

    const repos = await res.json();
    const formatted = Array.isArray(repos)
      ? repos
          .filter((r) => !r.fork)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            htmlUrl: r.html_url,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            updatedAt: r.updated_at,
          }))
      : [];

    return NextResponse.json({
      success: true,
      data: formatted,
      profileUrl: `https://github.com/${username}`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      data: [],
      error: error.message,
      profileUrl: `https://github.com/${username}`,
    });
  }
}
