import {
  defendStatesData,
  professionsData,
  type DefendStateData,
  type ProfessionData,
} from "@/lib/defend-states-data";
import { complaintTypesData, type ComplaintTypeData } from "@/lib/complaint-types-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import DefendContactForm from "@/components/DefendContactForm";

const FIRM_URL = "#contact";

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function findCityInState(state: DefendStateData, citySlug: string): string | null {
  const match = state.cities.find((c) => toSlug(c) === citySlug);
  return match ?? null;
}

export function generateStaticParams() {
  const params: { state: string; slug: string }[] = [];

  for (const s of defendStatesData) {
    // State × Profession combos (~88 pages)
    for (const p of professionsData) {
      params.push({ state: s.slug, slug: p.slug });
    }
    // State × Complaint combos (~440 pages)
    for (const c of complaintTypesData) {
      params.push({ state: s.slug, slug: c.slug });
    }
    // State × City combos (~55 pages)
    for (const city of s.cities) {
      params.push({ state: s.slug, slug: toSlug(city) });
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

function getStateBoardForComplaint(state: DefendStateData, complaint: ComplaintTypeData): string {
  switch (complaint.category) {
    case "attorney":
      return state.bar;
    case "medical":
      return state.medicalBoard;
    case "nursing":
      return state.nursingBoard;
    case "cpa":
      return state.cpaBoard;
    default:
      return "the relevant licensing board";
  }
}

export function generateMetadata({
  params,
}: {
  params: { state: string; slug: string };
}): Metadata {
  const state = defendStatesData.find((s) => s.slug === params.state);
  if (!state) return {};

  const profession = professionsData.find((p) => p.slug === params.slug);
  if (profession) {
    const board = getBoardForProfession(state, profession);
    return {
      title: `${state.name} ${profession.name} Ethics Defense | License Defense Attorney | ${SITE_NAME}`,
      description: `Defending ${profession.plural.toLowerCase()} in ${state.name} against ethics complaints, ${board} investigations, and license revocation. Free consultation.`,
      alternates: { canonical: `${SITE_URL}/defend/${state.slug}/${profession.slug}` },
      openGraph: {
        title: `${state.name} ${profession.name} Ethics Defense | ${SITE_NAME}`,
        description: `Defense for ${state.name} ${profession.plural.toLowerCase()} facing ethics complaints and license investigations.`,
        url: `${SITE_URL}/defend/${state.slug}/${profession.slug}`,
      },
    };
  }

  const complaint = complaintTypesData.find((c) => c.slug === params.slug);
  if (complaint) {
    return {
      title: `${state.name} ${complaint.name} Defense | ${state.name} License Defense | ${SITE_NAME}`,
      description: `Defending ${state.name} licensed professionals against ${complaint.name.toLowerCase()} charges before ${state.bar} and all ${state.name} licensing boards. Free consultation.`,
      alternates: { canonical: `${SITE_URL}/defend/${state.slug}/${complaint.slug}` },
      openGraph: {
        title: `${state.name} ${complaint.name} Defense | ${SITE_NAME}`,
        description: `${state.name} ${complaint.name} defense — state-specific board processes, defenses, and response guidance.`,
        url: `${SITE_URL}/defend/${state.slug}/${complaint.slug}`,
      },
    };
  }

  const cityName = findCityInState(state, params.slug);
  if (cityName) {
    return {
      title: `${cityName} Ethics Defense Attorney | ${state.name} License Defense | ${SITE_NAME}`,
      description: `Professional license defense attorney in ${cityName}, ${state.name}. Ethics complaints, board investigations, and license revocation defense for attorneys, doctors, nurses, CPAs, and more.`,
      alternates: { canonical: `${SITE_URL}/defend/${state.slug}/${params.slug}` },
      openGraph: {
        title: `${cityName} Ethics Defense Attorney | ${SITE_NAME}`,
        description: `Professional license defense in ${cityName} — defending ${state.name} licensed professionals against ethics complaints and board investigations.`,
        url: `${SITE_URL}/defend/${state.slug}/${params.slug}`,
      },
    };
  }

  return {};
}

// ─── PROFESSION PAGE ───────────────────────────────────────────────────────────

function ProfessionPage({
  state,
  profession,
}: {
  state: DefendStateData;
  profession: ProfessionData;
}) {
  const board = getBoardForProfession(state, profession);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${state.name} ${profession.name} Ethics Defense — Scott Law`,
    description: `Defense of ${state.name} ${profession.plural.toLowerCase()} against ethics complaints, ${board} investigations, and license revocation.`,
    url: `${SITE_URL}/defend/${state.slug}/${profession.slug}`,
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
            {profession.name} Ethics Defense in {state.name}
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
              
              
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              Get a Free Consultation →
            </a>
          </div>
        </div>

        <div className="space-y-10 article-content">
          <section>
            <h2>Who Files Complaints Against {state.name} {profession.plural}</h2>
            <p>
              In {state.name}, complaints against {profession.plural.toLowerCase()} are filed
              with the <strong>{board}</strong>. Complaints can come from many sources — every
              {" "}{state.name} board accepts written complaints from the public:
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
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {profession.commonViolations.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>How {state.name} {profession.name} Investigations Work</h2>
            <p>
              Once the {board} dockets a complaint against a {state.name}{" "}
              {profession.name.toLowerCase()}, the process moves through several stages:
            </p>
            <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Notice and demand for response.</strong> You receive written notice from
                the {board} with a deadline — usually 20–30 days — to file a sworn written
                response. This document becomes part of the permanent record.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Document discovery.</strong> The {board} can issue subpoenas for
                records — files, billing, prescriptions, communications.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Witness interviews.</strong> Investigators interview the complainant,
                colleagues, and other witnesses.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Probable cause review.</strong> A panel decides whether to file formal
                charges. The {board} may also seek interim restrictions or summary suspension.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Negotiated resolution or hearing.</strong> Most cases resolve through a
                consent agreement before formal hearing.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Final order and appeal.</strong> The board issues a final order,
                appealable to the {state.name} courts.
              </li>
            </ol>
          </section>

          <section>
            <h2>{state.name}-Specific Context</h2>
            <p className="font-serif text-gray-700">{state.uniqueRule}</p>
          </section>

          <section>
            <h2>Consequences of an Upheld Complaint</h2>
            <p>{profession.consequences}</p>
            <p>
              In {state.name}, sanctions imposed by the {board} are reported to national
              clearinghouses and to every other state where you hold or seek a license.
            </p>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Don&apos;t Respond Alone.
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Free, confidential consultation for {state.name}{" "}
              {profession.plural.toLowerCase()}. We will tell you what the {board} can and
              cannot do, what your real exposure is, and what your response should look like.
            </p>
            <div className="bg-white rounded-xl p-6">
              <DefendContactForm defaultState={state.name} defaultProfession={profession.name} />
            </div>
          </div>

          <section>
            <h2>Related Pages</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <Link href={`/defend/${state.slug}`} className="text-[#8B0000] hover:underline">
                  {state.name} Ethics Complaint Defense — Overview
                </Link>
              </li>
              <li>
                <Link href={`/profession/${profession.slug}`} className="text-[#8B0000] hover:underline">
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

// ─── COMPLAINT TYPE PAGE ───────────────────────────────────────────────────────

function ComplaintPage({
  state,
  complaint,
}: {
  state: DefendStateData;
  complaint: ComplaintTypeData;
}) {
  const boardName = getStateBoardForComplaint(state, complaint);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${state.name} ${complaint.name} Defense — Scott Law`,
    description: `Defense of ${state.name} licensed professionals facing ${complaint.name.toLowerCase()} charges before ${boardName}.`,
    url: `${SITE_URL}/defend/${state.slug}/${complaint.slug}`,
    areaServed: { "@type": "State", name: state.name },
    serviceType: `${state.name} ${complaint.name} License Defense`,
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
            {state.name} · {complaint.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            {state.name} {complaint.title} Defense —{" "}
            {complaint.category === "attorney"
              ? state.bar
              : complaint.category === "medical"
              ? state.medicalBoard
              : complaint.category === "nursing"
              ? state.nursingBoard
              : complaint.category === "cpa"
              ? state.cpaBoard
              : "Licensing Board"}{" "}
            Investigation
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            {complaint.summary} In {state.name}, these matters are handled by{" "}
            <strong>{boardName}</strong>.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ {state.name} response deadlines are strict — usually 20–30 days.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Your sworn written response to {boardName} becomes part of the permanent record.
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
            <h2>
              {complaint.name} in {state.name}: What You Need to Know
            </h2>
            <p>
              {state.name} licensed professionals facing {complaint.name.toLowerCase()}{" "}
              allegations do so under the jurisdiction of{" "}
              <strong>{boardName}</strong>. Here is what the process looks like and what is at
              stake.
            </p>
            <p className="text-sm text-gray-600 italic mt-4">{state.uniqueRule}</p>
          </section>

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
                      const matchResult = para.match(/^\*\*(.+?)\*\*\n?([\s\S]*)/);
                      if (matchResult) {
                        return `<h2>${matchResult[1]}</h2><p>${matchResult[2]}</p>`;
                      }
                    }
                    return `<p>${para}</p>`;
                  })
                  .join("\n"),
              }}
            />
          </section>

          <section>
            <h2>
              Defenses to {complaint.name} Allegations in {state.name}
            </h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              {complaint.defenses.map((defense) => (
                <li key={defense}>{defense}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>What {boardName} Looks For</h2>
            <p>{complaint.boardFocus}</p>
          </section>

          <section>
            <h2>The Most Important Thing You Can Do Right Now</h2>
            <p>{complaint.responseKey}</p>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Facing a {complaint.name} investigation in {state.name}?
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Free, confidential consultation. We will explain your exposure under{" "}
              {state.name} rules and tell you exactly what your response should say.
            </p>
            <div className="bg-white rounded-xl p-6">
              <DefendContactForm defaultState={state.name} />
            </div>
          </div>

          <section>
            <h2>Related {state.name} Defense Pages</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <Link href={`/defend/${state.slug}`} className="text-[#8B0000] hover:underline">
                  {state.name} Ethics Complaint Defense — Overview
                </Link>
              </li>
              {complaint.category === "attorney" && (
                <li>
                  <Link href={`/defend/${state.slug}/attorney`} className="text-[#8B0000] hover:underline">
                    {state.name} Attorney Ethics Defense
                  </Link>
                </li>
              )}
              {complaint.category === "medical" && (
                <li>
                  <Link href={`/defend/${state.slug}/doctor`} className="text-[#8B0000] hover:underline">
                    {state.name} Physician License Defense
                  </Link>
                </li>
              )}
              {complaint.category === "nursing" && (
                <li>
                  <Link href={`/defend/${state.slug}/nurse`} className="text-[#8B0000] hover:underline">
                    {state.name} Nursing License Defense
                  </Link>
                </li>
              )}
              {complaint.category === "cpa" && (
                <li>
                  <Link href={`/defend/${state.slug}/cpa`} className="text-[#8B0000] hover:underline">
                    {state.name} CPA License Defense
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/defend/complaint/${complaint.slug}`} className="text-[#8B0000] hover:underline">
                  {complaint.name} Defense — National Overview
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

// ─── CITY PAGE ─────────────────────────────────────────────────────────────────

function CityPage({
  state,
  cityName,
  citySlug,
}: {
  state: DefendStateData;
  cityName: string;
  citySlug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${cityName} Ethics Defense Attorney — Scott Law`,
    description: `Professional license defense in ${cityName}, ${state.name}. Ethics complaints, board investigations, and license revocation defense.`,
    url: `${SITE_URL}/defend/${state.slug}/${citySlug}`,
    areaServed: [
      { "@type": "City", name: cityName },
      { "@type": "State", name: state.name },
    ],
    serviceType: `${cityName} Professional License Defense`,
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
            {cityName} · {state.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            {cityName} Ethics Defense Attorney — {state.name} License Defense
          </h1>
          <p className="font-serif text-lg text-gray-700 leading-relaxed">
            If you are a licensed professional in {cityName} facing an ethics complaint or
            board investigation, time is critical. {state.name} licensing boards require a
            sworn written response typically within 20–30 days — and the answer you file will
            shape the rest of your professional life. We defend {cityName} attorneys, doctors,
            nurses, CPAs, dentists, pharmacists, teachers, and engineers before every major
            regulatory board in {state.name}.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ {state.name} response deadlines are strict — act now.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Most {state.name} licensing boards require a sworn written response within 20–30 days
            of complaint notice. The clock is already running.
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
            <h2>Professional License Defense in {cityName}</h2>
            <p>
              Licensed professionals in {cityName} are regulated by the same statewide boards
              as professionals elsewhere in {state.name} — but geographic context matters.
              Proceedings before {state.name} licensing authorities may take place at offices
              in {cityName} or at the relevant board&apos;s administrative headquarters.
              Understanding the local practice environment — including the reputation of the
              relevant regulatory staff, the local bar, and the administrative law judges who
              may hear formal charges — is part of an effective defense.
            </p>
            <p>
              We represent {cityName} professionals before:
            </p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <strong>Attorneys</strong> — {state.bar}
              </li>
              <li>
                <strong>Physicians</strong> — {state.medicalBoard}
              </li>
              <li>
                <strong>Nurses</strong> — {state.nursingBoard}
              </li>
              <li>
                <strong>CPAs</strong> — {state.cpaBoard}
              </li>
              <li>
                <strong>Dentists</strong> — {state.dentalBoard}
              </li>
              <li>
                <strong>Pharmacists</strong> — {state.pharmacyBoard}
              </li>
              <li>
                <strong>Teachers</strong> — {state.teachingBoard}
              </li>
              <li>
                <strong>Engineers</strong> — {state.engineeringBoard}
              </li>
            </ul>
          </section>

          <section>
            <h2>
              Why Responding Alone Is Dangerous for {cityName} Professionals
            </h2>
            <p>
              The most common mistake made by {cityName} licensed professionals facing ethics
              complaints is writing their own response. The response is not a place to explain
              yourself or vent frustration. It is a legal document that investigators, board
              members, and eventually administrative law judges will scrutinize for admissions,
              inconsistencies, and opportunities to build a stronger case against you.
            </p>
            <p>
              Professionals who retain counsel before filing the initial response consistently
              achieve better outcomes than those who respond alone. We help{" "}
              {cityName} professionals frame the facts, organize supporting evidence, assert
              privilege where it exists, and identify parallel criminal or civil exposure that
              needs to be coordinated from day one.
            </p>
          </section>

          <section>
            <h2>{state.name} Disciplinary Process — What {cityName} Professionals Face</h2>
            <p>
              {state.name}&apos;s licensing board process is consistent across{" "}
              {state.name}, including for professionals based in {cityName}:
            </p>
            <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Complaint receipt and screening.</strong> The board receives the
                complaint and screens it for jurisdictional sufficiency. You may not know a
                complaint has been filed until the notice letter arrives.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Notice of investigation and response deadline.</strong> The board sends
                a formal notice with a copy of the complaint and a sworn response deadline —
                typically 20–30 days.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Investigation, subpoenas, and witness interviews.</strong> Board
                investigators have broad subpoena authority and may interview witnesses without
                notifying you.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Probable cause determination.</strong> A panel reviews the investigation
                and decides whether to file formal charges. In serious cases, the board may
                also impose interim or emergency license restrictions.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Consent agreement or formal hearing.</strong> Most cases resolve
                through negotiated consent before a formal hearing. We negotiate consent
                agreements that minimize sanctions and preserve your ability to continue
                practicing.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Final order.</strong> The board issues findings of fact and a sanction
                order, which is appealable to the {state.name} courts.
              </li>
            </ol>
            <p className="text-sm text-gray-600 italic mt-4">{state.uniqueRule}</p>
          </section>

          <section>
            <h2>Professionals We Defend in {cityName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose mt-4">
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

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              {cityName} ethics complaint? Contact us now.
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Free, confidential consultation for {cityName} licensed professionals. We will
              review the complaint, assess your exposure, and tell you what your response
              should say before the deadline runs.
            </p>
            <div className="bg-white rounded-xl p-6">
              <DefendContactForm defaultState={state.name} />
            </div>
          </div>

          <section>
            <h2>Other {state.name} Cities We Serve</h2>
            <div className="flex flex-wrap gap-2 not-prose mt-2">
              {state.cities
                .filter((c) => c !== cityName)
                .map((c) => (
                  <Link
                    key={c}
                    href={`/defend/${state.slug}/${toSlug(c)}`}
                    className="inline-block border border-gray-200 rounded px-3 py-1 text-sm text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-colors"
                  >
                    {c}
                  </Link>
                ))}
            </div>
          </section>

          <section>
            <h2>Related Pages</h2>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>
                <Link href={`/defend/${state.slug}`} className="text-[#8B0000] hover:underline">
                  {state.name} Ethics Complaint Defense — Overview
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

// ─── MAIN ROUTE HANDLER ────────────────────────────────────────────────────────

export default function DefendStateSlugPage({
  params,
}: {
  params: { state: string; slug: string };
}) {
  const state = defendStatesData.find((s) => s.slug === params.state);
  if (!state) notFound();

  // 1. Try profession
  const profession = professionsData.find((p) => p.slug === params.slug);
  if (profession) {
    return <ProfessionPage state={state} profession={profession} />;
  }

  // 2. Try complaint type
  const complaint = complaintTypesData.find((c) => c.slug === params.slug);
  if (complaint) {
    return <ComplaintPage state={state} complaint={complaint} />;
  }

  // 3. Try city
  const cityName = findCityInState(state, params.slug);
  if (cityName) {
    return <CityPage state={state} cityName={cityName} citySlug={params.slug} />;
  }

  notFound();
}
