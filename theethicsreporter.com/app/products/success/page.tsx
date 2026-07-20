import Link from "next/link";
import { SITE_NAME } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Purchase Complete | ${SITE_NAME}`,
  description: "Your legal complaint template is ready to download.",
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; product_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const productId = searchParams.product_id;

  if (!sessionId || !productId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold font-sans mb-4">Invalid Link</h1>
        <p className="text-gray-600 font-serif mb-6">
          This download link is invalid or has expired.
        </p>
        <Link href="/products" className="text-[#8B0000] font-semibold font-sans hover:underline">
          Return to Products
        </Link>
      </div>
    );
  }

  const downloadUrl = `/api/download?session_id=${sessionId}&product_id=${productId}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold font-sans mb-3">Payment Successful!</h1>
      <p className="text-gray-600 font-serif text-lg mb-8">
        Your legal complaint template is ready. Click the button below to download your file.
      </p>

      <a
        href={downloadUrl}
        className="inline-flex items-center gap-2 bg-[#8B0000] hover:bg-[#6b0000] text-white font-semibold px-8 py-3 rounded-lg transition-colors font-sans text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        Download Your Template
      </a>

      <p className="text-sm text-gray-400 font-sans mt-6">
        Save this page URL — your download link is tied to your payment session.
      </p>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link href="/products" className="text-[#8B0000] font-semibold font-sans hover:underline text-sm">
          ← Browse More Templates
        </Link>
      </div>
    </div>
  );
}
