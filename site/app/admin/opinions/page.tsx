"use client";

import { useState, useEffect, useCallback } from "react";

interface Grievance {
  sessionId: string;
  created: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  attorneyName: string;
  attorneyState: string;
  attorneyBarNumber: string;
  rulesAlleged: string;
  incidentDate: string;
  desiredOutcome: string;
  priorFiling: string;
  descriptionPreview: string;
  amountPaid: string;
  paymentStatus: string;
}

const RULE_LABELS: Record<string, string> = {
  rule_1_1: "Rule 1.1 — Competence",
  rule_1_3: "Rule 1.3 — Diligence",
  rule_1_4: "Rule 1.4 — Communication",
  rule_1_5: "Rule 1.5 — Fees",
  rule_1_6: "Rule 1.6 — Confidentiality",
  rule_1_7: "Rule 1.7 — Conflicts of Interest",
  rule_1_8: "Rule 1.8 — Conflicts of Interest (prohibited)",
  rule_1_9: "Rule 1.9 — Former Clients",
  rule_1_15: "Rule 1.15 — Safekeeping Property",
  rule_1_16: "Rule 1.16 — Terminating Representation",
  rule_3_1: "Rule 3.1 — Meritorious Claims",
  rule_3_3: "Rule 3.3 — Candor to Tribunal",
  rule_3_4: "Rule 3.4 — Fairness to Opposing Party",
  rule_4_1: "Rule 4.1 — Truthfulness",
  rule_8_4: "Rule 8.4 — Misconduct",
  rule_8_5: "Rule 8.5 — Disciplinary Authority",
  unsure: "Not sure (reviewers to identify)",
  multiple: "Multiple rules",
};

