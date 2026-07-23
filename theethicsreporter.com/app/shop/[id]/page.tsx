import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMerchById, merchImage, getMerchByTheme, categoryLabel } from "@/lib/merch";
import ShopProductClient from "./ShopProductClient";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  // ISR: don't pre-build all product pages at build time.
  return [] as { id: string }[];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = getMerchById(params.id);
  if (!p) return { title: "Product Not Found | The Ethics Reporter" };
  const title = `${p.name} — ${categoryLabel(p.category)} | Take America Back`;
  const desc = `${p.description} "${p.quote}" — ${p.attribution}. $${p.price}, US shipping. Every purchase funds independent journalism.`;
  return {
    title,
    description: desc,
    keywords: [p.name, p.attribution, p.theme, categoryLabel(p.category), "patriot merch", "founding father apparel"],
    openGraph: { title, description: desc, type: "website", images: [merchImage(p)] },
    alternates: { canonical: `https://www.theethicsreporter.com/shop/${p.id}` },
  };
}

export default function ShopProductPage({ params }: { params: { id: string } }) {
  const product = getMerchById(params.id);
  if (!product) notFound();

  const related = getMerchByTheme(product.theme).filter((p) => p.id !== product.id).slice(0, 4);

  // Product structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://www.theethicsreporter.com${merchImage(product)}`,
    brand: { "@type": "Brand", name: "The Ethics Reporter" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://www.theethicsreporter.com/shop/${product.id}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ShopProductClient product={product} related={related} relatedImages={related.map(merchImage)} productImage={merchImage(product)} />
    </>
  );
}
