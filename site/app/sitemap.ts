import { MetadataRoute } from "next";
import { getAllPosts, SITE_URL } from "@/lib/data";
import { getAllTabArticles } from "@/lib/tab";
import { statesData } from "@/lib/states-data";
import { topicsData } from "@/lib/topics-data";
import { guidesData } from "@/lib/guides-data";
import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { getAllCitadelPageSlugs } from "@/lib/citadel-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tabArticles = getAllTabArticles();

  const articleUrls = posts.map((post) => ({
    url: `${SITE_URL}/article/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(post.date || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tabUrls = tabArticles.map((a) => ({
    url: `${SITE_URL}/take-america-back/article/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const stateUrls = statesData.map((s) => ({
    url: `${SITE_URL}/state/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicUrls = topicsData.map((t) => ({
    url: `${SITE_URL}/topics/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guideUrls = guidesData.map((g) => ({
    url: `${SITE_URL}/how-to/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const defendStateUrls = defendStatesData.map((s) => ({
    url: `${SITE_URL}/defend/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const defendStateProfessionUrls = defendStatesData.flatMap((s) =>
    professionsData.map((p) => ({
      url: `${SITE_URL}/defend/${s.slug}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const professionUrls = professionsData.map((p) => ({
    url: `${SITE_URL}/profession/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${SITE_URL}/take-america-back`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_URL}/defend`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/profession`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/state`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/topics`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/how-to`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/podcast`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/donate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/tip`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const citadelSlugs = getAllCitadelPageSlugs();
  const citadelUrls = citadelSlugs.map((slug) => ({
    url: `${SITE_URL}/citadel/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const citadelHubUrl = {
    url: `${SITE_URL}/citadel`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  return [
    ...staticPages,
    ...articleUrls,
    ...tabUrls,
    ...stateUrls,
    ...topicUrls,
    ...guideUrls,
    ...defendStateUrls,
    ...defendStateProfessionUrls,
    ...professionUrls,
    citadelHubUrl,
    ...citadelUrls,
  ];
}
