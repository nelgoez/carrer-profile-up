import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

interface Params { slug: string }

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  return { frontmatter: data, content };
}

function getAllSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <main>
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
            ← Back to Blog
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Back to Blog
        </Link>
      </div>

      <article className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">{post.frontmatter.title}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">{post.frontmatter.date}</p>
        <div className="prose-custom">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
    </main>
  );
}
