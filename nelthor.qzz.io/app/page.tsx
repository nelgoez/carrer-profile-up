import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ProjectsSection } from '@/components/projects-section';
import { BtsTeaserSection, ContactSection, ExperienceSection, HeroSection, LatestPostsSection, SkillsSection } from '@/components/translated-home';
import { EvidenceShowcase } from '@/components/evidence-showcase';
import { ImpactMetrics } from '@/components/impact-metrics';
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

export default function HomePage() {
  const latestPosts = getLatestPosts();

  return (
    <main>
      <HeroSection />
      <ImpactMetrics />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EvidenceShowcase />
      {latestPosts.length > 0 && <LatestPostsSection posts={latestPosts} />}
      <BtsTeaserSection />
      <ContactSection />
    </main>
  );
}
