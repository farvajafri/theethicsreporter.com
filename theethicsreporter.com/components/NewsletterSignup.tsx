"use client";
import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "sidebar" | "inline" | "hero";
}

export default function NewsletterSignup({ variant = "sidebar" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={variant === "hero" ? "text-center" : ""}>
        <div className="bg-[#fdf8f0] border border-[#e8e0d0] rounded-lg p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-2">You&apos;re in</p>
          <p className="font-serif text-gray-800 leading-relaxed">
            Check your inbox — your first briefing arrives tomorrow morning.
          </p>
          <p className="text-sm text-gray-500 mt-3 font-sans">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="w-full max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded font-sans text-base focus:outline-none focus:border-[#8B0000]"
          />
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded font-sans text-base focus:outline-none focus:border-[#8B0000]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#8B0000] hover:bg-[#6d0000] text-white font-sans font-bold px-6 py-3 rounded text-sm uppercase tracking-wide whitespace-nowrap disabled:opacity-60 transition-colors"
            >
              {status === "loading" ? "..." : "Subscribe Free"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-600 text-sm font-sans">{errorMsg}</p>
          )}
          <p className="text-xs text-gray-500 font-sans">Free. No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    );
  }

  // sidebar / inline variant
  return (
    <div className="border-t-4 border-[#8B0000] bg-[#fdf8f0] p-5 rounded-b-lg">
      <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] font-sans mb-2">Daily Briefing</p>
      <p className="font-serif text-gray-800 text-base leading-relaxed mb-4">
        Get The Ethics Reporter&apos;s accountability journalism delivered to your inbox every morning. Free.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded font-sans text-sm focus:outline-none focus:border-[#8B0000]"
        />
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded font-sans text-sm focus:outline-none focus:border-[#8B0000]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#8B0000] hover:bg-[#6d0000] text-white font-sans font-bold py-2.5 rounded text-sm uppercase tracking-wide disabled:opacity-60 transition-colors"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe — It's Free"}
        </button>
        {status === "error" && (
          <p className="text-red-600 text-sm font-sans">{errorMsg}</p>
        )}
      </form>
      <p className="text-xs text-gray-400 font-sans mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
