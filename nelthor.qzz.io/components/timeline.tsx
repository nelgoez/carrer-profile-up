const EXPERIENCE = [
  {
    role: 'SDET — Quality Engineering',
    company: 'Newfold Digital (Florida, USA)',
    period: '2021 – 2025',
    details: [
      'Built and maintained test automation frameworks using Cucumber + TypeScript across multiple product lines',
      'Developed Robot Framework + Python test suites for backend API validation',
      'Managed CI/CD pipelines on Jenkins integrated with Jira for full traceability',
      'Reduced regression cycle time by 60% through parallel test execution and framework optimization',
      'Collaborated with distributed US/India teams on quality strategy and release sign-off',
    ],
  },
  {
    role: 'Agentic QA Engineer',
    company: 'UPEX Galaxy — Course Projects',
    period: '2025 – Present',
    details: [
      'Built bunkai-qa-engineering: agentic QA platform with KATA architecture',
      'Developed diploma tracking system with Supabase backend, RLS security, and Moodle integration',
      'Expanded food-app Jest coverage 40%→78% + Playwright E2E critical paths',
      'Pioneered agentic development workflows using AI-assisted coding + multi-skill orchestration',
      'Implemented autonomous mode gate bypass for streamlined development pipelines',
    ],
  },
];

export function Timeline() {
  return (
    <div className="space-y-8">
      {EXPERIENCE.map(exp => (
        <div key={exp.role} className="border-l-2 border-[var(--color-accent)] pl-6 py-2">
          <div className="text-sm text-[var(--color-text-muted)] mb-1">{exp.period}</div>
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <div className="text-[var(--color-accent)] mb-3">{exp.company}</div>
          <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
            {exp.details.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
