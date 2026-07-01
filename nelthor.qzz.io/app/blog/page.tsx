import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
}

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

  return files.map(f => {
    const source = fs.readFileSync(path.join(dir, f), 'utf8');
    const { data } = matter(source);
    return {
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags ?? [],
      slug: f.replace(/\.mdx$/, ''),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();

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
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
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
          </Link>
        ))}
      </div>
    </main>
  );
}
