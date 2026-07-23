import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { merch, merchImage } from "@/lib/merch";
import { FOUNDERS, founderBySlug, founderMatchesAttribution } from "@/lib/merch-seo";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return [] as { founder: string }[];
}

export async function generateMetadata({ params }: { params: { founder: string } }): Promise<Metadata> {
  const f = founderBySlug(params.founder);
  if (!f) return { title: "Not Found" };
  const title = `${f.name} Quote Apparel — ${f.keyword} on Shirts & More | Take America Back`;
  const desc = `${f.name} (${f.years}) quotes on premium apparel. ${f.bio} Shop shirts, hoodies, and more from The Ethics Reporter. US shipping.`;
  return {
    title, description: desc,
    keywords: [f.keyword, `${f.name} shirt`, `${f.name} apparel`, "founding father quotes", "patriot merch"],
    alternates: { canonical: `https://www.theethicsreporter.com/shop/quotes/${f.slug}` },
  };
}

export default function FounderPage({ params }: { params: { founder: string } }) {
  const f = founderBySlug(params.founder);
  if (!f) notFound();
  const items = merch.filter((p) => founderMatchesAttribution(f.name, p.attribution));

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      <header style={{ background: "linear-gradient(135deg,#0a1628,#1a3a5c,#0a1628)", padding: "60px 20px 40px", textAlign: "center", borderBottom: "3px solid #c41e3a" }}>
        <p style={{ color: "#c41e3a", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px", fontSize: "0.85rem" }}>
          <Link href="/shop" style={{ color: "#c41e3a", textDecoration: "none" }}>Take America Back</Link> · Founders
        </p>
        <h1 style={{ fontSize: "clamp(1.9rem,4vw,3rem)", margin: 0, fontWeight: 900 }}>{f.name}</h1>
        <p style={{ color: "#6b8cae", margin: "6px 0 0", fontSize: "0.95rem" }}>{f.years}</p>
        <p style={{ color: "#a0b4c8", maxWidth: "660px", margin: "18px auto 0", lineHeight: 1.7 }}>{f.bio}</p>
      </header>
      {items.length > 0 ? (
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "28px", padding: "40px 20px 60px", maxWidth: "1400px", margin: "0 auto" }}>
          {items.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} style={{ textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "12px", overflow: "hidden", border: "1px solid #1a3a5c" }}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={merchImage(p)} alt={`${p.name} — ${f.name}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "18px" }}>
                <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 700 }}>{p.name}</h2>
                <p style={{ color: "#c41e3a", fontStyle: "italic", fontSize: "0.85rem", margin: "0 0 10px" }}>&ldquo;{p.quote.length > 60 ? p.quote.slice(0, 60) + "…" : p.quote}&rdquo;</p>
                <span style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 900 }}>${p.price}</span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <p style={{ textAlign: "center", color: "#a0b4c8", padding: "60px 20px" }}>New {f.name} designs coming soon. <Link href="/shop" style={{ color: "#c41e3a" }}>Browse the full store →</Link></p>
      )}
      <nav style={{ padding: "0 20px 50px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#6b8cae", fontSize: "0.85rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>More Founders</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {FOUNDERS.filter((x) => x.slug !== f.slug).map((x) => (
            <Link key={x.slug} href={`/shop/quotes/${x.slug}`} style={{ padding: "8px 16px", border: "1px solid #1a3a5c", borderRadius: "18px", color: "#a0b4c8", textDecoration: "none", fontSize: "0.8rem" }}>{x.name}</Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
