import { complaintTypesData } from "@/lib/complaint-types-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import DefendContactForm from "@/components/DefendContactForm";

const FIRM_URL = "#contact";

export function generateStaticParams() {
  return complaintTypesData.map((c) => ({ type: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { type: string };
}): Metadata {
  const complaint = complaintTypesData.find((c) => c.slug === params.type);
  if (!complaint) return {};
  return {
    title: `${complaint.name} Defense Attorney | Professional License Defense | ${SITE_NAME}`,
    description: `Defending licensed professionals against ${complaint.name.toLowerCase()} charges before licensing boards nationwide. Free consultation. Strict deadlines apply.`,
    alternates: { canonical: `${SITE_URL}/defend/complaint/${complaint.slug}` },
    openGraph: {
      title: `${complaint.name} Defense | Professional License Defense | ${SITE_NAME}`,
      description: `Defending licensed professionals against ${complaint.name.toLowerCase()} charges. What the board looks for, available defenses, and how to respond.`,
      url: `${SITE_URL}/defend/complaint/${complaint.slug}`,
    },
  };
}

export default function DefendComplaintTypePage({
  params,
}: {
  params: { type: string };
}) {
  const complaint = complaintTypesData.find((c) => c.slug === params.type);
  if (!complaint) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${complaint.name} Defense — The Ethics Reporter`,
    description: `Defense of licensed professionals facing ${complaint.name.toLowerCase()} charges before professional licensing boards nationwide.`,
    url: `${SITE_URL}/defend/complaint/${complaint.slug}`,
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: `${complaint.name} Professional License Defense`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-2">
          <Link
            href="/defend"
            className="text-[#8B0000] font-semibold text-sm font-sans hover:underline"
          >
            ← License Defense
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            Complaint Type Defense
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            Defending {complaint.title} Charges Before Your Licensing Board
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            {complaint.summary}
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ Response deadlines are strict — usually 20–30 days.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Your written response to a licensing board becomes part of the permanent record.
            Do not file it without counsel reviewing it first.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={FIRM_URL}
              
              
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              Get a Free Consultation →
            </a>
          </div>
        </div>

        <div className="space-y-10 article-content">
          <section>
            <div
              dangerouslySetInnerHTML={{
                __html: complaint.body
                  .split("\n\n")
                  .map((para) => {
                    if (para.startsWith("**") && para.endsWith("**")) {
                      return `<h2>${para.replace(/\*\*/g, "")}</h2>`;
                    }
                    if (para.startsWith("**")) {
                      const match = para.match(/^\*\*(.+?)\*\*\n?([\s\S]*)/);
                      if (match) {
                        return `<h2>${match[1]}</h2><p>${match[2]}</p>`;
                      }
                    }
                    return `<p>${para}</p>`;
                  })
                  .join("\n"),
              }}
            />
          </section>

          <section>
            <h2>Common Defenses to {complaint.name} Allegations</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {complaint.defenses.map((defense) => (
                <li key={defense}>{defense}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>What the Board Looks For</h2>
            <p>{complaint.boardFocus}</p>
          </section>

          <section>
            <h2>The Single Most Important Thing You Can Do</h2>
            <p>{complaint.responseKey}</p>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Facing a {complaint.name} allegation? Contact us now.
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Free, confidential consultation. Tell us what happened, and we will tell you
              what your exposure is and what to do next.
            </p>
            <div id="contact" className="bg-white rounded-xl p-6">
              <DefendContactForm />
            </div>
          </div>

          <section>
            <h2>Defend By State</h2>
            <p className="mb-4 font-serif text-gray-700">
              We defend licensed professionals in every state where we practice. Select a state to see
              state-specific board processes and defense resources:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose">
              {[
                { name: "New York", slug: "new-york" },
                { name: "New Jersey", slug: "new-jersey" },
                { name: "Rhode Island", slug: "rhode-island" },
                { name: "Maine", slug: "maine" },
                { name: "Massachusetts", slug: "massachusetts" },
                { name: "North Dakota", slug: "north-dakota" },
                { name: "Illinois", slug: "illinois" },
                { name: "Vermont", slug: "vermont" },
                { name: "Pennsylvania", slug: "pennsylvania" },
                { name: "Texas", slug: "texas" },
                { name: "Florida", slug: "florida" },
              ].map((state) => (
                <Link
                  key={state.slug}
                  href={`/defend/${state.slug}/${complaint.slug}`}
                  className="border border-gray-200 rounded-lg p-3 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">
                    {state.name}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2>Related Pages</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <Link href="/defend" className="text-[#8B0000] hover:underline">
                  All License Defense Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/defend/new-york" className="text-[#8B0000] hover:underline">
                  New York Professional License Defense
                </Link>
              </li>
              <li>
                <Link href="/defend/texas" className="text-[#8B0000] hover:underline">
                  Texas Professional License Defense
                </Link>
              </li>
              <li>
                <Link href="/defend/florida" className="text-[#8B0000] hover:underline">
                  Florida Professional License Defense
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
