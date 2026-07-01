import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-[var(--color-text)] mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-[var(--color-text)]">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-[var(--color-text)]">{children}</ol>,
    li: ({ children }) => <li className="text-[var(--color-text)]">{children}</li>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[var(--color-accent)] hover:underline">{children}</a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 my-4 italic text-[var(--color-text-muted)]">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-[var(--color-border)]" />,
    ...components,
  };
}
