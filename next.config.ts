import type { NextConfig } from "next";

// Deployed as a static site to GitHub Pages at
// https://<owner>.github.io/<repo>/, so pages are served from a sub-path.
const repoName = "anj-portfolio";
const basePath = process.env.GITHUB_PAGES === "true" ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
