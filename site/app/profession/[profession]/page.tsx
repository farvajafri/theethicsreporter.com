import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const FIRM_PHONE = "1-800-555-0199";
const FIRM_PHONE_TEL = "+18005550199";
const FIRM_URL = "https://farvajafri.com";

export function generateStaticParams() {
  return professionsData.map((p) => ({ profession: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { profession: string };
}): Metadata {
  const profession = professionsData.find((p) => p.slug === params.profession);
  if (!profession) return {};
  return {
    title: `Ethics Complaint Defense for ${profession.plural} | License Defense Attorney | ${SITE_NAME}`,
    description: `${profession.name} ethics complaint defense — board investigations, license suspension, and revocation matters. Available in NY, NJ, RI, ME, MA, ND, IL, VT, PA, TX, FL.`,
    alternates: { canonical: `${SITE_URL}/profession/${profession.slug}` },
    openGraph: {
      title: `${profession.name} Ethics Defense | ${SITE_NAME}`,
      description: `Defense for ${profession.plural.toLowerCase()} facing ethics complaints, license investigations, and malpractice suits.`,
      url: `${SITE_URL}/profession/${profession.slug}`,
    },
  };
}

export default function ProfessionPage({
  params,
}: {
  params: { profession: string };
}) {
  const profession = professionsData.find((p) => p.slug === params.profession);
  if (!profession) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${profession.name} Ethics Defense — Scott Law`,
    description: `Defense for ${profession.plural.toLowerCase()} against ethics complaints, license investigations, and malpractice claims.`,
    url: `${SITE_URL}/profession/${profession.slug}`,
    telephone: FIRM_PHONE,
    serviceType: `${profession.name} License Defense`,
    areaServed: defendStatesData.map((s) => ({
      "@type": "State",
      name: s.name,
    })),
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
            href="/profession"
            className="text-[#8B0000] font-semibold text-sm font-sans hover:underline"
          >
            ← By Profession
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            {profession.plural}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            Ethics Complaint Defense for {profession.plural}
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            {profession.plural} are held to a unique disciplinary standard, governed by the{" "}
            {profession.boardLabel} in each state. A single complaint can trigger an
            investigation, an administrative hearing, and license consequences that follow
            you across every jurisdiction in which you practice.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ License board response deadlines are short.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Most {profession.boardLabel}s require a sworn written response within 20–30 days
            of being served. Do not respond without counsel.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={FIRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              Get a Free Consultation →
            </a>
            <a
              href={`tel:${FIRM_PHONE_TEL}`}
              className="inline-block bg-white border-2 border-[#8B0000] text-[#8B0000] font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Call {FIRM_PHONE}
            </a>
          </div>
        </div>

        <div className="space-y-10 article-content">
          <section>
            <h2>What Ethics Complaints Look Like for {profession.plural}</h2>
            <p>
              Complaints against {profession.plural.toLowerCase()} arrive through formal
              channels — a written complaint to the {profession.boardLabel}, a peer report, an
              employer report, or a referral from another agency. Most complainants do not
              fully understand the rules they are accusing you of violating. That asymmetry is
              both a vulnerability and an opportunity, depending on how it is handled.
            </p>
          </section>

          <section>
            <h2>Which Board Investigates {profession.plural}</h2>
            <p>
              {profession.plural} are regulated at the state level by the {profession.boardLabel}.
              The exact name of the board varies by state — for example:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {defendStatesData.slice(0, 6).map((s) => {
                const boardKey = profession.boardKey;
                const board = s[boardKey];
                return (
                  <li key={s.slug}>
                    <strong>{s.name}:</strong>{" "}
                    <Link
                      href={`/defend/${s.slug}/${profession.slug}`}
                      className="text-[#8B0000] hover:underline"
                    >
                      {board}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2>Common Violations</h2>
            <p>
              The most frequent allegations against {profession.plural.toLowerCase()} fall
              into a recognizable set of categories:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {profession.commonViolations.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Consequences of an Upheld Complaint</h2>
            <p>{profession.consequences}</p>
          </section>

          <section>
            <h2>How We Help</h2>
            <p>
              We represent {profession.plural.toLowerCase()} from the first notice through
              final order — drafting the response, managing document production, negotiating
              with board counsel, preparing witnesses, conducting hearings, and where
              necessary, appealing to state court. We also coordinate parallel malpractice
              defense and criminal exposure when those issues are in play.
            </p>
          </section>

          <section>
            <h2>States Where We Defend {profession.plural}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose mt-4">
              {defendStatesData.map((s) => (
                <Link
                  key={s.slug}
                  href={`/defend/${s.slug}/${profession.slug}`}
                  className="border border-gray-200 rounded-lg p-3 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">
                    {s.name}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Free Consultation for {profession.plural}
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Tell us what you are facing. We will give you a candid read on the {profession.boardLabel}
              process, your real exposure, and what your response should look like.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={FIRM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
              >
                Request Consultation →
              </a>
              <a
                href={`tel:${FIRM_PHONE_TEL}`}
                className="inline-block bg-white text-[#1a1a1a] font-semibold font-sans px-5 py-2.5 rounded hover:bg-gray-100 transition-colors"
              >
                Call {FIRM_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
