'use client';

import Link from 'next/link';

export default function CVPage() {
  return (
    <main>
      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Back
        </Link>
        <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-[var(--color-accent-strong)] text-white text-sm font-semibold hover:opacity-90 print-hidden">
          Save as PDF
        </button>
      </div>

      <div className="cv-content max-w-3xl mx-auto p-8 md:p-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] print:border-none print:shadow-none">
        <header className="text-center mb-10 print:mb-8">
          <h1 className="text-3xl font-bold mb-2">Nahuel Leonardo Elias Gomez</h1>
          <p className="text-[var(--color-accent)] font-semibold mb-4">Senior QA Automation Engineer • SDET II • AI-Enhanced Quality Engineering</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span>📍 Córdoba, Argentina</span>
            <span>📞 +54 351 380-8759</span>
            <span>✉️ nahuelgomez.cti@gmail.com</span>
            <a href="https://linkedin.com/in/nelgoez" className="text-[var(--color-accent)]">💼 linkedin.com/in/nelgoez</a>
            <a href="https://github.com/nelgoez" className="text-[var(--color-accent)]">🐙 github.com/nelgoez</a>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Professional Summary</h2>
          <p className="text-[var(--color-text)] leading-relaxed">
            Senior QA Automation Engineer with 6 years of experience building and scaling test automation for web-based SaaS products.
            Specialized in Playwright, TypeScript, WebdriverIO, and Robot Framework, with a strong track record of migrating legacy suites,
            integrating tests into CI/CD pipelines, and driving shift-left quality culture. Fluent in English with extensive experience in
            distributed engineering teams.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Core Competencies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Test Automation', items: 'Playwright, Selenium WebDriver, WebdriverIO, Cypress, Robot Framework, Protractor, Cucumber' },
              { label: 'Languages', items: 'TypeScript, JavaScript, Python, Node.js' },
              { label: 'API Testing', items: 'REST APIs, Microservices, Middleware, Postman, Automated API suites' },
              { label: 'CI / CD', items: 'Jenkins, GitHub Actions — pipeline integration and maintenance' },
              { label: 'Frontend & CMS', items: 'React, Angular, WordPress, Redux, Express, Supabase, Firebase' },
              { label: 'Methodologies', items: 'Shift-Left Testing, KATA Architecture, Agile/Scrum, Test Plan Design' },
            ].map(cat => (
              <div key={cat.label} className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-1">{cat.label}</h3>
                <p className="text-sm text-[var(--color-text)]">{cat.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-[var(--color-border)] pb-2">Professional Experience</h2>

          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Newfold Digital</h3>
                <p className="text-sm text-[var(--color-text-muted)]">Córdoba, Argentina</p>
              </div>
              <span className="text-sm text-[var(--color-text-muted)] whitespace-nowrap">Aug 2021 – Present • ~5 yrs</span>
            </div>
            <p className="text-sm text-[var(--color-accent)] font-medium mb-3">Software Development Engineer in Test II (SDET II) — Mar 2022 – Present</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-2 italic">Global leader in web hosting — Bluehost, HostGator, Domain.com, Network Solutions</p>
            <ul className="space-y-2 text-sm text-[var(--color-text)]">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Led migration of a 600+ case legacy suite from WebdriverIO/TypeScript → Robot Framework/Python, cutting regression time by 35%.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Integrated automated test suites into Jenkins CI/CD pipelines, enabling true shift-left quality.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Designed comprehensive test plans for complex SaaS web apps serving millions of users.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Mentored 20+ students, achieving a 90% course completion rate through structured QA automation coaching.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Developed 10 automated test scripts that boosted coverage by 60% across critical business flows.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Led cost-efficient infrastructure migration, reducing server costs by 20%.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Performed API testing across REST, middleware, and microservice layers — validating contracts, auth flows, and integrations using Postman and automated suites.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Tested modern frontend apps built with React and Angular, plus WordPress CMS platforms — covering component, integration, and E2E journeys.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Coderhouse</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Argentina</p>
            <p className="text-sm text-[var(--color-accent)] font-medium mb-2">Tutor — Backend Development (MERN Stack)</p>
            <p className="text-sm text-[var(--color-text)]">Delivered instruction and hands-on mentoring for Node.js, Express, MongoDB, and React coursework.</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Henry Bootcamp</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Argentina (Academic)</p>
            <p className="text-sm text-[var(--color-accent)] font-medium mb-2">Full Stack Web Developer — Apr 2021 – Jun 2021</p>
            <ul className="space-y-2 text-sm text-[var(--color-text)]">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Built a healthcare management system with React, Redux, Node.js, Supabase, Firebase — serving patients, doctors, and admin staff with role-based access and Material UI.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1">▸</span>
                Developed a single-page weather app consuming a global climate API — first end-to-end frontend project in React.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-sm">Full Stack Web Development</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Henry Bootcamp • 2021</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-sm">EF SET English Certificate</h3>
              <p className="text-sm text-[var(--color-text-muted)]">C1 Advanced — EF International Language Centers</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-sm">AI-Powered Quality Engineer</h3>
              <p className="text-sm text-[var(--color-text-muted)]">UPEX Galaxy — in progress, 2026</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-sm">Workflow Automation with AI</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Campus Virtual UNC</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Languages</h2>
          <div className="flex gap-6">
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex-1">
              <h3 className="font-semibold text-sm">Spanish</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Native</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex-1">
              <h3 className="font-semibold text-sm">English</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Fluent (C1 Advanced)</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
