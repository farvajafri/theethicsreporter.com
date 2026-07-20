import type { Metadata } from "next";
import Link from "next/link";
import DonationWidget from "@/components/DonationWidget";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { citadelStatesData } from "@/lib/citadel-states";
import { citadelTopicPages } from "@/lib/citadel-topics";
import { politicianPages, brokerPages } from "@/lib/citadel-data";

const PAGE_URL = `${SITE_URL}/citadel`;
const TITLE = "Citadel Securities Investigation: Kenneth Griffin, PFOF, and Regulatory Capture";
const DESCRIPTION =
  "The Ethics Reporter's comprehensive investigation into Citadel Securities, Kenneth Griffin's $100M+ political donations, payment for order flow harms to retail investors, and the SEC's failure to act. Coverage spanning all 50 states, every FINRA district, and 500+ investigative pages.";

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

const coreTopics = [
  { slug: "kenneth-griffin-profile", label: "Who Is Kenneth Griffin?" },
  { slug: "payment-for-order-flow-explained", label: "PFOF Explained: How Citadel Profits from Your Trades" },
  { slug: "payment-for-order-flow-harm", label: "The Hidden Cost: How PFOF Harms Retail Investors" },
  { slug: "citadel-gamestop-controversy", label: "GameStop 2021: What the Meme Stock Crisis Revealed" },
  { slug: "sec-failure-pfof", label: "The SEC's Decade of Inaction on PFOF" },
  { slug: "citadel-sec-enforcement-history", label: "Citadel's Regulatory Violations: A Complete Record" },
  { slug: "citadel-market-maker-conflicts", label: "Market Maker or Market Taker? Structural Conflicts" },
  { slug: "kenneth-griffin-political-donations", label: "Griffin's $100M+ Political Portfolio" },
  { slug: "griffin-desantis-50-million", label: "The $50M Question: Griffin, DeSantis, and Florida's Missing Oversight" },
  { slug: "revolving-door-sec-citadel", label: "The Revolving Door: SEC Officials Who Joined Citadel" },
  { slug: "citadel-lobbying-spending", label: "Citadel's Lobbying Machine: Who It Targets" },
  { slug: "regulatory-capture-citadel", label: "Regulatory Capture: How Citadel Shapes Its Own Oversight" },
  { slug: "pfof-origins-bernie-madoff", label: "PFOF Was Invented by Bernie Madoff. That Should Tell You Something." },
  { slug: "pfof-international-comparison", label: "PFOF Is Banned in the UK, Canada, and Europe. Why Not the U.S.?" },
  { slug: "multistate-pfof-investigation", label: "The Case for a Multistate AG Investigation" },
  { slug: "file-complaint-citadel-sec", label: "How to File a Complaint About Citadel with the SEC" },
  { slug: "kevin-nutter-citadel", label: "Kevin Nutter and Citadel: What the Record Shows" },
];

const actionTopics = [
  { slug: "file-complaint-citadel-sec", label: "File SEC Complaint" },
  { slug: "investor-rights-pfof", label: "Your Investor Rights" },
  { slug: "class-action-pfof", label: "PFOF Class Actions" },
  { slug: "pfof-alternatives-iex-direct-routing", label: "Alternatives to PFOF" },
  { slug: "how-to-check-your-broker-pfof", label: "Check Your Broker's PFOF" },
  { slug: "citadel-sec-whistleblower-how-to", label: "SEC Whistleblower Program" },
];

