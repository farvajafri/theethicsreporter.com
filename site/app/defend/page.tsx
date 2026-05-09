import { defendStatesData, professionsData } from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import DefendContactForm from "@/components/DefendContactForm";

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
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
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
            professionals against ethics complaints, board investigations, and malpractice suits.
          </p>
        </div>

        {/* Urgency banner */}
        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-6 rounded mb-10">
          <p className="font-sans font-bold text-lg mb-2">
            ⏰ Ethics complaint deadlines are strict. Contact us immediately.
          </p>
          <p className="font-serif text-gray-800 mb-0">
            Most states require a written response within 20–30 days of being served with a
            complaint. Anything you write before consulting counsel can — and will — be used
            against you in the disciplinary proceeding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          {/* Left: content */}
          <div className="lg:col-span-3 space-y-10 article-content">
            <section>
              <h2>States Where We Defend Licensed Professionals</h2>
              <p>
                Scott Law is admitted to defend professionals in the following 11 jurisdictions.
                Click your state for state-specific guidance on the disciplinary process and what to expect.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose mt-6">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose mt-6">
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
            </section>

            <section>
              <h2>What Happens in an Ethics Complaint</h2>
              <p>
                Every licensing board has its own procedures, but most ethics and license
                investigations follow a similar arc. Knowing the stages — and what is at stake
                at each one — is the first step in defending yourself.
              </p>
              <ol style={{ paddingLeft: "1.5rem", listStyleType: "decimal" }}>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Intake and screening.</strong> The board receives a complaint and staff
                  counsel screens it for jurisdiction and sufficiency. Many complaints die here — but not all.
                </li>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Demand for response.</strong> You receive a written notice and a demand
                  to respond — typically in writing, under oath, within 20–30 days. This is the
                  most dangerous stage. Anything you write becomes part of the record.
                </li>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Investigation.</strong> Investigators may interview witnesses, subpoena
                  records, and obtain documents from third parties. Many boards have broad subpoena
                  power without a court order.
                </li>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Probable cause / charging decision.</strong> A panel decides whether formal
                  charges are warranted. Boards can also impose interim suspension if the public is at risk.
                </li>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Formal hearing.</strong> A contested proceeding — closer to a trial —
                  with witnesses, exhibits, and cross-examination.
                </li>
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>Sanction and review.</strong> Sanctions range from private admonition
                  to license revocation. Many states allow appeal.
                </li>
              </ol>
            </section>

            <section>
              <h2>Why You Need Defense Counsel — Now</h2>
              <p>
                Most disciplinary systems are run by your peers, but they are not your friends.
                Bar counsel, medical boards, nursing boards, and licensing tribunals exist to
                protect the public — not the licensee. We help you frame the response, preserve
                your rights, prepare for interviews, negotiate informal resolutions, and litigate
                if it goes to a hearing.
              </p>
            </section>
          </div>

          {/* Right: sticky contact form */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 bg-white border-2 border-[#8B0000] rounded-xl p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-1">Free & Confidential</p>
              <h2 className="text-xl font-bold font-sans text-gray-900 mb-1">Get a Free Consultation</h2>
              <p className="text-sm text-gray-600 font-sans mb-5 leading-relaxed">
                Tell us what you&apos;re facing. We&apos;ll contact you — typically within one business day.
              </p>
              <DefendContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
