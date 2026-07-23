import { MetadataRoute } from "next";
import { getAllPosts, SITE_URL } from "@/lib/data";
import { getAllTabArticles } from "@/lib/tab";
import { statesData } from "@/lib/states-data";
import { topicsData } from "@/lib/topics-data";
import { guidesData } from "@/lib/guides-data";
import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { getAllCitadelPageSlugs } from "@/lib/citadel-data";
import { getAllKevinNutterSlugs } from "@/lib/kevin-nutter-data";
import { getAllAttorneySlugs } from "@/lib/attorneys-data";
import { getAllRuleSlugs } from "@/lib/rules-data";
import { getAllCitySlugs } from "@/lib/cities-data";
import { merch, merchCategories, merchThemes } from "@/lib/merch";
import { US_STATES, FOUNDERS, GIFT_OCCASIONS } from "@/lib/merch-seo";

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

  const kevinNutterSlugs = getAllKevinNutterSlugs();
  const kevinNutterTopicUrls = kevinNutterSlugs.map((slug) => ({
    url: `${SITE_URL}/kevin-nutter/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const kevinNutterHubUrl = {
    url: `${SITE_URL}/kevin-nutter`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const attorneySlugs = getAllAttorneySlugs();
  const attorneyUrls = attorneySlugs.map((slug) => ({
    url: `${SITE_URL}/attorney/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const attorneyIndexUrl = {
    url: `${SITE_URL}/attorney`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  const ruleSlugs = getAllRuleSlugs();
  const ruleUrls = ruleSlugs.map((slug) => ({
    url: `${SITE_URL}/rule/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const ruleIndexUrl = {
    url: `${SITE_URL}/rule`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const citySlugs = getAllCitySlugs();
  const cityUrls = citySlugs.map((slug) => ({
    url: `${SITE_URL}/city/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const cityIndexUrl = {
    url: `${SITE_URL}/city`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  // ===== Merch / Shop SEO URLs =====
  const shopHubUrl = { url: `${SITE_URL}/shop`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 };
  const merchProductUrls = merch.map((p) => ({
    url: `${SITE_URL}/shop/${p.id}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8,
  }));
  const merchCategoryUrls = merchCategories.filter((c) => c.id !== "all").map((c) => ({
    url: `${SITE_URL}/shop/category/${c.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7,
  }));
  const merchThemeUrls = merchThemes.map((t) => ({
    url: `${SITE_URL}/shop/collections/${t.id}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7,
  }));
  const merchFounderUrls = FOUNDERS.map((f) => ({
    url: `${SITE_URL}/shop/quotes/${f.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7,
  }));
  const merchGiftUrls = GIFT_OCCASIONS.map((g) => ({
    url: `${SITE_URL}/shop/gifts/${g.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
  }));
  const merchStateUrls = merch.flatMap((p) =>
    US_STATES.map((s) => ({
      url: `${SITE_URL}/shop/${p.id}/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5,
    }))
  );

  return [
    ...staticPages,
    shopHubUrl,
    ...merchProductUrls,
    ...merchCategoryUrls,
    ...merchThemeUrls,
    ...merchFounderUrls,
    ...merchGiftUrls,
    ...merchStateUrls,
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
    kevinNutterHubUrl,
    ...kevinNutterTopicUrls,
    attorneyIndexUrl,
    ...attorneyUrls,
    ruleIndexUrl,
    ...ruleUrls,
    cityIndexUrl,
    ...cityUrls,
  ];
}
