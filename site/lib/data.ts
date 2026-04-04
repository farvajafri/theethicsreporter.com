import postsData from "@/data/posts.json";
import pagesData from "@/data/pages.json";

export interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  modified: string;
  content: string;
  excerpt: string;
  link: string;
  status: string;
  featured_image: string | null;
  categories: (string | number)[];
  tags: (string | number)[];
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
}

const posts = (postsData as unknown as Post[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const pages = pagesData as Page[];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPaginatedPosts(page: number, perPage: number = 24) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / perPage),
    currentPage: page,
    totalPosts: posts.length,
  };
}

export function getAllPages(): Page[] {
  return pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}

export const SITE_URL = "https://theethicsreporter.com";
export const SITE_NAME = "The Ethics Reporter";
export const SITE_DESCRIPTION =
  "Independent legal ethics journalism — holding the legal profession accountable.";
