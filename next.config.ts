import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'scholar.googleusercontent.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cu.ac.bd' },
      { protocol: 'https', hostname: 'heat.ugc.gov.bd' },
    ],
  },
};

export default nextConfig;
