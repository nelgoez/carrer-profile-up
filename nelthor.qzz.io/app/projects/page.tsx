import Link from 'next/link';
import { ProjectsSection } from '@/components/projects-section';

export default function ProjectsPage() {
  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <p className="text-[var(--color-text-muted)] mb-12">
        Live data from GitHub API — auto-updates when new code is pushed.
      </p>
      <ProjectsSection />
    </main>
  );
}
