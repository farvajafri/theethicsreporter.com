import { statesData } from "@/lib/states-data";
import { defendStatesData } from "@/lib/defend-states-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return statesData.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
  const state = statesData.find((s) => s.slug === params.state);
  if (!state) return {};
  return {
    title: `Attorney Discipline in ${state.name}: Bar Complaints, Disbarments & Misconduct | ${SITE_NAME}`,
    description: `${state.name} attorney discipline information, how to file bar complaints against lawyers, recent disbarment cases, and how to report judicial misconduct in ${state.name}.`,
    alternates: { canonical: `${SITE_URL}/state/${state.slug}` },
    openGraph: {
      title: `Attorney Discipline in ${state.name} | ${SITE_NAME}`,
      description: `How to file bar complaints in ${state.name}, recent disbarment cases, and judicial misconduct reporting.`,
      url: `${SITE_URL}/state/${state.slug}`,
    },
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = statesData.find((s) => s.slug === params.state);
  if (!state) notFound();

  const defendsThisState = defendStatesData.some((d) => d.slug === state.slug);
  const defendHref = defendsThisState ? `/defend/${state.slug}` : "/defend";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Attorney Discipline in ${state.name}`,
    description: `${state.name} attorney discipline, bar complaints, and judicial misconduct reporting.`,
    url: `${SITE_URL}/state/${state.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-2">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">← The Ethics Reporter</Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">State Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">Attorney Discipline in {state.name}</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed">
            A complete guide to attorney discipline in {state.name}: how the bar system works, how to file a complaint against a lawyer or judge, and what to expect from the disciplinary process.
          </p>
        </div>

        <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-5 rounded mb-10">
          <p className="font-sans font-bold text-base mb-2">
            ⚖️ Are you a licensed professional facing an ethics complaint in {state.name}?
          </p>
          <p className="font-serif text-gray-800 mb-4 text-sm">
            We defend attorneys, doctors, nurses, CPAs and ALL licensed professionals against {state.name} board investigations and malpractice claims.
          </p>
          <Link
            href={defendHref}
            className="inline-block bg-[#8B0000] text-white font-semibold font-sans text-sm px-4 py-2 rounded hover:bg-[#6b0000] transition-colors"
          >
            Get a Free Consultation →
          </Link>
        </div>

        <div className="space-y-10 article-content">
          <section>
            <h2>The {state.name} Bar Discipline System</h2>
            <p>
              Attorney discipline in {state.name} is administered by the <strong>{state.bar}</strong>. The organization is responsible for investigating complaints against licensed attorneys, conducting disciplinary proceedings, and imposing sanctions ranging from private admonishment to disbarment.
            </p>
            <p>
              Like all state bar discipline systems, {state.name}&apos;s process is largely self-policing — run by lawyers, for lawyers. The bar receives thousands of complaints each year, but only a small fraction result in public discipline. Critics argue the system is designed to protect attorneys rather than the public. Nonetheless, it remains the primary avenue for holding lawyers accountable for misconduct.
            </p>
            <p>
              The {state.bar} can be contacted at: <strong>{state.barAddr}</strong>. More information is available at <a href={state.barUrl} target="_blank" rel="noopener noreferrer">{state.barUrl}</a>.
            </p>
          </section>

          <section>
            <h2>How to File a Bar Complaint in {state.name}</h2>
            <p>If you believe an attorney has violated their professional obligations in {state.name}, you have the right to file a formal complaint. Here is how the process works:</p>
            <ol style={{paddingLeft: "1.5rem", listStyleType: "decimal"}}>
              <li style={{marginBottom: "0.75rem"}}><strong>Gather your documentation.</strong> Collect all relevant materials: your retainer agreement, invoices, written communications (emails, letters, texts), court documents, and any evidence of the misconduct. The more specific and documented your complaint, the more seriously it will be reviewed.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Contact the {state.bar}.</strong> Visit their website or call their office to obtain the correct complaint form. Many state bars now accept online submissions. The {state.name} bar can be reached at {state.barAddr}.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Submit your written complaint.</strong> Describe the attorney&apos;s conduct factually and chronologically. Identify which professional conduct rules you believe were violated. Attach all supporting documentation.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Wait for intake review.</strong> The bar will review your complaint to determine whether it falls within their jurisdiction and whether the conduct alleged, if true, would constitute a rule violation. Many complaints are dismissed at this stage.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Participate in the investigation.</strong> If your complaint proceeds, you may be asked to provide additional information, submit to interviews, or participate in hearings. The attorney will also have an opportunity to respond.</li>
            </ol>
            <p>
              You can also purchase our <Link href="/products" className="text-[#8B0000] hover:underline">{state.name} Bar Complaint Template</Link> — a professionally formatted, state-specific template for $1.99.
            </p>
          </section>

          <section>
            <h2>The {state.name} Judicial Conduct System</h2>
            <p>
              Complaints against judges in {state.name} are handled by the <strong>{state.jc}</strong>, located at {state.jcAddr}. The Commission investigates allegations of judicial misconduct and has the authority to recommend discipline ranging from private admonishment to removal from the bench.
            </p>
            <p>
              Judicial conduct commissions are even more insulated from public accountability than bar discipline systems. Members are typically appointed by the courts themselves, and proceedings are almost always confidential until formal charges are filed. The result is a system that makes it difficult for the public to know whether judges are being held accountable for their conduct.
            </p>
          </section>

          <section>
            <h2>How to Report a Judge in {state.name}</h2>
            <ol style={{paddingLeft: "1.5rem", listStyleType: "decimal"}}>
              <li style={{marginBottom: "0.75rem"}}><strong>Document the misconduct.</strong> Gather court transcripts, written orders, case numbers, and any other evidence of the conduct you are reporting. Judicial conduct complaints must be specific and factual.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Contact the {state.jc}.</strong> Request a complaint form or access their online submission system. Be prepared to identify the judge by full name, court, and county.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Submit your complaint in writing.</strong> Describe the conduct, cite the specific case and date, and identify which provisions of the {state.name} Code of Judicial Conduct you believe were violated.</li>
              <li style={{marginBottom: "0.75rem"}}><strong>Understand confidentiality.</strong> In most states, judicial conduct proceedings are confidential until formal charges are filed. You may not receive detailed updates about the investigation&apos;s progress.</li>
            </ol>
            <p>
              Our <Link href="/products" className="text-[#8B0000] hover:underline">{state.name} Judiciary Complaint Template</Link> includes all required sections for filing a judicial misconduct complaint in {state.name} — available for $1.99.
            </p>
          </section>

          <section>
            <h2>Attorney Discipline Resources in {state.name}</h2>
            <ul style={{paddingLeft: "1.5rem", listStyleType: "disc"}}>
              <li><a href={state.barUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">{state.bar} — Official Website</a></li>
              <li><Link href="/how-to/file-bar-complaint" className="text-[#8B0000] hover:underline">How to File a Bar Complaint (National Guide)</Link></li>
              <li><Link href="/how-to/file-judicial-complaint" className="text-[#8B0000] hover:underline">How to File a Judicial Complaint (National Guide)</Link></li>
              <li><Link href="/how-to/check-lawyer-discipline-record" className="text-[#8B0000] hover:underline">How to Check If Your Lawyer Has Been Disciplined</Link></li>
              <li><Link href="/products" className="text-[#8B0000] hover:underline">Download {state.name} Complaint Templates ($1.99)</Link></li>
            </ul>
          </section>

          <div className="bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
            <h3 className="font-sans font-bold text-lg mb-2">Got a Tip About Attorney Misconduct in {state.name}?</h3>
            <p className="font-serif text-gray-700 mb-4">The Ethics Reporter covers attorney discipline and judicial misconduct across the country. If you have information about misconduct in {state.name}, we want to hear from you.</p>
            <Link href="/tip" className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors">Submit a Tip</Link>
          </div>
        </div>
      </div>
    </>
  );
}
