# Prachatham Foundation Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern, responsive website for the Prachatham Foundation built with Next.js 15, TypeScript, and Chakra UI, integrated with WordPress CMS.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Chakra UI
- **WordPress Integration**: Fetches content from WordPress REST API
- **SEO Optimized**: Meta tags, Open Graph, structured data, sitemap
- **Responsive Design**: Mobile-first design with smooth animations
- **Performance**: Optimized images, caching, and static generation

## 🔧 Backend Integration

The website integrates with WordPress CMS using the REST API:

```javascript
const API_BASE = "https://cms.prachatham.com/?rest_route=";

// Get posts
const posts = await fetch(`${API_BASE}/wp/v2/posts`);

// Get specific post
const post = await fetch(`${API_BASE}/wp/v2/posts/5753`);

// Get categories
const categories = await fetch(`${API_BASE}/wp/v2/categories`);
```

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- WordPress CMS with REST API enabled at https://cms.prachatham.com

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:

```
WORDPRESS_API_URL=https://cms.prachatham.com/?rest_route=
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
