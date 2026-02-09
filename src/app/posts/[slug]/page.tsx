import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Badge,
  Divider,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FaClock, FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";
import { wordpressApi, formatThaiDate, stripHtml } from "@/lib/wordpress";
import { Metadata } from "next";
import { SocialShare } from "@/components/SocialShare";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await wordpressApi.getPostBySlug(slug);

    if (!post) {
      return {
        title: "ไม่พบบทความ | ประชาธรรม",
      };
    }

    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
    const description =
      stripHtml(post.excerpt.rendered).substring(0, 160) ||
      stripHtml(post.content.rendered).substring(0, 160);

    const authorName = post.acf?.authornamepost || "Prachatham";

    return {
      title: `${post.title.rendered} | ประชาธรรม`,
      description,
      keywords: `${post.title.rendered}, ประชาธรรม, สิ่งแวดล้อม, สื่อชุมชน`,
      authors: [{ name: authorName }],
      alternates: {
        canonical: `/posts/${slug}`,
      },
      openGraph: {
        title: post.title.rendered,
        description,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [authorName],
        section: "สิ่งแวดล้อม",
        tags:
          post._embedded?.["wp:term"]?.[0]?.map(
            (cat: { name: string }) => cat.name
          ) || [],
        url: `/posts/${slug}`,
        siteName: "ประชาธรรม",
        locale: "th_TH",
        images: featuredImage
          ? [
              {
                url: featuredImage.source_url,
                width: featuredImage.media_details?.width || 1200,
                height: featuredImage.media_details?.height || 630,
                alt: featuredImage.alt_text || post.title.rendered,
                type: featuredImage.mime_type || "image/jpeg",
              },
            ]
          : [
              {
                url: "/images/hero-1-page-1.jpg",
                width: 1200,
                height: 630,
                alt: post.title.rendered,
              },
            ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title.rendered,
        description,
        images: featuredImage?.source_url || "/images/hero-1-page-1.jpg",
        creator: "@prachatham",
      },
    };
  } catch {
    return {
      title: "ไม่พบบทความ | ประชาธรรม",
    };
  }
}

