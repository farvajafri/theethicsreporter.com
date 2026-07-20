import type { Metadata } from "next";
import Link from "next/link";
import DonationWidget from "@/components/DonationWidget";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { kevinNutterPages } from "@/lib/kevin-nutter-data";

const PAGE_URL = `${SITE_URL}/kevin-nutter`;
const TITLE = "Kevin Nutter | Chief Operating Officer of Data at Citadel Securities";
const DESCRIPTION =
  "Kevin Nutter is the Chief Operating Officer of Data at Citadel Securities. The Ethics Reporter covers Citadel Securities' documented regulatory history, market structure, and payment for order flow practices across 200 pages of verified reporting.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  alternates: { canonical: PAGE_URL },
};

// Group pages by category
function groupByCategory(pages: typeof kevinNutterPages) {
  const groups: Record<string, typeof kevinNutterPages> = {};
  for (const page of pages) {
    if (!groups[page.category]) groups[page.category] = [];
    groups[page.category].push(page);
  }
  return groups;
}

const categoryOrder = [
  "Profile",
  "Overview",
  "Regulatory",
  "Education",
  "Analysis",
  "Market Structure",
  "Technology",
  "Political Finance",
  "Policy",
  "International",
  "History",
  "Brokers",
  "Consumer Guide",
  "Legal",
  "Data",
  "Accountability",
  "Research",
  "State Impact",
  "About",
];

