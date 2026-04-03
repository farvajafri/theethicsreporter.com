import { MetadataRoute } from "next";
import { getAllPosts, SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const articleUrls = posts.map((post) => ({
    url: `${SITE_URL}/article/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/donate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/tip`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return [...staticPages, ...articleUrls];
}
