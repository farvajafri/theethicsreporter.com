import { getPaginatedTabArticles } from "@/lib/tab";
import type { TabArticle } from "@/lib/tab";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: `Take America Back | ${SITE_NAME}`,
  description:
    "A daily chronicle of judicial corruption, legal system failures, and the urgent case for reconstructing America's courts — rooted in the vision of the Founding Fathers.",
  openGraph: {
    title: `Take America Back | ${SITE_NAME}`,
    description:
      "Daily investigations into judicial corruption and the case for reconstructing America's broken legal system.",
    url: `${SITE_URL}/take-america-back`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/take-america-back` },
};

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

function TabArticleCard({ article }: { article: TabArticle }) {
  const excerpt = stripHtml(article.excerpt).slice(0, 220);

  return (
    <article className="border-b border-gray-200 pb-8 mb-8 last:border-b-0">
      <Link href={`/take-america-back/article/${article.slug}`} className="group block">
        {article.featured_image && (
          <div className="mb-4 overflow-hidden rounded">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans">
            Take America Back
          </span>
          <span className="text-xs text-gray-400 font-sans">{formatDate(article.date)}</span>
        </div>
        <h2 className="text-xl font-bold leading-snug mb-2 group-hover:text-[#8B0000] transition-colors font-sans">
          {article.title}
        </h2>
        <p className="text-gray-600 font-serif text-base leading-relaxed">{excerpt}…</p>
        <span className="inline-block mt-3 text-sm font-semibold text-[#8B0000] font-sans group-hover:underline">
          Read More →
        </span>
      </Link>
    </article>
  );
}

export default function TakeAmericaBackPage() {
  const { articles } = getPaginatedTabArticles(1, 30);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero banner */}
      <div className="bg-[#1a1a1a] text-white rounded-xl px-8 py-10 mb-10">
        <div className="max-w-3xl">
          <div className="text-[#8B0000] text-xs font-bold uppercase tracking-widest mb-3 font-sans">
            Investigative Series
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-sans">
            Take America Back
          </h1>
          <p className="text-gray-300 font-serif text-lg leading-relaxed">
            A daily chronicle of judicial corruption, legal system failures, and the urgent
            case for reconstructing America&rsquo;s courts — rooted in the vision of the
            Founding Fathers. Our legal system has drifted far from the republic the
            Founders designed. It is time to take it back.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-400 font-sans">
            <span>Updated daily</span>
            <span>·</span>
            <span>{articles.length} {articles.length === 1 ? "investigation" : "investigations"} published</span>
          </div>
        </div>
      </div>

      {/* Founding quote */}
      <div className="border-l-4 border-[#8B0000] pl-6 mb-10 py-2">
        <blockquote className="font-serif text-lg italic text-gray-700 leading-relaxed">
          &ldquo;The germ of dissolution of our federal government is in the constitution
          of the federal judiciary — working like gravity by night and by day, gaining a
          little today and a little tomorrow, and advancing its noiseless step like a thief
          over the field of jurisdiction.&rdquo;
        </blockquote>
        <cite className="block mt-2 text-sm text-gray-500 font-sans not-italic">
          — Thomas Jefferson, Letter to Charles Hammond, 1821
        </cite>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <p className="text-gray-500 font-serif text-lg">
          First investigations publishing soon. Check back daily.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {articles.map((a) => (
            <TabArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
