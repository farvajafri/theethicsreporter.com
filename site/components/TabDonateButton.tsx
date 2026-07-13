"use client";

import Link from "next/link";

/**
 * End-of-article donation call-to-action block for Take America Back articles.
 * Rendered after the article body.
 */
export default function TabDonateButton() {
  const track = (label: string, value?: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).gtag) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "donate_click", {
          event_category: "donation",
          event_label: label,
          ...(value ? { value } : {}),
        });
      }
    } catch {}
  };

  return (
    <div className="mt-12 rounded-2xl overflow-hidden border border-[#3a0000] shadow-lg">
      <div className="bg-[#1a0000] px-6 sm:px-8 py-8 text-center">
        <p className="text-[#e8c07a] text-xs font-bold uppercase tracking-widest font-sans mb-3">
          Reader-Supported Journalism
        </p>
        <h3 className="text-white text-2xl sm:text-3xl font-bold font-sans leading-snug mb-4">
          Help Us Take America Back
        </h3>
        <p className="text-gray-300 font-serif text-base leading-relaxed max-w-xl mx-auto mb-6">
          The Ethics Reporter takes no advertising, no corporate money, and no
          government funding. Every investigation you read is paid for by readers
          who believe America&apos;s courts must be held accountable. If this work
          matters to you, please support it.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[5, 10, 25, 50].map((amt) => (
            <Link
              key={amt}
              href={`/donate?amount=${amt}`}
              onClick={() => track("tab_end_button_quick", amt)}
              className="px-4 py-2 text-sm font-bold border-2 border-[#8B0000] text-[#e8c07a] rounded-lg hover:bg-[#8B0000] hover:text-white transition-colors font-sans"
            >
              ${amt}
            </Link>
          ))}
        </div>

        <Link
          href="/donate"
          onClick={() => track("tab_end_button_main")}
          className="inline-block bg-[#8B0000] hover:bg-[#a00000] text-white font-bold px-8 py-3 rounded-xl font-sans text-base transition-colors"
        >
          Donate to The Ethics Reporter &rarr;
        </Link>

        <p className="text-gray-500 text-xs font-sans mt-4">
          Even $1 makes a real difference. Thank you.
        </p>
      </div>
    </div>
  );
}
