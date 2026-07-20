import { citiesData, getCityBySlug } from "@/lib/cities-data";
import { getAllPosts, SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return citiesData.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  const title = `${city.name} Attorney Ethics & Discipline | ${SITE_NAME}`;
  const description = `Attorney discipline, ethics investigations, and bar complaint resources for ${city.name}, ${city.state}. ${city.description.slice(0, 100)}...`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/city/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/city/${city.slug}`,
      type: "website",
    },
    keywords: city.keywords,
  };
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  if (typeof html !== "string") return String(html);
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  const allPosts = getAllPosts();
  // Try to find relevant articles (search by city name in title/content keywords)
  const cityNameLower = city.name.toLowerCase();
  const stateNameLower = city.state.toLowerCase();
  const relatedPosts = allPosts
    .filter((p) => {
      const titleLower = (typeof p.title === "string" ? p.title : "").toLowerCase();
      const excerptLower = stripHtml(p.excerpt).toLowerCase();
      return (
        titleLower.includes(cityNameLower) ||
        titleLower.includes(stateNameLower) ||
        excerptLower.includes(cityNameLower)
      );
    })
    .slice(0, 6);

  const recentPosts = allPosts.slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${city.name} Attorney Ethics & Discipline`,
    description: city.description,
    url: `${SITE_URL}/city/${city.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 font-sans flex items-center gap-2">
          <Link href="/" className="hover:text-[#8B0000]">Home</Link>
          <span>›</span>
          <Link href="/city" className="hover:text-[#8B0000]">Cities</Link>
          <span>›</span>
          <span className="text-gray-800">{city.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-2">
              <span className="inline-block bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-wider px-2 py-1 rounded font-sans">
                {city.state}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">
              {city.name} Attorney Ethics & Discipline
            </h1>
            <p className="text-gray-700 font-serif text-lg leading-relaxed mb-8">
              {city.description}
            </p>

            {/* Bar complaint info */}
            <div className="border border-[#8B0000]/30 rounded-lg p-6 mb-8 bg-red-50">
              <h2 className="text-xl font-bold font-sans mb-3 text-[#8B0000]">
                File a Bar Complaint in {city.name}
              </h2>
              <p className="font-serif text-gray-700 mb-3">
                Attorney discipline in {city.name} is handled by the{" "}
                <strong>{city.barBody}</strong>. If you believe an attorney has
                violated their professional obligations, you have the right to file
                a formal complaint.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={city.barUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#8B0000] text-white font-bold font-sans px-5 py-2.5 rounded hover:bg-red-900 transition-colors text-sm text-center"
                >
                  Visit {city.barBody} →
                </a>
                <Link
                  href={`/state/${city.stateSlug}`}
                  className="inline-block border border-[#8B0000] text-[#8B0000] font-bold font-sans px-5 py-2.5 rounded hover:bg-red-50 transition-colors text-sm text-center"
                >
                  {city.state} Attorney Discipline →
                </Link>
              </div>
            </div>

            {/* How to file a complaint */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold font-sans mb-4">
                How to File a Bar Complaint Against a {city.name} Attorney
              </h2>
              <ol className="space-y-4 font-serif text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B0000] text-white text-sm font-bold flex items-center justify-center font-sans">1</span>
                  <div>
                    <strong className="font-sans">Document everything.</strong> Gather all communications with the attorney — emails, letters, invoices, contracts, and any evidence of misconduct. Organize it chronologically.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B0000] text-white text-sm font-bold flex items-center justify-center font-sans">2</span>
                  <div>
                    <strong className="font-sans">Identify the violations.</strong> Review the professional conduct rules for {city.state} and identify which rules the attorney appears to have violated. Common violations include Rule 1.1 (competence), Rule 1.4 (communication), Rule 1.15 (client funds), and Rule 8.4 (misconduct).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B0000] text-white text-sm font-bold flex items-center justify-center font-sans">3</span>
                  <div>
                    <strong className="font-sans">Submit your complaint.</strong> File a written complaint with the {city.barBody}. Include all supporting documentation and be as specific as possible about dates, facts, and the specific harm caused.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B0000] text-white text-sm font-bold flex items-center justify-center font-sans">4</span>
                  <div>
                    <strong className="font-sans">Follow up.</strong> The grievance committee will typically acknowledge your complaint and assign an investigator. The process can take months to years. Stay in contact and provide any additional information requested.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B0000] text-white text-sm font-bold flex items-center justify-center font-sans">5</span>
                  <div>
                    <strong className="font-sans">Consider civil remedies.</strong> A bar complaint is separate from a legal malpractice lawsuit. If you suffered financial damages, consult with a legal malpractice attorney about your civil remedies, which operate on a different timeline than bar discipline.
                  </div>
                </li>
              </ol>
            </div>

            {/* What the bar discipline system covers */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold font-sans mb-4">
                What Attorney Misconduct Can You Report?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-serif text-gray-700">
                {[
                  { rule: "Rule 1.1 — Competence", desc: "Attorney lacks knowledge or skill for the matter" },
                  { rule: "Rule 1.4 — Communication", desc: "Attorney fails to respond or keep you informed" },
                  { rule: "Rule 1.15 — Client Funds", desc: "Attorney mishandles or steals money held in trust" },
                  { rule: "Rule 1.3 — Diligence", desc: "Attorney fails to act with reasonable promptness" },
                  { rule: "Rule 7.1 — Advertising", desc: "False or misleading communications about services" },
                  { rule: "Rule 8.4 — Misconduct", desc: "Fraud, dishonesty, or criminal acts" },
                ].map((item) => (
                  <div key={item.rule} className="border border-gray-200 rounded p-3">
                    <div className="font-bold font-sans text-sm text-[#8B0000] mb-1">{item.rule}</div>
                    <div className="text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600 font-serif">
                <Link href="/topics/legal-ethics-reform" className="text-[#8B0000] hover:underline">
                  Learn more about legal ethics reform →
                </Link>
              </p>
            </div>

            {/* Investigations in this area */}
            {relatedPosts.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-sans mb-4">
                  Investigations Involving {city.name} / {city.state}
                </h2>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/article/${post.slug}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-[#8B0000] hover:shadow-sm transition-all group"
                    >
                      <div className="text-xs text-gray-500 font-sans mb-1">{formatDate(post.date)}</div>
                      <div className="font-bold font-sans group-hover:text-[#8B0000] transition-colors">
                        {typeof post.title === "string" ? post.title : ""}
                      </div>
                      <div className="text-sm text-gray-600 font-serif mt-1 line-clamp-2">
                        {stripHtml(post.excerpt).slice(0, 160)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tip / report misconduct */}
            <div className="border-l-4 border-[#8B0000] pl-5 py-2 mb-10">
              <h3 className="font-bold font-sans mb-2">Know a {city.name} Attorney Who Should Be Investigated?</h3>
              <p className="text-gray-700 font-serif text-sm mb-3">
                The Ethics Reporter relies on tips from clients, colleagues, and insiders to identify attorneys who are violating their professional obligations. All tips are reviewed by our editorial team.
              </p>
              <Link
                href="/tip"
                className="inline-block bg-[#8B0000] text-white font-bold font-sans text-sm px-4 py-2 rounded hover:bg-red-900 transition-colors"
              >
                Submit a Tip →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donate widget */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h3 className="font-bold font-sans text-base mb-2">Support Independent Legal Journalism</h3>
              <p className="text-sm text-gray-600 font-serif mb-4">
                The Ethics Reporter has no advertisers and no corporate sponsors. We run entirely on reader donations. If this work matters to you, please support us.
              </p>
              <Link
                href="/donate"
                className="block w-full text-center bg-[#8B0000] text-white font-bold font-sans px-4 py-3 rounded hover:bg-red-900 transition-colors"
              >
                Donate to Support Us
              </Link>
              <p className="text-xs text-gray-500 font-serif mt-2 text-center">
                Even $1 helps keep this journalism free. Thank you.
              </p>
            </div>

            {/* Related cities */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold font-sans text-base mb-3">Other Cities</h3>
              <div className="space-y-1">
                {citiesData
                  .filter((c) => c.slug !== city.slug && c.state === city.state)
                  .slice(0, 8)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/city/${c.slug}`}
                      className="block text-sm text-[#8B0000] hover:underline font-sans py-0.5"
                    >
                      {c.name}
                    </Link>
                  ))}
                {citiesData.filter((c) => c.slug !== city.slug && c.state === city.state).length === 0 && (
                  citiesData
                    .filter((c) => c.slug !== city.slug)
                    .slice(0, 8)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/city/${c.slug}`}
                        className="block text-sm text-[#8B0000] hover:underline font-sans py-0.5"
                      >
                        {c.name}, {c.state}
                      </Link>
                    ))
                )}
              </div>
              <Link href="/city" className="block mt-3 text-xs text-gray-500 hover:text-[#8B0000] font-sans">
                View all cities →
              </Link>
            </div>

            {/* Recent articles */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold font-sans text-base mb-3">Recent Investigations</h3>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/article/${post.slug}`}
                    className="block group"
                  >
                    <div className="text-xs text-gray-500 font-sans">{formatDate(post.date)}</div>
                    <div className="text-sm font-sans font-medium group-hover:text-[#8B0000] transition-colors line-clamp-2">
                      {typeof post.title === "string" ? post.title : ""}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold font-sans text-base mb-3">Related Topics</h3>
              <div className="space-y-1">
                {[
                  { href: "/topics/attorney-advertising-violations", label: "Attorney Advertising Violations" },
                  { href: "/topics/attorney-competence-violations", label: "Competence Violations" },
                  { href: "/topics/bar-complaint-guide", label: "Bar Complaint Guide" },
                  { href: "/topics/new-york-attorney-ethics", label: "New York Attorney Ethics" },
                  { href: "/topics/virtual-office-ethics", label: "Virtual Office Ethics" },
                  { href: "/topics/legal-ethics-reform", label: "Legal Ethics Reform" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-[#8B0000] hover:underline font-sans py-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
