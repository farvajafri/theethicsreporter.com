"use client";

import { useState } from "react";

const PRESETS = [
  { label: "$1", cents: 100 },
  { label: "$5", cents: 500 },
  { label: "$10", cents: 1000 },
  { label: "$25", cents: 2500 },
];

export default function DonationWidget({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<number>(100); // $1 default
  const [custom, setCustom] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents: effectiveCents }),
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

  if (compact) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.cents}
              onClick={() => { setSelected(p.cents); setIsCustom(false); setCustom(""); }}
              className={`px-3 py-1.5 rounded text-sm font-bold font-sans border-2 transition-all ${
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
            className={`px-3 py-1.5 rounded text-sm font-bold font-sans border-2 transition-all ${
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
            <span className="text-gray-500 font-sans">$</span>
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="Amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-24 font-sans focus:outline-none focus:border-[#8B0000]"
            />
          </div>
        )}
        {error && <p className="text-red-600 text-xs font-sans">{error}</p>}
        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold py-2 px-4 rounded text-sm font-sans transition-colors disabled:opacity-60"
        >
          {loading ? "Redirecting…" : `Donate ${isCustom && custom ? `$${parseFloat(custom).toFixed(2)}` : PRESETS.find(p => p.cents === selected)?.label ?? ""}`}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fdf8f0] border-2 border-[#8B0000] rounded-xl p-6 font-sans">
      <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-2">Reader Supported</p>
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
        This journalism is free because readers like you make it possible.
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        We don&apos;t have corporate advertisers. We don&apos;t take money from law firms. Every investigation
        you read here — every judge we hold accountable, every attorney we expose — is funded entirely
        by readers. Even $1 keeps us going.
      </p>

      {/* Amount presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.cents}
            onClick={() => { setSelected(p.cents); setIsCustom(false); setCustom(""); }}
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
        {loading
          ? "Redirecting to secure checkout…"
          : `Donate ${isCustom && custom ? `$${parseFloat(custom || "0").toFixed(2)}` : PRESETS.find((p) => p.cents === selected)?.label ?? ""} →`}
      </button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Secure checkout via Stripe. No subscription — just a one-time contribution.
      </p>
    </div>
  );
}
