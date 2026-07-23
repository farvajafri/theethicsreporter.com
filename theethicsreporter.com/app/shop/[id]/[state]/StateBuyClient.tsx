"use client";

import { useState } from "react";

export default function StateBuyClient({
  productId,
  sizes,
  colors,
  price,
}: {
  productId: string;
  sizes?: string[];
  colors?: string[];
  price: number;
}) {
  const [size, setSize] = useState(sizes?.[0] || "");
  const [color, setColor] = useState(colors?.[0] || "");
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/merch-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, color }),
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
    <div>
      {sizes && (
        <div style={{ margin: "14px 0" }}>
          <p style={{ color: "#a0b4c8", margin: "0 0 8px", fontWeight: 600, fontSize: "0.9rem" }}>Size:</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} style={{ minWidth: "44px", height: "44px", padding: "0 10px", border: `2px solid ${size === s ? "#c41e3a" : "#1a3a5c"}`, backgroundColor: size === s ? "#c41e3a" : "transparent", color: "#fff", fontWeight: 700, cursor: "pointer", borderRadius: "6px" }}>{s}</button>
            ))}
          </div>
        </div>
      )}
      {colors && (
        <div style={{ margin: "14px 0" }}>
          <p style={{ color: "#a0b4c8", margin: "0 0 8px", fontWeight: 600, fontSize: "0.9rem" }}>Color:</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} style={{ padding: "9px 16px", border: `2px solid ${color === c ? "#c41e3a" : "#1a3a5c"}`, backgroundColor: color === c ? "#c41e3a" : "transparent", color: "#fff", fontWeight: 600, cursor: "pointer", borderRadius: "6px", fontSize: "0.85rem" }}>{c}</button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ color: "#fff", fontSize: "2rem", fontWeight: 900 }}>${price}</span>
        <button onClick={buy} disabled={loading} style={{ padding: "16px 40px", backgroundColor: loading ? "#8a1a2e" : "#c41e3a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "2px" }}>
          {loading ? "Processing…" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
