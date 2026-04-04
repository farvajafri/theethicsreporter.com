import episodesData from "@/data/episodes.json";

export interface Episode {
  id: number;
  title: string;
  slug: string;
  date: string;
  description: string;
  file: string;
  duration: string;
  durationSeconds: number;
}

const episodes = (episodesData as Episode[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getAllEpisodes(): Episode[] {
  return episodes;
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}
