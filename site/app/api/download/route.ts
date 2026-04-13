import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const productId = searchParams.get("product_id");

  if (!sessionId || !productId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Verify payment was completed
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
    }

    // Verify product matches session metadata
    if (session.metadata?.productId !== productId) {
      return NextResponse.json({ error: "Product mismatch" }, { status: 403 });
    }

    const product = (products as any[]).find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const filename = `${product.slug}.txt`;
    const content = product.body;

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error("Download error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
