import Link from 'next/link';

const COMPARISONS = [
  {
    task: 'Write test for new feature',
    traditional: 'Manual Cucumber feature file + step definitions + page objects (~2-4h)',
    agentic: 'AI generates from Acceptance Criteria → human reviews + adjusts (~20min)',
  },
  {
    task: 'CI/CD pipeline config',
    traditional: 'Jenkinsfile hand-coded with Groovy syntax, tested via trial-and-error',
    agentic: 'Agent proposes pipeline → human approves + adjusts parameters',
  },
  {
    task: 'Framework architecture',
    traditional: 'Researched patterns, POC\'d, coded layers over weeks',
    agentic: 'KATA framework scaffolded in hours via skills, composable from day one',
  },
  {
    task: 'Test reporting',
    traditional: 'Custom reporter code per project, HTML/XML output formats',
    agentic: 'KATA reporter + Allure out of the box, historical trends baked in',
  },
  {
    task: 'Git workflow',
    traditional: 'Manual branching, conflict resolution, PR management',
    agentic: 'git-flow-master skill handles branching + commits + PRs autonomously',
  },
];

export default function BehindTheScenesPage() {
  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Behind the Scenes</h1>
      <p className="text-[var(--color-text-muted)] mb-12">
        Same problems, two eras. How work was done at Newfold Digital (traditional SDET)
        vs how it&apos;s done now with agentic AI workflows.
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Traditional vs Agentic: Side by Side</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 px-4 font-semibold">Task</th>
                <th className="text-left py-3 px-4 font-semibold">Traditional (Newfold)</th>
                <th className="text-left py-3 px-4 font-semibold">Agentic (Current)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map(row => (
                <tr key={row.task} className="border-b border-[var(--color-border)]">
                  <td className="py-4 px-4 font-medium">{row.task}</td>
                  <td className="py-4 px-4 text-[var(--color-text-muted)]">{row.traditional}</td>
                  <td className="py-4 px-4 text-[var(--color-text-muted)]">{row.agentic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Architecture Evolution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h3 className="font-semibold mb-3">2019-2023: Traditional SDET</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Cucumber + TypeScript Page Object Model
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Robot Framework + Python for API tests
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Jenkins pipeline with manual stage config
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Allure reports, Jira traceability
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Manual Cucumber feature file authoring
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h3 className="font-semibold mb-3">2025+: Agentic QA</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                KATA framework with component-action-test layers
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                AI-driven test generation from AC Gherkin
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                GitHub Actions CI with multi-stage orchestration
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Autonomous mode gate bypass for sprint workflows
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>
                Health tooling: asset integrity, staleness, consistency
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">This Portfolio — Built with Agentic Workflows</h2>
        <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="text-[var(--color-text-muted)] mb-4">
            Everything you see on nelthor.qzz.io was planned, built, reviewed, and deployed using the
            agentic-dev workflow. The process:
          </p>
          <ol className="space-y-2 text-sm text-[var(--color-text-muted)] list-decimal list-inside">
            <li>
              Design spec defined via
              <code className="text-[var(--color-accent)]">/project-foundation</code>
            </li>
            <li>
              Content strategy via
              <code className="text-[var(--color-accent)]">/product-management</code>
            </li>
            <li>
              Landing page scaffolded via
              <code className="text-[var(--color-accent)]">/project-bootstrap</code>
            </li>
            <li>
              Each feature shipped via
              <code className="text-[var(--color-accent)]">/sprint-development</code>
            </li>
            <li>
              Quality gates via health tools +
              <code className="text-[var(--color-accent)]">bun run health:check</code>
            </li>
            <li>Autonomous mode enabled for faster iteration</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
