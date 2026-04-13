import { getAllTabArticles, getTabArticleBySlug } from "@/lib/tab";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function generateStaticParams() {
  return getAllTabArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getTabArticleBySlug(params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/take-america-back/article/${article.slug}`;
  const description = stripHtml(article.excerpt).slice(0, 160);

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      siteName: SITE_NAME,
      ...(article.featured_image
        ? { images: [{ url: `${SITE_URL}${article.featured_image}`, width: 1024, height: 1024 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
    alternates: { canonical: url },
  };
}

export default function TabArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getTabArticleBySlug(params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: stripHtml(article.excerpt).slice(0, 160),
    url: `${SITE_URL}/take-america-back/article/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(article.featured_image
      ? { image: `${SITE_URL}${article.featured_image}` }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-4">
          <Link
            href="/take-america-back"
            className="text-[#8B0000] hover:text-[#6b0000] font-semibold text-sm font-sans"
          >
            ← Take America Back
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans">
              Take America Back
            </span>
            <span className="text-xs text-gray-400 font-sans">
              {formatDate(article.date)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 font-sans">
            {article.title}
          </h1>
          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full rounded-lg mb-6 object-cover max-h-96"
            />
          )}
        </header>

        <div
          className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed
            prose-h2:font-sans prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
            prose-p:mb-5 prose-a:text-[#8B0000] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/take-america-back"
            className="text-[#8B0000] hover:text-[#6b0000] font-semibold text-sm font-sans"
          >
            ← More Investigations
          </Link>
        </div>
      </div>
    </>
  );
}
