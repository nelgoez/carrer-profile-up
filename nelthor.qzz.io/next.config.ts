import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  options: { remarkPlugins: [remarkGfm] },
});

export default withMDX(config);
