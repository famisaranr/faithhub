import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // IMPORTANT for monorepo builds so Next traces deps correctly
  experimental: {
    // outputFileTracingRoot is correctly typed in newer Next.js versions, 
    // but might need a cast or ts-ignore if types are outdated.
    // For this project structure:
    // @ts-expect-error - This is a valid config but types might be outdated
    outputFileTracingRoot: "../../",
  },
};

export default nextConfig;
