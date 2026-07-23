import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed | Take America Back",
  robots: { index: false },
};

export default function ShopSuccessPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a1628", color: "#fff", textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: "3rem", color: "#c41e3a", marginBottom: "20px" }}>🇺🇸 Order Confirmed</h1>
      <p style={{ fontSize: "1.25rem", color: "#e0e6ed", maxWidth: "600px", margin: "0 auto 30px", lineHeight: 1.6 }}>
        Thank you for supporting The Ethics Reporter. Your patriot gear is being printed and will ship within 3–5 business days. A confirmation email is on the way.
      </p>
      <Link href="/shop" style={{ display: "inline-block", padding: "15px 40px", backgroundColor: "#c41e3a", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px" }}>
        Back to Store
      </Link>
    </div>
  );
}
