import { SITE_NAME } from "@/lib/data";
import type { Metadata } from "next";
import TipForm from "@/components/TipForm";

export const metadata: Metadata = {
  title: `Submit a Tip | ${SITE_NAME}`,
  description:
    "Have you witnessed an ethics violation? Submit a confidential tip to The Ethics Reporter.",
};

export default function TipPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4 font-sans text-center">
        Got A Tip?
      </h1>
      <p className="text-gray-600 font-serif text-center mb-10 leading-relaxed">
        Have you seen an ethics violation and want us to write about it? Submit
        your tip below. You can remain anonymous — we never reveal our sources.
      </p>
      <TipForm />
    </div>
  );
}
