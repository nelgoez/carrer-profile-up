import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ProjectsSection } from '@/components/projects-section';
import { Timeline } from '@/components/timeline';
import { BtsTeaserSection, ContactSection, HeroSection, LatestPostsSection, SkillsSection } from '@/components/translated-home';
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
      <SkillsSection />
      <Experience />
      <ProjectsSection />
      {latestPosts.length > 0 && <LatestPostsSection posts={latestPosts} />}
      <BtsTeaserSection />
      <ContactSection />
    </main>
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