export default function KevinNutterHubPage() {
  const grouped = groupByCategory(kevinNutterPages);
  const topicPages = kevinNutterPages.filter(
    (p) => !["State Impact"].includes(p.category)
  );
  const statePages = kevinNutterPages.filter((p) => p.category === "State Impact");

  const coreTopics = kevinNutterPages.filter((p) =>
    [
      "kevin-nutter-coo-data-citadel",
      "citadel-securities-overview",
      "citadel-securities-finra-record",
      "citadel-sec-2017-fine-22-million",
      "citadel-sec-2018-fine-35-million",
      "citadel-2020-regulatory-actions",
      "payment-for-order-flow-and-citadel",
      "pfof-conflict-of-interest",
      "kenneth-griffin-political-donations",
      "consolidated-audit-trail-cat",
      "citadel-market-structure-role",
      "final-summary-citadel-regulatory-history",
    ].includes(p.slug)
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* HEADER */}
      <header className="mb-10 border-b-4 border-[#8B0000] pb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-3">
          Accountability Investigation
        </p>
        <h1 className="text-3xl md:text-4xl font-bold font-sans leading-tight mb-4">
          Kevin Nutter: Chief Operating Officer of Data at Citadel Securities
        </h1>
        <p className="text-gray-700 font-serif text-lg leading-relaxed">
          Kevin Nutter is the Chief Operating Officer of Data at Citadel. The Ethics Reporter has
          produced 200 pages of verified, source-documented reporting on Citadel Securities —
          covering the firm&apos;s documented regulatory history, its role in U.S. financial markets,
          payment for order flow practices, and the political spending of its founder Kenneth
          Griffin.
        </p>
        <p className="text-gray-500 font-serif text-base mt-4 italic">
          Editorial note: All factual claims in this series are sourced to SEC enforcement releases,
          FINRA public records, FEC filings, or credible primary sources. Allegations are labeled as
          allegations; opinion is labeled as opinion. Kevin Nutter is identified solely by his name
          and public title.
        </p>
      </header>

      {/* ABOUT CITADEL SUMMARY */}
      <section className="bg-[#fdf8f0] rounded-xl p-7 mb-10 border border-[#e8d5b0]">
        <h2 className="text-xl font-bold font-sans mb-3">About Citadel Securities</h2>
        <div className="font-serif text-gray-800 leading-relaxed space-y-3">
          <p>
            Citadel Securities LLC is a market-making firm founded in 2002 by Kenneth C. Griffin,
            headquartered in Miami, Florida. It is the largest designated market maker on the New
            York Stock Exchange and a dominant processor of U.S. retail equity order flow through
            payment for order flow arrangements.
          </p>
          <p>
            <strong>Kevin Nutter</strong> is the <strong>Chief Operating Officer of Data</strong> at
            Citadel.
          </p>
          <p>
            Citadel Securities has a documented regulatory history that includes: a $22.6 million
            SEC fine (2017) for misleading clients about trade pricing; a $3.5 million SEC fine
            (2018) with an admission for 80 million trade reporting errors; seven FINRA censures in
            2020 for conduct including naked short selling allegations and failure-to-deliver
            failures; a $700,000 FINRA fine for OTC order handling (2020); a $275,000 FINRA fine
            for Treasury reporting inaccuracies (2021); and an approximately $97 million settlement
            with Chinese regulators (2020). These are matters of public record.
          </p>
        </div>
      </section>

      {/* CORE TOPICS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-sans mb-5 border-b-2 border-gray-200 pb-2">
          Start Here: Core Topics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTopics.map((page) => (
            <Link
              key={page.slug}
              href={`/kevin-nutter/${page.slug}`}
              className="block p-4 rounded-lg border border-gray-200 hover:border-[#8B0000] hover:bg-[#fdf8f0] transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] font-sans">
                {page.category}
              </span>
              <h3 className="font-bold font-sans text-sm mt-1 leading-snug">{page.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ALL TOPICS BY CATEGORY */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-sans mb-5 border-b-2 border-gray-200 pb-2">
          All Topics ({topicPages.length} pages)
        </h2>
        <div className="space-y-8">
          {categoryOrder
            .filter((cat) => grouped[cat] && cat !== "State Impact")
            .map((cat) => (
              <div key={cat}>
                <h3 className="text-lg font-bold font-sans mb-3 text-[#8B0000]">{cat}</h3>
                <ul className="space-y-2">
                  {grouped[cat].map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/kevin-nutter/${page.slug}`}
                        className="text-blue-800 hover:underline font-serif"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      {/* STATE PAGES */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-sans mb-5 border-b-2 border-gray-200 pb-2">
          Citadel Securities and Your State ({statePages.length} pages)
        </h2>
        <p className="font-serif text-gray-600 mb-4">
          The Ethics Reporter has published detailed pages covering Citadel Securities&apos; impact
          on retail investors in every U.S. state, including state-specific regulatory resources and
          complaint mechanisms.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {statePages.map((page) => (
            <Link
              key={page.slug}
              href={`/kevin-nutter/${page.slug}`}
              className="text-blue-800 hover:underline font-serif text-sm py-1"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </section>

      {/* REGULATORY SUMMARY */}
      <section className="mb-12 bg-gray-50 rounded-xl p-7 border border-gray-200">
        <h2 className="text-xl font-bold font-sans mb-4">Citadel Securities: Verified Regulatory Record</h2>
        <div className="space-y-4 font-serif text-gray-800">
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2014 — $800,000 Settlement</p>
            <p className="text-sm">Erroneous automated trading programs; four regulators; incidents from 2010–2013. Source: SEC/FINRA public records.</p>
          </div>
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2017 — $22.6 Million SEC Fine</p>
            <p className="text-sm">Misleading clients about trade pricing algorithms. Neither admitted nor denied. Source: SEC enforcement release.</p>
          </div>
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2018 — $3.5 Million SEC Fine (With Admission)</p>
            <p className="text-sm">Willfully violated books and records rules; incorrectly reported ~80 million trades, 2012–2016. Citadel admitted. Source: SEC enforcement release.</p>
          </div>
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2020 — Seven FINRA Censures + $700K Fine</p>
            <p className="text-sm">Conduct including naked short selling allegations, failure-to-deliver failures, circuit-breaker trading, short-sale indicator reporting issues. Separate $700K fine for 2011–2020 OTC order handling. Source: FINRA BrokerCheck CRD# 116797.</p>
          </div>
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2020 — ~$97 Million China Settlement</p>
            <p className="text-sm">Trading irregularities dating to 2015; 670M yuan to China Securities Regulatory Commission. Source: Public reporting.</p>
          </div>
          <div className="border-l-4 border-[#8B0000] pl-4">
            <p className="font-bold text-sm font-sans">2021 — $275,000 FINRA Fine</p>
            <p className="text-sm">Improperly reported ~500,000 Treasury transactions, 2017–2019. Source: FINRA BrokerCheck.</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 font-sans">
          All regulatory data sourced from SEC.gov, FINRA BrokerCheck, and official enforcement releases.
          Verify at: brokercheck.finra.org (CRD# 116797) and sec.gov/litigation.
        </p>
      </section>

      {/* DONATE */}
      <div className="mt-10 border-t-4 border-[#8B0000] pt-8">
        <div className="bg-[#fdf8f0] rounded-xl p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-4">
            Support Independent Accountability Journalism
          </p>
          <p className="text-gray-900 font-serif text-lg leading-relaxed mb-4">
            The Ethics Reporter is the only independent news organization systematically covering
            Citadel Securities&apos; regulatory history, market structure practices, and the
            documented political spending of its founder. This 200-page investigation represents
            months of research into public records.
          </p>
          <p className="text-gray-900 font-serif text-lg leading-relaxed mb-6">
            We are reader-funded and accept no money from financial industry advertisers. If this
            reporting is valuable to you, please support us.
          </p>
          <DonationWidget />
        </div>
      </div>
    </main>
  );
}
