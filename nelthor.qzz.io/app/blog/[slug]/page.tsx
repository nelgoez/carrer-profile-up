import Link from 'next/link';

const POSTS: Record<string, { title: string; date: string; content: string[] }> = {
  'how-i-built-this-portfolio': {
    title: 'How I Built This Portfolio — With AI Agents',
    date: '2026-07-01',
    content: [
      'This portfolio (nelthor.qzz.io) was built using agentic development workflows — not as a gimmick, but as a demonstration of how AI-augmented engineering works in practice.',
      '',
      '## The Stack',
      '',
      'Next.js 15 static export, Tailwind CSS 4, TypeScript. Deployed to GitHub Pages with a free domain from DigitalPlat (qzz.io) and DNS hosted on FreeDNS (afraid.org). Standard tools, standard setup — but the process was anything but standard.',
      '',
      '## How It Was Built',
      '',
      'Every feature followed the same cycle:',
      '',
      '1. Plan — /project-foundation defined the spec (PRD, SRS, design)',
      '2. Refine — /product-management structured the backlog into epics and stories',
      '3. Implement — /sprint-development drove each story through code, review, and deploy',
      '4. Verify — Health checks (bun run health:check) validated assets, freshness, and consistency',
      '',
      'The AI never worked alone. It proposed, I approved. It coded, I reviewed. It deployed, I verified.',
      '',
      '## The Agentic QA Angle',
      '',
      'As a QA engineer, I approached this the same way I approach any deliverable: define acceptance criteria, test as you build, verify before shipping. The AI skills handled execution — I handled judgment.',
      '',
      'The same discipline that catches bugs in production also catches broken layouts, stale content, and inconsistent branding. Quality is quality, whether the code is hand-typed or AI-generated.',
      '',
      '## What It Proves',
      '',
      'This portfolio proves that agentic development is not about replacing engineers. It is about shifting the work from writing code to directing quality. The AI handles the mechanics; the engineer handles the intent.',
      '',
      'That is what Agentic QA Engineer means to me.',
    ],
  },
};

export function generateStaticParams() {
  return [{ slug: 'how-i-built-this-portfolio' }];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) return <main><p>Post not found</p></main>;

  return (
    <main>
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">← Back to Blog</Link>
      </div>
      <article className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">{post.date}</p>
        {post.content.map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
          if (line === '') return <br key={i} />;
          return <p key={i} className="text-[var(--color-text)] mb-4">{line}</p>;
        })}
      </article>
    </main>
  );
}
