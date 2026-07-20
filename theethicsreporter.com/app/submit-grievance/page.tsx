import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/data";

export const metadata: Metadata = {
  title: `Submit a Grievance — Get an Ethics Opinion | ${SITE_NAME}`,
  description:
    "Did your attorney cross a line? Get a caselaw-cited professional ethics opinion in 24 hours — reviewed by practicing attorneys. Flat fee $250.",
};

const steps = [
  {
    num: "01",
    title: "Describe What Happened",
    body: "Tell us what your attorney did (or didn't do). We accept complaints about any licensed attorney in any state.",
  },
  {
    num: "02",
    title: "Pay the Flat Fee",
    body: "$250 securely via Stripe. No hidden charges, no hourly billing, no surprises.",
  },
  {
    num: "03",
    title: "Attorneys Review Your Case",
    body: "Our licensed attorney reviewers analyze your submission against the applicable Rules of Professional Conduct and relevant case law.",
  },
  {
    num: "04",
    title: "Receive Your Opinion in 24 Hours",
    body: "You get a written opinion — citing specific rules and caselaw — stating whether a violation likely occurred, and what your options are.",
  },
];

const faqs = [
  {
    q: "What exactly do I receive?",
    a: "A written professional ethics opinion that identifies the applicable Rule(s) of Professional Conduct, cites relevant caselaw and ethics committee opinions, and states whether the conduct described likely constitutes a violation. The opinion also outlines your options for next steps.",
  },
  {
    q: "Is this legal advice?",
    a: "Our ethics opinions are analytical opinions — not attorney-client legal advice and not a legal representation. They are meant to help you understand your situation and make informed decisions. If you need formal legal representation, we can refer you.",
  },
  {
    q: "Who writes the opinions?",
    a: "Every opinion is reviewed and signed off by a practicing attorney before it is delivered. We do not send AI-generated opinions without attorney review.",
  },
  {
    q: "What if my situation involves multiple states?",
    a: "Note the relevant state(s) in your submission. Our reviewers will apply the rules for the jurisdiction where the attorney is licensed.",
  },
  {
    q: "What if a violation did occur — what happens next?",
    a: "Your opinion will outline available remedies, including filing a formal grievance with the applicable disciplinary authority, civil malpractice claims, or other avenues. We can also connect you with licensed attorneys who handle these matters.",
  },
  {
    q: "Do you offer refunds?",
    a: "If we are unable to deliver an opinion within 24 hours for any reason, we will issue a full refund. We do not offer refunds after an opinion has been delivered.",
  },
  {
    q: "Is my submission confidential?",
    a: "Yes. Your submission and the resulting opinion are strictly confidential. We do not publish identifying details about grievance submissions without your explicit written consent.",
  },
];

const rules = [
  "Rule 1.1 — Competence",
  "Rule 1.3 — Diligence",
  "Rule 1.4 — Communication",
  "Rule 1.5 — Fees",
  "Rule 1.6 — Confidentiality",
  "Rule 1.7 — Conflicts of Interest",
  "Rule 1.15 — Safekeeping Client Funds/Property",
  "Rule 1.16 — Terminating Representation",
  "Rule 3.3 — Candor to Tribunal",
  "Rule 8.4 — Misconduct",
];

export default function SubmitGrievancePage() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="bg-[#1a0000] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e8c07a] mb-4 font-sans">
            Professional Ethics Opinions
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-sans leading-tight">
            Did Your Attorney Cross a Line?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-serif max-w-2xl mx-auto mb-8 leading-relaxed">
            Get a written ethics opinion — citing real caselaw — that tells you whether your
            attorney violated their professional rules. Reviewed by licensed attorneys. Delivered
            in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/submit-grievance/apply"
              className="inline-block bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-4 px-10 rounded-lg text-lg font-sans transition-colors"
            >
              Submit Your Grievance — $250
            </Link>
            <span className="text-gray-400 text-sm font-sans">24-hour turnaround · Flat fee · No surprises</span>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#8B0000] text-white py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-sans font-medium text-center">
          <span>⚖️ Caselaw-Cited Opinions</span>
          <span>👨‍⚖️ Attorney-Reviewed</span>
          <span>⏱ 24-Hour Delivery</span>
          <span>🔒 100% Confidential</span>
          <span>💳 Flat $250 Fee</span>
        </div>
      </div>

      {/* ── WHAT YOU GET ── */}
      <section className="py-16 px-4 bg-[#fdf8f0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 font-sans text-[#1a0000]">
            What You Get
          </h2>
          <p className="text-center text-gray-600 font-serif mb-10 max-w-2xl mx-auto">
            A rigorous written opinion that cuts through the confusion and gives you real answers.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "📋",
                title: "Rule Identification",
                desc: "Every applicable Rule of Professional Conduct is identified and quoted.",
              },
              {
                icon: "⚖️",
                title: "Caselaw Citations",
                desc: "Real cases from disciplinary proceedings and courts — not generic summaries.",
              },
              {
                icon: "✅",
                title: "Clear Violation Analysis",
                desc: "A direct statement of whether the conduct likely constitutes a violation.",
              },
              {
                icon: "🗺️",
                title: "Your Options",
                desc: "What you can do next — grievance filing, civil remedies, or referrals.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4 items-start shadow-sm"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1a0000] font-sans mb-1">{item.title}</h3>
                  <p className="text-gray-600 font-serif text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 font-sans text-[#1a0000]">
            How It Works
          </h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-[#8B0000] text-white rounded-xl flex items-center justify-center font-bold text-lg font-sans">
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-lg text-[#1a0000] font-sans mb-1">{step.title}</h3>
                  <p className="text-gray-600 font-serif leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULES COVERED ── */}
      <section className="py-16 px-4 bg-[#fdf8f0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 font-sans text-[#1a0000]">
            Common Rules We Analyze
          </h2>
          <p className="text-center text-gray-600 font-serif mb-8 max-w-xl mx-auto">
            We cover all Rules of Professional Conduct. Here are the most frequently cited:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rules.map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
              >
                <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0" />
                <span className="font-serif text-[#1a0000] text-sm">{rule}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4 font-serif">
            Not sure which rule applies? Just describe what happened — our reviewers will identify the applicable rules.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 font-sans text-[#1a0000]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-[#1a0000] font-sans mb-2">{faq.q}</h3>
                <p className="text-gray-600 font-serif leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a0000] text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">
            Ready to Get Answers?
          </h2>
          <p className="text-gray-300 font-serif mb-8 leading-relaxed">
            You deserve to know whether your attorney broke the rules. Stop guessing.
            Get a real opinion from real attorneys — in 24 hours.
          </p>
          <Link
            href="/submit-grievance/apply"
            className="inline-block bg-[#8B0000] hover:bg-[#a00000] text-white font-bold py-4 px-10 rounded-lg text-lg font-sans transition-colors"
          >
            Submit Your Grievance — $250
          </Link>
          <p className="mt-4 text-gray-500 text-xs font-sans">
            Secure checkout via Stripe · Opinions delivered by email · 100% confidential
          </p>
        </div>
      </section>
    </div>
  );
}
