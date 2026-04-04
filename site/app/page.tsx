import { getPaginatedPosts } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1, 30);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
