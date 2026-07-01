import type { ReactNode } from 'react';
import { NavClient } from '@/components/nav-client';
import { LocaleProvider } from '@/lib/locale-context';

import './globals.css';

export const metadata = {
  title: 'Nahuel Gomez — Agentic QA Engineer',
  description:
    'QA Automation Engineer with 5+ years at Newfold Digital. SDET → Agentic QA Engineer. TypeScript, Python, Playwright, Cucumber.',
  openGraph: {
    title: 'Nahuel Gomez — Agentic QA Engineer',
    description: 'QA Automation Engineer | Backend Dev | TypeScript & Python',
    url: 'https://nelthor.qzz.io',
    siteName: 'nelthor.qzz.io',
    type: 'website',
    images: [{ url: 'https://nelthor.qzz.io/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="max-w-4xl mx-auto px-4 py-12">
        <LocaleProvider>
          <nav className="flex gap-6 mb-12 text-sm text-[var(--color-text-muted)] items-center">
            <NavClient />
          </nav>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