export const revalidate = 60;

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await wordpressApi.getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const categories = (post._embedded?.["wp:term"]?.[0] || []) as Category[];
    const readingTime = calculateReadingTime(post.content.rendered);
    const currentUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/posts/${slug}`;

    // JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title.rendered,
      description: stripHtml(post.excerpt.rendered).substring(0, 160),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/images/hero-1-page-1.jpg",
      author: post.acf?.authornamepost
        ? {
            "@type": "Person",
            name: post.acf.authornamepost,
          }
        : {
            "@type": "Organization",
            name: "Prachatham Foundation",
          },
      publisher: {
        "@type": "Organization",
        name: "Prachatham Foundation",
        logo: {
          "@type": "ImageObject",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://cms.prachatham.com"
          }/wp-content/uploads/2024/01/ps-favicon.svg`,
        },
      },
      datePublished: post.date,
      dateModified: post.modified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Container maxW="4xl" py={8}>
          <VStack align="stretch" gap={8}>
            {/* Breadcrumb */}
            <HStack fontSize="sm" color="gray.500">
              <ChakraLink
                as={Link}
                href="/"
                _hover={{ color: "prachatham.600" }}
              >
                หน้าแรก
              </ChakraLink>
              <Text>/</Text>
              <ChakraLink
                as={Link}
                href="/posts"
                _hover={{ color: "prachatham.600" }}
              >
                บทความ
              </ChakraLink>
              <Text>/</Text>
              <Text color="gray.700" fontWeight="medium" noOfLines={1}>
                {post.title.rendered}
              </Text>
            </HStack>

            {/* Article Header */}
            <Box>
              {/* Categories */}
              {categories.length > 0 && (
                <HStack flexWrap="wrap" gap={2} mb={4}>
                  <FaTags color="var(--chakra-colors-gray-400)" size={14} />
                  {categories.map((category) => (
                    <ChakraLink
                      key={category.id}
                      as={Link}
                      href={`/category/${category.slug}`}
                    >
                      <Badge
                        colorScheme="prachatham"
                        variant="subtle"
                        fontSize="xs"
                        px={2}
                        py={1}
                        borderRadius="full"
                        _hover={{
                          bg: "prachatham.200",
                          transform: "scale(1.05)",
                        }}
                        transition="all 0.2s"
                      >
                        {category.name}
                      </Badge>
                    </ChakraLink>
                  ))}
                </HStack>
              )}

              {/* Title */}
              <Heading
                as="h1"
                size="2xl"
                lineHeight="shorter"
                color="gray.800"
                mb={6}
                fontWeight="bold"
              >
                {post.title.rendered}
              </Heading>

              {/* Meta Information with TTS */}
              <Card bg="gray.50" border="1px solid" borderColor="gray.200">
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {/* Meta Info Row */}
                    <HStack justify="space-between" flexWrap="wrap" spacing={4}>
                      <HStack spacing={6} flexWrap="wrap">
                        {/* Author */}
                        {post.acf?.authornamepost && (
                          <HStack color="gray.600" fontSize="sm">
                            <FaUser size={14} />
                            <Text fontWeight="medium">
                              {post.acf.authornamepost}
                            </Text>
                          </HStack>
                        )}
                        <HStack color="gray.600" fontSize="sm">
                          <FaCalendarAlt size={14} />
                          <Text>{formatThaiDate(post.date)}</Text>
                        </HStack>
                        <HStack color="gray.600" fontSize="sm">
                          <FaClock size={14} />
                          <Text>อ่าน {readingTime} นาที</Text>
                        </HStack>
                      </HStack>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </Box>

            {/* Content */}
            <Box
              className="wordpress-content"
              css={{
                "& p": {
                  marginBottom: "1.5rem",
                  lineHeight: "1.8",
                  color: "var(--chakra-colors-gray-700)",
                  fontSize: "1.1rem",
                },
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  marginBottom: "1rem",
                  marginTop: "2.5rem",
                  fontWeight: "semibold",
                  color: "var(--chakra-colors-gray-800)",
                  lineHeight: "1.3",
                },
                "& h2": {
                  fontSize: "1.75rem",
                  borderBottom: "2px solid var(--chakra-colors-prachatham-200)",
                  paddingBottom: "0.5rem",
                },
                "& h3": {
                  fontSize: "1.5rem",
                },
                "& h4": {
                  fontSize: "1.25rem",
                },
                "& ul, & ol": {
                  marginBottom: "1.5rem",
                  paddingLeft: "2rem",
                },
                "& li": {
                  marginBottom: "0.75rem",
                  lineHeight: "1.8",
                  color: "var(--chakra-colors-gray-700)",
                  fontSize: "1.1rem",
                },
                "& blockquote": {
                  borderLeft: "4px solid var(--chakra-colors-prachatham-500)",
                  backgroundColor: "var(--chakra-colors-prachatham-50)",
                  padding: "1.5rem",
                  margin: "2rem 0",
                  fontStyle: "italic",
                  color: "var(--chakra-colors-gray-700)",
                  borderRadius: "0 0.5rem 0.5rem 0",
                  fontSize: "1.1rem",
                  lineHeight: "1.7",
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "0.75rem",
                  margin: "2rem 0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                },
                "& a": {
                  color: "var(--chakra-colors-prachatham-600)",
                  textDecoration: "underline",
                  fontWeight: "medium",
                  "&:hover": {
                    color: "var(--chakra-colors-prachatham-700)",
                    textDecoration: "none",
                  },
                },
                "& strong, & b": {
                  fontWeight: "semibold",
                  color: "var(--chakra-colors-gray-800)",
                },
                "& em, & i": {
                  fontStyle: "italic",
                  color: "var(--chakra-colors-gray-600)",
                },
                "& code": {
                  backgroundColor: "var(--chakra-colors-gray-100)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.9rem",
                  color: "var(--chakra-colors-gray-800)",
                },
                "& pre": {
                  backgroundColor: "var(--chakra-colors-gray-800)",
                  color: "var(--chakra-colors-white)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  overflow: "auto",
                  margin: "1.5rem 0",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                },
                /* Table wrapper for horizontal scroll on mobile */
                "& figure.wp-block-table, & .wp-block-table": {
                  margin: "2rem 0",
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--chakra-colors-gray-200)",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
                },
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "0",
                  fontSize: "0.82rem",
                  lineHeight: "1.55",
                  minWidth: "480px",
                },
                /* Tables not wrapped in figure */
                "& > table": {
                  margin: "2rem 0",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--chakra-colors-gray-200)",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
                },
                "& th, & td": {
                  padding: "0.625rem 0.75rem",
                  textAlign: "left",
                  borderBottom: "1px solid var(--chakra-colors-gray-100)",
                  borderRight: "1px solid var(--chakra-colors-gray-100)",
                  verticalAlign: "top",
                  wordBreak: "break-word",
                  color: "var(--chakra-colors-gray-700)",
                },
                /* Style lines starting with – or - or • as bullet items */
                "& td": {
                  whiteSpace: "pre-line",
                },
                "& th:last-child, & td:last-child": {
                  borderRight: "none",
                },
                "& thead": {
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                },
                "& th": {
                  backgroundColor: "var(--chakra-colors-prachatham-50)",
                  fontWeight: "600",
                  color: "var(--chakra-colors-gray-800)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.01em",
                  borderBottomWidth: "2px",
                  borderBottomColor: "var(--chakra-colors-prachatham-200)",
                  whiteSpace: "nowrap",
                },
                "& tbody tr": {
                  transition: "background-color 0.15s ease",
                },
                "& tbody tr:hover": {
                  backgroundColor: "var(--chakra-colors-gray-50)",
                },
                "& tbody tr:nth-of-type(even)": {
                  backgroundColor: "rgba(0, 0, 0, 0.015)",
                },
                "& tbody tr:nth-of-type(even):hover": {
                  backgroundColor: "var(--chakra-colors-gray-50)",
                },
                "& tbody tr:last-child td": {
                  borderBottom: "none",
                },
                /* Bullet-like symbols inside table cells */
                "& td ul, & td ol": {
                  paddingLeft: "1.25rem",
                  margin: "0.25rem 0",
                  fontSize: "0.82rem",
                },
                "& td li": {
                  fontSize: "0.82rem",
                  marginBottom: "0.25rem",
                  lineHeight: "1.5",
                },
                "& td p": {
                  fontSize: "0.82rem",
                  marginBottom: "0.35rem",
                  lineHeight: "1.55",
                },
                "& caption, & figcaption": {
                  padding: "0.75rem 1rem",
                  fontSize: "0.8rem",
                  color: "var(--chakra-colors-gray-500)",
                  textAlign: "center",
                  fontStyle: "italic",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <Divider />

            {/* Social Share */}
            <SocialShare url={currentUrl} title={post.title.rendered} />
          </VStack>

        </Container>
      </>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }
}
