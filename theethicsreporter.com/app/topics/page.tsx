import { topicsData } from "@/lib/topics-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Topics | ${SITE_NAME}`,
  description: "Browse investigations by topic: AI sanctions, judicial misconduct, disbarment, client fund theft, law school debt, and more.",
  alternates: { canonical: `${SITE_URL}/topics` },
};

export default function TopicsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-3">Browse by Topic</h1>
        <p className="text-gray-600 font-serif text-lg">Deep investigations organized by subject matter.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topicsData.map((t) => (
          <Link key={t.slug} href={`/topics/${t.slug}`} className="group border border-gray-200 rounded-lg p-6 hover:border-[#8B0000] hover:shadow-md transition-all">
            <h2 className="text-lg font-bold font-sans mb-2 group-hover:text-[#8B0000] transition-colors">{t.title}</h2>
            <p className="text-sm text-gray-600 font-serif leading-relaxed">{t.description.slice(0, 150)}…</p>
            <span className="inline-block mt-3 text-sm font-semibold text-[#8B0000] font-sans">Browse Investigations →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
