'use client';

import { useEffect, useState } from 'react';

interface Repo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  private: boolean
  updated_at: string
}

const FEATURED = ['bunkai-qa-engineering', 'agentic-diplo-track-sys', 'food-app', 'diploma-tracking-sys'];

export function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/nelgoez/repos?sort=updated&per_page=10&type=public')
      .then(async r => r.json())
      .then((data: Repo[]) => {
        const featured = data.filter(r => FEATURED.includes(r.name));
        const rest = data.filter(r => !FEATURED.includes(r.name) && !r.private).slice(0, 4);
        setRepos([...featured, ...rest]);
      })
      .catch(() => {});
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map(repo => (
          <a
            key={repo.name}
            href={repo.html_url}
            className="block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{repo.name}</h3>
              {repo.stargazers_count > 0 && (
                <span className="text-sm text-[var(--color-text-muted)]">
                  ★
                  {repo.stargazers_count}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
              {repo.description ?? 'No description'}
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  {repo.language}
                </span>
              )}
              <span>{new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
