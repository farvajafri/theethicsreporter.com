import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { getAllPosts } from "@/lib/data";

const PAGE_URL = `${SITE_URL}/newsletter`;
const TITLE = "The Ethics Reporter Daily Briefing — Subscribe Free";
const DESCRIPTION =
  "Get The Ethics Reporter's accountability journalism delivered to your inbox every morning. Judicial misconduct, legal system failures, and the stories the powerful don't want you to read. Free. No ads.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: { canonical: PAGE_URL },
};

export default function NewsletterPage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f5f0e8]">
      {/* Hero */}
      <section className="bg-[#1a0000] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#cc4444] font-sans mb-6">
            The Ethics Reporter · Daily Briefing
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
            Accountability journalism.<br />
            <span className="text-[#cc4444]">Delivered every morning.</span>
          </h1>
          <p className="font-serif text-gray-300 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Judges who should be removed. Officials who abuse their power. Legal system failures the mainstream press won&apos;t touch. Every day, in your inbox.
          </p>
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-8 text-center">What You Get</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚖️",
              title: "Judicial Accountability",
              body: "Reversal records. Misconduct patterns. The judges who are getting the law wrong — and what you can do about it.",
            },
            {
              icon: "📋",
              title: "Original Investigations",
              body: "Court records, public filings, and on-the-ground reporting. Not press releases. Not PR. Primary sources.",
            },
            {
              icon: "🔔",
              title: "What to Do About It",
              body: "Filing a complaint. Contacting your legislator. Understanding your rights. Briefings that give you tools, not just outrage.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-sans font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="font-serif text-gray-600 text-base leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why we need support */}
      <section className="bg-white border-y border-gray-200 py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-4">Why It Matters</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
            No ads. No corporate money. No interference.
          </h2>
          <p className="font-serif text-gray-700 text-lg leading-relaxed mb-6">
            The Ethics Reporter covers the stories that powerful people spend money to suppress. That means we can&apos;t take advertising from the industries we cover, and we don&apos;t. We are funded entirely by readers.
          </p>
          <p className="font-serif text-gray-700 text-lg leading-relaxed mb-8">
            Every briefing you receive is free. If it&apos;s worth something to you, a contribution — even $1 — is what keeps it free for everyone else.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-[#8B0000] text-white font-sans font-bold px-8 py-3 rounded text-sm uppercase tracking-wide hover:bg-[#6d0000] transition-colors"
          >
            Support the Briefing →
          </Link>
        </div>
      </section>

      {/* Recent coverage */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-8">Recent Reporting</h2>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <div key={post.slug} className="border-b border-gray-200 pb-6">
              <Link href={`/article/${post.slug}`} className="block group">
                <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#8B0000] transition-colors leading-snug mb-1">
                  {post.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1a0000] text-white py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Start reading tomorrow morning.</h2>
          <p className="text-gray-300 font-serif text-lg mb-8">
            Join thousands of readers who rely on The Ethics Reporter to hold the legal system accountable.
          </p>
          <NewsletterSignup variant="hero" />
        </div>
      </section>
    </main>
  );
}
