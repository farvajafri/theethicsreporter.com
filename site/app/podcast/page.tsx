import { getAllEpisodes, type Episode } from "@/lib/episodes";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import DonateCTA from "@/components/DonateCTA";

export const metadata: Metadata = {
  title: "Podcast",
  description: "The Ethics Reporter Podcast — investigative audio journalism on legal ethics, attorney discipline, and accountability in the legal profession.",
  openGraph: {
    title: `Podcast | ${SITE_NAME}`,
    description: "Investigative audio journalism on legal ethics and attorney discipline.",
    url: `${SITE_URL}/podcast`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/podcast`,
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group block border-b border-gray-200 pb-6 mb-6 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 group-hover:bg-brand transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs text-gray-400 font-sans">{formatDate(episode.date)}</span>
            <span className="text-xs text-gray-400 font-sans">·</span>
            <span className="text-xs text-gray-400 font-sans">{episode.duration}</span>
          </div>
          <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-brand transition-colors font-sans">
            {episode.title}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed font-serif line-clamp-2">
            {episode.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PodcastPage() {
  const episodes = getAllEpisodes();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 font-sans">
          Podcast
        </h1>
        <p className="text-gray-600 font-serif text-lg">
          Investigative audio journalism on legal ethics, attorney discipline, and accountability in the legal profession.
        </p>
      </div>

      {episodes.length === 0 ? (
        <p className="text-gray-500 font-serif">No episodes yet. Check back soon.</p>
      ) : (
        <div>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      )}

      {/* Reader-support ask */}
      <DonateCTA
        className="mt-12"
        heading="This podcast is 100% listener-funded."
        body="No ads, no sponsors, no corporate money — just listeners like you. If The Ethics Reporter Podcast is worth your time, please help us keep producing it. Even $1 makes a real difference."
        trackPrefix="podcast_list"
      />
    </div>
  );
}
