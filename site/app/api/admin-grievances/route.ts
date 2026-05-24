import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const ADMIN_PASSWORD = process.env.ADMIN_OPINIONS_PASSWORD || "TERAdmin2026!";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password") || "";

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    // List all checkout sessions with grievance_opinion metadata
    // Stripe lists in reverse-chronological order
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    });

    const grievances = sessions.data
      .filter(
        (s) =>
          s.metadata?.type === "grievance_opinion" &&
          (s.payment_status === "paid" || s.payment_status === "unpaid")
      )
      .map((s) => {
        const meta = s.metadata || {};
        const createdDate = new Date(s.created * 1000).toLocaleString("en-US", {
          timeZone: "America/New_York",
          dateStyle: "medium",
          timeStyle: "short",
        });

        return {
          sessionId: s.id,
          created: createdDate,
          yourName: meta.yourName || s.customer_details?.name || "Unknown",
          yourEmail: meta.yourEmail || s.customer_details?.email || "Unknown",
          yourPhone: meta.yourPhone || "",
          attorneyName: meta.attorneyName || "Unknown",
          attorneyState: meta.attorneyState || "",
          attorneyBarNumber: meta.attorneyBarNumber || "",
          rulesAlleged: meta.rulesAlleged || "",
          incidentDate: meta.incidentDate || "",
          desiredOutcome: meta.desiredOutcome || "",
          priorFiling: meta.priorFiling || "",
          descriptionPreview: meta.descriptionPreview || "",
          amountPaid: `$${((s.amount_total ?? 25000) / 100).toFixed(2)}`,
          paymentStatus: s.payment_status,
        };
      });

    return NextResponse.json({ grievances });
  } catch (err) {
    console.error("Admin grievances list error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
