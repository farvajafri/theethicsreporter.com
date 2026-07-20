import { attorneysData, getAttorneyBySlug } from "@/lib/attorneys-data";
import { getAllPosts, SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return attorneysData.map((a) => ({ name: a.slug }));
}

export function generateMetadata({ params }: { params: { name: string } }): Metadata {
  const attorney = getAttorneyBySlug(params.name);
  if (!attorney) return {};
  return {
    title: `${attorney.name} — Attorney Investigation | ${SITE_NAME}`,
    description: attorney.description,
    alternates: { canonical: `${SITE_URL}/attorney/${attorney.slug}` },
    openGraph: {
      title: `${attorney.name} — Attorney Investigation | ${SITE_NAME}`,
      description: attorney.description,
      url: `${SITE_URL}/attorney/${attorney.slug}`,
    },
    keywords: [
      attorney.name,
      `${attorney.name} attorney`,
      `${attorney.name} ethics`,
      `${attorney.name} ${attorney.state}`,
      `${attorney.state} attorney misconduct`,
    ],
  };
}

const statusColor: Record<string, string> = {
  "Under Investigation": "bg-yellow-100 text-yellow-800 border-yellow-300",
  Disciplined: "bg-orange-100 text-orange-800 border-orange-300",
  Suspended: "bg-red-100 text-red-800 border-red-300",
  Disbarred: "bg-red-900 text-white border-red-900",
  Censured: "bg-purple-100 text-purple-800 border-purple-300",
  Active: "bg-green-100 text-green-800 border-green-300",
  Resigned: "bg-gray-100 text-gray-800 border-gray-300",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function AttorneyProfilePage({ params }: { params: { name: string } }) {
  const attorney = getAttorneyBySlug(params.name);
  if (!attorney) notFound();

  const allPosts = getAllPosts();
  const relatedArticles = allPosts.filter((p) => attorney.articleSlugs.includes(p.slug));

  // Additional related articles by name mention
  const nameWords = attorney.name.toLowerCase().split(" ").filter((w) => w.length > 3);
  const extraArticles = allPosts
    .filter(
      (p) =>
        !attorney.articleSlugs.includes(p.slug) &&
        nameWords.some((w) => (p.title + " " + (p.excerpt ?? "")).toLowerCase().includes(w))
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorney.name,
    description: attorney.description,
    url: `${SITE_URL}/attorney/${attorney.slug}`,
    jobTitle: "Attorney",
    addressLocality: attorney.city,
    addressRegion: attorney.state,
    ...(attorney.barNumber ? { identifier: attorney.barNumber } : {}),
    ...(attorney.firm ? { worksFor: { "@type": "Organization", name: attorney.firm } } : {}),
  };

  const colorClass = statusColor[attorney.status] ?? "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-3 flex gap-4">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
            ← The Ethics Reporter
          </Link>
          <Link href="/attorney" className="text-gray-500 font-semibold text-sm font-sans hover:underline">
            Attorney Index
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            Attorney Investigation
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold font-sans">{attorney.name}</h1>
            <span className={`text-sm font-bold font-sans px-3 py-1 rounded border ${colorClass}`}>
              {attorney.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-sans mb-4">
            <span>📍 {attorney.state}{attorney.city ? `, ${attorney.city}` : ""}</span>
            {attorney.firm && <span>🏛️ {attorney.firm}</span>}
            {attorney.admittedYear && <span>📅 Admitted {attorney.admittedYear}</span>}
            {attorney.barNumber && <span>🔢 Bar #{attorney.barNumber}</span>}
          </div>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">{attorney.description}</p>
        </div>

        {attorney.violations.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold font-sans mb-4 text-red-900">Alleged Violations</h2>
            <ul className="space-y-2">
              {attorney.violations.map((v, i) => (
                <li key={i} className="flex items-start gap-2 font-serif text-gray-800">
                  <span className="text-red-600 font-bold mt-0.5">▸</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-sans mb-4 border-b border-gray-200 pb-2">
              Our Investigation
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((post) => (
                <article key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/article/${post.slug}`} className="group flex flex-col md:flex-row">
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full md:w-48 h-40 md:h-auto object-cover group-hover:opacity-90 transition-opacity flex-shrink-0"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraArticles.map((post) => (
                <article key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
          <h3 className="font-sans font-bold text-lg mb-2">How to File a Bar Complaint</h3>
          <p className="font-serif text-gray-700 mb-4">
            If you believe an attorney has violated professional conduct rules, you can file a complaint with the state
            bar. Our guide explains the process step by step.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/topics/bar-complaint-guide"
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              Bar Complaint Guide
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
            The Ethics Reporter is funded entirely by reader donations. Our attorney misconduct investigations are free
            and open to everyone. Help us keep it that way.
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
