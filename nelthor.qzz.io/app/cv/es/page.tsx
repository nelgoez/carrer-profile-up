'use client';

import Link from 'next/link';

export default function CVEsPage() {
  return (
    <main>
      <div className="mb-8 flex justify-between items-center">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Volver
        </Link>
        <a href="/cv" className="px-4 py-2 rounded-lg bg-[var(--color-accent-strong)] text-white text-sm font-semibold hover:opacity-90">
          Ver en inglés
        </a>
      </div>

      <div className="cv-content max-w-3xl mx-auto p-8 md:p-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Nahuel Leonardo Elias Gomez</h1>
          <p className="text-[var(--color-accent)] font-semibold mb-4">Senior QA Automation Engineer • SDET II • Ingeniería de Calidad con IA</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span>📍 Córdoba, Argentina</span>
            <span>📞 +54 351 380-8759</span>
            <span>✉️ nahuelgomez.cti@gmail.com</span>
            <a href="https://linkedin.com/in/nelgoez" className="text-[var(--color-accent)]">💼 linkedin.com/in/nelgoez</a>
            <a href="https://github.com/nelgoez" className="text-[var(--color-accent)]">🐙 github.com/nelgoez</a>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Resumen Profesional</h2>
          <p className="text-[var(--color-text)] leading-relaxed">
            Senior QA Automation Engineer con 6 años de experiencia construyendo y escalando automatización de pruebas para productos SaaS web.
            Especializado en Playwright, TypeScript, WebdriverIO y Robot Framework, con un historial comprobado de migración de suites heredadas,
            integración de pruebas en pipelines CI/CD y promoción de cultura shift-left. Inglés fluido con amplia experiencia en equipos de ingeniería distribuidos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Competencias Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Automatización de Pruebas', items: 'Playwright, Selenium WebDriver, WebdriverIO, Cypress, Robot Framework, Protractor, Cucumber' },
              { label: 'Lenguajes', items: 'TypeScript, JavaScript, Python, Node.js' },
              { label: 'Testing de APIs', items: 'REST APIs, Microservicios, Postman, Suites automatizadas' },
              { label: 'CI / CD', items: 'Jenkins, GitHub Actions — integración y mantenimiento de pipelines' },
              { label: 'Frontend & CMS', items: 'React, Angular, WordPress, Redux, Express, Supabase, Firebase' },
              { label: 'Metodologías', items: 'Shift-Left Testing, KATA Architecture, Agile/Scrum, Diseño de Planes de Prueba' },
            ].map(cat => (
              <div key={cat.label} className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-1">{cat.label}</h3>
                <p className="text-sm text-[var(--color-text)]">{cat.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Portfolio</h2>
          <p className="text-[var(--color-text)] leading-relaxed">
            Conocé mi trabajo en
            {' '}
            <a href="https://nelthor.qzz.io" className="text-[var(--color-accent)]">nelthor.qzz.io</a>
            {' '}
            — blog, proyectos,
            comparativas traditional vs agentic, y galería multimedia. Construido con workflows de desarrollo agente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-[var(--color-border)] pb-2">Idiomas</h2>
          <div className="flex gap-6">
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex-1">
              <h3 className="font-semibold text-sm">Español</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Nativo</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex-1">
              <h3 className="font-semibold text-sm">Inglés</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Fluido (C1 Advanced)</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
