import { getAllPosts, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/data";
import { getAllEpisodes } from "@/lib/episodes";

function escapeXml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

// Map file extension to MIME type
function mimeType(file: string): string {
  if (file.endsWith(".m4a")) return "audio/x-m4a";
  return "audio/mpeg";
}

// File byte sizes for enclosure length (kept in sync with actual files)
const FILE_SIZES: Record<string, number> = {
  "/podcasts/The_Ethics_Reporter_The_List_That_Doesnt_Exist.mp3": 68629160,
  "/podcasts/Ethics_Reporter_How_Big_Law_Was_Broken.mp3": 22092290,
  "/podcasts/Congressional_Insider_Trading_STOCK_Act.mp3": 27972968,
  "/podcasts/The_Ethics_Reporter_The_Watergate_Office.mp3": 47566470,
  "/podcasts/One_Big_Beautiful_Bill_Corruption_Exposed.mp3": 30126124,
  "/podcasts/Kill_Switch_Lone_Dissenter_Massie.mp3": 35410382,
  "/podcasts/NY_Ethics_Chair_Linked_to_Corrupt_Judge.m4a": 38849605,
};

export function GET() {
  const posts = getAllPosts().slice(0, 50);
  const episodes = getAllEpisodes();

  // --- Article RSS items ---
  const articleItems = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/article/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/article/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(stripHtml(post.excerpt).slice(0, 300))}</description>
    </item>`
    )
    .join("");

  // --- Podcast RSS items (with enclosures for Apple/Spotify) ---
  const podcastItems = episodes
    .map((ep) => {
      const fileUrl = `${SITE_URL}${ep.file}`;
      const byteSize = FILE_SIZES[ep.file] ?? 0;
      const mime = mimeType(ep.file);
      return `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${SITE_URL}/podcast/${ep.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/podcast/${ep.slug}</guid>
      <pubDate>${new Date(ep.date).toUTCString()}</pubDate>
      <description>${escapeXml(ep.description)}</description>
      <enclosure url="${escapeXml(fileUrl)}" length="${byteSize}" type="${mime}" />
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:summary>${escapeXml(ep.description)}</itunes:summary>
      <itunes:duration>${escapeXml(ep.duration)}</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>

    <!-- Podcast / iTunes metadata -->
    <itunes:author>The Ethics Reporter</itunes:author>
    <itunes:owner>
      <itunes:name>The Ethics Reporter</itunes:name>
      <itunes:email>theethicsreporter@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:image href="${SITE_URL}/podcast-cover.jpg"/>
    <itunes:category text="News">
      <itunes:category text="Daily News"/>
    </itunes:category>
    <itunes:category text="Society &amp; Culture">
      <itunes:category text="Documentary"/>
    </itunes:category>
    <itunes:explicit>no</itunes:explicit>
    <itunes:type>episodic</itunes:type>

    ${podcastItems}
    ${articleItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
