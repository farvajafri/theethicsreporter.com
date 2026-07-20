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

export function getPaginatedPosts(page: number, perPage: number = 30) {
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

export function getRecentPosts(excludeSlug?: string, limit: number = 3): Post[] {
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  // Score posts by shared tags and categories
  const scored = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;
      for (const tag of (p.tags || [])) {
        if ((post.tags || []).includes(tag)) score += 2;
      }
      for (const cat of (p.categories || [])) {
        if ((post.categories || []).includes(cat)) score += 1;
      }
      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);

  // If not enough related, backfill with recent posts
  if (scored.length < limit) {
    const slugs = new Set([post.slug, ...scored.map((p) => p.slug)]);
    const backfill = posts
      .filter((p) => !slugs.has(p.slug))
      .slice(0, limit - scored.length);
    return [...scored, ...backfill];
  }

  return scored;
}

export const SITE_URL = "https://www.theethicsreporter.com";
export const SITE_NAME = "The Ethics Reporter";
export const SITE_DESCRIPTION =
  "Independent legal ethics journalism — holding the legal profession accountable.";
