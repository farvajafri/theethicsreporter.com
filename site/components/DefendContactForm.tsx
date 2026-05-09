"use client";

import { useState } from "react";

const PROFESSIONS = [
  "Attorney / Lawyer",
  "Doctor / Physician",
  "Nurse / NP / PA",
  "Dentist",
  "Pharmacist",
  "CPA / Accountant",
  "Teacher / Educator",
  "Engineer",
  "Social Worker",
  "Psychologist / Therapist",
  "Real Estate Broker",
  "Insurance Producer",
  "Veterinarian",
  "Physical Therapist",
  "Other Licensed Professional",
];

const STATES = [
  "New York", "New Jersey", "Rhode Island", "Maine", "Massachusetts",
  "North Dakota", "Illinois", "Vermont", "Pennsylvania", "Texas", "Florida",
  "Other",
];

const COMPLAINT_TYPES = [
  "Bar Grievance / Attorney Ethics Complaint",
  "Medical Board Investigation",
  "Nursing Board Investigation",
  "CPA / Accounting Board Investigation",
  "Dental Board Investigation",
  "Pharmacy Board Investigation",
  "Teaching License Investigation",
  "Engineering Board Investigation",
  "Malpractice Suit",
  "Criminal Referral / Parallel Proceeding",
  "Other / Not Sure",
];

export default function DefendContactForm({
  defaultState,
  defaultProfession,
}: {
  defaultState?: string;
  defaultProfession?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: defaultProfession || "",
    state: defaultState || "",
    complaint: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and describe your situation.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/defend-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold font-sans text-green-800 mb-2">
          We received your inquiry.
        </h3>
        <p className="text-green-700 font-serif">
          A member of our team will contact you directly — typically within one business day.
          Given the strict deadlines involved in ethics proceedings, we treat every inquiry as urgent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
            Your Name <span className="text-[#8B0000]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
            Email Address <span className="text-[#8B0000]">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
          Phone Number <span className="text-gray-400 font-normal">(optional — we may call you)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="(555) 000-0000"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
            Your Profession
          </label>
          <select
            value={form.profession}
            onChange={(e) => set("profession", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-white"
          >
            <option value="">Select profession…</option>
            {PROFESSIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
            Your State
          </label>
          <select
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-white"
          >
            <option value="">Select state…</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
          Type of Complaint / Investigation
        </label>
        <select
          value={form.complaint}
          onChange={(e) => set("complaint", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-white"
        >
          <option value="">Select type…</option>
          {COMPLAINT_TYPES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold font-sans text-gray-700 mb-1">
          Describe Your Situation <span className="text-[#8B0000]">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us what happened — when you received the complaint, what it alleges, any deadlines you're aware of, and what outcome you're hoping for. Everything you share is confidential."
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] resize-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm font-sans">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold py-3.5 px-6 rounded-lg text-base font-sans transition-colors disabled:opacity-60 shadow-md"
      >
        {loading ? "Submitting…" : "Request a Free Confidential Consultation →"}
      </button>

      <p className="text-xs text-gray-400 font-sans text-center">
        This form is protected by attorney–client privilege. We respond within one business day — sooner for urgent matters.
      </p>
    </form>
  );
}
