import { rulesData } from "@/lib/rules-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Professional Conduct Rules: Attorney Ethics Guide | ${SITE_NAME}`,
  description:
    "A guide to the professional conduct rules that govern attorney behavior — Rule 1.1 Competence, Rule 7.1 Advertising, New York Judiciary Law §470, and more.",
  alternates: { canonical: `${SITE_URL}/rule` },
  openGraph: {
    title: `Professional Conduct Rules: Attorney Ethics Guide | ${SITE_NAME}`,
    description:
      "A guide to the professional conduct rules that govern attorney behavior — Rule 1.1 Competence, Rule 7.1 Advertising, New York Judiciary Law §470, and more.",
    url: `${SITE_URL}/rule`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Professional Conduct Rules",
  description: "Guide to attorney professional conduct rules covered by The Ethics Reporter",
  url: `${SITE_URL}/rule`,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function RuleIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-3">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
            ← The Ethics Reporter
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            Ethics Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">Professional Conduct Rules</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed max-w-3xl">
            Attorney conduct is governed by state Rules of Professional Conduct — based on the ABA Model Rules but
            varying by state. These rules define what attorneys must do, what they cannot do, and what discipline results
            when they cross the line. Here we cover the rules most relevant to our investigations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {rulesData.map((rule) => (
            <Link
              key={rule.slug}
              href={`/rule/${rule.slug}`}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="inline-block bg-[#8B0000] text-white text-xs font-bold font-sans px-2 py-1 rounded whitespace-nowrap">
                  {rule.shortName}
                </span>
                <h2 className="font-bold text-lg font-sans group-hover:text-[#8B0000] transition-colors leading-tight">
                  {rule.fullName}
                </h2>
              </div>
              <p className="text-sm text-gray-500 font-sans mb-3 italic">{rule.jurisdiction}</p>
              <p className="font-serif text-gray-700 text-sm leading-relaxed line-clamp-3">{rule.description.slice(0, 200)}…</p>
              {rule.relatedArticleSlugs.length > 0 && (
                <div className="mt-3 text-xs text-[#8B0000] font-sans font-semibold">
                  {rule.relatedArticleSlugs.length} investigation{rule.relatedArticleSlugs.length !== 1 ? "s" : ""} related →
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Has Your Attorney Violated One of These Rules?</h3>
          <p className="font-serif text-gray-700 mb-4">
            The Ethics Reporter investigates attorney misconduct and helps clients understand their rights. If you
            believe your attorney violated professional conduct rules, we can help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/topics/bar-complaint-guide"
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              How to File a Bar Complaint
            </Link>
            <Link
              href="/tip"
              className="inline-block border border-[#8B0000] text-[#8B0000] font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Submit a Tip
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
