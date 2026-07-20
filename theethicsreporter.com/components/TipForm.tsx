"use client";

import { useState, FormEvent } from "react";

export default function TipForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [anonymous, setAnonymous] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: anonymous ? "" : (formData.get("name") as string),
      email: anonymous ? "" : (formData.get("email") as string),
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      anonymous,
    };

    try {
      const res = await fetch("/api/tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12 px-6 bg-green-50 rounded-lg border border-green-200">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold mb-2 font-sans">Tip Received</h3>
        <p className="text-gray-600 font-serif">
          Thank you for your submission. We take every tip seriously and will
          review it promptly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 bg-brand text-white rounded text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          Submit Another Tip
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Anonymous toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="w-4 h-4 accent-brand"
        />
        <span className="text-sm font-sans text-gray-700">
          Submit anonymously
        </span>
      </label>

      {!anonymous && (
        <>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 font-sans"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-sans text-sm"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 font-sans"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-sans text-sm"
              placeholder="jane@example.com"
            />
          </div>
        </>
      )}

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold mb-1 font-sans"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-sans text-sm"
          placeholder="Attorney misconduct in [state/jurisdiction]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold mb-1 font-sans"
        >
          Your Tip <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={8}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-serif text-sm leading-relaxed"
          placeholder="Describe the ethics violation, including names, dates, jurisdictions, case numbers, and any supporting details you can share..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-brand text-white font-semibold rounded hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
      >
        {status === "sending" ? "Sending..." : "Submit Tip"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center font-sans">
          Something went wrong. Please try again or email us directly at{" "}
          <a
            href="mailto:theethicsreporter@gmail.com"
            className="underline"
          >
            theethicsreporter@gmail.com
          </a>
        </p>
      )}

      <p className="text-xs text-gray-400 text-center font-sans">
        Your privacy matters. Anonymous tips cannot be traced back to you.
      </p>
    </form>
  );
}
