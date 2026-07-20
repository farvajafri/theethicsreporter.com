"use client";

import { useEffect, useState } from "react";
import DonateButton from "@/components/DonateButton";

/**
 * Small persistent floating "Support this reporting" donate button that slides
 * in after the reader scrolls past ~25% of the page (i.e. once they're actually
 * reading). Sits bottom-center on mobile, bottom-right on desktop. Dismissible
 * for the current tab session so it isn't infinitely nagging within one visit.
 */

const SESSION_KEY = "ter_floating_donate_dismissed";

export default function FloatingDonate() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {}

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = scrollTop / docHeight;
      if (pct >= 0.25) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setDismissed(true);
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed z-40 bottom-4 inset-x-0 flex justify-center px-4 sm:inset-x-auto sm:right-5 sm:left-auto sm:px-0 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 bg-[#1a0000]/95 backdrop-blur rounded-full pl-4 pr-1.5 py-1.5 shadow-xl shadow-black/40 border border-[#3a0000]">
        <span className="hidden sm:inline text-[#e8c07a] text-xs font-bold font-sans mr-1">
          Support this reporting
        </span>
        <DonateButton
          variant="floating"
          label={
            <>
              <span aria-hidden>❤</span>
              <span>Donate</span>
            </>
          }
          trackLabel="floating_scroll"
        />
        <button
          onClick={dismiss}
          aria-label="Dismiss donate button"
          className="text-gray-500 hover:text-white transition-colors px-2 py-1 text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
