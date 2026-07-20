# The Ethics Reporter — SEO & Content Strategy
## Modeled After Bosseo's Approach for Brightside Tax Relief

### What Bosseo Does for Brightside (that we need to replicate):

1. **State-by-state landing pages** — Brightside has `/california/`, `/texas/`, `/florida/`, `/new-york/` etc., each with unique content about tax relief services in that specific state. These pages rank for "[service] + [state]" keywords.

2. **Topic cluster blog posts** — Long-form SEO content around target keywords (e.g., "tax resolution services", "best rated tax relief companies", "small business tax relief"). Each post is 1,500-3,000 words, well-structured with H2s, internal links.

3. **Service sub-pages per state** — e.g., `/illinois/debt-relief-tax-services/`, `/pennsylvania/specialty-tax-services/`. This creates a massive URL footprint for long-tail searches.

4. **Consistent publishing cadence** — Regular new content to signal freshness to Google.

5. **Social amplification** — Every article gets posted to Facebook and Instagram to drive initial traffic and engagement signals.

---

## Our Implementation Plan

### Phase 1: Content Engine (Daily Publishing) ✅ IN PROGRESS
- Publish 1-2 long-form investigative articles per day
- Every article: New Yorker-style, 2,000-4,000 words, with citations
- Focus on trending legal ethics stories for organic search pickup
- Post each article to Facebook and Instagram

### Phase 2: State Landing Pages (50 states)
Create `/state/[state-name]` pages covering attorney discipline in each state:
- Overview of that state's bar discipline system
- Recent notable discipline cases in that state
- How to report attorney misconduct in that state
- Links to relevant state bar resources
- Internal links to all articles about attorneys from that state

Target keywords: "[state] attorney discipline", "[state] bar complaints", "[state] lawyer misconduct"

### Phase 3: Topic Cluster Pages
Create dedicated pages for each major topic:
- `/topics/ai-in-legal-practice` — All AI-related discipline cases
- `/topics/client-fund-misappropriation` — Trust account violations
- `/topics/judicial-misconduct` — Judge discipline cases
- `/topics/disbarment` — All disbarment stories
- `/topics/attorney-suspension` — All suspension stories

### Phase 4: "How To" Educational Content
- "How to File a Bar Complaint in [State]" (50 articles)
- "What Happens When a Lawyer is Disbarred?"
- "How Attorney Discipline Works: A Complete Guide"
- "What to Do if Your Lawyer Stole Your Money"
- "Understanding Legal Malpractice vs. Bar Complaints"

These rank for informational queries that lead to tips and donations.

### Phase 5: Technical SEO
- Schema markup on all article pages (already done: NewsArticle)
- XML sitemap with all new pages
- State pages interlinked with articles
- Topic pages interlinked with articles
- FAQ schema on educational content

---

## Publishing Schedule (Automated via Cron)

| Time | Task |
|------|------|
| 6:00 AM ET | Research and write Article 1 (trending legal ethics story) |
| 8:00 AM ET | Publish Article 1 → Facebook + Instagram |
| 2:00 PM ET | Research and write Article 2 (if available) |
| 4:00 PM ET | Publish Article 2 → Facebook + Instagram |

---

## Instagram Issue
The Ethics Reporter Instagram (`the_ethics_reporter`) is NOT linked as a business account to the Facebook page. This blocks API posting. Farva needs to:
1. Convert the IG account to a Business/Creator account (if not already)
2. Link it to The Ethics Reporter Facebook page in Instagram Settings → Account → Linked Accounts

Until then, FB posts only via API.

---

## Metrics to Track
- Organic search impressions (Google Search Console)
- Organic traffic (Google Analytics / GTM)
- Donations received
- Tips submitted
- Social engagement (FB/IG likes, shares, comments)
