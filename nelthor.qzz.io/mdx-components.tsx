import type { MDXComponents } from 'mdx/types';

const TABLE_CLASS = 'min-w-full border-collapse mb-6 text-sm';
const TH_CLASS = 'border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-left font-semibold';
const TD_CLASS = 'border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-[var(--color-text)] mb-5 leading-7">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2 text-[var(--color-text)]">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-[var(--color-text)]">{children}</ol>,
    li: ({ children }) => <li className="text-[var(--color-text)] leading-7">{children}</li>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-[#1a1a2e] text-[#e2e8f0] border border-[#2a2a4a] text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-5 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] overflow-x-auto mb-6 text-sm leading-6 shadow-lg">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[var(--color-accent)] hover:underline">{children}</a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-5 my-6 italic text-[var(--color-text-muted)] leading-7">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-[var(--color-border)]" />,
    table: ({ children }) => <table className={TABLE_CLASS}>{children}</table>,
    th: ({ children }) => <th className={TH_CLASS}>{children}</th>,
    td: ({ children }) => <td className={TD_CLASS}>{children}</td>,
    img: ({ src, alt, title }) => (
      <figure className="my-6">
        <img src={src} alt={alt ?? ''} title={title} className="w-full rounded-xl border border-[var(--color-border)]" loading="lazy" />
        {alt && <figcaption className="text-xs text-center text-[var(--color-text-muted)] mt-2">{alt}</figcaption>}
      </figure>
    ),
    video: ({ src, title, controls, poster }) => (
      <figure className="my-6">
        <video src={src} title={title} controls={controls ?? true} poster={poster} className="w-full rounded-xl border border-[var(--color-border)]" />
        {title && <figcaption className="text-xs text-center text-[var(--color-text-muted)] mt-2">{title}</figcaption>}
      </figure>
    ),
    ...components,
  };
}
