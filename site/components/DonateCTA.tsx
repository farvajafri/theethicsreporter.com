import DonateButton from "@/components/DonateButton";
import Link from "next/link";

/**
 * Reusable reader-support call-to-action panel. Warm, short ask consistent with
 * the no-ads / reader-funded framing used across the site and in social copy.
 * Drop <DonateCTA /> anywhere a full donate pitch belongs (podcast pages, etc.).
 */
export default function DonateCTA({
  heading = "This journalism is powered entirely by readers.",
  body = "The Ethics Reporter has no advertisers and no corporate sponsors — just people like you who believe the legal system should be held accountable. If this work matters to you, please chip in. Even $1 genuinely keeps us going.",
  trackPrefix = "donate_cta",
  className = "",
}: {
  heading?: string;
  body?: string;
  trackPrefix?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-[#3a0000] shadow-lg ${className}`.trim()}
    >
      <div className="bg-[#1a0000] px-6 sm:px-8 py-8 text-center">
        <p className="text-[#e8c07a] text-xs font-bold uppercase tracking-widest font-sans mb-3">
          Reader-Supported Journalism
        </p>
        <h3 className="text-white text-xl sm:text-2xl font-bold font-sans leading-snug mb-4">
          {heading}
        </h3>
        <p className="text-gray-300 font-serif text-base leading-relaxed max-w-xl mx-auto mb-6">
          {body}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[5, 10, 25, 50].map((amt) => (
            <Link
              key={amt}
              href={`/donate?amount=${amt}`}
              className="px-4 py-2 text-sm font-bold border-2 border-[#8B0000] text-[#e8c07a] rounded-lg hover:bg-[#8B0000] hover:text-white transition-colors font-sans"
            >
              ${amt}
            </Link>
          ))}
        </div>

        <DonateButton
          variant="inline"
          label="Donate to The Ethics Reporter →"
          trackLabel={`${trackPrefix}_main`}
        />

        <p className="text-gray-500 text-xs font-sans mt-4">
          No ads. No paywall. Even $1 makes a real difference. Thank you.
        </p>
      </div>
    </div>
  );
}
