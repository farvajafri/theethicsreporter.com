import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/data";

export const metadata: Metadata = {
  title: `Grievance Submitted — Thank You | ${SITE_NAME}`,
  description: "Your grievance has been submitted. Expect your ethics opinion within 24 hours.",
};

export default function GrievanceSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl mb-6">⚖️</div>

        <h1 className="text-3xl font-bold text-[#1a0000] font-sans mb-4">
          Grievance Received
        </h1>

        <p className="text-gray-600 font-serif text-lg leading-relaxed mb-6">
          Your submission has been received and payment confirmed. Your ethics opinion —
          citing the applicable Rules of Professional Conduct and relevant caselaw — will
          be delivered to your email address within{" "}
          <strong className="text-[#8B0000]">24 hours</strong>.
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[#8B0000] mt-0.5">✓</span>
            <p className="font-serif text-sm text-gray-700">
              <strong className="font-sans">Payment confirmed.</strong> You will receive a receipt from Stripe.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#8B0000] mt-0.5">✓</span>
            <p className="font-serif text-sm text-gray-700">
              <strong className="font-sans">Attorney review begins immediately.</strong> Your case has been
              assigned to an attorney reviewer.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#8B0000] mt-0.5">✓</span>
            <p className="font-serif text-sm text-gray-700">
              <strong className="font-sans">Opinion delivered within 24 hours.</strong> Check your email —
              including spam/junk — for your opinion from The Ethics Reporter.
            </p>
          </div>
        </div>

        {searchParams.session_id && (
          <p className="text-xs text-gray-400 font-sans mb-6">
            Reference ID: {searchParams.session_id}
          </p>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600 font-serif">
            Questions? Email us at{" "}
            <a
              href="mailto:opinions@theethicsreporter.com"
              className="text-[#8B0000] underline"
            >
              opinions@theethicsreporter.com
            </a>
          </p>
          <Link
            href="/"
            className="inline-block text-sm text-[#8B0000] underline font-sans"
          >
            Return to The Ethics Reporter
          </Link>
        </div>
      </div>
    </div>
  );
}
