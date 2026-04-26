import {
  defendStatesData,
  professionsData,
  type DefendStateData,
  type ProfessionData,
} from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const FIRM_PHONE = "1-800-555-0199";
const FIRM_PHONE_TEL = "+18005550199";
const FIRM_URL = "https://farvajafri.com";

export function generateStaticParams() {
  const params: { state: string; profession: string }[] = [];
  for (const s of defendStatesData) {
    for (const p of professionsData) {
      params.push({ state: s.slug, profession: p.slug });
    }
  }
  return params;
}

function getBoardForProfession(state: DefendStateData, profession: ProfessionData): string {
  switch (profession.boardKey) {
    case "bar":
      return state.bar;
    case "medicalBoard":
      return state.medicalBoard;
    case "nursingBoard":
      return state.nursingBoard;
    case "cpaBoard":
      return state.cpaBoard;
    case "dentalBoard":
      return state.dentalBoard;
    case "pharmacyBoard":
      return state.pharmacyBoard;
    case "teachingBoard":
      return state.teachingBoard;
    case "engineeringBoard":
      return state.engineeringBoard;
    default:
      return "the relevant licensing board";
  }
}

export function generateMetadata({
  params,
}: {
  params: { state: string; profession: string };
}): Metadata {
  const state = defendStatesData.find((s) => s.slug === params.state);
  const profession = professionsData.find((p) => p.slug === params.profession);
  if (!state || !profession) return {};
  return {
    title: `${state.name} ${profession.name} Ethics Defense | License Defense Attorney | ${SITE_NAME}`,
    description: `Defending ${profession.plural.toLowerCase()} in ${state.name} against ethics complaints, ${getBoardForProfession(state, profession)} investigations, and license revocation. Free consultation.`,
    alternates: { canonical: `${SITE_URL}/defend/${state.slug}/${profession.slug}` },
    openGraph: {
      title: `${state.name} ${profession.name} Ethics Defense | ${SITE_NAME}`,
      description: `Defense for ${state.name} ${profession.plural.toLowerCase()} facing ethics complaints and license investigations.`,
      url: `${SITE_URL}/defend/${state.slug}/${profession.slug}`,
    },
  };
}

