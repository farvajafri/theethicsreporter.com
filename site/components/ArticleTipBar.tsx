"use client";

import { useEffect, useState } from "react";

const QUICK_AMOUNTS = [
  { label: "$1", cents: 100 },
  { label: "$3", cents: 300 },
  { label: "$5", cents: 500 },
  { label: "$10", cents: 1000 },
];

export default function ArticleTipBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState<number | null>(null);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed || donated) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setVisible(pct >= 0.55);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, donated]);

  const handleQuickDonate = async (cents: number) => {
    setLoading(cents);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents: cents }),
      });
      const data = await res.json();
      if (data.url) {
        setDonated(true);
        window.location.href = data.url;
      }
    } catch {
      // fail silently — don't block the reading experience
    } finally {
      setLoading(null);
    }
  };

  if (dismissed || donated) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#1a0000] border-t-2 border-[#8B0000] shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
          {/* Text */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="text-white text-sm font-semibold font-sans leading-tight">
              🙏 This reporting is free because readers fund it.
            </p>
            <p className="text-gray-400 text-xs font-sans mt-0.5 hidden sm:block">
              No ads. No corporate money. Support us with a quick tip.
            </p>
          </div>

          {/* Quick-donate buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a.cents}
                onClick={() => handleQuickDonate(a.cents)}
                disabled={loading !== null}
                className={`px-3 py-1.5 rounded font-bold text-sm font-sans border-2 transition-all ${
                  loading === a.cents
                    ? "bg-[#8B0000] border-[#8B0000] text-white opacity-70"
                    : "bg-transparent border-[#8B0000] text-[#ff6666] hover:bg-[#8B0000] hover:text-white"
                } disabled:cursor-wait`}
              >
                {loading === a.cents ? "…" : a.label}
              </button>
            ))}
            <a
              href="/donate"
              className="px-3 py-1.5 rounded font-bold text-sm font-sans bg-[#8B0000] text-white hover:bg-[#6b0000] transition-colors"
            >
              More →
            </a>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-500 hover:text-gray-300 text-lg leading-none flex-shrink-0 transition-colors"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
