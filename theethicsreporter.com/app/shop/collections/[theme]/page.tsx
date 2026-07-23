import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { merchImage, merchThemes, getMerchByTheme } from "@/lib/merch";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return [] as { theme: string }[];
}

function themeById(id: string) {
  return merchThemes.find((t) => t.id === id);
}

export async function generateMetadata({ params }: { params: { theme: string } }): Promise<Metadata> {
  const t = themeById(params.theme);
  if (!t) return { title: "Not Found" };
  const title = `${t.name} Collection — ${t.tagline} | Take America Back`;
  const desc = `The ${t.name} collection: Founding Father quotes on ${t.tagline.toLowerCase()}. Premium patriotic apparel and accessories from The Ethics Reporter. US shipping.`;
  return {
    title, description: desc,
    keywords: [`${t.name.toLowerCase()} apparel`, `${t.name.toLowerCase()} shirts`, "founding father quotes", "patriot merch", "1776"],
    alternates: { canonical: `https://www.theethicsreporter.com/shop/collections/${t.id}` },
  };
}

export default function ThemePage({ params }: { params: { theme: string } }) {
  const t = themeById(params.theme);
  if (!t) notFound();
  const items = getMerchByTheme(t.id);

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      <header style={{ background: "linear-gradient(135deg,#0a1628,#1a3a5c,#0a1628)", padding: "60px 20px 40px", textAlign: "center", borderBottom: "3px solid #c41e3a" }}>
        <p style={{ color: "#c41e3a", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px", fontSize: "0.85rem" }}>
          <Link href="/shop" style={{ color: "#c41e3a", textDecoration: "none" }}>Take America Back</Link> · Collection
        </p>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", margin: 0, fontWeight: 900, textTransform: "uppercase" }}>{t.name}</h1>
        <p style={{ color: "#a0b4c8", maxWidth: "620px", margin: "18px auto 0", lineHeight: 1.6, fontStyle: "italic" }}>{t.tagline}</p>
      </header>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "28px", padding: "40px 20px 60px", maxWidth: "1400px", margin: "0 auto" }}>
        {items.map((p) => (
          <Link key={p.id} href={`/shop/${p.id}`} style={{ textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "12px", overflow: "hidden", border: "1px solid #1a3a5c" }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={merchImage(p)} alt={`${p.name} — ${p.attribution}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "18px" }}>
              <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 700 }}>{p.name}</h2>
              <p style={{ color: "#c41e3a", fontStyle: "italic", fontSize: "0.85rem", margin: "0 0 10px" }}>&ldquo;{p.quote.length > 50 ? p.quote.slice(0, 50) + "…" : p.quote}&rdquo;</p>
              <span style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 900 }}>${p.price}</span>
            </div>
          </Link>
        ))}
      </section>
      <nav style={{ padding: "0 20px 50px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {merchThemes.filter((x) => x.id !== t.id).map((x) => (
            <Link key={x.id} href={`/shop/collections/${x.id}`} style={{ padding: "8px 18px", border: "2px solid #c41e3a", borderRadius: "20px", color: "#c41e3a", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>{x.name}</Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
