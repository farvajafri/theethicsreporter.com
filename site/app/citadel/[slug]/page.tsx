import { getAllCitadelPageSlugs, getCitadelPageData, getPageMetadata, CITADEL_HUB_SLUG } from "@/lib/citadel-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import DonationWidget from "@/components/DonationWidget";
import { SITE_URL, SITE_NAME } from "@/lib/data";

// Types
interface Params { slug: string }

export function generateStaticParams() {
  return getAllCitadelPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const meta = getPageMetadata(params.slug);
  if (!meta) return {};
  const url = `${SITE_URL}/citadel/${params.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: { canonical: url },
  };
}

// ── RENDERERS ─────────────────────────────────────────────────────────────────

function SectionContent({ sections }: { sections: { heading: string; body: string }[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => (
        <section key={i}>
          <h2 className="text-xl md:text-2xl font-bold font-sans mb-3">{s.heading}</h2>
          <p className="font-serif text-gray-800 leading-relaxed text-lg">{s.body}</p>
        </section>
      ))}
    </div>
  );
}

function DonationCTA() {
  return (
    <div className="mt-14 border-t-4 border-[#8B0000] pt-8">
      <div className="bg-[#fdf8f0] rounded-xl p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-4">
          Support Independent Accountability Journalism
        </p>
        <p className="text-gray-900 font-serif text-lg leading-relaxed mb-4">
          The Ethics Reporter is the only independent news organization systematically tracking how
          Kenneth Griffin&apos;s political spending relates to the regulatory environment that protects
          Citadel Securities&apos; business model. This reporting serves retail investors across every
          state in the country.
        </p>
        <p className="text-gray-900 font-serif text-lg leading-relaxed mb-6">
          We are reader-funded and accept no money from financial industry advertisers. If this
          reporting is valuable — if you believe retail investors deserve transparency about who
          controls their trades — please support us.
        </p>
        <DonationWidget />
      </div>
    </div>
  );
}

function PageLayout({ title, category, intro, children, relatedLinks }: {
  title: string;
  category: string;
  intro: string;
  children: React.ReactNode;
  relatedLinks?: { href: string; label: string }[];
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link
          href={`/${CITADEL_HUB_SLUG}`}
          className="text-[#8B0000] font-semibold text-sm font-sans hover:underline"
        >
          ← Citadel Securities Investigation
        </Link>
      </div>

      <div className="mb-8">
        <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
          {category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">{title}</h1>
        <p className="font-serif text-lg text-gray-700 leading-relaxed">{intro}</p>
      </div>

      <div className="article-content space-y-10">
        {children}
      </div>

      {relatedLinks && relatedLinks.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="font-sans font-bold text-lg mb-4">Related Coverage</h3>
          <ul className="space-y-2">
            {relatedLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[#8B0000] hover:underline font-sans text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <DonationCTA />

      <div className="mt-8">
        <Link href={`/${CITADEL_HUB_SLUG}`} className="text-[#8B0000] hover:text-[#6b0000] font-semibold text-sm font-sans">
          &larr; Back to Citadel Investigation Hub
        </Link>
      </div>
    </div>
  );
}

// ── PAGE COMPONENT ─────────────────────────────────────────────────────────────

export default function CitadelSlugPage({ params }: { params: Params }) {
  const data = getCitadelPageData(params.slug);
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    url: `${SITE_URL}/citadel/${params.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/citadel/${params.slug}` },
  };

  switch (data.type) {
    // ── STATE INVESTOR ──────────────────────────────────────────────────────
    case "state-investors": {
      const s = data.state;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `Citadel Securities and ${s.name} Investors: What You Need to Know`, description: `How PFOF affects ${s.retailInvestors}` }) }} />
          <PageLayout
            title={`Citadel Securities and ${s.name} Investors: What You Need to Know`}
            category={`${s.name} Investor Alert`}
            intro={`Payment for order flow — the practice by which Citadel Securities pays discount brokers for exclusive access to retail order flow — affects ${s.retailInvestors}. Here is what ${s.name} residents need to know.`}
            relatedLinks={[
              { href: `/citadel/${s.slug}-citadel-attorney-general`, label: `${s.name} Attorney General: The Case for State Action` },
              { href: `/citadel/kenneth-griffin-${s.slug}-donations`, label: `Kenneth Griffin's Political Donations in ${s.name}` },
              { href: `/citadel/${s.slug}-securities-regulator-citadel`, label: `${s.securitiesRegulator}: What ${s.name} Regulators Should Do` },
            ]}
          >
            <section>
              <h2>How PFOF Affects {s.name} Investors</h2>
              <p>{s.stateSpecificHarm}</p>
            </section>
            <section>
              <h2>The Scale in {s.name}</h2>
              <p>
                {s.name} has {s.retailInvestors}. Each of these investors who uses a PFOF-dependent
                discount broker — Robinhood, TD Ameritrade, E*Trade, Charles Schwab, or Webull — is
                routing their orders to Citadel Securities without their knowledge or consent. Citadel
                captures a spread on each of these trades, generating revenue that flows back to Kenneth
                Griffin while providing retail investors with marginally inferior execution prices
                compared to what competitive exchange routing would provide.
              </p>
              <p>
                {s.name}&apos;s financial hub in {s.majorFinancialCities[0]} has sophisticated financial
                professionals who understand these dynamics. But most {s.name} retail investors — those
                in {s.majorFinancialCities.slice(1, 3).join(", ")} and throughout the state — are
                unaware that their &quot;free&quot; trades are funded by a practice that systematically
                extracts value from them.
              </p>
            </section>
            <section>
              <h2>Kenneth Griffin&apos;s Political Investment in {s.name}</h2>
              <p>
                Kenneth Griffin has given {s.griffinTotalEstimate}. His key recipients include{" "}
                {s.keyRecipients}. This political investment creates a documented relationship between
                the CEO of America&apos;s dominant retail market maker and the political figures responsible
                for overseeing financial regulation in {s.name}.
              </p>
              {s.griffinDonations.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {s.griffinDonations.map((d, i) => (
                    <li key={i} className="text-sm font-sans bg-gray-50 border border-gray-200 rounded p-3">
                      <strong>{d.recipient}</strong> — {d.amount} ({d.year}, {d.office})
                      {d.note && <span className="block text-gray-500 mt-1 italic">{d.note}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <h2>What {s.name} Regulators Could Do</h2>
              <p>{s.regulatoryAction}</p>
            </section>
            <section>
              <h2>What {s.name} Investors Can Do Now</h2>
              <p>
                {s.name} retail investors who believe they have been harmed by PFOF-driven execution
                quality degradation can take several steps:
              </p>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", marginTop: "0.75rem" }}>
                <li>File a complaint with the <strong>{s.securitiesRegulator}</strong> at{" "}
                  <a href={s.securitiesUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">{s.securitiesUrl}</a>
                </li>
                <li>File a complaint with the <strong>{s.name} Attorney General</strong> at{" "}
                  <a href={s.agContactUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">{s.agContactUrl}</a>
                </li>
                <li>File a complaint with the <strong>SEC</strong> at <a href="https://sec.gov/tcr" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">sec.gov/tcr</a></li>
                <li>File a complaint with <strong>FINRA</strong> at <a href="https://finra.org/investors/have-problem" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">finra.org</a></li>
                <li>Consider switching to a broker that does not use PFOF, such as Fidelity or Interactive Brokers direct routing</li>
              </ul>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── STATE AG ────────────────────────────────────────────────────────────
    case "state-ag": {
      const s = data.state;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `${s.ag} and Citadel Securities` }) }} />
          <PageLayout
            title={`${s.name} Attorney General ${s.ag}: The Case for Investigating Citadel Securities`}
            category={`${s.name} State Action`}
            intro={`${s.ag}, the ${s.name} Attorney General, has the authority and — given the documented harms to ${s.retailInvestors} — the obligation to investigate Citadel Securities' payment for order flow practices under ${s.name} law.`}
            relatedLinks={[
              { href: `/citadel/${s.slug}-citadel-investors`, label: `How PFOF Affects ${s.name} Investors` },
              { href: `/citadel/${s.slug}-securities-regulator-citadel`, label: `${s.securitiesRegulator}: Independent Action` },
              { href: `/citadel/kenneth-griffin-${s.slug}-donations`, label: `Griffin's ${s.name} Political Donations` },
            ]}
          >
            <section>
              <h2>The AG&apos;s Authority in {s.name}</h2>
              <p>{s.regulatoryAction}</p>
            </section>
            <section>
              <h2>The Harm to {s.name} Investors</h2>
              <p>{s.stateSpecificHarm}</p>
              <p className="mt-4">
                {s.ag} has {s.retailInvestors} as potential complainants. This is not an abstract
                regulatory question — it is a matter of whether {s.name}&apos;s chief law enforcement
                officer will protect the financial interests of {s.name} residents when federal
                regulators have failed to act.
              </p>
            </section>
            <section>
              <h2>The Griffin Political Context</h2>
              <p>
                {s.name} Attorney General {s.ag} should be aware of the documented political
                investment Kenneth Griffin has made in {s.name}. Griffin has given{" "}
                {s.griffinTotalEstimate} to {s.keyRecipients}. This political context does not
                determine what the AG should do — but it is relevant to understanding why federal and
                state regulators have been slow to act, and why an independent state investigation
                would be meaningful.
              </p>
            </section>
            <section>
              <h2>What the AG Should Investigate</h2>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                <li>Whether PFOF arrangements between major discount brokers and Citadel Securities violate {s.name} consumer protection law by creating undisclosed conflicts of interest</li>
                <li>Whether {s.name} broker-dealers are meeting best execution obligations under state securities law</li>
                <li>Whether Citadel Securities&apos; disclosures to {s.name} retail investors adequately describe the PFOF relationship</li>
                <li>Whether a multistate investigation coordinated through NASAA would be appropriate</li>
              </ul>
            </section>
            <section>
              <h2>Contact {s.ag}</h2>
              <p>
                {s.name} residents can contact the Attorney General&apos;s office at{" "}
                <a href={s.agContactUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">{s.agContactUrl}</a>{" "}
                to request investigation of PFOF-related broker-dealer practices affecting {s.name} investors.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── STATE DONATIONS ─────────────────────────────────────────────────────
    case "state-donations": {
      const s = data.state;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `Kenneth Griffin Political Donations in ${s.name}` }) }} />
          <PageLayout
            title={`Kenneth Griffin's Political Donations in ${s.name}: Following the Money`}
            category={`${s.name} Campaign Finance`}
            intro={`Kenneth Griffin, the founder and CEO of Citadel Securities — the firm that processes approximately 40% of all U.S. retail equity order flow — has given ${s.griffinTotalEstimate} in ${s.name}-linked political contributions. The Ethics Reporter examines what he gave, who received it, and what the donations mean for ${s.name} retail investor protection.`}
            relatedLinks={[
              { href: `/citadel/${s.slug}-citadel-investors`, label: `How PFOF Affects ${s.name} Investors` },
              { href: `/citadel/${s.slug}-citadel-attorney-general`, label: `${s.name} AG: The Case for Investigation` },
              { href: `/citadel/kenneth-griffin-political-donations`, label: `Griffin's National Political Portfolio: $100M+` },
            ]}
          >
            <section>
              <h2>The {s.name} Donations Record</h2>
              {s.griffinDonations.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {s.griffinDonations.map((d, i) => (
                    <div key={i} className="bg-[#fdf8f0] border-l-4 border-[#8B0000] p-4 rounded">
                      <p className="font-sans font-bold">{d.recipient}</p>
                      <p className="text-gray-700 font-sans text-sm mt-1">
                        <strong>{d.amount}</strong> · {d.year} · {d.office}
                      </p>
                      {d.note && <p className="text-gray-500 text-sm mt-1 italic">{d.note}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Griffin&apos;s primary {s.name} political investments have been through national Republican organizations that fund {s.name} candidates and officeholders.</p>
              )}
            </section>
            <section>
              <h2>Why These Donations Matter for {s.name} Investors</h2>
              <p>
                Griffin has given {s.griffinTotalEstimate} to {s.keyRecipients}. This creates a
                documented political relationship between the CEO of America&apos;s dominant retail
                market maker and the political figures who — directly or indirectly — oversee the
                regulatory environment in which Citadel Securities operates.
              </p>
              <p className="mt-4">
                The pattern is not necessarily evidence of quid pro quos. But political science
                research consistently finds that major donations create access, goodwill, and the
                reasonable expectation of favorable treatment that influences regulatory decision-making
                — even without explicit agreements. The absence of state enforcement action on PFOF
                in {s.name} is circumstantially consistent with Griffin&apos;s political investment.
              </p>
            </section>
            <section>
              <h2>The National Context</h2>
              <p>
                Griffin spent more than $100 million in the 2022 election cycle alone, making him one
                of the five largest political donors in the United States. His {s.name} donations are
                one component of a national political portfolio specifically calibrated to create
                relationships with elected officials who oversee financial regulatory bodies,
                including the SEC, FINRA, and state securities regulators.
              </p>
              <p className="mt-4">
                The {s.name} donations documented above are drawn from public Federal Election
                Commission (FEC) records and state campaign finance filings. The Ethics Reporter
                continues to monitor and update Griffin&apos;s political donation record.
              </p>
            </section>
            <section>
              <h2>FEC Data and Public Records</h2>
              <p>
                Kenneth Griffin&apos;s political donations are matters of public record filed with the
                Federal Election Commission. Readers can search FEC records at{" "}
                <a href="https://www.fec.gov/data/receipts/?contributor_name=kenneth+griffin" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">fec.gov</a>{" "}
                to independently verify and supplement the records documented here.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── STATE REGULATOR ─────────────────────────────────────────────────────
    case "state-regulator": {
      const s = data.state;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `${s.securitiesRegulator} and Citadel Securities` }) }} />
          <PageLayout
            title={`${s.securitiesRegulator}: What ${s.name} Financial Regulators Should Do About Citadel`}
            category={`${s.name} Regulatory Action`}
            intro={`The ${s.securitiesRegulatorFull} has jurisdiction to investigate Citadel Securities' payment for order flow practices affecting ${s.retailInvestors}. Here is what state regulators should do — and why.`}
            relatedLinks={[
              { href: `/citadel/${s.slug}-citadel-investors`, label: `How PFOF Affects ${s.name} Investors` },
              { href: `/citadel/${s.slug}-citadel-attorney-general`, label: `${s.name} AG and Citadel` },
              { href: `/citadel/multistate-pfof-investigation`, label: `The Case for a Multistate PFOF Investigation` },
            ]}
          >
            <section>
              <h2>The {s.securitiesRegulator}&apos;s Authority</h2>
              <p>{s.regulatoryAction}</p>
            </section>
            <section>
              <h2>The Harm Requiring Regulatory Response</h2>
              <p>{s.stateSpecificHarm}</p>
            </section>
            <section>
              <h2>What State Regulators Should Do</h2>
              <p>
                The {s.securitiesRegulatorFull}, in coordination with the {s.name} Attorney
                General&apos;s office, should:
              </p>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "decimal", marginTop: "0.75rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>Open an investigation into whether broker-dealers serving {s.name} residents are meeting best execution obligations under state securities law</li>
                <li style={{ marginBottom: "0.5rem" }}>Issue a formal inquiry to major PFOF-dependent brokers about their routing arrangements with Citadel Securities and the execution quality they achieve for {s.name} residents</li>
                <li style={{ marginBottom: "0.5rem" }}>Contact NASAA to explore multistate coordination</li>
                <li style={{ marginBottom: "0.5rem" }}>Issue investor education guidance about PFOF practices and how {s.name} investors can protect themselves</li>
                <li style={{ marginBottom: "0.5rem" }}>Consider rulemaking under state securities law to require enhanced disclosure of PFOF arrangements affecting {s.name} retail investors</li>
              </ul>
            </section>
            <section>
              <h2>Contacting the {s.securitiesRegulator}</h2>
              <p>
                {s.name} investors and advocates can contact the {s.securitiesRegulatorFull} at{" "}
                <a href={s.securitiesUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">{s.securitiesUrl}</a>{" "}
                to report concerns and request regulatory action on PFOF practices affecting {s.name} residents.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── TOPIC ───────────────────────────────────────────────────────────────
    case "topic": {
      const t = data.topic;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: t.title, description: t.metaDescription }) }} />
          <PageLayout
            title={t.title}
            category={t.category}
            intro={t.intro}
            relatedLinks={[
              { href: "/citadel/payment-for-order-flow-explained", label: "Payment for Order Flow Explained" },
              { href: "/citadel/kenneth-griffin-political-donations", label: "Griffin's $100M+ Political Portfolio" },
              { href: "/citadel/sec-failure-pfof", label: "The SEC's Decade of Inaction on PFOF" },
            ]}
          >
            <SectionContent sections={t.sections} />
            {t.keywords && t.keywords.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {t.keywords.map((k) => (
                    <span key={k} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-sans">{k}</span>
                  ))}
                </div>
              </div>
            )}
          </PageLayout>
        </>
      );
    }

    // ── FINRA DISTRICT ──────────────────────────────────────────────────────
    case "finra-district": {
      const d = data.district;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `${d.name} and Citadel Securities` }) }} />
          <PageLayout
            title={`${d.name} and Citadel Securities: FINRA Oversight and Retail Investor Protection`}
            category="FINRA District Coverage"
            intro={`FINRA ${d.name} has examination jurisdiction over broker-dealers serving retail investors in ${d.states.slice(0, 3).join(", ")}, and other states in this region. Here is how that jurisdiction relates to Citadel Securities' payment for order flow practices.`}
            relatedLinks={d.states.map((state) => ({
              href: `/citadel/${state.toLowerCase().replace(/\s+/g, "-")}-citadel-investors`,
              label: `Citadel Securities and ${state} Investors`,
            }))}
          >
            <section>
              <h2>District Coverage and Jurisdiction</h2>
              <p>
                FINRA {d.name} covers broker-dealer operations in{" "}
                {d.states.join(", ")}. District examination staff conduct periodic reviews of
                member firms&apos; supervisory systems, trade execution practices, and compliance programs.
              </p>
            </section>
            <section>
              <h2>Citadel Securities in This Region</h2>
              <p>{d.citadelContext}</p>
            </section>
            <section>
              <h2>FINRA&apos;s Self-Regulatory Limitations</h2>
              <p>
                FINRA is a private, membership-funded organization whose largest member firms — including
                Citadel Securities — help fund its operations. This structural conflict means that
                FINRA examination and enforcement may be less aggressive toward systemically important
                firms like Citadel than an independent government regulator would be. The SEC, as the
                government regulator that oversees FINRA, bears ultimate responsibility for ensuring that
                FINRA supervision is adequate.
              </p>
            </section>
            <section>
              <h2>What Investors in This Region Can Do</h2>
              <p>
                Retail investors in {d.states.slice(0, 2).join(" and ")} and other states in this FINRA
                district can file complaints with:
              </p>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", marginTop: "0.5rem" }}>
                <li>FINRA at <a href="https://finra.org/investors/have-problem" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">finra.org/investors/have-problem</a></li>
                <li>SEC at <a href="https://sec.gov/tcr" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">sec.gov/tcr</a></li>
                <li>Their state securities regulator (find at <a href="https://nasaa.org" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">nasaa.org</a>)</li>
              </ul>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── FED DISTRICT ────────────────────────────────────────────────────────
    case "fed-district": {
      const d = data.district;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `${d.name} and Citadel Securities` }) }} />
          <PageLayout
            title={`${d.name} and Citadel Securities: Federal Reserve Consumer Protection and Market Structure`}
            category="Federal Reserve District"
            intro={`The ${d.name}, headquartered in ${d.financialHub}, has consumer compliance oversight and market structure monitoring responsibilities that intersect with Citadel Securities' dominant role in retail equity execution across ${d.states.slice(0, 3).join(", ")}, and other states in this district.`}
            relatedLinks={d.states.slice(0, 4).map((state) => ({
              href: `/citadel/${state.toLowerCase().replace(/\s+/g, "-")}-citadel-investors`,
              label: `Citadel Securities and ${state} Investors`,
            }))}
          >
            <section>
              <h2>District Overview</h2>
              <p>
                The {d.name} covers {d.states.join(", ")}. The Federal Reserve&apos;s consumer
                compliance responsibilities extend to bank-affiliated broker-dealers operating in this
                district — including institutions that use Citadel Securities as a wholesale market maker
                through PFOF arrangements.
              </p>
            </section>
            <section>
              <h2>Citadel in This District</h2>
              <p>{d.citadelContext}</p>
            </section>
            <section>
              <h2>Federal Reserve Consumer Compliance Authority</h2>
              <p>
                The Federal Reserve&apos;s consumer compliance examination program covers bank-affiliated
                broker-dealers and their retail practices. Payment for order flow arrangements that create
                undisclosed conflicts of interest with retail customers may fall within the Federal
                Reserve&apos;s Unfair or Deceptive Acts or Practices (UDAP) oversight — particularly when
                the broker-dealer is a subsidiary of a bank holding company subject to Fed supervision.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── POLITICIAN ──────────────────────────────────────────────────────────
    case "politician": {
      const p = data.politician;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `Kenneth Griffin Donation to ${p.name}` }) }} />
          <PageLayout
            title={`Kenneth Griffin Donated ${p.griffinAmount} to ${p.name}: The Political Context`}
            category="Campaign Finance Investigation"
            intro={`Kenneth Griffin — founder and CEO of Citadel Securities, the firm that processes approximately 40% of U.S. retail equity order flow — donated ${p.griffinAmount} to ${p.name} in ${p.griffinYear}. The Ethics Reporter examines what this donation means for financial regulatory accountability.`}
            relatedLinks={[
              { href: "/citadel/kenneth-griffin-political-donations", label: "Griffin's Complete Political Portfolio: $100M+" },
              { href: `/citadel/${p.state.toLowerCase().replace(/\s+/g, "-")}-citadel-investors`, label: `How Citadel Affects ${p.state} Investors` },
              { href: "/citadel/citadel-regulatory-capture", label: "Regulatory Capture: How Citadel Shapes Its Own Oversight" },
            ]}
          >
            <section>
              <h2>The Donation</h2>
              <div className="bg-[#fdf8f0] border-l-4 border-[#8B0000] p-5 rounded">
                <p className="font-sans font-bold text-lg">{p.name}</p>
                <p className="text-gray-700 font-sans mt-1">{p.office} ({p.party})</p>
                <p className="text-gray-900 font-sans mt-2"><strong>Amount:</strong> {p.griffinAmount}</p>
                <p className="text-gray-900 font-sans"><strong>Year:</strong> {p.griffinYear}</p>
                <p className="text-gray-900 font-sans"><strong>Committee Role:</strong> {p.committeeRole}</p>
              </div>
            </section>
            <section>
              <h2>Why This Donation Is Significant</h2>
              <p>{p.relevance}</p>
            </section>
            <section>
              <h2>The Committee Jurisdiction Context</h2>
              <p>
                {p.name}&apos;s committee role — {p.committeeRole} — places them in direct oversight
                of financial regulatory policy. The fact that Kenneth Griffin, CEO of America&apos;s
                dominant retail market maker, has made significant financial investments in the
                political career of someone with this oversight role creates an appearance of conflict
                that warrants public scrutiny.
              </p>
            </section>
            <section>
              <h2>FEC Disclosure</h2>
              <p>
                This donation is drawn from public Federal Election Commission records. Readers can
                verify and search Griffin&apos;s complete donation record at{" "}
                <a href="https://www.fec.gov/data/receipts/?contributor_name=kenneth+griffin" target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">fec.gov</a>.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── BROKER ──────────────────────────────────────────────────────────────
    case "broker": {
      const b = data.broker;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `Citadel Securities and ${b.broker}: The PFOF Relationship` }) }} />
          <PageLayout
            title={`Citadel Securities and ${b.broker}: The PFOF Relationship Explained`}
            category="Broker PFOF Analysis"
            intro={`${b.fullName} routes a significant portion of its customers' stock orders to Citadel Securities through payment for order flow arrangements. Here is what this means for ${b.broker} customers.`}
            relatedLinks={[
              { href: "/citadel/payment-for-order-flow-explained", label: "Payment for Order Flow Explained" },
              { href: "/citadel/best-execution-violations", label: "Best Execution Failures: The Evidence" },
            ]}
          >
            <section>
              <h2>The {b.broker}-Citadel PFOF Relationship</h2>
              <p>{b.description}</p>
            </section>
            <section>
              <h2>The Financial Scale</h2>
              <p>
                In {b.pfofYear}, {b.broker} received {b.pfofAmount} in payment for order flow.
                This payment came primarily from Citadel Securities in exchange for routing{" "}
                {b.broker} customers&apos; equity orders to Citadel for execution. Citadel paid this
                amount because it expected to extract significantly more value from executing{" "}
                {b.broker}&apos;s customers&apos; orders — through spread capture — than it paid for
                the order flow. The difference represents value extracted from {b.broker} customers
                through execution quality degradation.
              </p>
            </section>
            <section>
              <h2>Regulatory Actions</h2>
              <p>{b.actionTaken}</p>
            </section>
            <section>
              <h2>What {b.broker} Customers Should Know</h2>
              <p>
                {b.broker} customers can find out how their orders are routed by accessing the
                broker&apos;s SEC Rule 606 quarterly report, typically available in the &quot;Legal
                Disclosures&quot; or &quot;About&quot; section of the broker&apos;s website. For
                investors concerned about PFOF, alternative brokers that route to exchanges directly
                — including Fidelity (for equity orders) and Interactive Brokers (with direct routing
                option) — are available.
              </p>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── CITY ────────────────────────────────────────────────────────────────
    case "city": {
      const c = data.city;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: `Citadel Securities and ${c.city} Investors` }) }} />
          <PageLayout
            title={`Citadel Securities and ${c.city} Investors: Payment for Order Flow in Your City`}
            category={`${c.city} Investor Alert`}
            intro={`Retail investors in ${c.city}, ${c.state} — like investors across the country — route their stock orders to Citadel Securities through payment for order flow arrangements at major discount brokers. ${c.description}`}
            relatedLinks={[
              { href: `/citadel/${c.stateSlug}-citadel-investors`, label: `Citadel Securities and All ${c.state} Investors` },
              { href: `/citadel/${c.stateSlug}-citadel-attorney-general`, label: `${c.state} Attorney General and Citadel` },
              { href: "/citadel/payment-for-order-flow-explained", label: "Payment for Order Flow Explained" },
            ]}
          >
            <section>
              <h2>{c.city}&apos;s Retail Investor Landscape</h2>
              <p>
                {c.city} is {c.region}-based financial community. Local retail investors — from
                professionals and business owners to working families saving for retirement — use
                discount brokers that route orders to Citadel Securities through PFOF arrangements.
                These investors receive marginally inferior execution prices on each trade compared
                to what competitive exchange routing would provide.
              </p>
            </section>
            <section>
              <h2>How PFOF Affects {c.city} Investors</h2>
              <p>
                When a {c.city} resident places a stock order on Robinhood, TD Ameritrade, E*Trade,
                Schwab, or Webull, that order is routed to Citadel Securities through PFOF. Citadel
                executes the trade, capturing a spread, and pays the broker a per-share fee.
                The net result for the {c.city} investor: a slightly worse execution price
                compared to what a competitive exchange-routed order would achieve.
              </p>
            </section>
            <section>
              <h2>What {c.city} Investors Can Do</h2>
              <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                <li>Access your broker&apos;s SEC Rule 606 report to see how your orders are routed</li>
                <li>Consider switching to Fidelity (no PFOF for equity orders) or Interactive Brokers direct routing</li>
                <li>File a complaint with the <a href={`/citadel/${c.stateSlug}-securities-regulator-citadel`} className="text-[#8B0000] hover:underline">{c.state} securities regulator</a></li>
                <li>Contact the <a href={`/citadel/${c.stateSlug}-citadel-attorney-general`} className="text-[#8B0000] hover:underline">{c.state} Attorney General</a></li>
              </ul>
            </section>
          </PageLayout>
        </>
      );
    }

    // ── SPECIALTY ───────────────────────────────────────────────────────────
    case "specialty": {
      const sp = data.specialty;
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, headline: sp.title, description: sp.metaDescription }) }} />
          <PageLayout
            title={sp.title}
            category={sp.category}
            intro={sp.intro}
            relatedLinks={[
              { href: "/citadel/payment-for-order-flow-explained", label: "Payment for Order Flow Explained" },
              { href: "/citadel/kenneth-griffin-political-donations", label: "Griffin's $100M+ Political Portfolio" },
              { href: "/citadel/file-complaint-citadel-sec", label: "How to File a Complaint" },
            ]}
          >
            <SectionContent sections={sp.sections} />
          </PageLayout>
        </>
      );
    }

    default:
      notFound();
  }
}
