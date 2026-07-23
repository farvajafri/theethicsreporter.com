"use client";

import Link from "next/link";
import { useState } from "react";
import type { MerchProduct } from "@/lib/merch";
import { categoryLabel } from "@/lib/merch";

export default function ShopProductClient({
  product,
  related,
  relatedImages,
  productImage,
}: {
  product: MerchProduct;
  related: MerchProduct[];
  relatedImages: string[];
  productImage: string;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/merch-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size: selectedSize, color: selectedColor }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout failed: " + (data.error || "Unknown error"));
    } catch (e) {
      alert("Checkout error: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh" }}>
      <header style={{ padding: "20px", backgroundColor: "#0f1d32", borderBottom: "1px solid #1a3a5c" }}>
        <Link href="/shop" style={{ color: "#c41e3a", textDecoration: "none", fontWeight: 700, fontSize: "1.05rem" }}>
          ← Take America Back
        </Link>
      </header>

      <div
        style={{
          maxWidth: "1200px", margin: "0 auto", padding: "40px 20px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start",
        }}
      >
        <div style={{ aspectRatio: "1", backgroundColor: "#1a3a5c", borderRadius: "12px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={productImage} alt={`${product.name} — ${product.attribution}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div>
          <p style={{ color: "#c41e3a", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px" }}>
            {categoryLabel(product.category)}
          </p>
          <h1 style={{ color: "#fff", fontSize: "2.4rem", margin: "0 0 20px", fontWeight: 900 }}>{product.name}</h1>

          <div style={{ borderLeft: "3px solid #c41e3a", paddingLeft: "20px", margin: "20px 0", fontStyle: "italic" }}>
            <p style={{ color: "#e0e6ed", fontSize: "1.15rem", lineHeight: 1.6, margin: 0 }}>&ldquo;{product.quote}&rdquo;</p>
            <p style={{ color: "#c41e3a", margin: "10px 0 0", fontSize: "0.95rem" }}>— {product.attribution}</p>
          </div>

          <p style={{ color: "#a0b4c8", fontSize: "1rem", lineHeight: 1.7, margin: "20px 0" }}>{product.description}</p>
          <p style={{ color: "#6b8cae", fontSize: "0.8rem", margin: "10px 0 20px" }}>
            {product.blank} · {product.printMethod.toUpperCase()}
          </p>

          {product.sizes && (
            <div style={{ margin: "20px 0" }}>
              <p style={{ color: "#a0b4c8", margin: "0 0 10px", fontWeight: 600 }}>Size:</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{
                      minWidth: "50px", height: "50px", padding: "0 12px",
                      border: `2px solid ${selectedSize === s ? "#c41e3a" : "#1a3a5c"}`,
                      backgroundColor: selectedSize === s ? "#c41e3a" : "transparent",
                      color: "#fff", fontWeight: 700, cursor: "pointer", borderRadius: "8px",
                    }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div style={{ margin: "20px 0" }}>
              <p style={{ color: "#a0b4c8", margin: "0 0 10px", fontWeight: 600 }}>Color:</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    style={{
                      padding: "10px 18px",
                      border: `2px solid ${selectedColor === c ? "#c41e3a" : "#1a3a5c"}`,
                      backgroundColor: selectedColor === c ? "#c41e3a" : "transparent",
                      color: "#fff", fontWeight: 600, cursor: "pointer", borderRadius: "6px", fontSize: "0.9rem",
                    }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "30px", paddingTop: "30px", borderTop: "1px solid #1a3a5c", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#fff", fontSize: "2.4rem", fontWeight: 900 }}>${product.price}</span>
            <button onClick={handleBuy} disabled={loading}
              style={{
                padding: "18px 46px", backgroundColor: loading ? "#8a1a2e" : "#c41e3a",
                color: "#fff", border: "none", borderRadius: "8px", fontSize: "1.15rem",
                fontWeight: 900, cursor: loading ? "not-allowed" : "pointer",
                textTransform: "uppercase", letterSpacing: "2px",
              }}>
              {loading ? "Processing…" : `Buy Now`}
            </button>
          </div>
          <p style={{ color: "#6b8cae", fontSize: "0.85rem", marginTop: "15px" }}>
            Secure checkout via Stripe. US shipping only — $9.99 per item. Ships in 3–5 business days.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", borderTop: "1px solid #1a3a5c" }}>
          <h2 style={{ color: "#fff", marginBottom: "24px" }}>More {product.theme.charAt(0).toUpperCase() + product.theme.slice(1)} Gear</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {related.map((p, i) => (
              <Link key={p.id} href={`/shop/${p.id}`} style={{ textDecoration: "none", backgroundColor: "#0f1d32", borderRadius: "10px", overflow: "hidden", border: "1px solid #1a3a5c" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={relatedImages[i]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "14px" }}>
                  <p style={{ color: "#fff", fontWeight: 700, margin: "0 0 5px", fontSize: "0.95rem" }}>{p.name}</p>
                  <p style={{ color: "#c41e3a", margin: 0, fontSize: "1.1rem", fontWeight: 900 }}>${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
