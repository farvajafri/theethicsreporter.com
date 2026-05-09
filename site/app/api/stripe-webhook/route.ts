import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const BREVO_API_KEY = process.env.BREVO_API_KEY!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only handle donate sessions (submit_type = donate)
    if (session.submit_type !== "donate") {
      return NextResponse.json({ received: true });
    }

    const amountTotal = session.amount_total ?? 0;
    const amountFormatted = `$${(amountTotal / 100).toFixed(2)}`;
    const customerEmail = session.customer_details?.email ?? "Unknown";
    const customerName = session.customer_details?.name ?? "Anonymous";
    const sessionId = session.id;
    const createdAt = new Date(session.created * 1000).toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const htmlContent = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #8B0000; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">💰 New Donation Received!</h1>
        </div>
        <div style="background: #fdf8f0; border: 2px solid #8B0000; border-top: none; padding: 30px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #8B0000; width: 140px;">Amount</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-size: 20px; font-weight: bold;">${amountFormatted}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #8B0000;">Donor Name</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #8B0000;">Donor Email</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #8B0000;">Date & Time</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${createdAt} ET</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #8B0000;">Session ID</td>
              <td style="padding: 12px; font-size: 12px; color: #666;">${sessionId}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #555; font-size: 14px; text-align: center;">
            View all donations in your <a href="https://dashboard.stripe.com/payments" style="color: #8B0000;">Stripe Dashboard</a>.
          </p>
        </div>
      </div>
    `;

    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "The Ethics Reporter", email: "noreply@theethicsreporter.com" },
          to: [{ email: "theethicsreporter@gmail.com", name: "The Ethics Reporter" }],
          subject: `💰 New Donation: ${amountFormatted} from ${customerName}`,
          htmlContent,
        }),
      });
    } catch (err) {
      console.error("Failed to send donation notification email:", err);
    }
  }

  return NextResponse.json({ received: true });
}
