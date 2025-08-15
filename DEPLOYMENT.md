# Prachatham Foundation Website

A modern, responsive website for the Prachatham Foundation built with Next.js 15, TypeScript, and Chakra UI.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Chakra UI
- **WordPress Integration**: Fetches content from WordPress REST API
- **SEO Optimized**: Meta tags, Open Graph, structured data, sitemap
- **Responsive Design**: Mobile-first design with smooth animations
- **Performance**: Optimized images, caching, and static generation
- **Projects Management**: Dynamic project pages with ACF fields

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- WordPress site with REST API enabled

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd PS-next
```

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
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json
```

5. Run development server:

```bash
npm run dev
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment on Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Vercel:

- `WORDPRESS_API_URL`: Your WordPress REST API URL

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utilities and API functions
├── styles/             # CSS and font files
└── theme/              # Chakra UI theme configuration
```

## 🎨 Key Components

- **Navigation**: Responsive navbar with search functionality
- **ProjectCard**: Displays project information with ACF fields
- **PostCard**: Blog post display component
- **Footer**: Site footer with links and information

## 🔧 API Integration

The site integrates with WordPress REST API to fetch:

- Posts and categories
- Projects with Advanced Custom Fields (ACF)
- Media attachments
- Dynamic content management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1200px
- Touch-friendly interface
- Optimized for all screen sizes

## ⚡ Performance Features

- Static Site Generation (SSG)
- Image optimization with Next.js Image
- Font optimization
- Code splitting
- API caching with revalidation

## 🔍 SEO Features

- Dynamic meta tags
- Open Graph tags
- Structured data (JSON-LD)
- XML sitemap
- robots.txt
- Canonical URLs

## 🎭 Animation Features

- Smooth page transitions
- Hover effects on interactive elements
- Loading animations
- Scroll-triggered animations (contact page)

## 📞 Contact Information

Built for Prachatham Foundation - Supporting environmental media and community development.

## 📄 License

This project is proprietary and confidential.
