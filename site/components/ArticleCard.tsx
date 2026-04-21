import Link from "next/link";
import type { Post } from "@/lib/data";

function decodeEntities(text: string): string {
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
  // Handle numeric entities
  result = result.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
  return result;
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return decodeEntities(html.replace(/<[^>]*>/g, "").trim());
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleCard({ post }: { post: Post }) {
  const excerpt = stripHtml(post.excerpt).slice(0, 200);

  return (
    <article className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
      <Link href={`/article/${post.slug}`} className="group block">
        {post.featured_image && (
          <div className="mb-3 overflow-hidden rounded">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400 font-sans">{formatDate(post.date)}</span>
        </div>
        <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-brand transition-colors font-sans">
          {decodeEntities(post.title)}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-serif">
          {excerpt}{excerpt.length >= 200 ? "..." : ""}
        </p>
      </Link>
    </article>
  );
}
