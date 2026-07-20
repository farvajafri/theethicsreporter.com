import { getAllEpisodes, getEpisodeBySlug } from "@/lib/episodes";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import DonateCTA from "@/components/DonateCTA";
import FloatingDonate from "@/components/FloatingDonate";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ slug: ep.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const episode = getEpisodeBySlug(params.slug);
  if (!episode) return {};

  const url = `${SITE_URL}/podcast/${episode.slug}`;

  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      url,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: episode.title,
      description: episode.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const episode = getEpisodeBySlug(params.slug);
  if (!episode) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    datePublished: episode.date,
    description: episode.description,
    duration: `PT${Math.floor(episode.durationSeconds / 60)}M${episode.durationSeconds % 60}S`,
    url: `${SITE_URL}/podcast/${episode.slug}`,
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: `${SITE_URL}${episode.file}`,
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: `${SITE_NAME} Podcast`,
      url: `${SITE_URL}/podcast`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FloatingDonate />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-2">
          <Link
            href="/podcast"
            className="text-brand hover:text-brand-dark font-semibold text-sm font-sans"
          >
            &larr; All Episodes
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm font-sans">
            <span className="text-gray-400">{formatDate(episode.date)}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">{episode.duration}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 font-sans">
            {episode.title}
          </h1>
        </header>

        <div className="mb-8">
          <AudioPlayer src={episode.file} title={episode.title} />
        </div>

        <div className="prose font-serif text-lg leading-relaxed text-gray-700">
          <p>{episode.description}</p>
        </div>

        {/* Reader-support ask on every episode page */}
        <DonateCTA
          className="mt-10"
          heading="Like the show? Help keep it going."
          body="The Ethics Reporter Podcast has no advertisers and no sponsors reading ad copy between segments — it's funded entirely by listeners like you. If these investigations are worth your time, please consider chipping in. Even $1 keeps the mics on."
          trackPrefix="podcast_episode"
        />

        <div className="mt-10 pt-6 border-t border-gray-200 flex gap-4">
          <a
            href={episode.file}
            download
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold text-sm font-sans"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download Episode
          </a>
        </div>
      </div>
    </>
  );
}
