import { getAllPosts, getPostBySlug, SITE_URL, SITE_NAME } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const description = stripHtml(post.excerpt).slice(0, 160);
  const url = `${SITE_URL}/article/${post.slug}`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      siteName: SITE_NAME,
      ...(post.featured_image ? { images: [{ url: post.featured_image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    url: `${SITE_URL}/article/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(post.featured_image ? { image: post.featured_image } : {}),
    description: stripHtml(post.excerpt).slice(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/article/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm font-sans">
            {post.categories.map((cat) => (
              <span key={cat} className="text-brand font-semibold uppercase tracking-wide text-xs">
                {cat}
              </span>
            ))}
            <span className="text-gray-400">{formatDate(post.date)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-sans">
            {post.title}
          </h1>
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full rounded-lg mt-4"
            />
          )}
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="text-brand hover:text-brand-dark font-semibold text-sm font-sans"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
