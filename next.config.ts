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
  async redirects() {
    return [
      // Legacy WordPress permalinks (the old public site, now cms.*) →
      // the frontend article URL. Permanent, so Google moves the ranking
      // and every old backlink lands on the new page.
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/posts/:slug",
        permanent: true,
      },
      { source: "/tag/:tag", destination: "/search?q=:tag", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/publication", destination: "/publications", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      // Paginated WP archives
      { source: "/page/:n(\\d+)", destination: "/posts", permanent: true },
      { source: "/category/:slug/page/:n(\\d+)", destination: "/category/:slug", permanent: true },
    ];
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
