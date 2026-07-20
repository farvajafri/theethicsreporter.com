import { attorneysData } from "@/lib/attorneys-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Attorney Investigation Index | ${SITE_NAME}`,
  description:
    "Index of attorneys investigated by The Ethics Reporter for professional misconduct, ethics violations, disbarment, and suspension.",
  alternates: { canonical: `${SITE_URL}/attorney` },
  openGraph: {
    title: `Attorney Investigation Index | ${SITE_NAME}`,
    description:
      "Index of attorneys investigated by The Ethics Reporter for professional misconduct, ethics violations, disbarment, and suspension.",
    url: `${SITE_URL}/attorney`,
  },
};

const statusColor: Record<string, string> = {
  "Under Investigation": "bg-yellow-100 text-yellow-800",
  Disciplined: "bg-orange-100 text-orange-800",
  Suspended: "bg-red-100 text-red-800",
  Disbarred: "bg-red-900 text-white",
  Censured: "bg-purple-100 text-purple-800",
  Active: "bg-green-100 text-green-800",
  Resigned: "bg-gray-100 text-gray-800",
};

export default function AttorneyIndexPage() {
  const byStatus: Record<string, typeof attorneysData> = {};
  for (const a of attorneysData) {
    if (!byStatus[a.status]) byStatus[a.status] = [];
    byStatus[a.status].push(a);
  }

  const statusOrder = ["Under Investigation", "Suspended", "Disbarred", "Disciplined", "Censured", "Resigned", "Active"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Attorney Investigation Index",
    description: "Index of attorneys investigated by The Ethics Reporter",
    url: `${SITE_URL}/attorney`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

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
            Investigations
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">Attorney Investigation Index</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed max-w-3xl">
            The Ethics Reporter investigates attorneys across the United States for professional misconduct, ethics
            violations, fraud, and abuse of client trust. This index catalogs every attorney we have investigated or
            reported on.
          </p>
        </div>

        {statusOrder.map((status) => {
          const group = byStatus[status];
          if (!group || group.length === 0) return null;
          return (
            <div key={status} className="mb-10">
              <h2 className="text-xl font-bold font-sans mb-4 border-b border-gray-200 pb-2">{status}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((attorney) => (
                  <Link
                    key={attorney.slug}
                    href={`/attorney/${attorney.slug}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold font-sans group-hover:text-[#8B0000] transition-colors">{attorney.name}</h3>
                      <span className={`text-xs font-bold font-sans px-2 py-0.5 rounded whitespace-nowrap ${statusColor[attorney.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {attorney.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-sans mb-1">
                      {attorney.state}{attorney.city ? `, ${attorney.city}` : ""}
                      {attorney.admittedYear ? ` · Admitted ${attorney.admittedYear}` : ""}
                    </p>
                    <p className="text-xs text-gray-600 font-serif line-clamp-2">{attorney.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-10 bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Know of Attorney Misconduct?</h3>
          <p className="font-serif text-gray-700 mb-4">
            The Ethics Reporter investigates attorney misconduct and judicial corruption. If you have information about
            an attorney who belongs on this list, submit a tip.
          </p>
          <Link
            href="/tip"
            className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
          >
            Submit a Tip
          </Link>
        </div>
      </div>
    </>
  );
}
