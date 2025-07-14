import type { NextConfig } from "next"

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = withBundleAnalyzer({
  output: "standalone",
  turbopack: {
    rules: {
      ".svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
    nodeMiddleware: true,
  },
  serverExternalPackages: ["shiki", "vscode-oniguruma"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
  eslint: {
    // @todo: remove before going live
    ignoreDuringBuilds: true,
  },
})

export default nextConfig
