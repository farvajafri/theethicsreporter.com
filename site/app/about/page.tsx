import { getPageBySlug, SITE_NAME } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: "About The Ethics Reporter — independent legal ethics journalism.",
};

export default function AboutPage() {
  const page = getPageBySlug("about");
  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 font-sans">{page.title}</h1>
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
