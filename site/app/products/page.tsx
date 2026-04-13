"use client";

import { useState } from "react";
import productsData from "@/data/products.json";

const products = productsData as {
  id: string;
  state: string;
  stateCode: string;
  type: string;
  title: string;
  description: string;
  price: number;
  slug: string;
}[];

const states = Array.from(new Set(products.map((p) => p.state))).sort();

function ProductCard({ product }: { product: typeof products[0] }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded font-sans ${
            product.type === "bar"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {product.type === "bar" ? "Bar Complaint" : "Judiciary Complaint"}
        </span>
        <span className="text-sm font-bold text-gray-700 font-sans">$1.99</span>
      </div>
      <h3 className="font-bold text-base leading-snug font-sans">{product.title}</h3>
      <p className="text-sm text-gray-600 font-serif leading-relaxed flex-1">
        {product.description}
      </p>
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-[#8B0000] hover:bg-[#6b0000] text-white font-semibold text-sm py-2.5 rounded transition-colors font-sans disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Buy & Download — $1.99"}
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = products.filter((p) => {
    if (stateFilter !== "all" && p.state !== stateFilter) return false;
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-3">
          Legal Complaint Templates
        </h1>
        <p className="text-gray-600 font-serif text-lg max-w-2xl">
          State-specific templates for filing complaints against attorneys and judges.
          Instant download after purchase. All 50 states covered.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 font-sans">
            Filter by State
          </label>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
          >
            <option value="all">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 font-sans">
            Filter by Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
          >
            <option value="all">All Types</option>
            <option value="bar">Bar Complaints (vs. Attorneys)</option>
            <option value="judiciary">Judiciary Complaints (vs. Judges)</option>
          </select>
        </div>
        <div className="flex items-end">
          <span className="text-sm text-gray-500 font-sans">
            Showing {filtered.length} of {products.length} templates
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 font-serif">No templates match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
