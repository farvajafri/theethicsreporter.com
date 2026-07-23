import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { merchImage, merchCategories, getMerchByCategory } from "@/lib/merch";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return [] as { slug: string }[];
}

function catBySlug(slug: string) {
  return merchCategories.find((c) => c.slug === slug && c.id !== "all");
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = catBySlug(params.slug);
  if (!cat) return { title: "Not Found" };
  const title = `Patriot ${cat.name} — Founding Father ${cat.name} | Take America Back`;
  const desc = `Shop premium patriotic ${cat.name.toLowerCase()} featuring Founding Father quotes on freedom, liberty, and revolution. Vintage designs from The Ethics Reporter. US shipping. Every purchase funds independent journalism.`;
  return {
    title, description: desc,
    keywords: [`patriot ${cat.name.toLowerCase()}`, `founding father ${cat.name.toLowerCase()}`, `conservative ${cat.name.toLowerCase()}`, "liberty", "1776"],
    alternates: { canonical: `https://www.theethicsreporter.com/shop/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = catBySlug(params.slug);
  if (!cat) notFound();
  const items = getMerchByCategory(cat.id);

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh", color: "#fff" }}>
      <header style={{ background: "linear-gradient(135deg,#0a1628,#1a3a5c,#0a1628)", padding: "60px 20px 40px", textAlign: "center", borderBottom: "3px solid #c41e3a" }}>
        <p style={{ color: "#c41e3a", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px", fontSize: "0.85rem" }}>
          <Link href="/shop" style={{ color: "#c41e3a", textDecoration: "none" }}>Take America Back</Link>
        </p>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", margin: 0, fontWeight: 900, textTransform: "uppercase" }}>Patriot {cat.name}</h1>
        <p style={{ color: "#a0b4c8", maxWidth: "620px", margin: "18px auto 0", lineHeight: 1.6 }}>
          Founding Father quotes on premium {cat.name.toLowerCase()}. Freedom, liberty, and the spirit of 1776 — built to last, made to mean something.
        </p>
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
              <p style={{ color: "#c41e3a", fontStyle: "italic", fontSize: "0.85rem", margin: "0 0 10px" }}>— {p.attribution}</p>
              <span style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 900 }}>${p.price}</span>
            </div>
          </Link>
        ))}
      </section>
      <nav style={{ padding: "0 20px 50px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ color: "#6b8cae", fontSize: "0.85rem", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Browse other categories</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {merchCategories.filter((c) => c.id !== "all" && c.id !== cat.id).map((c) => (
            <Link key={c.id} href={`/shop/category/${c.slug}`} style={{ padding: "7px 16px", border: "1px solid #1a3a5c", borderRadius: "18px", color: "#a0b4c8", textDecoration: "none", fontSize: "0.8rem" }}>{c.name}</Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
