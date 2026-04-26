import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { statesData } from "@/lib/states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const FIRM_PHONE = "1-800-555-0199";
const FIRM_PHONE_TEL = "+18005550199";
const FIRM_URL = "https://farvajafri.com";

export function generateStaticParams() {
  return defendStatesData.map((s) => ({ state: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { state: string };
}): Metadata {
  const state = defendStatesData.find((s) => s.slug === params.state);
  if (!state) return {};
  return {
    title: `${state.name} Ethics Complaint Defense Attorney | Professional License Defense | ${SITE_NAME}`,
    description: `${state.name} ethics complaint and professional license defense for attorneys, doctors, nurses, CPAs, and other licensed professionals. Free consultation. Strict deadlines apply.`,
    alternates: { canonical: `${SITE_URL}/defend/${state.slug}` },
    openGraph: {
      title: `${state.name} Ethics & License Defense | ${SITE_NAME}`,
      description: `Defending ${state.name} licensed professionals against ethics complaints, board investigations, and malpractice suits.`,
      url: `${SITE_URL}/defend/${state.slug}`,
    },
  };
}

export default function DefendStatePage({
  params,
}: {
  params: { state: string };
}) {
  const state = defendStatesData.find((s) => s.slug === params.state);
  if (!state) notFound();

  const hasArticleState = statesData.find((s) => s.slug === state.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${state.name} Ethics & Professional License Defense — Scott Law`,
    description: `Defense of ${state.name} licensed professionals against ethics complaints, license investigations, and malpractice claims.`,
    url: `${SITE_URL}/defend/${state.slug}`,
    telephone: FIRM_PHONE,
    areaServed: { "@type": "State", name: state.name },
    serviceType: [
      `${state.name} Attorney Ethics Defense`,
      `${state.name} Medical License Defense`,
      `${state.name} Nursing License Defense`,
      `${state.name} CPA License Defense`,
      `${state.name} Professional Malpractice Defense`,
    ],
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
            {state.name} License Defense
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            Ethics Complaint Defense in {state.name}: We Protect Licensed Professionals
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            If you have received notice of a {state.name} ethics complaint, board
            investigation, or malpractice claim, the next 30 days will shape the rest of your
            professional life. Scott Law defends {state.name} attorneys, doctors, nurses,
            CPAs, dentists, pharmacists, teachers, and engineers when their licenses are on
            the line.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ {state.name} response deadlines are strict.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Most {state.name} licensing boards require a sworn written response within 20–30
            days. Do not write that response without counsel.
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
            <h2>What an Ethics Complaint in {state.name} Actually Means</h2>
            <p>
              An ethics complaint in {state.name} is not a lawsuit, and not a criminal charge —
              but it can carry consequences worse than either. A finding by a {state.name}
              licensing board is reported to national clearinghouses (NPDB, NURSYS, NASDTEC,
              NCEES, the National Lawyer Regulatory Data Bank) and follows you across every
              state where you hold or seek a license.
            </p>
            <p>
              Complaints can be filed by clients, patients, opposing counsel, employers,
              co-workers, hospital risk managers, insurance companies, government agencies, or
              even anonymous tipsters. {state.name} boards generally accept all written
              complaints and at least screen them — meaning no complaint can be safely
              ignored.
            </p>
            <p className="text-sm text-gray-600 italic">
              {state.uniqueRule}
            </p>
          </section>

          <section>
            <h2>{state.name} Professionals We Defend</h2>
            <p>
              We represent {state.name} licensed professionals in front of every major
              regulatory body in the state:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <strong>Attorneys</strong> — before the {state.bar}.{" "}
                <Link
                  href={`/defend/${state.slug}/attorney`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more about {state.name} attorney ethics defense →
                </Link>
              </li>
              <li>
                <strong>Doctors</strong> — before the {state.medicalBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/doctor`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more about {state.name} physician license defense →
                </Link>
              </li>
              <li>
                <strong>Nurses</strong> — before the {state.nursingBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/nurse`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more about {state.name} nursing license defense →
                </Link>
              </li>
              <li>
                <strong>CPAs</strong> — before the {state.cpaBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/cpa`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more about {state.name} CPA defense →
                </Link>
              </li>
              <li>
                <strong>Dentists</strong> — before the {state.dentalBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/dentist`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more →
                </Link>
              </li>
              <li>
                <strong>Pharmacists</strong> — before the {state.pharmacyBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/pharmacist`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more →
                </Link>
              </li>
              <li>
                <strong>Teachers</strong> — before the {state.teachingBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/teacher`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more →
                </Link>
              </li>
              <li>
                <strong>Engineers</strong> — before the {state.engineeringBoard}.{" "}
                <Link
                  href={`/defend/${state.slug}/engineer`}
                  className="text-[#8B0000] hover:underline"
                >
                  Read more →
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2>The {state.name} Disciplinary Process</h2>
            <p>
              Each {state.name} licensing board has its own rules, but the overall structure is
              consistent across professions. The general arc is:
            </p>
            <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Complaint intake.</strong> The {state.name} board receives a written
                complaint and screens it for jurisdiction and facial sufficiency. You may not
                even know a complaint exists yet.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Notice of investigation.</strong> If the complaint survives intake, the
                board will send written notice and a demand for response. {state.name} boards
                typically require a sworn written answer within 20–30 days.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Discovery and investigation.</strong> {state.name} investigators may
                interview witnesses, subpoena records, and obtain documents from third parties
                — banks, hospitals, schools, courts. Subpoena power is broad and largely
                unsupervised at this stage.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Probable cause review.</strong> A panel decides whether formal charges
                are warranted. In serious cases, {state.name} boards can also impose interim
                license restrictions or summary suspension.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Formal hearing.</strong> If charged, you face a contested hearing with
                witnesses, exhibits, and cross-examination — often before an Administrative
                Law Judge or board-appointed hearing officer.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Final order and appeal.</strong> The board issues findings of fact,
                conclusions of law, and a sanction. Most {state.name} disciplinary orders are
                appealable to the appropriate state appellate court.
              </li>
            </ol>
          </section>

          <section>
            <h2>{state.name} Malpractice Defense</h2>
            <p>
              Many ethics complaints in {state.name} arrive alongside a malpractice suit, or
              shortly after one is filed. Plaintiffs sometimes file board complaints
              strategically — to build pressure, gain discovery, or coerce settlement. The
              statements you make in one proceeding will appear in the other.
            </p>
            <p>
              We defend {state.name} licensees on both fronts at the same time. That means
              coordinating the malpractice defense with the licensing response so the two do
              not conflict, asserting privilege where it exists, and preserving the right
              against self-incrimination where parallel criminal exposure is real.
            </p>
          </section>

          <section>
            <h2>Where We Practice in {state.name}</h2>
            <p>
              We represent professionals throughout {state.name}, including in {state.cities.slice(0, -1).join(", ")} and {state.cities[state.cities.length - 1]}. Most disciplinary
              proceedings are handled remotely or at the board&apos;s administrative offices, so
              geography is rarely an obstacle to representation.
            </p>
          </section>

          {hasArticleState && (
            <section>
              <h2>Related {state.name} Resources</h2>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                <li>
                  <Link
                    href={`/state/${state.slug}`}
                    className="text-[#8B0000] hover:underline"
                  >
                    Attorney Discipline in {state.name} — How the Bar System Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-to/file-bar-complaint"
                    className="text-[#8B0000] hover:underline"
                  >
                    How a Bar Complaint Is Filed (and What That Means for the Defense)
                  </Link>
                </li>
              </ul>
            </section>
          )}

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Call now — {state.name} ethics complaint deadlines are strict.
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              The clock starts the moment you receive notice from a {state.name} licensing
              board. Get a free, confidential consultation before the response deadline runs.
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

          <section>
            <h2>Browse Defense by Profession</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose mt-6">
              {professionsData.map((p) => (
                <Link
                  key={p.slug}
                  href={`/defend/${state.slug}/${p.slug}`}
                  className="border border-gray-200 rounded-lg p-3 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">
                    {p.plural}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
