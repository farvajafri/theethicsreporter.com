"use client";

import { useState } from "react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

const RULES = [
  { value: "rule_1_1", label: "Rule 1.1 — Competence (failure to handle matter with skill/thoroughness)" },
  { value: "rule_1_3", label: "Rule 1.3 — Diligence (neglect, failure to act with reasonable promptness)" },
  { value: "rule_1_4", label: "Rule 1.4 — Communication (failure to keep client informed)" },
  { value: "rule_1_5", label: "Rule 1.5 — Fees (excessive, undisclosed, or improper fee arrangements)" },
  { value: "rule_1_6", label: "Rule 1.6 — Confidentiality (unauthorized disclosure of client information)" },
  { value: "rule_1_7", label: "Rule 1.7 — Conflicts of Interest (current clients)" },
  { value: "rule_1_8", label: "Rule 1.8 — Conflicts of Interest (prohibited transactions, gifts, business dealings)" },
  { value: "rule_1_9", label: "Rule 1.9 — Duties to Former Clients" },
  { value: "rule_1_15", label: "Rule 1.15 — Safekeeping Property (client funds/trust account issues)" },
  { value: "rule_1_16", label: "Rule 1.16 — Declining or Terminating Representation" },
  { value: "rule_3_1", label: "Rule 3.1 — Meritorious Claims (filing frivolous claims or defenses)" },
  { value: "rule_3_3", label: "Rule 3.3 — Candor Toward the Tribunal (dishonesty to court)" },
  { value: "rule_3_4", label: "Rule 3.4 — Fairness to Opposing Party and Counsel" },
  { value: "rule_4_1", label: "Rule 4.1 — Truthfulness in Statements to Others" },
  { value: "rule_8_4", label: "Rule 8.4 — Misconduct (fraud, dishonesty, misrepresentation, criminal acts)" },
  { value: "rule_8_5", label: "Rule 8.5 — Disciplinary Authority / Jurisdiction" },
  { value: "unsure",  label: "Not sure — describe what happened and our reviewers will identify the rule(s)" },
  { value: "multiple", label: "Multiple rules — I'll describe them all" },
];

interface FormData {
  // Your info
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  // Attorney info
  attorneyName: string;
  attorneyBarNumber: string;
  attorneyState: string;
  // Grievance
  rulesAlleged: string;
  incidentDate: string;
  description: string;
  desiredOutcome: string;
  priorFiling: string;
}

const EMPTY: FormData = {
  yourName: "",
  yourEmail: "",
  yourPhone: "",
  attorneyName: "",
  attorneyBarNumber: "",
  attorneyState: "",
  rulesAlleged: "",
  incidentDate: "",
  description: "",
  desiredOutcome: "",
  priorFiling: "no",
};

