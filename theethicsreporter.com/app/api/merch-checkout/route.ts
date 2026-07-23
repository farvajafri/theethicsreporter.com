import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import merch from "@/data/merch.json";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export async function POST(req: NextRequest) {
  try {
    const { productId, size, color } = await req.json();
    const product = (merch as MerchItem[]).find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theethicsreporter.com";
    const variant = [color, size].filter(Boolean).join(" / ") || "One Size";
    const imageFile = product.image.replace(/^\/products\//, "").replace(/^\//, "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: `${variant} — ${product.description.slice(0, 120)}`,
              images: [`${siteUrl}/shop/${imageFile}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 999, currency: "usd" },
            display_name: "US Shipping ($9.99 per item)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}&product_id=${product.id}`,
      cancel_url: `${siteUrl}/shop/${product.id}`,
      metadata: {
        productId: product.id,
        variant,
        order_type: "take_america_back_merch",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Merch checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
