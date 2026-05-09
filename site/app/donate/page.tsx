import { SITE_NAME } from "@/lib/data";
import type { Metadata } from "next";
import DonationWidget from "@/components/DonationWidget";

export const metadata: Metadata = {
  title: `Support Our Work | ${SITE_NAME}`,
  description:
    "The Ethics Reporter is 100% reader-funded. Help us continue holding judges, attorneys, and the legal system accountable. Every dollar matters.",
};

export default function DonatePage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const success = searchParams?.success === "1";

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {success ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-6">🙏</div>
          <h1 className="text-3xl font-bold mb-4 font-sans">Thank You.</h1>
          <p className="text-gray-600 font-serif text-lg leading-relaxed max-w-xl mx-auto">
            Your contribution means the world to us. You&apos;re directly funding the journalism that
            holds the powerful accountable. We won&apos;t let you down.
          </p>
        </div>
      ) : (
        <>
          {/* Hero */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-3 font-sans">
              Reader Supported Journalism
            </p>
            <h1 className="text-4xl font-bold mb-5 font-sans leading-tight">
              Without You, This Work Stops.
            </h1>
            <p className="text-gray-600 font-serif text-lg leading-relaxed max-w-2xl mx-auto">
              The Ethics Reporter exposes judicial misconduct, attorney fraud, bar association
              corruption, and the legal system&apos;s quiet failures — the stories no one else will touch.
              We do it without corporate advertisers, without law firm sponsorships, without anyone
              telling us what we can and cannot publish.
            </p>
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 text-center">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-3xl font-bold text-[#8B0000] font-sans">250+</div>
              <div className="text-sm text-gray-600 font-sans mt-1">Investigations Published</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-3xl font-bold text-[#8B0000] font-sans">$0</div>
              <div className="text-sm text-gray-600 font-sans mt-1">Corporate Funding</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-3xl font-bold text-[#8B0000] font-sans">100%</div>
              <div className="text-sm text-gray-600 font-sans mt-1">Reader Funded</div>
            </div>
          </div>

          {/* The ask */}
          <div className="bg-white border-l-4 border-[#8B0000] pl-6 py-4 mb-10">
            <p className="font-serif text-lg leading-relaxed text-gray-800">
              &ldquo;We are getting traction. People are reading. People are complimenting the work.
              But the truth is — we cannot keep doing this without financial support. The reporting
              takes real time, real research, real legal expertise. A dollar. Five dollars. Whatever
              you can give. It keeps the lights on. It keeps us publishing. It keeps the powerful
              from operating in silence.&rdquo;
            </p>
            <p className="text-sm text-gray-500 mt-3 font-sans">— The Ethics Reporter Editorial Team</p>
          </div>

          {/* What your money does */}
          <div className="mb-10">
            <h2 className="text-xl font-bold font-sans mb-4">Your contribution funds:</h2>
            <ul className="space-y-3 text-gray-700 font-serif">
              {[
                "Deep-dive investigations into judicial misconduct and appellate reversals",
                "Daily reporting on attorney discipline, disbarment, and bar corruption",
                "Legal database access to pull court records and case law",
                "Coverage of AI and legal ethics — issues the mainstream press ignores",
                "The infrastructure to publish and distribute this work for free",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#8B0000] font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Donation widget */}
          <DonationWidget />

          {/* Footer note */}
          <p className="text-center text-sm text-gray-400 mt-8 font-sans">
            The Ethics Reporter is an independent journalism project. Contributions are not
            tax-deductible but are deeply appreciated and go directly toward our reporting.
          </p>
        </>
      )}
    </div>
  );
}
