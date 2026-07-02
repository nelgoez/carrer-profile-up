'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { GitFork, Activity, ShieldCheck, Briefcase } from 'lucide-react';

interface Metric {
  icon: typeof GitFork
  value: number
  suffix?: string
  labelKey: string
}

function useCountUp(target: number, duration = 1500): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function AnimatedMetric({ icon: Icon, value, suffix, labelKey }: Metric) {
  const { t } = useLocale();
  const count = useCountUp(value);
  return (
    <div className="text-center p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] scroll-reveal">
      <Icon size={24} className="mx-auto mb-3 text-[var(--color-accent)]" />
      <div className="text-3xl font-bold mb-1">
        {count}
        {suffix ?? ''}
      </div>
      <div className="text-sm text-[var(--color-text-muted)]">{t(labelKey)}</div>
    </div>
  );
}

export function ImpactMetrics() {
  const { t } = useLocale();
  const metrics: Metric[] = [
    { icon: GitFork, value: 14, labelKey: 'metrics.repos' },
    { icon: Activity, value: 6, suffix: '+', labelKey: 'metrics.workflows' },
    { icon: ShieldCheck, value: 78, suffix: '%', labelKey: 'metrics.coverage' },
    { icon: Briefcase, value: 5, suffix: '+', labelKey: 'metrics.experience' },
  ];

  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-2">{t('metrics.title')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {metrics.map(m => (
          <AnimatedMetric key={m.labelKey} {...m} />
        ))}
      </div>
    </section>
  );
}
