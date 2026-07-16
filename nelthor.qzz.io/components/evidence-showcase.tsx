'use client';

import { ArrowUpRight, BugPlay, FlaskConical, Monitor, Workflow } from 'lucide-react';
import { Carousel } from '@/components/carousel';
import { useLocale } from '@/lib/locale-context';

const ITEMS = [
  {
    icon: Workflow,
    img: '/media/screenshots/CI-workers.png',
    titleKey: 'evidence.ci-pipelines',
    descKey: 'evidence.ci-pipelines-desc',
  },
  {
    icon: FlaskConical,
    img: '/media/qa/allure-smoke-report.png',
    titleKey: 'evidence.test-reports',
    descKey: 'evidence.test-reports-desc',
  },
  {
    icon: BugPlay,
    img: '/media/qa/jira-board.png',
    titleKey: 'evidence.bug-evidence',
    descKey: 'evidence.bug-evidence-desc',
  },
  {
    icon: Monitor,
    img: '/media/screenshots/coding-session.png',
    titleKey: 'evidence.coding-sessions',
    descKey: 'evidence.coding-sessions-desc',
  },
];

export function EvidenceShowcase() {
  const { t } = useLocale();
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-2">{t('evidence.title')}</h2>
      <p className="text-[var(--color-text-muted)] mb-10 max-w-2xl">{t('evidence.description')}</p>

      <Carousel
        slides={ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.titleKey} className="group">
              <div className="browser-mockup rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 hover:border-[var(--color-accent)]/50">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-[11px] text-[var(--color-text-muted)] font-mono">nelthor.com.ar</span>
                </div>
                <div className="aspect-video overflow-hidden bg-[var(--color-bg)]">
                  <img
                    src={item.img}
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <Icon size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <div>
                  <h3 className="font-semibold text-sm">{t(item.titleKey)}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{t(item.descKey)}</p>
                </div>
              </div>
            </div>
          );
        })}
      />

      <div className="mt-10 text-center">
        <a
          href="/qa"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
        >
          {t('evidence.view-qa')}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