export default function AdminOpinionsPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Grievance | null>(null);
  const [opinion, setOpinion] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [delivering, setDelivering] = useState(false);
  const [deliverResult, setDeliverResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const fetchGrievances = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin-grievances?password=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (res.ok) {
        setGrievances(data.grievances || []);
      } else {
        setAuthError(data.error || "Auth failed");
        setAuthed(false);
      }
    } catch {
      setAuthError("Network error.");
    }
    setLoading(false);
  }, [password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    await fetchGrievances();
    setAuthed(true);
  };

  useEffect(() => {
    if (authed) {
      // Auto-refresh every 60s
      const interval = setInterval(fetchGrievances, 60000);
      return () => clearInterval(interval);
    }
  }, [authed, fetchGrievances]);

  const handleDeliver = async () => {
    if (!selected) return;
    if (!opinion.trim()) { alert("Please write an opinion before delivering."); return; }
    if (!reviewerName.trim()) { alert("Please enter the reviewing attorney's name."); return; }

    setDelivering(true);
    setDeliverResult(null);
    try {
      const res = await fetch("/api/grievance-deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selected.sessionId,
          opinionText: opinion,
          reviewerName,
          password,
        }),
      });
      const data = await res.json();
      setDeliverResult(data);
      if (data.success) {
        setOpinion("");
        setSelected(null);
        fetchGrievances();
      }
    } catch {
      setDeliverResult({ error: "Network error." });
    }
    setDelivering(false);
  };

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#1a0000] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8B0000] mb-1 font-sans">
              The Ethics Reporter
            </p>
            <h1 className="text-2xl font-bold text-[#1a0000] font-sans">Attorney Admin</h1>
            <p className="text-sm text-gray-500 font-serif mt-1">Grievance Review Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {authError && (
              <p className="text-red-600 text-sm font-sans">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-3 rounded-lg font-sans transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── OPINION DELIVERY PANEL ──
  if (selected) {
    return (
      <div className="min-h-screen bg-[#fdf8f0] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => { setSelected(null); setDeliverResult(null); setOpinion(""); }}
            className="text-sm text-[#8B0000] underline font-sans mb-6 block"
          >
            ← Back to Dashboard
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Grievance details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1a0000] font-sans mb-4">Grievance Details</h2>
              <dl className="space-y-3 text-sm">
                {[
                  ["Submitter", selected.yourName],
                  ["Email", selected.yourEmail],
                  ["Phone", selected.yourPhone || "—"],
                  ["Attorney", selected.attorneyName],
                  ["State", selected.attorneyState],
                  ["Bar #", selected.attorneyBarNumber || "—"],
                  ["Rule(s)", RULE_LABELS[selected.rulesAlleged] || selected.rulesAlleged],
                  ["Incident Date", selected.incidentDate || "—"],
                  ["Prior Filing", selected.priorFiling],
                  ["Submitted", selected.created],
                  ["Amount Paid", selected.amountPaid],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <dt className="font-bold font-sans text-gray-500 w-28 flex-shrink-0">{label}:</dt>
                    <dd className="font-serif text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-bold font-sans text-gray-500 text-sm mb-2">Description:</p>
                <div className="bg-[#fdf8f0] rounded-lg p-4 text-sm font-serif leading-relaxed text-gray-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {selected.descriptionPreview}
                  {selected.descriptionPreview.length >= 490 && (
                    <em className="text-gray-400"> [truncated — see full email]</em>
                  )}
                </div>
              </div>
            </div>

            {/* Opinion writer */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1a0000] font-sans mb-4">Write Ethics Opinion</h2>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 font-sans mb-1">
                  Reviewing Attorney Name *
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe, Esq."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 font-sans mb-1">
                  Opinion Text *{" "}
                  <span className="font-normal text-gray-400">
                    (cite rules + caselaw; will be formatted in delivery email)
                  </span>
                </label>
                <textarea
                  rows={18}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-serif leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  placeholder={`ETHICS OPINION\n\nRE: Alleged Violation of Rule X.X — [Rule Name]\nJurisdiction: [State]\n\nI. SUMMARY OF FACTS\n\n[Summarize what the client described]\n\nII. APPLICABLE RULES\n\nRule X.X states: "..."\n\nIII. CASELAW ANALYSIS\n\nIn [Case Name], [court] held that...\n\nIV. ANALYSIS\n\n[Apply the rule to the facts]\n\nV. CONCLUSION\n\nBased on the foregoing, it is our opinion that [the conduct described LIKELY/DOES NOT LIKELY constitute a violation of Rule X.X because...]\n\nVI. RECOMMENDED NEXT STEPS\n\n1. ...\n2. ...`}
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                />
              </div>

              {deliverResult && (
                <div
                  className={`rounded-lg p-3 text-sm mb-4 ${
                    deliverResult.success
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {deliverResult.success
                    ? `✓ Opinion delivered to ${selected.yourEmail}`
                    : `✗ Error: ${deliverResult.error}`}
                </div>
              )}

              <button
                onClick={handleDeliver}
                disabled={delivering}
                className="w-full bg-[#8B0000] hover:bg-[#a00000] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg font-sans transition-colors"
              >
                {delivering ? "Delivering…" : `📧 Deliver Opinion to ${selected.yourEmail}`}
              </button>

              <p className="text-xs text-gray-400 font-sans text-center mt-2">
                This will email the formatted opinion to the client. Irreversible.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#fdf8f0] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a0000] font-sans">Grievance Review Dashboard</h1>
            <p className="text-sm text-gray-500 font-serif">The Ethics Reporter · Attorney Admin</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={fetchGrievances}
              disabled={loading}
              className="text-sm bg-white border border-gray-300 hover:border-[#8B0000] text-gray-700 font-sans px-4 py-2 rounded-lg transition-colors"
            >
              {loading ? "Refreshing…" : "↻ Refresh"}
            </button>
            <span className="text-sm text-gray-400 font-sans">
              {grievances.length} submission{grievances.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading && grievances.length === 0 ? (
          <div className="text-center text-gray-400 font-serif py-20">Loading submissions…</div>
        ) : grievances.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 font-serif">No grievance submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grievances.map((g) => (
              <div
                key={g.sessionId}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-[#8B0000] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-bold text-[#1a0000] font-sans">
                        {g.yourName}
                      </span>
                      <span className="text-gray-400 font-sans text-sm">→</span>
                      <span className="font-bold text-[#8B0000] font-sans">
                        {g.attorneyName}
                      </span>
                      <span className="bg-[#fdf8f0] border border-[#e8c07a] text-[#8B0000] text-xs px-2 py-0.5 rounded font-sans font-bold">
                        {g.attorneyState}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-sans font-bold ${
                          g.paymentStatus === "complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {g.paymentStatus === "complete" ? "✓ PAID" : g.paymentStatus.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 font-sans mb-2">
                      <strong>Rule:</strong> {RULE_LABELS[g.rulesAlleged] || g.rulesAlleged} ·{" "}
                      <strong>Submitted:</strong> {g.created} ·{" "}
                      <strong>Email:</strong> {g.yourEmail}
                    </p>

                    <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-2">
                      {g.descriptionPreview}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => { setSelected(g); setDeliverResult(null); }}
                      className="bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-2 px-5 rounded-lg font-sans text-sm transition-colors whitespace-nowrap"
                    >
                      Write Opinion →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
