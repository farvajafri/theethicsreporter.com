"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ter_donate_popup_dismissed";
const DISMISS_DAYS = 5; // don't show again for 5 days after dismiss
const DELAY_MS = 6000;  // show after 6 seconds

export default function DonatePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const dismissedAt = parseInt(raw, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">

        {/* Top bar */}
        <div className="bg-[#1a0000] px-7 pt-7 pb-6 text-center">
          <p className="text-[#e8c07a] text-xs font-bold uppercase tracking-widest font-sans mb-2">
            Reader-Supported Journalism
          </p>
          <h2 className="text-white text-2xl font-bold font-sans leading-snug">
            We&apos;ve Published 321 Investigations.
          </h2>
          <p className="text-gray-300 text-sm font-sans mt-1">
            We haven&apos;t taken a single dollar from corporate donors or advertisers.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 bg-[#fdf8f0]">
          <p className="text-[#1a0000] font-serif text-base leading-relaxed mb-5">
            Every article on this site was published without advertiser influence, without
            corporate funding, and without compromise. We investigate judges, prosecutors,
            grievance committees, and the powerful people who escape accountability.
          </p>
          <p className="text-[#1a0000] font-serif text-base leading-relaxed mb-6">
            <strong className="font-sans">We kindly ask that you help us keep this work going.</strong>{" "}
            Even a small donation — $1, $5, whatever you can — makes a real difference.
            You are our only source of support.
          </p>

          {/* Amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["$5", "$10", "$25", "$50"].map((amt) => (
              <Link
                key={amt}
                href={`/donate?amount=${amt.replace("$","")}`}
                onClick={dismiss}
                className="block text-center border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-bold py-2 rounded-lg font-sans text-sm transition-colors"
              >
                {amt}
              </Link>
            ))}
          </div>

          <Link
            href="/donate"
            onClick={dismiss}
            className="block w-full text-center bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-3 rounded-xl font-sans text-base transition-colors"
          >
            Support The Ethics Reporter →
          </Link>

          <button
            onClick={dismiss}
            className="block w-full text-center text-gray-400 hover:text-gray-600 text-xs font-sans mt-3 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>

        {/* Close X */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl font-bold leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
