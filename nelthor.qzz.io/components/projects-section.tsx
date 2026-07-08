'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/locale-context';

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

interface SyncedProject {
  name: string
  displayName: string
  description: string
  url: string
  language: string | null
  tags: string[]
  thumbnail: string | null
  featured: boolean
  order: number
  updatedAt: string
  screenshots: { path: string, alt: string }[]
  links: Record<string, string>
}

interface MergedCard {
  name: string
  displayName: string
  description: string
  url: string
  language: string | null
  tags: string[]
  thumbnail: string | null
  featured: boolean
  stargazersCount: number
  updatedAt: string
}

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

function buildCard(repo: Repo, synced?: SyncedProject): MergedCard {
  return {
    name: repo.name,
    displayName: synced?.displayName ?? repo.name,
    description: synced?.description ?? repo.description ?? '',
    url: repo.html_url,
    language: repo.language,
    tags: synced?.tags ?? repo.topics ?? [],
    thumbnail: synced?.thumbnail ?? null,
    featured: synced?.featured ?? false,
    stargazersCount: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
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

interface Props {
  initialProjects?: SyncedProject[]
}

export function ProjectsSection({ initialProjects }: Props) {
  const { t, locale } = useLocale();
  const [cards, setCards] = useState<MergedCard[]>(() => {
    if (!initialProjects) { return []; }
    return initialProjects.map(s => ({
      name: s.name,
      displayName: s.displayName,
      description: s.description,
      url: s.url,
      language: s.language,
      tags: s.tags,
      thumbnail: s.thumbnail,
      featured: s.featured,
      stargazersCount: 0,
      updatedAt: s.updatedAt,
    }));
  });
  const [loading, setLoading] = useState(!initialProjects);

  useEffect(() => {
    fetch('https://api.github.com/users/nelgoez/repos?sort=updated&per_page=10&type=public')
      .then(async r => r.json())
      .then((data: Repo[]) => {
        const syncedMap = new Map(initialProjects?.map(s => [s.name, s]) ?? []);
        const cards = data.map(r => buildCard(r, syncedMap.get(r.name)));
        setCards(cards);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">{t('projects.featured-title')}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : cards.map(card => (
              <a
                key={card.name}
                href={card.url}
                className="block p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{card.displayName}</h3>
                    {card.featured && (
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                        {t('projects.featured-badge')}
                      </span>
                    )}
                  </div>
                  {card.stargazersCount > 0 && (
                    <span className="shrink-0 text-sm text-[var(--color-text-muted)]">
                      ★
                      {' '}
                      {card.stargazersCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                  {card.description || t('projects.no-description')}
                </p>
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {card.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-300 border border-zinc-600/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  {card.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor(card.language) }}
                      />
                      {card.language}
                    </span>
                  )}
                  <span>
                    {t('projects.updated')}
                    {' '}
                    {new Date(card.updatedAt).toLocaleDateString(locale === 'es' ? 'es-AR' : 'en-US', {
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
