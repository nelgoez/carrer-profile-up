'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';

export function HeroSection() {
  const { t } = useLocale();
  return (
    <section className="py-20 text-center hero-fade-in">
      <div className="hero-name-wrapper">
        <div className="hero-glow" />
        <h1 className="text-5xl font-bold mb-4">Nahuel Gomez</h1>
      </div>
      <p className="text-xl text-[var(--color-text-muted)] mb-6">
        <span className="tagline-cursor">{t('hero.tagline')}</span>
      </p>
      <p className="max-w-2xl mx-auto text-[var(--color-text-muted)]">{t('hero.bio')}</p>
      <div className="flex gap-4 justify-center mt-8">
        <Link href="/projects" className="px-6 py-2 rounded-lg bg-[var(--color-accent-strong)] text-white font-semibold hover:opacity-90 shadow-sm">
          {t('hero.view-projects')}
        </Link>
        <a href="/cv" className="px-6 py-2 rounded-lg bg-[var(--color-accent-strong)] text-white font-semibold hover:opacity-90 shadow-sm">
          {t('hero.download-cv')}
        </a>
        <a href="mailto:gomeznahuel@gmail.com" className="px-6 py-2 rounded-lg border border-[var(--color-accent)] text-[var(--color-accent)] font-medium hover:opacity-80">
          {t('hero.contact')}
        </a>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const { t } = useLocale();
  const categories = [
    { titleKey: 'skills.testing', skills: ['Playwright', 'Cucumber', 'Selenium', 'Robot Framework', 'Jest', 'WebdriverIO', 'Allure', 'Postman'] },
    { titleKey: 'skills.languages', skills: ['TypeScript', 'Python', 'Node.js', 'Next.js', 'Express', 'PostgreSQL', 'Supabase', 'Firebase'] },
    { titleKey: 'skills.tools', skills: ['GitHub Actions', 'Jenkins', 'Docker', 'Vercel', 'Jira', 'Confluence', 'Git', 'Linux'] },
  ];
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-8">{t('skills.title')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map(cat => (
          <div key={cat.titleKey}>
            <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">{t(cat.titleKey)}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  const { t } = useLocale();
  return (
    <section className="py-16 border-t border-[var(--color-border)] text-center">
      <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
      <p className="text-[var(--color-text-muted)] mb-6">{t('contact.description')}</p>
      <div className="flex gap-4 justify-center">
        <a href="https://linkedin.com/in/nelgoez" className="px-6 py-2 rounded-lg bg-[var(--color-accent-strong)] text-white font-semibold hover:opacity-90 shadow-sm">{t('contact.linkedin')}</a>
        <a href="https://github.com/nelgoez" className="px-6 py-2 rounded-lg border border-[var(--color-accent-strong)] text-[var(--color-accent-strong)] font-medium hover:opacity-80">{t('contact.github')}</a>
        <a href="mailto:gomeznahuel@gmail.com" className="px-6 py-2 rounded-lg border border-[var(--color-accent-strong)] text-[var(--color-accent-strong)] font-medium hover:opacity-80">{t('contact.email')}</a>
      </div>
    </section>
  );
}

export function LatestPostsSection({ posts }: { posts: { title: string, date: string, description: string, slug: string }[] }) {
  const { t } = useLocale();
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-4">{t('latest-posts.title')}</h2>
      <p className="text-[var(--color-text-muted)] mb-8">{t('latest-posts.description')}</p>
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
              <div className="text-xs text-[var(--color-text-muted)] mb-2">{post.date}</div>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">{post.description}</p>
            </article>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/blog" className="text-[var(--color-accent)] hover:underline text-sm">{t('latest-posts.view-all')}</Link>
      </div>
    </section>
  );
}

export function BtsTeaserSection() {
  const { t } = useLocale();
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-4">{t('behind-the-scenes.title')}</h2>
      <p className="text-[var(--color-text-muted)] mb-6">{t('behind-the-scenes.description')}</p>
      <Link href="/behind-the-scenes" className="text-[var(--color-accent)] hover:underline">{t('behind-the-scenes.cta')}</Link>
    </section>
  );
}
