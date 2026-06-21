import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.grisport.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.sportscoverdirect.com',
      },
      {
        protocol: 'https',
        hostname: 'www.codemotion.com',
      },
      {
        protocol: 'https',
        hostname: 'static1.squarespace.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      }
    ],
  }
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
