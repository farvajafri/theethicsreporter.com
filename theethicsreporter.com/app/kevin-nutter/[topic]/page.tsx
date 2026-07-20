import { getAllKevinNutterSlugs, getKevinNutterPageData, getKevinNutterPageMetadata } from "@/lib/kevin-nutter-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import DonationWidget from "@/components/DonationWidget";
import { SITE_URL, SITE_NAME } from "@/lib/data";

interface Params {
  topic: string;
}

export function generateStaticParams() {
  return getAllKevinNutterSlugs().map((slug) => ({ topic: slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const meta = getKevinNutterPageMetadata(params.topic);
  if (!meta) return {};
  const url = `${SITE_URL}/kevin-nutter/${params.topic}`;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: { canonical: url },
  };
}

function SectionContent({ sections }: { sections: { heading: string; body: string }[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => (
        <section key={i}>
          <h2 className="text-xl md:text-2xl font-bold font-sans mb-3">{s.heading}</h2>
          <p className="font-serif text-gray-800 leading-relaxed text-lg">{s.body}</p>
        </section>
      ))}
    </div>
  );
}

function DonationCTA() {
  return (
    <div className="mt-14 border-t-4 border-[#8B0000] pt-8">
      <div className="bg-[#fdf8f0] rounded-xl p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-4">
          Support Independent Accountability Journalism
        </p>
        <p className="text-gray-900 font-serif text-lg leading-relaxed mb-4">
          The Ethics Reporter is the only independent news organization systematically covering
          Citadel Securities&apos; documented regulatory history, market structure practices, and the
          political spending of its founder Kenneth Griffin. This reporting serves retail investors
          across every state in the country.
        </p>
        <p className="text-gray-900 font-serif text-lg leading-relaxed mb-6">
          We are reader-funded and accept no money from financial industry advertisers. If this
          reporting is valuable, please support us.
        </p>
        <DonationWidget />
      </div>
    </div>
  );
}

export default function KevinNutterTopicPage({ params }: { params: Params }) {
  const page = getKevinNutterPageData(params.topic);
  if (!page) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm font-sans text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        {" / "}
        <Link href="/kevin-nutter" className="hover:underline">Kevin Nutter | Citadel</Link>
        {" / "}
        <span className="text-gray-700">{page.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-8 border-b-2 border-gray-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans block mb-2">
          {page.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-sans leading-tight mb-4">
          {page.title}
        </h1>
        <p className="font-serif text-gray-700 text-xl leading-relaxed">{page.intro}</p>
      </header>

      {/* Editorial note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm font-serif text-blue-900">
        <strong>Editorial Note:</strong> Kevin Nutter is the Chief Operating Officer of Data at
        Citadel. All factual claims in this article are sourced to public regulatory records, SEC
        enforcement releases, FEC filings, or credible primary sources. Allegations are labeled as
        allegations; opinion is labeled as opinion.
      </div>

      {/* Content */}
      <article>
        <SectionContent sections={page.sections} />
      </article>

      {/* Keywords for context */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {page.keywords.map((kw) => (
            <span
              key={kw}
              className="bg-gray-100 text-gray-600 text-xs font-sans px-2 py-1 rounded"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Related navigation */}
      <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <p className="font-bold font-sans text-sm mb-3">
          Part of The Ethics Reporter&apos;s 200-page investigation:
        </p>
        <Link
          href="/kevin-nutter"
          className="text-[#8B0000] hover:underline font-serif"
        >
          → View all topics: Kevin Nutter | Chief Operating Officer of Data at Citadel
        </Link>
      </div>

      <DonationCTA />
    </main>
  );
}
