import { professionsData } from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Ethics Complaint Defense by Profession | ${SITE_NAME}`,
  description:
    "Ethics and license defense for licensed professionals — attorneys, doctors, nurses, CPAs, dentists, pharmacists, teachers, and engineers. Free consultation.",
  alternates: { canonical: `${SITE_URL}/profession` },
  openGraph: {
    title: `Ethics Complaint Defense by Profession | ${SITE_NAME}`,
    description:
      "Defense by profession for ethics complaints, board investigations, and license revocation matters.",
    url: `${SITE_URL}/profession`,
  },
};

export default function ProfessionIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link
          href="/"
          className="text-[#8B0000] font-semibold text-sm font-sans hover:underline"
        >
          ← The Ethics Reporter
        </Link>
      </div>

      <div className="mb-8">
        <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
          By Profession
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">
          Ethics Complaint Defense by Profession
        </h1>
        <p className="font-serif text-lg text-gray-700 leading-relaxed">
          Every regulated profession has its own disciplinary regime — its own boards, its own
          rules, its own informal politics. Browse by profession for an overview of the most
          common complaints, the boards that hear them, and what the defense looks like.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {professionsData.map((p) => (
          <Link
            key={p.slug}
            href={`/profession/${p.slug}`}
            className="border border-gray-200 rounded-lg p-5 hover:border-[#8B0000] hover:shadow-sm transition-all group"
          >
            <div className="font-bold text-lg font-sans mb-2 group-hover:text-[#8B0000] transition-colors">
              {p.plural}
            </div>
            <div className="text-sm text-gray-600 font-serif">
              Investigated by the {p.boardLabel}.
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
        <h3 className="font-sans font-bold text-lg mb-2">
          Looking for state-specific defense?
        </h3>
        <p className="font-serif text-gray-700 mb-4">
          We defend licensed professionals in NY, NJ, RI, ME, MA, ND, IL, VT, PA, TX, and FL.
        </p>
        <Link
          href="/defend"
          className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
        >
          Browse by State →
        </Link>
      </div>
    </div>
  );
}
