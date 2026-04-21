import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prachatham.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.prachatham.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"],
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
