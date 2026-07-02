'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';

const SCORE = [
  { layerKey: 'qa.layer-ui', scoreKey: 'qa.layer-ui-score', detailKey: 'qa.layer-ui-detail', color: '#F59E0B' },
  { layerKey: 'qa.layer-api', scoreKey: 'qa.layer-api-score', detailKey: 'qa.layer-api-detail', color: '#10B981' },
  { layerKey: 'qa.layer-db', scoreKey: 'qa.layer-db-score', detailKey: 'qa.layer-db-detail', color: '#F59E0B' },
  { layerKey: 'qa.layer-cicd', scoreKey: 'qa.layer-cicd-score', detailKey: 'qa.layer-cicd-detail', color: '#10B981' },
];

const SCREENSHOTS = [
  { src: '/media/qa/allure-smoke-report.png', key: 'qa.evidence-allure-smoke' },
  { src: '/media/qa/allure-tests.png', key: 'qa.evidence-allure-tests' },
  { src: '/media/qa/jira-board.png', key: 'qa.evidence-jira-board' },
  { src: '/media/qa/bk147-app-shell-with-sidebar.png', key: 'qa.evidence-bug1' },
  { src: '/media/qa/bk147-multi-tab.png', key: 'qa.evidence-bug2' },
  { src: '/media/qa/bk147-tc10-not-found.png', key: 'qa.evidence-bug3' },
];

export default function QAPage() {
  const { t } = useLocale();

  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ←
          {' '}
          {t('cv.back')}
        </Link>
      </div>

      <header className="mb-16">
        <h1 className="text-3xl font-bold mb-4">{t('qa.title')}</h1>
        <p className="text-lg text-[var(--color-text-muted)]">{t('qa.subtitle')}</p>
      </header>

      <section className="mb-16 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <h2 className="text-xl font-bold mb-3">{t('qa.approach-title')}</h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed">{t('qa.approach')}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{t('qa.scorecard-title')}</h2>
        <p className="text-[var(--color-text-muted)] mb-8">{t('qa.scorecard-desc')}</p>
        <div className="space-y-4">
          {SCORE.map(s => (
            <div key={s.layerKey} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{t(s.layerKey)}</h3>
                <span
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${s.color}20`,
                    color: s.color,
                    border: `1px solid ${s.color}40`,
                  }}
                >
                  {t(s.scoreKey)}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{t(s.detailKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{t('qa.evidence-title')}</h2>
        <p className="text-[var(--color-text-muted)] mb-8">{t('qa.evidence-desc')}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {SCREENSHOTS.map(s => (
            <div key={s.key} className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <a href={s.src} target="_blank">
                <img
                  src={s.src}
                  alt={t(s.key)}
                  className="w-full rounded-lg border border-[var(--color-border)]"
                  loading="lazy"
                />
              </a>
              <p className="text-xs text-[var(--color-text-muted)] mt-2 px-1">{t(s.key)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
        <h2 className="text-xl font-bold mb-4">{t('qa.cta')}</h2>
        <a
          href="mailto:gomeznahuel@gmail.com"
          className="inline-block px-6 py-3 rounded-lg bg-[var(--color-accent-strong)] text-white font-semibold hover:opacity-90 shadow-sm"
        >
          {t('qa.cta-button')}
        </a>
      </section>
    </main>
  );
}
