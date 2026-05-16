import { rulesData, getRuleBySlug } from "@/lib/rules-data";
import { getAllPosts, SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return rulesData.map((r) => ({ rule: r.slug }));
}

export function generateMetadata({ params }: { params: { rule: string } }): Metadata {
  const rule = getRuleBySlug(params.rule);
  if (!rule) return {};
  const title = `${rule.shortName} — ${rule.fullName} | Attorney Ethics | ${SITE_NAME}`;
  const description = `${rule.shortName} (${rule.fullName}): ${rule.description.slice(0, 155)}`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/rule/${rule.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/rule/${rule.slug}` },
    keywords: rule.keywords,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function RuleDetailPage({ params }: { params: { rule: string } }) {
  const rule = getRuleBySlug(params.rule);
  if (!rule) notFound();

  const allPosts = getAllPosts();
  const relatedArticles = allPosts.filter((p) => rule.relatedArticleSlugs.includes(p.slug));

  // Also find articles matching rule keywords
  const kw = rule.keywords.flatMap((k) => k.toLowerCase().split(" ")).filter((w) => w.length > 4);
  const extraArticles = allPosts
    .filter(
      (p) =>
        !rule.relatedArticleSlugs.includes(p.slug) &&
        kw.some((w) => (p.title + " " + (p.excerpt ?? "")).toLowerCase().includes(w))
    )
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${rule.shortName} — ${rule.fullName}`,
    description: rule.description,
    url: `${SITE_URL}/rule/${rule.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-3 flex gap-4">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
            ← The Ethics Reporter
          </Link>
          <Link href="/rule" className="text-gray-500 font-semibold text-sm font-sans hover:underline">
            Rules Index
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-block bg-[#8B0000] text-white text-sm font-bold font-sans px-3 py-1 rounded">
              {rule.shortName}
            </span>
            <span className="text-xs text-gray-500 font-sans">{rule.jurisdiction}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">{rule.fullName}</h1>
        </div>

        <div className="mb-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded">
          <h2 className="text-sm font-bold font-sans uppercase tracking-widest text-gray-500 mb-3">Rule Text</h2>
          <p className="font-serif text-gray-800 leading-relaxed italic">{rule.text}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold font-sans mb-4">What Constitutes a Violation</h2>
          <p className="font-serif text-gray-700 leading-relaxed">{rule.description}</p>
        </div>

        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold font-sans mb-3 text-red-900">Typical Discipline</h2>
          <p className="font-serif text-gray-800 leading-relaxed">{rule.consequences}</p>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-sans mb-4 border-b border-gray-200 pb-2">
              Our Investigations Involving This Rule
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((post) => (
                <article
                  key={post.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/article/${post.slug}`} className="group flex flex-col md:flex-row">
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full md:w-48 h-40 md:h-auto object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="p-5">
                      <div className="text-xs text-gray-400 font-sans mb-2">{formatDate(post.date)}</div>
                      <h3 className="font-bold text-base leading-snug font-sans group-hover:text-[#8B0000] transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-serif line-clamp-2">
                        {stripHtml(post.excerpt).slice(0, 180)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {extraArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold font-sans mb-4 border-b border-gray-200 pb-2">Related Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extraArticles.map((post) => (
                <article
                  key={post.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/article/${post.slug}`} className="group block">
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="w-full h-32 object-cover" loading="lazy" />
                    )}
                    <div className="p-4">
                      <div className="text-xs text-gray-400 font-sans mb-1">{formatDate(post.date)}</div>
                      <h3 className="font-bold text-sm leading-snug font-sans group-hover:text-[#8B0000] transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Did Your Attorney Violate {rule.shortName}?</h3>
          <p className="font-serif text-gray-700 mb-4">
            If you believe your attorney violated {rule.shortName} — {rule.fullName} — you may have grounds for a bar
            complaint. Our guide explains the process.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/topics/bar-complaint-guide"
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              How to File a Bar Complaint
            </Link>
            <Link
              href="/tip"
              className="inline-block border border-[#8B0000] text-[#8B0000] font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Submit a Tip
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="font-sans font-bold text-lg mb-2">Support Independent Legal Journalism</h3>
          <p className="font-serif text-gray-600 mb-4 text-sm">
            The Ethics Reporter investigates attorney misconduct and judicial corruption. Help us keep this work free
            and independent.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-6 py-3 rounded hover:bg-[#6b0000] transition-colors"
          >
            Donate to Support Our Work
          </Link>
        </div>
      </div>
    </>
  );
}
