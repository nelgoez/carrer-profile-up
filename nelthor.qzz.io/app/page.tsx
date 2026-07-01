import Link from 'next/link';
import { ProjectsSection } from '@/components/projects-section';
import { Timeline } from '@/components/timeline';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <Experience />
      <ProjectsSection />
      <BehindTheScenesTeaser />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Nahuel Elias</h1>
      <p className="text-xl text-[var(--color-text-muted)] mb-6">
        SDET → Agentic QA Engineer &middot; Backend Dev &middot; TypeScript &amp; Python
      </p>
      <p className="max-w-2xl mx-auto text-[var(--color-text-muted)]">
        5+ years building test automation frameworks at Newfold Digital.
        Specializing in agentic QA engineering — intelligent systems that work alongside AI agents.
      </p>
      <div className="flex gap-4 justify-center mt-8">
        <Link href="/projects" className="px-6 py-2 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:opacity-90 shadow-sm">
          View Projects
        </Link>
        <a href="mailto:gomeznahuel@gmail.com" className="px-6 py-2 rounded-lg border-2 border-[var(--color-text-muted)] text-[var(--color-text)] font-medium hover:border-[var(--color-accent)]">
          Contact
        </a>
      </div>
    </section>
  );
}

function Skills() {
  const categories = [
    {
      title: 'Testing & QA',
      skills: ['Playwright', 'Cucumber', 'Selenium', 'Robot Framework', 'Jest', 'WebdriverIO', 'Allure', 'Postman'],
    },
    {
      title: 'Languages & Backend',
      skills: ['TypeScript', 'Python', 'Node.js', 'Next.js', 'Express', 'PostgreSQL', 'Supabase', 'Firebase'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['GitHub Actions', 'Jenkins', 'Docker', 'Vercel', 'Jira', 'Confluence', 'Git', 'Linux'],
    },
  ];

  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map(cat => (
          <div key={cat.title}>
            <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-8">Experience</h2>
      <Timeline />
    </section>
  );
}

function BehindTheScenesTeaser() {
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold mb-4">Behind the Scenes</h2>
      <p className="text-[var(--color-text-muted)] mb-6">
        See how this portfolio was built — from traditional QA frameworks at Newfold Digital
        to agentic AI-assisted development. Side-by-side comparisons, architecture diagrams, and workflow recordings.
      </p>
      <Link href="/behind-the-scenes" className="text-[var(--color-accent)] hover:underline">
        Explore the process →
      </Link>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-16 border-t border-[var(--color-border)] text-center">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
      <p className="text-[var(--color-text-muted)] mb-6">
        Open to opportunities in QA Engineering, Backend Development, and Agentic AI roles.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="https://linkedin.com/in/nelgoez" className="px-6 py-2 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:opacity-90 shadow-sm">
          LinkedIn
        </a>
        <a href="https://github.com/nelgoez" className="px-6 py-2 rounded-lg border-2 border-[var(--color-text-muted)] text-[var(--color-text)] font-medium hover:border-[var(--color-accent)]">
          GitHub
        </a>
        <a href="mailto:gomeznahuel@gmail.com" className="px-6 py-2 rounded-lg border-2 border-[var(--color-text-muted)] text-[var(--color-text)] font-medium hover:border-[var(--color-accent)]">
          Email
        </a>
      </div>
    </section>
  );
}
