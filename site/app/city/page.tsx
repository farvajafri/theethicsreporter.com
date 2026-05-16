import { citiesData } from "@/lib/cities-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Attorney Ethics by City | ${SITE_NAME}`,
  description:
    "Find attorney discipline resources, bar complaint guides, and ethics investigations by city. New York, Los Angeles, Chicago, Houston, and more.",
  alternates: { canonical: `${SITE_URL}/city` },
  openGraph: {
    title: `Attorney Ethics by City | ${SITE_NAME}`,
    description:
      "Find attorney discipline resources, bar complaint guides, and ethics investigations by city.",
    url: `${SITE_URL}/city`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Attorney Ethics by City",
  description: "Attorney ethics resources and investigations organized by city",
  url: `${SITE_URL}/city`,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

// Group cities by state
function groupByState(cities: typeof citiesData) {
  const groups: Record<string, typeof citiesData> = {};
  for (const city of cities) {
    if (!groups[city.state]) groups[city.state] = [];
    groups[city.state].push(city);
  }
  return groups;
}

export default function CityIndexPage() {
  const grouped = groupByState(citiesData);
  const stateOrder = ["New York", ...Object.keys(grouped).filter((s) => s !== "New York").sort()];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-3">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">
            ← The Ethics Reporter
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">
            Local Resources
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">Attorney Ethics by City</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed max-w-3xl">
            Attorney discipline is administered locally — each state has its own bar system, and some states divide
            oversight by region. Find your city for bar complaint resources, local grievance committee contact
            information, and Ethics Reporter investigations involving attorneys in your area.
          </p>
        </div>

        {stateOrder.map((state) => {
          const cities = grouped[state];
          if (!cities || cities.length === 0) return null;
          return (
            <div key={state} className="mb-10">
              <h2 className="text-xl font-bold font-sans mb-4 border-b border-gray-200 pb-2">{state}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-[#8B0000] transition-all group"
                  >
                    <h3 className="font-bold font-sans text-sm group-hover:text-[#8B0000] transition-colors mb-1">
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans">{city.state}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-6 bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Don't See Your City?</h3>
          <p className="font-serif text-gray-700 mb-4">
            We're expanding our city coverage. In the meantime, use our state resources to find your bar grievance
            committee, or submit a tip about attorney misconduct in your area.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/state"
              className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors"
            >
              Browse by State
            </Link>
            <Link
              href="/tip"
              className="inline-block border border-[#8B0000] text-[#8B0000] font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Submit a Tip
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
