import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

export async function POST(req: NextRequest) {
  try {
    const { amountCents, interval } = await req.json();

    if (!amountCents || typeof amountCents !== "number" || amountCents < 100) {
      return NextResponse.json({ error: "Minimum donation is $1.00" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theethicsreporter.com";
    const isMonthly = interval === "month";

    let session;

    if (isMonthly) {
      // Monthly subscription checkout
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Monthly Support — The Ethics Reporter",
                description:
                  "Your monthly contribution funds independent legal ethics journalism. Cancel anytime.",
              },
              unit_amount: amountCents,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${siteUrl}/donate?success=1`,
        cancel_url: `${siteUrl}/donate`,
        custom_text: {
          submit: {
            message:
              "Thank you for becoming a monthly supporter. You can cancel anytime from your email receipt.",
          },
        },
      });
    } else {
      // One-time payment checkout
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Support The Ethics Reporter",
                description:
                  "Your contribution funds independent legal ethics journalism that holds the powerful accountable.",
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${siteUrl}/donate?success=1`,
        cancel_url: `${siteUrl}/donate`,
        submit_type: "donate",
        custom_text: {
          submit: {
            message:
              "Thank you for supporting independent journalism. Every dollar helps us keep reporting.",
          },
        },
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe donate error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
