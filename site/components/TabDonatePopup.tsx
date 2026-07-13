"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ter_tab_donate_scroll_dismissed";
const DISMISS_DAYS = 3; // don't show again for 3 days after dismiss
const SCROLL_TRIGGER = 0.35; // show after user scrolls 35% down the article

/**
 * Scroll-triggered donation popup shown only on Take America Back articles.
 * Fires once the reader scrolls past SCROLL_TRIGGER of the page height.
 */
export default function TabDonatePopup() {
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);

  // Decide whether this reader is eligible to see the popup at all.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const dismissedAt = parseInt(raw, 10);
        const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        if (daysSince < DISMISS_DAYS) return; // recently dismissed
      }
      setArmed(true);
    } catch {
      setArmed(true);
    }
  }, []);

  // Attach the scroll listener only when armed.
  useEffect(() => {
    if (!armed) return;

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const ratio = scrollTop / docHeight;
      if (ratio >= SCROLL_TRIGGER) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once in case the article is short / already scrolled.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {}
    setVisible(false);
  };

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

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Top bar */}
        <div className="bg-[#1a0000] px-7 pt-7 pb-6 text-center">
          <p className="text-[#e8c07a] text-xs font-bold uppercase tracking-widest font-sans mb-2">
            Take America Back
          </p>
          <h2 className="text-white text-2xl font-bold font-sans leading-snug">
            This Investigation Was Not Free to Produce.
          </h2>
          <p className="text-gray-300 text-sm font-sans mt-2">
            No advertisers. No corporate donors. No government money. Just readers
            like you.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 bg-[#fdf8f0]">
          <p className="text-[#1a0000] font-serif text-base leading-relaxed mb-5">
            We are documenting the collapse of America&apos;s courts &mdash; the
            corruption, the secret proceedings, the vanishing rights the Founders
            fought to guarantee. This work only exists because readers fund it.
          </p>
          <p className="text-[#1a0000] font-serif text-base leading-relaxed mb-6">
            <strong className="font-sans">
              If this reporting matters to you, please chip in.
            </strong>{" "}
            Even $1 helps us keep publishing without compromise.
          </p>

          {/* Amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["$5", "$10", "$25", "$50"].map((amt) => {
              const amountValue = parseInt(amt.replace("$", ""));
              return (
                <Link
                  key={amt}
                  href={`/donate?amount=${amountValue}`}
                  onClick={() => {
                    track("tab_scroll_popup_quick", amountValue);
                    dismiss();
                  }}
                  className="block text-center border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-bold py-2 rounded-lg font-sans text-sm transition-colors"
                >
                  {amt}
                </Link>
              );
            })}
          </div>

          <Link
            href="/donate"
            onClick={() => {
              track("tab_scroll_popup_main");
              dismiss();
            }}
            className="block w-full text-center bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-3 rounded-xl font-sans text-base transition-colors"
          >
            Support The Ethics Reporter &rarr;
          </Link>

          <button
            onClick={dismiss}
            className="block w-full text-center text-gray-400 hover:text-gray-600 text-xs font-sans mt-3 transition-colors"
          >
            Continue reading
          </button>
        </div>

        {/* Close X */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl font-bold leading-none transition-colors"
          aria-label="Close"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
