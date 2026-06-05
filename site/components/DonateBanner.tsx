"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BANNER_KEY = "ter_banner_dismissed_at";
const DISMISS_DAYS = 7;

export default function DonateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(BANNER_KEY);
      if (!dismissed) {
        setVisible(true);
      } else {
        const dismissedAt = parseInt(dismissed, 10);
        const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        if (daysSince >= DISMISS_DAYS) {
          setVisible(true);
        }
      }
    } catch {
      // localStorage unavailable (SSR guard)
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(BANNER_KEY, String(Date.now()));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-[#1a0505] border-b border-red-900 text-white relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 pr-8">
          {/* Main copy */}
          <p className="text-sm sm:text-[15px] leading-snug flex-1 min-w-0">
            <span className="font-bold text-red-400">To all our readers: </span>
            We&apos;re an independent outlet with no corporate backing. If you read us and value this
            journalism,{" "}
            <span className="font-semibold text-white">please donate today.</span>{" "}
            <span className="text-gray-400 text-xs sm:text-sm">Even $5 keeps us publishing.</span>
          </p>

          {/* Quick donate amounts + CTA */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            {[5, 10, 25].map((amt) => (
              <Link
                key={amt}
                href={`/donate?amount=${amt}`}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'donate_click', {
                      event_category: 'donation',
                      event_label: 'banner_quick',
                      value: amt,
                    });
                  }
                }}
                className="px-3 py-1 text-xs sm:text-sm font-bold border border-red-600/70 text-red-300 rounded-md hover:bg-red-900/60 hover:text-white transition-colors"
              >
                ${amt}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'donate_click', {
                    event_category: 'donation',
                    event_label: 'banner_main',
                  });
                }
              }}
              className="px-4 py-1.5 text-xs sm:text-sm font-bold bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Donate Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
