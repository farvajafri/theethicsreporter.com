import { getPaginatedPosts, getAllPosts, SITE_NAME } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const PER_PAGE = 30;

export function generateStaticParams() {
  const totalPages = Math.ceil(getAllPosts().length / PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export function generateMetadata({ params }: { params: { num: string } }): Metadata {
  return {
    title: `Page ${params.num} | ${SITE_NAME}`,
    robots: { index: false },
  };
}

export default function PaginatedPage({ params }: { params: { num: string } }) {
  const pageNum = parseInt(params.num, 10);
  if (isNaN(pageNum) || pageNum < 2) notFound();

  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNum, PER_PAGE);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 font-sans">Articles — Page {currentPage}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
