"use client";

import { useState } from "react";

const MONTHLY_PRESETS = [
  { label: "$5", cents: 500 },
  { label: "$10", cents: 1000 },
  { label: "$25", cents: 2500 },
  { label: "$50", cents: 5000 },
];

const ONETIME_PRESETS = [
  { label: "$10", cents: 1000 },
  { label: "$25", cents: 2500 },
  { label: "$50", cents: 5000 },
  { label: "$100", cents: 10000 },
];

// Goal bar constants — update when pulling live data
const GOAL_CURRENT = 80;
const GOAL_TARGET = 100;

type Interval = "month" | "once";

export default function DonationWidget({
  compact = false,
  initialAmountCents,
}: {
  compact?: boolean;
  initialAmountCents?: number;
}) {
  const [interval, setInterval] = useState<Interval>("month");
  const presets = interval === "month" ? MONTHLY_PRESETS : ONETIME_PRESETS;

  // Pick default selection based on interval or passed-in amount
  const defaultCents = initialAmountCents
    ? presets.find((p) => p.cents === initialAmountCents)?.cents ?? presets[1].cents
    : interval === "month"
    ? 1000  // $10 monthly default
    : 2500; // $25 one-time default

  const [selected, setSelected] = useState<number>(defaultCents);
  const [custom, setCustom] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const switchInterval = (newInterval: Interval) => {
    setInterval(newInterval);
    setIsCustom(false);
    setCustom("");
    setError("");
    if (newInterval === "month") {
      setSelected(1000);
    } else {
      setSelected(2500);
    }
  };

  const effectiveCents = isCustom
    ? Math.round(parseFloat(custom || "0") * 100)
    : selected;

  const handleDonate = async () => {
    setError("");
    if (!effectiveCents || effectiveCents < 100) {
      setError("Minimum donation is $1.00");
      return;
    }
    setLoading(true);
    try {
      const body: Record<string, unknown> = { amountCents: effectiveCents };
      if (interval === "month") body.interval = "month";

      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const donateLabel = isCustom && custom
    ? `Donate $${parseFloat(custom).toFixed(2)}${interval === "month" ? "/mo" : ""}`
    : `Donate ${presets.find((p) => p.cents === selected)?.label ?? ""}${interval === "month" ? "/mo" : ""}`;

  // ─── Compact mode ────────────────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="flex flex-col gap-2.5">
        {/* Interval toggle */}
        <div className="flex rounded-md border border-gray-200 overflow-hidden text-xs font-bold">
          <button
            onClick={() => switchInterval("month")}
            className={`flex-1 py-1.5 transition-colors ${
              interval === "month"
                ? "bg-[#8B0000] text-white"
                : "bg-white text-gray-600 hover:text-[#8B0000]"
            }`}
          >
            Monthly ⭐
          </button>
          <button
            onClick={() => switchInterval("once")}
            className={`flex-1 py-1.5 transition-colors border-l border-gray-200 ${
              interval === "once"
                ? "bg-[#8B0000] text-white"
                : "bg-white text-gray-600 hover:text-[#8B0000]"
            }`}
          >
            One-time
          </button>
        </div>

        {/* Amount presets */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.cents}
              onClick={() => {
                setSelected(p.cents);
                setIsCustom(false);
                setCustom("");
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold border-2 transition-all ${
                !isCustom && selected === p.cents
                  ? "bg-[#8B0000] border-[#8B0000] text-white"
                  : "bg-transparent border-gray-300 text-gray-700 hover:border-[#8B0000] hover:text-[#8B0000]"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={`px-2.5 py-1 rounded text-xs font-bold border-2 transition-all ${
              isCustom
                ? "bg-[#8B0000] border-[#8B0000] text-white"
                : "bg-transparent border-gray-300 text-gray-700 hover:border-[#8B0000] hover:text-[#8B0000]"
            }`}
          >
            Other
          </button>
        </div>

        {isCustom && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500 font-sans text-sm">$</span>
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="Amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs w-24 font-sans focus:outline-none focus:border-[#8B0000]"
            />
          </div>
        )}

        {error && <p className="text-red-600 text-xs font-sans">{error}</p>}

        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold py-2 px-4 rounded text-sm font-sans transition-colors disabled:opacity-60"
        >
          {loading ? "Redirecting…" : `${donateLabel} →`}
        </button>
      </div>
    );
  }

  // ─── Full mode ────────────────────────────────────────────────────────────────
  const goalPct = Math.min(100, Math.round((GOAL_CURRENT / GOAL_TARGET) * 100));

  return (
    <div className="bg-[#fdf8f0] border-2 border-[#8B0000] rounded-xl p-6 font-sans">
      <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-2">
        Reader Supported
      </p>
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
        This journalism is free because readers like you make it possible.
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        We don&apos;t have corporate advertisers. We don&apos;t take money from law firms. Every investigation
        you read here is funded entirely by readers. Even $1 keeps us going.
      </p>

      {/* Monthly / One-time toggle */}
      <div className="flex rounded-lg border-2 border-gray-200 overflow-hidden mb-5 text-sm font-bold">
        <button
          onClick={() => switchInterval("month")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
            interval === "month"
              ? "bg-[#8B0000] text-white"
              : "bg-white text-gray-600 hover:text-[#8B0000]"
          }`}
        >
          Monthly
          {interval === "month" && (
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full font-semibold">
              ⭐ Most popular
            </span>
          )}
        </button>
        <button
          onClick={() => switchInterval("once")}
          className={`flex-1 py-2.5 transition-colors border-l-2 border-gray-200 ${
            interval === "once"
              ? "bg-[#8B0000] text-white"
              : "bg-white text-gray-600 hover:text-[#8B0000]"
          }`}
        >
          One-time
        </button>
      </div>

      {/* Goal bar / social proof */}
      <div className="mb-5 bg-white rounded-lg border border-gray-100 p-3.5">
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Join <span className="text-[#8B0000] font-bold">{GOAL_CURRENT} readers</span> who donated this month
        </p>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B0000] rounded-full transition-all"
            style={{ width: `${goalPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{goalPct}% toward our monthly goal of {GOAL_TARGET} supporters</p>
      </div>

      {/* Amount presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p.cents}
            onClick={() => {
              setSelected(p.cents);
              setIsCustom(false);
              setCustom("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
              !isCustom && selected === p.cents
                ? "bg-[#8B0000] border-[#8B0000] text-white shadow-md"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#8B0000] hover:text-[#8B0000]"
            }`}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setIsCustom(true)}
          className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
            isCustom
              ? "bg-[#8B0000] border-[#8B0000] text-white shadow-md"
              : "bg-white border-gray-300 text-gray-700 hover:border-[#8B0000] hover:text-[#8B0000]"
          }`}
        >
          Other
        </button>
      </div>

      {isCustom && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 text-lg">$</span>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:border-[#8B0000]"
          />
        </div>
      )}

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full bg-[#8B0000] hover:bg-[#6b0000] active:bg-[#500000] text-white font-bold py-3 px-6 rounded-lg text-base transition-colors disabled:opacity-60 shadow-md"
      >
        {loading ? "Redirecting to secure checkout…" : `${donateLabel} →`}
      </button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Secure checkout via Stripe.{" "}
        {interval === "month"
          ? "Cancel your monthly gift anytime."
          : "No subscription — just a one-time contribution."}
      </p>
    </div>
  );
}
