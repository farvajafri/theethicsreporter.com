import { getPaginatedPosts } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function HomePage() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1, 30);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Donation Banner */}
      <div className="bg-[#8B0000] text-white rounded-xl px-6 py-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg font-sans leading-snug">
            This journalism is free — but it costs money to produce.
          </p>
          <p className="text-red-200 text-sm mt-1 font-sans">
            No ads. No corporate sponsors. 100% reader funded. Even $1 keeps us going.
          </p>
        </div>
        <Link
          href="/donate"
          className="flex-shrink-0 bg-white text-[#8B0000] font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-red-50 transition-colors font-sans whitespace-nowrap"
        >
          ❤ Support Our Work
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