export default function GrievanceApplyPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = about you, 2 = about attorney, 3 = grievance details

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validateStep1 = () => {
    if (!form.yourName.trim()) return "Your name is required.";
    if (!form.yourEmail.trim() || !form.yourEmail.includes("@")) return "A valid email is required.";
    return null;
  };

  const validateStep2 = () => {
    if (!form.attorneyName.trim()) return "The attorney's name is required.";
    if (!form.attorneyState) return "Please select the attorney's state.";
    return null;
  };

  const validateStep3 = () => {
    if (!form.rulesAlleged) return "Please select the rule(s) that may have been violated.";
    if (form.description.trim().length < 100)
      return "Please provide a detailed description (at least 100 characters).";
    return null;
  };

  const nextStep = () => {
    setError("");
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
    }
    if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setError("");
    const err = validateStep3();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/grievance-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent";
  const labelClass = "block text-sm font-bold text-[#1a0000] font-sans mb-1";
  const hintClass = "text-xs text-gray-500 font-sans mt-1";

  return (
    <div className="min-h-screen bg-[#fdf8f0] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-2 font-sans">
            Professional Ethics Opinion
          </p>
          <h1 className="text-3xl font-bold text-[#1a0000] font-sans mb-2">
            Submit Your Grievance
          </h1>
          <p className="text-gray-600 font-serif text-sm">
            Flat fee $250 · 24-hour turnaround · Attorney-reviewed · 100% confidential
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-sans ${
                  step >= s
                    ? "bg-[#8B0000] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-1 rounded ${
                    step > s ? "bg-[#8B0000]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-sans mb-8 px-1">
          <span className={step >= 1 ? "text-[#8B0000] font-bold" : ""}>Your Info</span>
          <span className={step >= 2 ? "text-[#8B0000] font-bold" : ""}>Attorney Info</span>
          <span className={step >= 3 ? "text-[#8B0000] font-bold" : ""}>Grievance Details</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

          {/* ── STEP 1: YOUR INFO ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a0000] font-sans mb-4">About You</h2>

              <div>
                <label className={labelClass}>Your Full Name *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Jane Smith"
                  value={form.yourName}
                  onChange={(e) => set("yourName", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Your Email Address *</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="jane@example.com"
                  value={form.yourEmail}
                  onChange={(e) => set("yourEmail", e.target.value)}
                />
                <p className={hintClass}>Your opinion will be delivered to this address within 24 hours.</p>
              </div>

              <div>
                <label className={labelClass}>Your Phone (Optional)</label>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="(555) 555-5555"
                  value={form.yourPhone}
                  onChange={(e) => set("yourPhone", e.target.value)}
                />
                <p className={hintClass}>We may call for clarification if needed.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 font-serif">
                <strong className="font-sans">Confidentiality:</strong> Your submission is strictly
                confidential. We do not share your identity or the contents of your grievance with
                anyone outside the attorney review team.
              </div>
            </div>
          )}

          {/* ── STEP 2: ATTORNEY INFO ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a0000] font-sans mb-4">About the Attorney</h2>

              <div>
                <label className={labelClass}>Attorney&apos;s Full Name *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="John Doe, Esq."
                  value={form.attorneyName}
                  onChange={(e) => set("attorneyName", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>State Where Attorney is Licensed *</label>
                <select
                  className={inputClass}
                  value={form.attorneyState}
                  onChange={(e) => set("attorneyState", e.target.value)}
                >
                  <option value="">Select a state…</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <p className={hintClass}>
                  If licensed in multiple states, choose the primary state. You can note others in your description.
                </p>
              </div>

              <div>
                <label className={labelClass}>Attorney&apos;s Bar Number (Optional but helpful)</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. NY: 1234567"
                  value={form.attorneyBarNumber}
                  onChange={(e) => set("attorneyBarNumber", e.target.value)}
                />
                <p className={hintClass}>
                  Helps us verify disciplinary history. Find it at your state&apos;s bar website.
                </p>
              </div>

              <div>
                <label className={labelClass}>Approximate Date of Incident</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.incidentDate}
                  onChange={(e) => set("incidentDate", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── STEP 3: GRIEVANCE DETAILS ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a0000] font-sans mb-4">Grievance Details</h2>

              <div>
                <label className={labelClass}>Rule(s) You Believe Were Violated *</label>
                <select
                  className={inputClass}
                  value={form.rulesAlleged}
                  onChange={(e) => set("rulesAlleged", e.target.value)}
                >
                  <option value="">Select a rule…</option>
                  {RULES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <p className={hintClass}>
                  If you&apos;re unsure, select &quot;Not sure&quot; — our reviewers will identify the applicable rules.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Describe What Happened *{" "}
                  <span className="text-gray-400 font-normal">
                    ({form.description.length} characters — minimum 100)
                  </span>
                </label>
                <textarea
                  className={`${inputClass} resize-none leading-relaxed`}
                  rows={10}
                  placeholder={`Be as detailed as possible. Include:\n• What your attorney did or failed to do\n• Timeline of events\n• Any communications (verbal or written)\n• How it affected your case or legal matter\n• Any prior attempts to resolve the issue\n\nThe more detail you provide, the more precise and useful your ethics opinion will be.`}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>What Outcome Are You Seeking?</label>
                <select
                  className={inputClass}
                  value={form.desiredOutcome}
                  onChange={(e) => set("desiredOutcome", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="understand">I want to understand if a violation occurred</option>
                  <option value="grievance">I intend to file a formal grievance complaint</option>
                  <option value="malpractice">I am considering a malpractice lawsuit</option>
                  <option value="negotiate">I want leverage to negotiate with my attorney</option>
                  <option value="multiple">Multiple / not sure yet</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Have you already filed a formal grievance?</label>
                <div className="flex gap-4 mt-2">
                  {["no", "yes", "pending"].map((v) => (
                    <label key={v} className="flex items-center gap-2 font-serif text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="priorFiling"
                        value={v}
                        checked={form.priorFiling === v}
                        onChange={() => set("priorFiling", v)}
                        className="accent-[#8B0000]"
                      />
                      {v === "no" ? "No" : v === "yes" ? "Yes — already filed" : "Pending / In process"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-[#fdf8f0] border border-[#e8c07a] rounded-xl p-5">
                <div className="flex justify-between items-center font-sans text-sm mb-2">
                  <span className="text-gray-600">Professional Ethics Opinion</span>
                  <span className="font-bold">$250.00</span>
                </div>
                <div className="flex justify-between items-center font-sans text-sm mb-3">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-700 font-bold">Within 24 hours</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold font-sans">
                  <span>Total</span>
                  <span className="text-[#8B0000] text-lg">$250.00</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-sans text-center">
                  Secure payment via Stripe. Your opinion is delivered to {form.yourEmail || "your email"}.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-sans">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => { setError(""); setStep((s) => s - 1); }}
                className="text-sm text-gray-500 hover:text-gray-700 font-sans underline"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-3 px-8 rounded-lg font-sans transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#8B0000] hover:bg-[#a00000] disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg font-sans transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Redirecting to checkout…
                  </>
                ) : (
                  "Proceed to Payment — $250 →"
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-sans">
          By submitting, you agree that this is not attorney-client legal representation.
          Your submission is confidential and covered by our{" "}
          <a href="/privacy-policy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
