import tabData from "@/data/tab-articles.json";

export interface TabArticle {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  status: string;
}

const articles = (tabData as TabArticle[])
  .filter((a) => a.status === "publish")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllTabArticles(): TabArticle[] {
  return articles;
}

export function getTabArticleBySlug(slug: string): TabArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getPaginatedTabArticles(
  page: number,
  perPage = 30
): { articles: TabArticle[]; totalPages: number; currentPage: number } {
  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    articles: articles.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}
