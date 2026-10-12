"use client";

import React, { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

interface GitHubSectionProps {
  username?: string;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({
  username = "shivabharti9080",
}) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const res = await fetch("/api/github/repos");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setRepos(json.data);
        } else {
          setError(json.message || "Public profile link active.");
        }
      } catch (err: any) {
        setError("GitHub integration rate limited or offline.");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section
      id="github"
      aria-label="GitHub Repositories and Code Activity"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono text-[#F4B400] mb-3">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>04 / OPEN SOURCE & CODE REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            GitHub Activity & Repositories.
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base max-w-xl leading-relaxed">
            Live public repositories fetched via GitHub REST API with caching and fallback safeguards.
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass-panel text-white hover:border-[#F4B400]/40 transition-colors"
        >
          <GithubIcon className="w-4 h-4 text-[#F4B400]" />
          <span>github.com/{username}</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
        </a>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-3xl border-white/10 gap-3">
          <RefreshCw className="w-6 h-6 text-[#F4B400] animate-spin" />
          <p className="text-xs font-mono text-zinc-400">Fetching live repositories from GitHub API...</p>
        </div>
      )}

      {/* Grid of Repos */}
      {!loading && repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: Repository) => (
            <a
              key={repo.id}
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border-white/10 hover:border-[#F4B400]/40 transition-all block group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-[#FFF4D6] transition-colors truncate">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-[#F4B400] transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {repo.description || "Public repository for ongoing software and automation development."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                  {repo.language || "Code"}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400/80" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Graceful Fallback if API rate limited or no repos */}
      {!loading && repos.length === 0 && (
        <div className="glass-panel p-10 rounded-3xl border-white/10 text-center">
          <GithubIcon className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-2">GitHub Repositories Active</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
            {error || "GitHub rate limits apply for unauthenticated requests. You can explore all open-source repositories directly on Shiva's profile."}
          </p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#F4B400] text-black font-semibold text-xs transition-colors hover:bg-[#FFF4D6]"
          >
            <span>Visit @{username} on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </section>
  );
};
