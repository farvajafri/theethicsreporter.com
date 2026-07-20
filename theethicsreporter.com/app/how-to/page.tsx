import { guidesData } from "@/lib/guides-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `How-To Guides | ${SITE_NAME}`,
  description: "Practical guides on filing bar complaints, reporting judicial misconduct, understanding attorney discipline, and protecting yourself from legal malpractice.",
  alternates: { canonical: `${SITE_URL}/how-to` },
};

export default function HowToIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-3">How-To Guides</h1>
        <p className="text-gray-600 font-serif text-lg">Practical guides for navigating the legal discipline system.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidesData.map((g) => (
          <Link key={g.slug} href={`/how-to/${g.slug}`} className="group border border-gray-200 rounded-lg p-6 hover:border-[#8B0000] hover:shadow-md transition-all">
            <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide px-2 py-0.5 font-sans mb-3">Guide</div>
            <h2 className="text-lg font-bold font-sans mb-2 group-hover:text-[#8B0000] transition-colors">{g.title}</h2>
            <p className="text-sm text-gray-600 font-serif leading-relaxed">{g.description.slice(0, 130)}…</p>
            <span className="inline-block mt-3 text-sm font-semibold text-[#8B0000] font-sans">Read Guide →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
