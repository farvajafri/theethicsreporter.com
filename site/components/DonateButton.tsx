"use client";

import Link from "next/link";

/**
 * Single shared donate button used across the whole site (header nav, footer,
 * podcast pages, floating scroll button, inline CTAs). Change the styling here
 * and it updates everywhere. The Ethics Reporter is 100% reader-funded — no ads,
 * no corporate money — so this button should be prominent and consistent.
 */

type Variant = "nav" | "navMobile" | "footer" | "floating" | "inline";

const VARIANT_CLASSES: Record<Variant, string> = {
  // Header desktop nav pill
  nav: "bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold px-3 py-1 rounded transition-colors font-sans",
  // Header mobile dropdown row
  navMobile:
    "block px-2 py-3 text-base font-bold text-red-400 border-b border-gray-800",
  // Footer button
  footer:
    "inline-block bg-[#8B0000] hover:bg-[#a00000] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors font-sans",
  // Floating scroll button
  floating:
    "inline-flex items-center gap-2 bg-[#8B0000] hover:bg-[#a00000] text-white font-bold px-5 py-2.5 rounded-full shadow-lg shadow-black/30 text-sm font-sans transition-colors",
  // Generic inline button
  inline:
    "inline-block bg-[#8B0000] hover:bg-[#a00000] text-white font-bold px-6 py-3 rounded-xl transition-colors font-sans",
};

export default function DonateButton({
  variant = "inline",
  label = "❤ Donate",
  amount,
  trackLabel = "donate_button",
  className = "",
}: {
  variant?: Variant;
  label?: React.ReactNode;
  amount?: number;
  trackLabel?: string;
  className?: string;
}) {
  const href = amount ? `/donate?amount=${amount}` : "/donate";

  const track = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).gtag) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "donate_click", {
          event_category: "donation",
          event_label: trackLabel,
          ...(amount ? { value: amount } : {}),
        });
      }
    } catch {}
  };

  return (
    <Link
      href={href}
      onClick={track}
      className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}
