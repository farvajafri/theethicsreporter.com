import { getAllPosts, getPostBySlug, getRecentPosts, getRelatedPosts, SITE_URL, SITE_NAME } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ArticleSidebar from "@/components/ArticleSidebar";
import DonationWidget from "@/components/DonationWidget";
import ArticleTipBar from "@/components/ArticleTipBar";
import FloatingDonate from "@/components/FloatingDonate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeEntities(text: any): string {
  if (typeof text !== "string") {
    if (text && typeof text === "object" && text.rendered) {
      text = text.rendered;
    } else {
      text = String(text || "");
    }
  }
  const entities: Record<string, string> = {
    "&#038;": "&", "&amp;": "&",
    "&#8217;": "\u2019", "&rsquo;": "\u2019",
    "&#8216;": "\u2018", "&lsquo;": "\u2018",
    "&#8220;": "\u201C", "&ldquo;": "\u201C",
    "&#8221;": "\u201D", "&rdquo;": "\u201D",
    "&#8211;": "\u2013", "&ndash;": "\u2013",
    "&#8212;": "\u2014", "&mdash;": "\u2014",
    "&quot;": '"', "&#034;": '"',
    "&lt;": "<", "&gt;": ">",
    "&#039;": "'", "&apos;": "'",
  };
  let result = text;
  for (const [entity, char] of Object.entries(entities)) {
    result = result.split(entity).join(char);
  }
  result = result.replace(/&#(\d+);/g, (_: string, n: string) => String.fromCharCode(parseInt(n)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_: string, n: string) => String.fromCharCode(parseInt(n, 16)));
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripHtml(html: any): string {
  if (!html) return "";
  if (typeof html !== "string") {
    if (html && typeof html === "object" && html.rendered) {
      html = html.rendered;
    } else {
      html = String(html);
    }
  }
  return decodeEntities(html.replace(/<[^>]*>/g, "").trim());
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

  const recentPosts = getRecentPosts(post.slug, 3);
  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleTipBar />
      <FloatingDonate />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Sidebar — left on desktop, bottom on mobile */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0 order-1">
            <ArticleSidebar recentPosts={recentPosts} relatedPosts={relatedPosts} />
          </div>

          {/* Article */}
          <article className="flex-1 min-w-0 order-2">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-sm font-sans">
                <span className="text-gray-400">{formatDate(post.date)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-sans">
                {decodeEntities(post.title)}
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
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* Mid-article donation break — always visible, no JS */}
            <div className="my-10 rounded-xl border border-[#c8a45a] bg-[#1a0000] px-6 py-7 text-center">
              <p className="text-[#e8c07a] text-xs font-bold uppercase tracking-widest font-sans mb-2">
                Reader-Supported Journalism
              </p>
              <p className="text-white font-sans text-base font-semibold leading-snug mb-1">
                We don&apos;t have corporate backers. We have you.
              </p>
              <p className="text-gray-400 text-sm font-sans mb-5">
                No ads. No paywalls. No sponsor influence — ever. If this reporting matters to you, please help us keep going.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[5, 10, 25, 50].map((amt) => (
                  <Link
                    key={amt}
                    href={`/donate?amount=${amt}`}
                    className="px-5 py-2 rounded-lg border-2 border-[#8B0000] text-[#ff8888] hover:bg-[#8B0000] hover:text-white font-bold text-sm font-sans transition-colors"
                  >
                    ${amt}
                  </Link>
                ))}
                <Link
                  href="/donate"
                  className="px-5 py-2 rounded-lg bg-[#8B0000] hover:bg-[#a00000] text-white font-bold text-sm font-sans transition-colors"
                >
                  Other Amount →
                </Link>
              </div>
            </div>

            {(post.tags || []).length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post?.tags?.map((tag) => (
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

            {/* End-of-article Guardian-style donation plea */}
            <div className="mt-14 border-t-4 border-[#8B0000] pt-8">
              <div className="bg-[#fdf8f0] rounded-xl p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-4">Independent Journalism Needs You</p>

                <p className="text-gray-900 font-serif text-lg leading-relaxed mb-4">
                  You just read something most publications won&apos;t touch. We investigate judges who shouldn&apos;t be on the bench,
                  attorneys who prey on clients, and a legal system that too often protects itself instead of the public.
                  We do it openly, aggressively, and without apology.
                </p>

                <p className="text-gray-900 font-serif text-lg leading-relaxed mb-4">
                  We don&apos;t have a paywall. We don&apos;t take money from law firms, bar associations, or corporate advertisers
                  who might prefer we stay quiet. Every piece of reporting on this site — every judge exposed, every disbarment
                  documented, every reversal analyzed — was made possible entirely by readers like you.
                </p>

                <p className="text-gray-900 font-serif text-lg leading-relaxed mb-6">
                  If you read us regularly — if this work has ever made you angry, informed you, or helped you — we humbly
                  ask you to support us today. It takes less than a minute. Even $1 goes directly toward keeping this
                  reporting alive. Without it, we cannot continue.
                </p>

                <DonationWidget />

                <p className="text-xs text-gray-400 mt-5 font-sans text-center">
                  The Ethics Reporter is independent and reader-funded. We have no corporate backers. Your support is everything.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="text-brand hover:text-brand-dark font-semibold text-sm font-sans"
              >
                &larr; Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar — bottom on mobile */}
          <div className="lg:hidden mt-10 order-3">
            <ArticleSidebar recentPosts={recentPosts} relatedPosts={relatedPosts} />
          </div>
        </div>
      </div>
    </>
  );
}
