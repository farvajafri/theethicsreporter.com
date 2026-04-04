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
  result = result.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
  return result;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SidebarCard({ post }: { post: Post }) {
  return (
    <Link href={`/article/${post.slug}`} className="group block">
      <div className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt=""
            className="w-16 h-16 rounded object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold leading-snug group-hover:text-brand transition-colors line-clamp-2 font-sans">
            {decodeEntities(post.title)}
          </h4>
          <span className="text-xs text-gray-400 mt-1 block font-sans">
            {formatDate(post.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ArticleSidebar({
  recentPosts,
  relatedPosts,
}: {
  recentPosts: Post[];
  relatedPosts: Post[];
}) {
  return (
    <aside className="lg:sticky lg:top-8 space-y-6">
      {/* CTA Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          href="/tip"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white font-semibold text-sm rounded-lg hover:bg-brand-dark transition-colors font-sans"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Got A Tip?
        </Link>
        <Link
          href="/donate"
          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-brand text-brand font-semibold text-sm rounded-lg hover:bg-brand hover:text-white transition-colors font-sans"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support The Ethics Reporter
        </Link>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 font-sans">
            Related Articles
          </h3>
          <div>
            {relatedPosts.map((post) => (
              <SidebarCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 font-sans">
            Latest Articles
          </h3>
          <div>
            {recentPosts.map((post) => (
              <SidebarCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