export default function DefendStateProfessionPage({
  params,
}: {
  params: { state: string; profession: string };
}) {
  const state = defendStatesData.find((s) => s.slug === params.state);
  const profession = professionsData.find((p) => p.slug === params.profession);
  if (!state || !profession) notFound();

  const board = getBoardForProfession(state, profession);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${state.name} ${profession.name} Ethics Defense — Scott Law`,
    description: `Defense of ${state.name} ${profession.plural.toLowerCase()} against ethics complaints, ${board} investigations, and license revocation.`,
    url: `${SITE_URL}/defend/${state.slug}/${profession.slug}`,
    telephone: FIRM_PHONE,
    areaServed: { "@type": "State", name: state.name },
    serviceType: `${state.name} ${profession.name} License Defense`,
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
            href={`/defend/${state.slug}`}
            className="text-[#8B0000] font-semibold text-sm font-sans hover:underline"
          >
            ← {state.name} License Defense
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            {state.name} · {profession.plural}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            Defending {profession.plural} Against Ethics Complaints in {state.name}
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            If you are a {state.name} {profession.name.toLowerCase()} facing an ethics
            complaint, board investigation, or threat of license suspension, do not respond
            until you have spoken with counsel. The {board} has resources, lawyers, and
            investigators on its side. You should too.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ {state.name} {profession.name.toLowerCase()} response deadlines are short.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Most {state.name} licensing boards demand a sworn written response within 20–30
            days. Your written answer becomes part of the permanent record.
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
            <h2>Who Files Complaints Against {state.name} {profession.plural}</h2>
            <p>
              In {state.name}, complaints against {profession.plural.toLowerCase()} are filed
              with the <strong>{board}</strong>. Complaints can come from many sources, and
              every {state.name} board accepts written complaints from the public:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {profession.slug === "attorney" && (
                <>
                  <li>Current and former clients</li>
                  <li>Opposing counsel and opposing parties</li>
                  <li>Judges (mandatory reporting in many circumstances)</li>
                  <li>Other lawyers (mandatory reporting under Rule 8.3)</li>
                  <li>Bar staff who become aware of misconduct</li>
                </>
              )}
              {profession.slug === "doctor" && (
                <>
                  <li>Patients and family members</li>
                  <li>Hospitals (mandatory reporting after privilege actions)</li>
                  <li>Insurance companies and malpractice carriers</li>
                  <li>Pharmacists and nurses</li>
                  <li>The DEA, state Department of Health, or law enforcement</li>
                </>
              )}
              {profession.slug === "nurse" && (
                <>
                  <li>Patients and family members</li>
                  <li>Employers and supervisors (often mandatory reporters)</li>
                  <li>Co-workers (mandatory reporting in most states)</li>
                  <li>Hospital risk management and HR after termination</li>
                  <li>Law enforcement after any criminal arrest</li>
                </>
              )}
              {profession.slug === "cpa" && (
                <>
                  <li>Clients (individuals, businesses, audit committees)</li>
                  <li>The IRS Office of Professional Responsibility, SEC, or PCAOB</li>
                  <li>Peer reviewers and AICPA Ethics Division</li>
                  <li>Former partners and employees</li>
                  <li>State tax authorities</li>
                </>
              )}
              {profession.slug === "dentist" && (
                <>
                  <li>Patients and parents of pediatric patients</li>
                  <li>Insurance companies</li>
                  <li>Other dentists who pick up failed work</li>
                  <li>Dental hygienists and assistants (often mandatory reporters)</li>
                  <li>Hospitals if sedation incidents occur in surgical settings</li>
                </>
              )}
              {profession.slug === "pharmacist" && (
                <>
                  <li>Patients and prescribers</li>
                  <li>Employers (mandatory reporting after diversion or theft)</li>
                  <li>The DEA after audit discrepancies</li>
                  <li>Insurance auditors and PBMs</li>
                  <li>Co-workers and pharmacy technicians</li>
                </>
              )}
              {profession.slug === "teacher" && (
                <>
                  <li>Parents and students</li>
                  <li>School administrators (mandatory reporting in most states)</li>
                  <li>School districts after termination or non-renewal</li>
                  <li>Law enforcement after any arrest</li>
                  <li>Anonymous hotlines maintained by the state department of education</li>
                </>
              )}
              {profession.slug === "engineer" && (
                <>
                  <li>Clients and project owners</li>
                  <li>Public agencies and building officials</li>
                  <li>Other engineers (mandatory reporting in many states)</li>
                  <li>Whistleblowers and contractors</li>
                  <li>Insurance carriers after a claim</li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2>Common Ethics Violations {state.name} {profession.plural} Face</h2>
            <p>
              The {board} sees the same categories of complaints repeatedly. Knowing where
              these cases come from is the first step in defending one:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {profession.commonViolations.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>The {state.name} Investigation Process</h2>
            <p>
              Once the {board} dockets a complaint against a {state.name}{" "}
              {profession.name.toLowerCase()}, the process moves through several stages — each
              with its own risks and opportunities for the defense:
            </p>
            <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Notice and demand for response.</strong> You receive written notice
                from the {board} with a copy of the complaint and a deadline (usually 20–30
                days) to file a sworn written response. This is the most consequential
                document you will write in the case.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Document discovery.</strong> The {board} can issue subpoenas for
                records — files, billing, prescriptions, communications, recordings — and is
                not required to give you advance notice of every subpoena.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Witness interviews.</strong> Investigators interview the complainant,
                colleagues, and other witnesses. You may be asked to sit for a sworn interview
                or examination under oath.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Probable cause review.</strong> A panel decides whether to file formal
                charges. In serious matters, the {board} may also seek interim restrictions or
                summary suspension.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Negotiated resolution or hearing.</strong> Most cases resolve through a
                consent agreement before formal hearing. A negotiated outcome — often with
                conditions, monitoring, or coursework — usually beats a contested loss.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Final order and appeal.</strong> If the case proceeds to a hearing, the
                board issues a final order. Most are appealable to the {state.name} courts.
              </li>
            </ol>
          </section>

          <section>
            <h2>Consequences of an Upheld Complaint</h2>
            <p>{profession.consequences}</p>
            <p>
              In {state.name}, sanctions imposed by the {board} are reported to national
              clearinghouses and to every other state where you hold or seek a license. Even a
              private resolution can trigger collateral consequences — insurance non-renewal,
              hospital privilege loss, employer notification, and immigration concerns for
              non-citizens.
            </p>
          </section>

          <section>
            <h2>Why You Need an Attorney Immediately</h2>
            <p>
              {state.name} {profession.plural.toLowerCase()} routinely make the same fatal
              mistake: writing a long, defensive, &ldquo;just-the-facts&rdquo; response on
              their own and sending it to the {board} before counsel has reviewed it. That
              document becomes the cornerstone of the prosecution&apos;s case.
            </p>
            <p>
              We help you frame the response, decide what to admit and what to contest,
              preserve the record for appeal, identify privilege and self-incrimination
              issues, and — critically — open early conversations with the {board} about
              resolution. The earlier we are involved, the more options remain on the table.
            </p>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Don&apos;t Respond Alone. Call Now.
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Free, confidential consultation for {state.name} {profession.plural.toLowerCase()}.
              We will tell you what the {board} can and cannot do, what your real exposure is,
              and what your response should look like.
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
            <h2>Related Pages</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <Link
                  href={`/defend/${state.slug}`}
                  className="text-[#8B0000] hover:underline"
                >
                  {state.name} Ethics Complaint Defense — Overview
                </Link>
              </li>
              <li>
                <Link
                  href={`/profession/${profession.slug}`}
                  className="text-[#8B0000] hover:underline"
                >
                  Ethics Defense for {profession.plural} (National)
                </Link>
              </li>
              <li>
                <Link href="/defend" className="text-[#8B0000] hover:underline">
                  All License Defense Practice Areas
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
