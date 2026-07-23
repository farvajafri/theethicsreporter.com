import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});
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

    // Handle merch sales (Take America Back store)
    if (session.metadata?.order_type === "take_america_back_merch") {
      await handleMerchSale(session);
      return NextResponse.json({ received: true });
    }

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

    // Discord ping to #theethicsreporter
    try {
      const discordToken = process.env.DISCORD_BOT_TOKEN;
      if (discordToken) {
        await fetch("https://discord.com/api/v10/channels/1486847808362516572/messages", {
          method: "POST",
          headers: {
            "Authorization": `Bot ${discordToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `💰 **New donation on The Ethics Reporter!**\n> **${amountFormatted}** from **${customerName}** (${customerEmail})\n> ${createdAt} ET`,
          }),
        });
      }
    } catch (err) {
      console.error("Failed to send Discord donation notification:", err);
    }

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

async function handleMerchSale(session: Stripe.Checkout.Session) {
  const amountTotal = session.amount_total ?? 0;
  const amountFormatted = `$${(amountTotal / 100).toFixed(2)}`;
  const customerEmail = session.customer_details?.email ?? "Unknown";
  const customerName = session.customer_details?.name ?? "Unknown";
  const productId = session.metadata?.productId ?? "Unknown";
  const variant = session.metadata?.variant ?? "";
  const sessionId = session.id;
  const createdAt = new Date(session.created * 1000).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  // Shipping address (US only)
  const ship = session.customer_details?.address;
  const shippingBlock = ship
    ? `${ship.line1 ?? ""}${ship.line2 ? ", " + ship.line2 : ""}, ${ship.city ?? ""}, ${ship.state ?? ""} ${ship.postal_code ?? ""}`
    : "Not provided";

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #c41e3a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🛒 New Merch Sale — Take America Back!</h1>
      </div>
      <div style="background: #fdf8f0; border: 2px solid #c41e3a; border-top: none; padding: 30px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a; width: 150px;">Order Total</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-size: 20px; font-weight: bold;">${amountFormatted}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Product</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${productId}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Variant</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${variant || "—"}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Customer</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${customerName}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Email</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${customerEmail}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Ship To</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${shippingBlock}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #e5e5e5; font-weight: bold; color: #c41e3a;">Date &amp; Time</td><td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${createdAt} ET</td></tr>
          <tr><td style="padding: 12px; font-weight: bold; color: #c41e3a;">Session ID</td><td style="padding: 12px; font-size: 12px; color: #666;">${sessionId}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #555; font-size: 14px; text-align: center;">
          View this order in your <a href="https://dashboard.stripe.com/payments" style="color: #c41e3a;">Stripe Dashboard</a>. Fulfill via Printful.
        </p>
      </div>
    </div>
  `;

  // Discord ping to #theethicsreporter
  try {
    const discordToken = process.env.DISCORD_BOT_TOKEN;
    if (discordToken) {
      await fetch("https://discord.com/api/v10/channels/1486847808362516572/messages", {
        method: "POST",
        headers: { "Authorization": `Bot ${discordToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🛒 **New merch sale!**\n> **${amountFormatted}** — ${productId} (${variant || "one size"})\n> ${customerName} (${customerEmail})\n> Ship to: ${shippingBlock}\n> ${createdAt} ET`,
        }),
      });
    }
  } catch (err) {
    console.error("Failed to send Discord merch notification:", err);
  }

  // Email to theethicsreporter@gmail.com via Brevo
  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: "Take America Back Store", email: "noreply@theethicsreporter.com" },
        to: [{ email: "theethicsreporter@gmail.com", name: "The Ethics Reporter" }],
        subject: `🛒 New Merch Sale: ${amountFormatted} — ${productId}`,
        htmlContent,
      }),
    });
  } catch (err) {
    console.error("Failed to send merch sale notification email:", err);
  }
}
