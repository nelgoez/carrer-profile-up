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

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Shell: '#89E051',
  HTML: '#E34F26',
  CSS: '#5632C0',
};

function langColor(lang: string | null): string {
  return lang ? LANGUAGE_COLORS[lang] ?? '#888' : '#888';
}

function SkeletonCard() {
  return (
    <div className="block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 w-48 rounded bg-zinc-700" />
        <div className="h-4 w-12 rounded bg-zinc-700" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-zinc-700" />
        <div className="h-3 w-3/4 rounded bg-zinc-700" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-20 rounded bg-zinc-700" />
        <div className="h-3 w-28 rounded bg-zinc-700" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/nelgoez/repos?sort=updated&per_page=10&type=public')
      .then(async r => r.json())
      .then((data: Repo[]) => {
        const featured = data.filter(r => FEATURED.includes(r.name));
        const rest = data.filter(r => !FEATURED.includes(r.name) && !r.private).slice(0, 4);
        setRepos([...featured, ...rest]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : repos.map(repo => (
              <a
                key={repo.name}
                href={repo.html_url}
                className="block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{repo.name}</h3>
                    {FEATURED.includes(repo.name) && (
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                        Featured
                      </span>
                    )}
                  </div>
                  {repo.stargazers_count > 0 && (
                    <span className="shrink-0 text-sm text-[var(--color-text-muted)]">
                      ★
                      {' '}
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                  {repo.description ?? 'No description'}
                </p>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span
                        key={topic}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-300 border border-zinc-600/40"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span>
                    Updated
                    {' '}
                    {new Date(repo.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
