import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { merch, merchImage } from "@/lib/merch";
import { GIFT_OCCASIONS, giftBySlug } from "@/lib/merch-seo";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return [] as { occasion: string }[];
}

export async function generateMetadata({ params }: { params: { occasion: string } }): Promise<Metadata> {
  const g = giftBySlug(params.occasion);
  if (!g) return { title: "Not Found" };
  const title = `${g.name} Gifts — Patriot Gift Guide | Take America Back`;
  const desc = `${g.blurb} Founding Father quote apparel and accessories from The Ethics Reporter. US shipping. Every purchase funds independent journalism.`;
  return {
    title, description: desc,
    keywords: [`${g.name.toLowerCase()} gifts`, "patriot gifts", "conservative gifts", "founding father gifts", "1776 gifts"],
    alternates: { canonical: `https://www.theethicsreporter.com/shop/gifts/${g.slug}` },
  };
}

export default function GiftPage({ params }: { params: { occasion: string } }) {
  const g = giftBySlug(params.occasion);
  if (!g) notFound();
  // Curate a spread across categories/price points for gift guides.
  const items = merch.slice().sort((a, b) => a.price - b.price);

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      <header style={{ background: "linear-gradient(135deg,#0a1628,#1a3a5c,#0a1628)", padding: "60px 20px 40px", textAlign: "center", borderBottom: "3px solid #c41e3a" }}>
        <p style={{ color: "#c41e3a", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px", fontSize: "0.85rem" }}>
          <Link href="/shop" style={{ color: "#c41e3a", textDecoration: "none" }}>Take America Back</Link> · Gift Guide
        </p>
        <h1 style={{ fontSize: "clamp(1.9rem,4vw,3rem)", margin: 0, fontWeight: 900, textTransform: "uppercase" }}>{g.name} Gifts</h1>
        <p style={{ color: "#a0b4c8", maxWidth: "640px", margin: "18px auto 0", lineHeight: 1.7 }}>{g.blurb}</p>
      </header>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "28px", padding: "40px 20px 60px", maxWidth: "1400px", margin: "0 auto" }}>
        {items.map((p) => (
          <Link key={p.id} href={`/shop/${p.id}`} style={{ textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "12px", overflow: "hidden", border: "1px solid #1a3a5c" }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={merchImage(p)} alt={`${p.name} — ${g.name} gift`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "18px" }}>
              <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "1.1rem", fontWeight: 700 }}>{p.name}</h2>
              <span style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 900 }}>${p.price}</span>
            </div>
          </Link>
        ))}
      </section>
      <nav style={{ padding: "0 20px 50px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#6b8cae", fontSize: "0.85rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>More Gift Guides</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {GIFT_OCCASIONS.filter((x) => x.slug !== g.slug).map((x) => (
            <Link key={x.slug} href={`/shop/gifts/${x.slug}`} style={{ padding: "8px 16px", border: "1px solid #1a3a5c", borderRadius: "18px", color: "#a0b4c8", textDecoration: "none", fontSize: "0.8rem" }}>{x.name}</Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