export default function CitadelHubPage() {
  const majorStates = ["california", "florida", "new-york", "texas", "illinois", "new-jersey", "pennsylvania", "ohio", "georgia", "north-carolina", "michigan", "virginia", "washington", "massachusetts", "arizona", "colorado", "minnesota", "maryland", "wisconsin", "indiana"];

  const featuredPoliticians = politicianPages.slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
          Ongoing Investigation
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-sans mb-5 leading-tight">
          The Citadel Securities Investigation
        </h1>
        <p className="font-serif text-xl text-gray-700 leading-relaxed max-w-3xl">
          Kenneth Griffin&apos;s Citadel Securities processes approximately{" "}
          <strong>40% of all U.S. retail equity order flow</strong> — and has spent more than{" "}
          <strong>$100 million on political donations</strong> to protect the regulatory environment
          that allows it to profit from every American retail investor&apos;s trade. The Ethics
          Reporter is the only news organization systematically covering this story.
        </p>
      </div>

      {/* Key Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { num: "40%", label: "of U.S. retail equity trades processed by Citadel" },
          { num: "$100M+", label: "in Griffin political donations in 2022 alone" },
          { num: "$50M", label: "to DeSantis — largest donation in Florida history" },
          { num: "500+", label: "investigative pages covering every U.S. jurisdiction" },
        ].map((item) => (
          <div key={item.num} className="bg-[#1a1a1a] text-white rounded-xl p-5">
            <div className="text-2xl md:text-3xl font-bold font-sans text-[#e8c170] mb-1">{item.num}</div>
            <div className="text-xs font-sans text-gray-300 leading-snug">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Core Investigation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-sans mb-5 pb-2 border-b-2 border-[#8B0000]">
              Core Investigation
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {coreTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/citadel/${t.slug}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <span className="font-sans text-sm font-semibold group-hover:text-[#8B0000] transition-colors leading-snug">
                    {t.label} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Take Action */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-sans mb-5 pb-2 border-b-2 border-[#8B0000]">
              Take Action
            </h2>
            <div className="bg-[#fff8e6] border-l-4 border-[#8B0000] p-5 rounded mb-5">
              <p className="font-sans font-bold mb-2">Your orders are being sold without your knowledge.</p>
              <p className="font-serif text-gray-800">
                When you use Robinhood, TD Ameritrade, E*Trade, or Schwab, your stock orders are routed
                to Citadel Securities through payment for order flow — without your explicit knowledge
                or consent. You have rights. Here is how to exercise them.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {actionTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/citadel/${t.slug}`}
                  className="block bg-[#8B0000] text-white rounded-lg p-4 hover:bg-[#6b0000] transition-colors text-center"
                >
                  <span className="font-sans text-sm font-semibold">{t.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Brokers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-sans mb-5 pb-2 border-b-2 border-[#8B0000]">
              Broker-Specific Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {brokerPages.map((b) => (
                <Link
                  key={b.slug}
                  href={`/citadel/${b.slug}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <span className="font-sans font-bold text-sm group-hover:text-[#8B0000] transition-colors">
                    {b.broker}
                  </span>
                  <span className="block text-xs text-gray-500 mt-1 font-sans line-clamp-2">
                    {b.description.slice(0, 100)}...
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Politicians */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-sans mb-5 pb-2 border-b-2 border-[#8B0000]">
              Kenneth Griffin&apos;s Political Recipients
            </h2>
            <p className="font-serif text-gray-700 mb-5">
              Griffin has spent more than $100 million on political donations. The Ethics Reporter tracks
              each recipient and examines the relationship between Griffin&apos;s political investments and
              the absence of regulatory action on PFOF.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {featuredPoliticians.map((p) => (
                <Link
                  key={p.slug}
                  href={`/citadel/${p.slug}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-[#8B0000] hover:shadow-sm transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-sans font-bold text-sm group-hover:text-[#8B0000] transition-colors">{p.name}</span>
                    <span className="text-xs font-sans text-[#8B0000] font-bold ml-2 whitespace-nowrap">{p.griffinAmount}</span>
                  </div>
                  <span className="block text-xs text-gray-500 mt-1 font-sans">{p.office} · {p.state}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/citadel/kenneth-griffin-political-donations" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
                View full political donation record →
              </Link>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0 space-y-8">
          {/* All States */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-3 pb-2 border-b border-gray-200">
              Coverage by State
            </h3>
            <p className="text-xs text-gray-500 font-sans mb-3">
              We cover all 50 states, DC, and Puerto Rico — including state-specific PFOF harms,
              regulatory options, and Griffin&apos;s political donations in each jurisdiction.
            </p>
            <div className="space-y-1">
              {majorStates.map((slug) => {
                const st = citadelStatesData.find((s) => s.slug === slug);
                if (!st) return null;
                return (
                  <div key={slug} className="flex gap-2 items-center text-xs">
                    <Link href={`/citadel/${slug}-citadel-investors`} className="text-[#8B0000] hover:underline font-sans">{st.name}</Link>
                    <span className="text-gray-300">·</span>
                    <Link href={`/citadel/kenneth-griffin-${slug}-donations`} className="text-gray-500 hover:text-[#8B0000] font-sans">Donations</Link>
                    <span className="text-gray-300">·</span>
                    <Link href={`/citadel/${slug}-citadel-attorney-general`} className="text-gray-500 hover:text-[#8B0000] font-sans">AG</Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500 font-sans">
                + 30 more states and territories at{" "}
                <Link href="/citadel/illinois-citadel-investors" className="text-[#8B0000] hover:underline">state-level pages</Link>
              </p>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-sans font-bold text-base mb-3">Citadel Securities: Quick Facts</h3>
            <ul className="space-y-2 text-xs font-sans text-gray-700">
              <li>• <strong>Founded:</strong> 1990 by Kenneth Griffin</li>
              <li>• <strong>Headquarters:</strong> Miami, FL (formerly Chicago, IL)</li>
              <li>• <strong>Market share:</strong> ~28-40% of U.S. retail equity order flow</li>
              <li>• <strong>Revenue estimate:</strong> $7-20B annually (private)</li>
              <li>• <strong>Regulatory registrations:</strong> SEC broker-dealer, FINRA member, Treasury primary dealer</li>
              <li>• <strong>Griffin 2022 donations:</strong> $100M+ (top 5 U.S. donor)</li>
              <li>• <strong>Largest donation:</strong> $50M to DeSantis (FL history record)</li>
              <li>• <strong>SEC actions:</strong> $22.6M settlement (2017)</li>
              <li>• <strong>Status internationally:</strong> PFOF banned/restricted in UK, EU, Canada</li>
            </ul>
          </div>

          {/* Tip Line */}
          <div className="bg-[#1a1a1a] text-white rounded-xl p-5">
            <h3 className="font-sans font-bold text-base mb-2">Have Information About Citadel?</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed mb-3">
              Former Citadel employees, compliance personnel, or anyone with firsthand knowledge of
              market-making practices at the firm are encouraged to contact The Ethics Reporter.
              All submissions are confidential.
            </p>
            <Link
              href="/tip"
              className="block bg-[#8B0000] text-white text-center text-sm font-semibold font-sans py-2 px-4 rounded hover:bg-[#6b0000] transition-colors"
            >
              Submit a Confidential Tip →
            </Link>
          </div>

          {/* Donate */}
          <div>
            <h3 className="font-sans font-bold text-base mb-3">Support This Investigation</h3>
            <DonationWidget />
          </div>
        </aside>
      </div>

      {/* Topic Index */}
      <section className="mt-12 border-t-2 border-gray-100 pt-10">
        <h2 className="text-2xl font-bold font-sans mb-5">Full Topic Index</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {citadelTopicPages.slice(0, 30).map((t) => (
            <div key={t.slug} className="break-inside-avoid mb-2">
              <Link href={`/citadel/${t.slug}`} className="text-[#8B0000] hover:underline font-sans text-sm">
                {t.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
