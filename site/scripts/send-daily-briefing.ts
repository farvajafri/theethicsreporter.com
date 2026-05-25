/**
 * send-daily-briefing.ts
 * 
 * Sends the daily Ethics Reporter briefing to all TER Newsletter subscribers via Brevo.
 * Run via: npx tsx --env-file=.env.local scripts/send-daily-briefing.ts
 * Or called from cron.
 */

import postsData from "../data/posts.json";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const TER_LIST_ID = 17;
const SITE_URL = "https://www.theethicsreporter.com";

interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  status?: string;
  featured_image?: string | null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'").replace(/&rsquo;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
    .replace(/&#8211;/g, "–").replace(/&ndash;/g, "–")
    .replace(/&#8212;/g, "—").replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function getExcerpt(post: Post): string {
  const raw = post.excerpt || post.content || "";
  const text = stripHtml(raw);
  return decodeEntities(text.slice(0, 220) + (text.length > 220 ? "…" : ""));
}

function buildEmailHtml(posts: Post[]): string {
  const today = formatDate(new Date().toISOString());
  const leadPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);

  const leadExcerpt = getExcerpt(leadPost);
  const leadUrl = `${SITE_URL}/article/${leadPost.slug}`;

  const secondaryHtml = secondaryPosts.map((post) => {
    const url = `${SITE_URL}/article/${post.slug}`;
    const excerpt = getExcerpt(post);
    return `
      <tr>
        <td style="padding:20px 40px;border-bottom:1px solid #e8e0d0;">
          <a href="${url}" style="font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#111;text-decoration:none;line-height:1.4;display:block;margin-bottom:8px;">${decodeEntities(post.title)}</a>
          <p style="font-family:Georgia,serif;font-size:15px;color:#444;line-height:1.7;margin:0 0 10px;">${excerpt}</p>
          <a href="${url}" style="font-family:sans-serif;font-size:12px;font-weight:bold;color:#8B0000;text-decoration:none;letter-spacing:0.5px;text-transform:uppercase;">Read →</a>
        </td>
      </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>The Ethics Reporter Briefing — ${today}</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:30px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;max-width:620px;border-top:5px solid #8B0000;">

        <!-- Header -->
        <tr>
          <td style="padding:28px 40px 20px;border-bottom:2px solid #1a0000;background:#1a0000;">
            <p style="font-family:sans-serif;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#cc4444;margin:0 0 6px;">The Ethics Reporter</p>
            <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:0;">Daily Briefing · ${today}</p>
          </td>
        </tr>

        <!-- Lead story -->
        <tr>
          <td style="padding:32px 40px 28px;border-bottom:1px solid #e8e0d0;">
            <p style="font-family:sans-serif;font-size:10px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#8B0000;margin:0 0 12px;">Lead Story</p>
            <a href="${leadUrl}" style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#111;text-decoration:none;line-height:1.3;display:block;margin-bottom:14px;">${decodeEntities(leadPost.title)}</a>
            <p style="font-family:Georgia,serif;font-size:17px;color:#333;line-height:1.8;margin:0 0 18px;">${leadExcerpt}</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#8B0000;border-radius:3px;">
                  <a href="${leadUrl}" style="display:inline-block;padding:11px 22px;font-family:sans-serif;font-size:13px;font-weight:bold;color:#fff;text-decoration:none;letter-spacing:0.5px;">Read the full report →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Secondary stories -->
        ${secondaryHtml}

        <!-- Donation ask — Dropsite-style -->
        <tr>
          <td style="padding:28px 40px;background:#1a0000;">
            <p style="font-family:sans-serif;font-size:10px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#cc4444;margin:0 0 10px;">This briefing is free because of readers like you</p>
            <p style="font-family:Georgia,serif;font-size:17px;color:#e8e0d0;line-height:1.8;margin:0 0 14px;">
              The Ethics Reporter has no advertisers. No corporate sponsors. No institutional funding. We are entirely supported by readers who believe accountability journalism is worth paying for.
            </p>
            <p style="font-family:Georgia,serif;font-size:17px;color:#e8e0d0;line-height:1.8;margin:0 0 20px;">
              If today's briefing was worth something to you — if you learned something, or if this reporting made a difference — please consider supporting us. Even $1 keeps this free for everyone else.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#cc4444;border-radius:3px;">
                  <a href="${SITE_URL}/donate" style="display:inline-block;padding:13px 26px;font-family:sans-serif;font-size:14px;font-weight:bold;color:#fff;text-decoration:none;letter-spacing:0.5px;">Support The Ethics Reporter →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- More stories callout -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e8e0d0;text-align:center;">
            <p style="font-family:sans-serif;font-size:13px;color:#666;margin:0 0 12px;">More reporting at <a href="${SITE_URL}" style="color:#8B0000;text-decoration:none;font-weight:bold;">theethicsreporter.com</a></p>
            <a href="${SITE_URL}/tip" style="font-family:sans-serif;font-size:12px;color:#8B0000;text-decoration:none;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;">Submit a Tip →</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 40px;background:#f5f0e8;border-top:1px solid #e0d8cc;">
            <p style="font-family:sans-serif;font-size:11px;color:#999;margin:0;line-height:1.7;">
              You're receiving The Ethics Reporter Daily Briefing because you subscribed at theethicsreporter.com.<br>
              <a href="${SITE_URL}/unsubscribe?email={{contact.EMAIL}}" style="color:#8B0000;text-decoration:none;">Unsubscribe</a> · 
              <a href="${SITE_URL}" style="color:#8B0000;text-decoration:none;">Visit the site</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendDailyBriefing() {
  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY not set");
    process.exit(1);
  }

  const posts = (postsData as Post[])
    .filter((p) => p.status === "publish")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (posts.length === 0) {
    console.error("No posts found");
    process.exit(1);
  }

  console.log(`Building briefing with ${posts.length} posts...`);
  console.log("Lead:", posts[0].title);

  const htmlContent = buildEmailHtml(posts);
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const subject = `The Ethics Reporter Briefing — ${today}`;

  // Create and immediately send a Brevo email campaign
  const payload = {
    name: `TER Daily Briefing ${new Date().toISOString().slice(0, 10)}`,
    subject,
    sender: { name: "The Ethics Reporter", email: "briefing@theethicsreporter.com" },
    type: "classic",
    htmlContent,
    recipients: { listIds: [TER_LIST_ID] },
    header: "The Ethics Reporter Daily Briefing",
  };

  console.log("Creating campaign...");
  const createRes = await fetch("https://api.brevo.com/v3/emailCampaigns", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error("Failed to create campaign:", err);
    process.exit(1);
  }

  const campaign = await createRes.json();
  const campaignId = campaign.id;
  console.log("Campaign created, ID:", campaignId);

  // Send immediately
  const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaignId}/sendNow`, {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY },
  });

  if (!sendRes.ok) {
    const err = await sendRes.text();
    console.error("Failed to send campaign:", err);
    process.exit(1);
  }

  console.log(`✅ Daily briefing sent successfully. Campaign ID: ${campaignId}`);
  console.log(`   Subject: ${subject}`);
  console.log(`   List: TER Newsletter Subscribers (ID ${TER_LIST_ID})`);
}

sendDailyBriefing().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
