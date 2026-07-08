import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { EvidenceShowcase } from '@/components/evidence-showcase';
import { ImpactMetrics } from '@/components/impact-metrics';
import { ProjectsSection } from '@/components/projects-section';
import { BtsTeaserSection, ContactSection, ExperienceSection, HeroSection, LatestPostsSection, SkillsSection } from '@/components/translated-home';
import './hero-animations.css';

function getLatestPosts(count = 3) {
  const dir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dir)) { return []; }
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map((f) => {
    const source = fs.readFileSync(path.join(dir, f), 'utf8');
    const { data } = matter(source);
    return { title: data.title, date: data.date, description: data.description, slug: f.replace(/\.mdx$/, '') };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}

function getInitialProjects() {
  const jsonPath = path.join(process.cwd(), 'content/projects/_projects.json');
  if (!fs.existsSync(jsonPath)) { return null; }
  try {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(raw).repos ?? null;
  }
  catch { return null; }
}

export default function HomePage() {
  const latestPosts = getLatestPosts();
  const initialProjects = getInitialProjects();

  return (
    <main>
      <HeroSection />
      <ImpactMetrics />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection initialProjects={initialProjects} />
      <EvidenceShowcase />
      {latestPosts.length > 0 && <LatestPostsSection posts={latestPosts} />}
      <BtsTeaserSection />
      <ContactSection />
    </main>
  );
}
