import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Nahuel Elias — Agentic QA Engineer',
  description:
    'QA Automation Engineer with 5+ years at Newfold Digital. SDET → Agentic QA Engineer. TypeScript, Python, Playwright, Cucumber.',
  openGraph: {
    title: 'Nahuel Elias — Agentic QA Engineer',
    description: 'QA Automation Engineer | Backend Dev | TypeScript & Python',
    url: 'https://nelthor.qzz.io',
    siteName: 'nelthor.qzz.io',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="max-w-4xl mx-auto px-4 py-12">{children}</body>
    </html>
  );
}
