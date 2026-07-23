import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMerchById, merchImage, getMerchByTheme, categoryLabel } from "@/lib/merch";
import { stateBySlug, US_STATES } from "@/lib/merch-seo";
import StateBuyClient from "./StateBuyClient";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  // ISR only — never pre-build the full 33 x 50 matrix at build time.
  return [] as { id: string; state: string }[];
}

export async function generateMetadata({ params }: { params: { id: string; state: string } }): Promise<Metadata> {
  const p = getMerchById(params.id);
  const st = stateBySlug(params.state);
  if (!p || !st) return { title: "Not Found" };
  const title = `${p.name} in ${st.name} — Patriot ${categoryLabel(p.category)} | Take America Back`;
  const desc = `Order the ${p.name} ${categoryLabel(p.category).toLowerCase()} in ${st.name}. "${p.quote}" — ${p.attribution}. Fast US shipping to ${st.name} (${st.abbr}). $${p.price}. Every purchase funds independent journalism.`;
  return {
    title, description: desc,
    keywords: [`${p.name} ${st.name}`, `patriot ${categoryLabel(p.category).toLowerCase()} ${st.name}`, `${p.attribution} shirt ${st.abbr}`, "founding father apparel"],
    alternates: { canonical: `https://www.theethicsreporter.com/shop/${p.id}/${st.slug}` },
  };
}

export default function StateProductPage({ params }: { params: { id: string; state: string } }) {
  const product = getMerchById(params.id);
  const st = stateBySlug(params.state);
  if (!product || !st) notFound();

  const related = getMerchByTheme(product.theme).filter((x) => x.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: `${product.name} — ${st.name}`,
    description: product.description,
    image: `https://www.theethicsreporter.com${merchImage(product)}`,
    brand: { "@type": "Brand", name: "The Ethics Reporter" },
    offers: {
      "@type": "Offer", price: product.price.toFixed(2), priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      areaServed: st.name,
      url: `https://www.theethicsreporter.com/shop/${product.id}/${st.slug}`,
    },
  };

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={{ padding: "18px 20px", backgroundColor: "#0f1d32", borderBottom: "1px solid #1a3a5c" }}>
        <Link href={`/shop/${product.id}`} style={{ color: "#c41e3a", textDecoration: "none", fontWeight: 700 }}>← {product.name}</Link>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
        <div style={{ aspectRatio: "1", backgroundColor: "#1a3a5c", borderRadius: "12px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={merchImage(product)} alt={`${product.name} shipped to ${st.name}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <p style={{ color: "#c41e3a", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px" }}>{categoryLabel(product.category)} · Ships to {st.name}</p>
          <h1 style={{ fontSize: "2rem", margin: "0 0 16px", fontWeight: 900 }}>{product.name} in {st.name}</h1>
          <div style={{ borderLeft: "3px solid #c41e3a", paddingLeft: "18px", margin: "16px 0", fontStyle: "italic" }}>
            <p style={{ color: "#e0e6ed", fontSize: "1.1rem", lineHeight: 1.6, margin: 0 }}>&ldquo;{product.quote}&rdquo;</p>
            <p style={{ color: "#c41e3a", margin: "8px 0 0", fontSize: "0.9rem" }}>— {product.attribution}</p>
          </div>
          <p style={{ color: "#a0b4c8", lineHeight: 1.7, margin: "16px 0" }}>{product.description}</p>
          <p style={{ color: "#a0b4c8", lineHeight: 1.7, margin: "16px 0" }}>
            Proudly shipped to patriots across {st.name} ({st.abbr}) — from the biggest cities to the smallest towns.
            Flat $9.99 shipping, arriving in 3–5 business days. Every {st.name} order funds independent journalism at The Ethics Reporter.
          </p>
          <StateBuyClient productId={product.id} sizes={product.sizes} colors={product.colors} price={product.price} />
          <p style={{ color: "#6b8cae", fontSize: "0.85rem", marginTop: "14px" }}>Secure Stripe checkout · US shipping only · $9.99 per item</p>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px 20px 50px", borderTop: "1px solid #1a3a5c" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "18px" }}>More Patriot Gear for {st.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "18px" }}>
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}/${st.slug}`} style={{ textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "10px", overflow: "hidden", border: "1px solid #1a3a5c" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={merchImage(p)} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "12px" }}>
                  <p style={{ color: "#fff", fontWeight: 700, margin: "0 0 4px", fontSize: "0.9rem" }}>{p.name}</p>
                  <p style={{ color: "#c41e3a", margin: 0, fontWeight: 900 }}>${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav style={{ padding: "0 20px 50px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ color: "#6b8cae", fontSize: "0.8rem", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>{product.name} ships to every state</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {US_STATES.filter((x) => x.slug !== st.slug).slice(0, 12).map((x) => (
            <Link key={x.slug} href={`/shop/${product.id}/${x.slug}`} style={{ padding: "5px 12px", border: "1px solid #1a3a5c", borderRadius: "14px", color: "#6b8cae", textDecoration: "none", fontSize: "0.75rem" }}>{x.name}</Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
