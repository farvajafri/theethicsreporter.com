import { guidesData } from "@/lib/guides-data";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return guidesData.map((g) => ({ guide: g.slug }));
}

export function generateMetadata({ params }: { params: { guide: string } }): Metadata {
  const guide = guidesData.find((g) => g.slug === params.guide);
  if (!guide) return {};
  return {
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/how-to/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/how-to/${guide.slug}`,
    },
  };
}

export default function GuidePage({ params }: { params: { guide: string } }) {
  const guide = guidesData.find((g) => g.slug === params.guide);
  if (!guide) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `${SITE_URL}/how-to/${guide.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-3">
          <Link href="/" className="text-[#8B0000] font-semibold text-sm font-sans hover:underline">← The Ethics Reporter</Link>
        </div>

        <div className="mb-8">
          <div className="inline-block bg-[#8B0000] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 font-sans mb-3">How-To Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">{guide.title}</h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed">{guide.description}</p>
        </div>

        <div
          className="article-content mb-12"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-sans mb-6 border-b border-gray-200 pb-3">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold font-sans text-base mb-2">{faq.q}</h3>
                <p className="font-serif text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#f8f4e8] border-l-4 border-[#8B0000] p-6 rounded">
          <h3 className="font-sans font-bold text-lg mb-2">Need to Report Attorney or Judicial Misconduct?</h3>
          <p className="font-serif text-gray-700 mb-4">The Ethics Reporter investigates attorney misconduct and judicial corruption. If you have a tip, we want to hear from you.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tip" className="inline-block bg-[#8B0000] text-white font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#6b0000] transition-colors">Submit a Tip</Link>
            <Link href="/products" className="inline-block border border-[#8B0000] text-[#8B0000] font-semibold font-sans px-5 py-2.5 rounded hover:bg-[#f8f4e8] transition-colors">Download Complaint Templates ($1.99)</Link>
          </div>
        </div>
      </div>
    </>
  );
}
