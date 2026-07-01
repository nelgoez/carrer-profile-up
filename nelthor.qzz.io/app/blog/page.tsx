import Link from 'next/link';

const POSTS = [
  {
    title: 'From SDET to Agentic QA Engineer',
    date: '2026-07-01',
    description: 'How 4.5 years at Newfold Digital shaped my transition from traditional test automation to agentic AI-driven quality engineering.',
    tags: ['Career', 'Agentic QA'],
    slug: 'sdet-to-agentic-qa',
  },
  {
    title: 'Testing AI Agents — A Practical Guide',
    date: '2026-06-28',
    description: 'Strategies for validating non-deterministic AI outputs, agentic workflows, and probabilistic behaviors in production systems.',
    tags: ['Testing', 'AI', 'Guide'],
    slug: 'testing-ai-agents',
  },
  {
    title: 'Building a KATA Framework with Playwright',
    date: '2026-06-20',
    description: 'Step-by-step tutorial on implementing Component Action Test Architecture with Playwright and TypeScript.',
    tags: ['Tutorial', 'Playwright', 'KATA'],
    slug: 'kata-framework-playwright',
  },
  {
    title: 'Behind the Scenes: Same Problem, Two Eras',
    date: '2026-06-15',
    description: 'Side-by-side comparison of traditional vs agentic development workflows — from Jenkins pipelines to AI-assisted coding.',
    tags: ['Meta', 'Agentic', 'Process'],
    slug: 'behind-the-scenes-two-eras',
  },
  {
    title: 'How I Built This Portfolio — With AI Agents',
    date: '2026-07-01',
    description: 'From spec to deploy, this portfolio was built using agentic development workflows. No magic — just structured skill orchestration and human judgment.',
    tags: ['Meta', 'Agentic', 'Portfolio'],
    slug: 'how-i-built-this-portfolio',
  },
];

export default function BlogPage() {
  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-[var(--color-text-muted)] mb-12">
        Thoughts on QA engineering, agentic development, and career growth.
      </p>

      <div className="space-y-8">
        {POSTS.map(post => (
          <article key={post.slug} className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">{post.date}</div>
            <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
            <p className="text-[var(--color-text-muted)] mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
