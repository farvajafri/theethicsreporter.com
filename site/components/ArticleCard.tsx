import Link from "next/link";
import type { Post } from "@/lib/data";

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
          {post.categories.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand font-sans">
              {post.categories[0]}
            </span>
          )}
          <span className="text-xs text-gray-400 font-sans">{formatDate(post.date)}</span>
        </div>
        <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-brand transition-colors font-sans">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-serif">
          {excerpt}{excerpt.length >= 200 ? "..." : ""}
        </p>
      </Link>
    </article>
  );
}
