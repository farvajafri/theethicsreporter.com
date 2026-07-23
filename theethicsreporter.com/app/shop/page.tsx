import type { Metadata } from "next";
import Link from "next/link";
import { merch, merchImage, merchCategories, merchThemes, categoryLabel } from "@/lib/merch";

export const metadata: Metadata = {
  title: "Take America Back — Patriot Merch | The Ethics Reporter",
  description:
    "Premium patriotic apparel and accessories from The Ethics Reporter. Founding Father quotes on freedom, liberty, and revolution — vintage tees, hoodies, hats, and more. Every purchase funds independent journalism.",
  keywords: [
    "patriot merch", "founding father shirts", "liberty t-shirt", "don't tread on me",
    "conservative apparel", "1776 merch", "we the people shirt", "give me liberty",
    "gadsden flag", "constitution apparel", "take america back",
  ],
  openGraph: {
    title: "Take America Back — Patriot Merch",
    description: "Founding Father quotes on premium apparel. Freedom, liberty, revolution.",
    type: "website",
  },
  alternates: { canonical: "https://www.theethicsreporter.com/shop" },
};

export default function ShopPage() {
  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      {/* Hero */}
      <header
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #0a1628 100%)",
          padding: "70px 20px 45px",
          textAlign: "center",
          borderBottom: "3px solid #c41e3a",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
            margin: 0,
            fontWeight: 900,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Take America Back
        </h1>
        <p style={{ color: "#c41e3a", fontSize: "1.05rem", margin: "12px 0 0", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" }}>
          The Ethics Reporter Store
        </p>
        <p style={{ color: "#a0b4c8", fontSize: "1.05rem", maxWidth: "640px", margin: "22px auto 0", lineHeight: 1.6 }}>
          Wear the words of Washington, Jefferson, Franklin, Adams, and Henry. Not slogans —
          the founding wisdom that built this nation and the freedoms we&apos;re fighting to keep.
          Every purchase funds independent journalism.
        </p>
      </header>

      {/* Theme collections */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 10px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Shop by Cause
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {merchThemes.map((t) => (
            <Link
              key={t.id}
              href={`/shop/collections/${t.id}`}
              style={{
                flex: "1 1 200px", textDecoration: "none", backgroundColor: "#0f1d32",
                border: "1px solid #1a3a5c", borderRadius: "10px", padding: "18px 20px",
              }}
            >
              <p style={{ color: "#fff", fontWeight: 800, margin: "0 0 4px", fontSize: "1.1rem", textTransform: "uppercase" }}>{t.name}</p>
              <p style={{ color: "#6b8cae", margin: 0, fontSize: "0.85rem" }}>{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Category nav */}
      <nav style={{ display: "flex", gap: "10px", padding: "24px 20px", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
        {merchCategories.filter((c) => c.id !== "all").map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/category/${cat.slug}`}
            style={{
              padding: "8px 18px", borderRadius: "20px", border: "2px solid #c41e3a",
              color: "#c41e3a", textDecoration: "none", fontWeight: 700,
              textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px",
            }}
          >
            {cat.name}
          </Link>
        ))}
      </nav>

      {/* All products grid */}
      <section
        style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "28px", padding: "20px 20px 60px", maxWidth: "1400px", margin: "0 auto",
        }}
      >
        {merch.map((p) => (
          <Link
            key={p.id}
            href={`/shop/${p.id}`}
            style={{
              textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "12px",
              overflow: "hidden", border: "1px solid #1a3a5c",
            }}
          >
            <div style={{ aspectRatio: "4/3", background: "#1a3a5c", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={merchImage(p)} alt={`${p.name} — ${p.attribution}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "18px" }}>
              <h3 style={{ color: "#fff", margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 700 }}>{p.name}</h3>
              <p style={{ color: "#c41e3a", fontStyle: "italic", fontSize: "0.85rem", margin: "0 0 12px", lineHeight: 1.4 }}>
                &ldquo;{p.quote.length > 55 ? p.quote.slice(0, 55) + "…" : p.quote}&rdquo;
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 900 }}>${p.price}</span>
                <span style={{ color: "#6b8cae", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                  {categoryLabel(p.category)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Trust / donation footer */}
      <footer style={{ backgroundColor: "#0f1d32", borderTop: "2px solid #c41e3a", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "#fff", margin: "0 0 8px", fontWeight: 700 }}>US Shipping · $9.99 per item · Ships in 3–5 business days</p>
        <p style={{ color: "#6b8cae", margin: 0, fontSize: "0.9rem" }}>
          The Ethics Reporter has no advertisers and no corporate money. Every order funds independent journalism.
        </p>
      </footer>
    </div>
  );
}
