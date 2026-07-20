import { topicsData } from "@/lib/topics-data";
import { getAllPosts, SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return topicsData.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = topicsData.find((t) => t.slug === params.topic);
  if (!topic) return {};
  return {
    title: `${topic.title} | ${SITE_NAME}`,
    description: topic.description,
    alternates: { canonical: `${SITE_URL}/topics/${topic.slug}` },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: `${SITE_URL}/topics/${topic.slug}`,
    },
    keywords: topic.keywords,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topicsData.find((t) => t.slug === params.topic);
  if (!topic) notFound();

  // Find relevant articles by keyword matching in title/excerpt
  const allPosts = getAllPosts();
  const keywords = topic.keywords.flatMap((k) => k.toLowerCase().split(" "));
  const related = allPosts
    .filter((p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return keywords.some((kw) => kw.length > 4 && text.includes(kw));
    })
    .slice(0, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `${SITE_URL}/topics/${topic.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-3">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">← The Ethics Reporter</Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">Topic</div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">{topic.title}</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed max-w-3xl">{topic.description}</p>
        </div>

        <div className="article-content mb-10 max-w-3xl">
          <p>{topic.intro}</p>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-sans mb-6 border-b border-gray-200 pb-3">Related Investigations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((post) => (
                <article key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/article/${post.slug}`} className="group block">
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity" loading="lazy" />
                    )}
                    <div className="p-4">
                      <div className="text-xs text-gray-400 font-sans mb-2">{formatDate(post.date)}</div>
                      <h3 className="font-bold text-sm leading-snug font-sans group-hover:text-[#8B0000] transition-colors line-clamp-3">{post.title}</h3>
                      <p className="text-xs text-gray-500 font-serif mt-2 line-clamp-2">{stripHtml(post.excerpt).slice(0, 120)}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Got a Tip?</h3>
          <p className="font-serif text-gray-700 mb-4">The Ethics Reporter investigates attorney misconduct and judicial corruption. If you have information relevant to this topic, we want to hear from you.</p>
          <Link href="/tip" className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors">Submit a Tip</Link>
        </div>
      </div>
    </>
  );
}
