import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

const FIRM_PHONE = "1-800-555-0199";
const FIRM_PHONE_TEL = "+18005550199";
const FIRM_URL = "https://farvajafri.com";

export const metadata: Metadata = {
  title: `Ethics Complaint & Professional License Defense | ${SITE_NAME}`,
  description:
    "Facing an ethics complaint or malpractice suit? Scott Law defends licensed professionals — attorneys, doctors, nurses, CPAs and more — in NY, NJ, RI, ME, MA, ND, IL, VT, PA, TX, and FL.",
  alternates: { canonical: `${SITE_URL}/defend` },
  openGraph: {
    title: `Ethics Complaint & Professional License Defense | ${SITE_NAME}`,
    description:
      "Defense for licensed professionals facing ethics complaints, license investigations, and malpractice suits across 11 states.",
    url: `${SITE_URL}/defend`,
  },
};

export default function DefendHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Scott Law — Professional Ethics & License Defense",
    description:
      "Defense of licensed professionals against ethics complaints, license investigations, and malpractice claims.",
    url: `${SITE_URL}/defend`,
    telephone: FIRM_PHONE,
    areaServed: defendStatesData.map((s) => ({
      "@type": "State",
      name: s.name,
    })),
    serviceType: [
      "Attorney Ethics Defense",
      "Medical License Defense",
      "Nursing License Defense",
      "CPA License Defense",
      "Professional Malpractice Defense",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            License Defense
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-sans mb-4 leading-tight">
            Facing an Ethics Complaint? We Defend Licensed Professionals.
          </h1>
          <p className="font-serif text-xl text-gray-700 leading-relaxed">
            A complaint to your licensing board is not a polite request — it is the opening
            move in a process that can end your career. Scott Law defends attorneys, doctors,
            nurses, CPAs, dentists, pharmacists, teachers, engineers, and other licensed
            professionals against ethics complaints, board investigations, and malpractice
            suits.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ Ethics complaint deadlines are strict. Contact us immediately.
          </p>
          <p className="font-serif text-gray-800 mb-4">
            Most states require a written response within 20–30 days of being served with a
            complaint. Anything you write before consulting counsel can — and will — be used
            against you in the disciplinary proceeding.
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
            <h2>States Where We Defend Licensed Professionals</h2>
            <p>
              Scott Law is admitted to defend professionals in the following 11 jurisdictions.
              Click your state for state-specific guidance on the disciplinary process and what
              to expect.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose mt-6">
              {defendStatesData.map((s) => (
                <Link
                  key={s.slug}
                  href={`/defend/${s.slug}`}
                  className="border border-gray-200 rounded-lg p-4 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">
                    {s.name}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2>Professionals We Defend</h2>
            <p>
              We represent licensed professionals across regulated industries. Our practice
              focuses on the moments when a license — and a livelihood — is on the line.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose mt-6">
              {professionsData.map((p) => (
                <Link
                  key={p.slug}
                  href={`/profession/${p.slug}`}
                  className="border border-gray-200 rounded-lg p-4 text-center hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="font-semibold text-sm font-sans group-hover:text-[#8B0000] transition-colors">
                    {p.plural}
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-4">
              We also defend architects, social workers, real estate brokers, insurance
              producers, veterinarians, psychologists, physical therapists, and other licensed
              professionals. If your license is on the line, call us.
            </p>
          </section>

          <section>
            <h2>What Happens in an Ethics Complaint</h2>
            <p>
              Every licensing board has its own procedures, but most ethics and license
              investigations follow a similar arc. Knowing the stages — and what is at stake at
              each one — is the first step in defending yourself.
            </p>
            <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Intake and screening.</strong> The board receives a complaint from a
                client, patient, employer, peer, or even an anonymous tipster. Staff counsel
                screens it for jurisdiction and facial sufficiency. Many complaints die here —
                but not all.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Demand for response.</strong> If the complaint survives intake, you
                will receive a written notice and a demand to respond — typically in writing,
                under oath, within a strict deadline (often 20–30 days). This is the most
                dangerous stage. Anything you write becomes part of the record.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Investigation.</strong> Investigators may interview witnesses, subpoena
                records, and obtain documents from third parties (banks, hospitals, schools,
                courts). Many boards have broad subpoena power and can compel discovery
                without a court order.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Probable cause / charging decision.</strong> A committee, panel, or
                hearing officer decides whether formal charges are warranted. In some states,
                the board can also impose interim suspension if it believes the public is at
                risk.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Formal hearing.</strong> If charged, you will face a contested hearing
                — closer to a trial than a deposition — with witnesses, exhibits, and
                cross-examination. Standards of proof vary; many states use clear and
                convincing evidence.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Sanction and review.</strong> If the panel finds violations, it
                recommends a sanction. Sanctions range from private admonition to license
                revocation. Many states allow appeal to a higher court or state supreme court.
              </li>
            </ol>
          </section>

          <section>
            <h2>Why You Need Defense Counsel — Now</h2>
            <p>
              Most disciplinary systems are run by your peers, but they are not your friends.
              Bar counsel, medical boards, nursing boards, and licensing tribunals exist to
              protect the public — not the licensee. The investigators are trained, the
              prosecutors are experienced, and the burden of explaining every record, message,
              and decision falls on you.
            </p>
            <p>
              We help you frame the response, preserve your rights against self-incrimination
              (especially when criminal exposure parallels the civil complaint), prepare for
              interviews, negotiate informal resolutions where possible, and litigate the case
              if it goes to a hearing.
            </p>
          </section>

          <section>
            <h2>Malpractice Defense</h2>
            <p>
              Many ethics complaints arrive alongside a malpractice suit, or are filed
              strategically to pressure settlement of a civil claim. We defend professionals on
              both fronts simultaneously, coordinating the malpractice defense with the
              licensing response so the two do not undermine each other.
            </p>
          </section>

          <div className="bg-[#1a1a1a] text-white p-8 rounded">
            <h3 className="font-sans font-bold text-2xl mb-3">
              Get a Free, Confidential Consultation
            </h3>
            <p className="font-serif text-gray-200 mb-5">
              Tell us what you are facing. We will give you a candid assessment — what the
              board can and cannot do, what your response should look like, and what the
              realistic range of outcomes is. The call is free and protected by attorney–client
              privilege.
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
