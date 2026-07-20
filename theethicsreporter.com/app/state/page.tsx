import { statesData } from "@/lib/states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Attorney Discipline by State | ${SITE_NAME}`,
  description: "Find attorney discipline information, how to file bar complaints, and judicial misconduct reporting for all 50 states.",
  alternates: { canonical: `${SITE_URL}/state` },
};

export default function StatesIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-3">Attorney Discipline by State</h1>
        <p className="text-gray-600 font-serif text-lg">
          Find your state&apos;s bar discipline system, how to file a complaint against a lawyer or judge, and recent misconduct cases. All 50 states covered.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {statesData.map((s) => (
          <Link
            key={s.slug}
            href={`/state/${s.slug}`}
            className="border border-gray-200 rounded-lg p-3 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
          >
            <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">{s.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
