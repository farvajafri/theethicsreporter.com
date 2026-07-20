# Vercel Optimization Report — theethicsreporter.com

**Stack**: next@14.2.35 | app-router  ·  **Plan**: pro  ·  **Period**: 2026-07-06T07:00:00.000Z → 2026-07-21T07:00:00.000Z  ·  **Observability**: Observability Plus enabled — per-route metrics included
**Coverage**: Found **3** potential issues to check  ·  3 investigated  ·  2 recommendations ready  ·  1 need more evidence · [details](#not-investigated-in-this-run)

_Generated 2026-07-20T20:07:43.127Z_

## Cost breakdown (this project)

| Service | Billed cost |
|---|---|
| Build CPU Minutes | $1.89 |
| Observability Events | $0.56 |
| Edge Requests | $0.48 |
| Fast Origin Transfer | $0.21 |
| Fluid Active CPU | $0.19 |
| ISR Reads | $0.17 |
| Function Invocations | $0.10 |
| Fluid Provisioned Memory | $0.04 |
| Edge Requests - Additional CPU Duration | $0.01 |

_3 zero-cost service rows were omitted._

**Total billed: $3.66** _(precise observed cost; future-savings framing is magnitude, never precise)_

## Highest-impact recommendations

1. **Heavy middleware on account-wide** — middleware invocations: 140,012; total requests: 195,366; ratio: 72%
   - **What to do**: Delete middleware.ts and move the non-www to www redirect to a host-conditioned redirect in next.config.mjs, removing middleware from every request.
   - **Impact**: high impact — see follow-up metrics for magnitude.
   - **Effort**: low
   - **Citations**: https://nextjs.org/docs/app/building-your-application/routing/middleware, https://vercel.com/docs/routing/, https://vercel.com/docs/routing-middleware, https://vercel.com/docs/cli/metrics
2. **Image optimization on /rule/[rule]** — requests: 265; cache hit rate: 100%
   - **What to do**: Replace the two raw <img> tags on /rule/[rule] with next/image so article thumbnails are resized and re-encoded instead of shipping full-size JPEGs.
   - **Impact**: medium impact — see follow-up metrics for magnitude.
   - **Effort**: low
   - **Citations**: https://nextjs.org/docs/app/api-reference/components/image, https://vercel.com/docs/image-optimization, https://vercel.com/docs/image-optimization/managing-image-optimization-costs

## Recommendations

### High impact

| # | Bucket | What | Impact | Effort | Citations |
|---|---|---|---|---|---|
| 1 | cost | Delete middleware.ts and move the non-www to www redirect to a host-conditioned redirect in next.config.mjs, removing middleware from every request. | high impact — see follow-up metrics for magnitude. | low | https://nextjs.org/docs/app/building-your-application/routing/middleware<br>https://vercel.com/docs/routing/ |

### Medium impact

| # | Bucket | What | Impact | Effort | Citations |
|---|---|---|---|---|---|
| 1 | cost | Replace the two raw <img> tags on /rule/[rule] with next/image so article thumbnails are resized and re-encoded instead of shipping full-size JPEGs. | medium impact — see follow-up metrics for magnitude. | low | https://nextjs.org/docs/app/api-reference/components/image<br>https://vercel.com/docs/image-optimization |

## Detailed recommendations

### 1. Delete middleware.ts and move the non-www to www redirect to a host-conditioned redirect in next.config.mjs, removing middleware from every request.

_**cost** · effort: low · impact tier: high · candidate: Heavy middleware on account-wide_

**Why**

middleware.ts:7-13 exists only to 301-redirect the bare domain to www.theethicsreporter.com, but the matcher at middleware.ts:22 ('/((?!_next/static|_next/image|favicon.ico).*)') intercepts nearly every request: 140012 middleware invocations against 195366 total requests (72%), including pure static traffic like /robots.txt (2451 invocations), /sitemap.xml (460), and /images/posts/judge-sarah-merriam-second-circuit-culture-fear-clerks-second-discipline-2026.jpg (2078). Because the redirect keys on the host header rather than the path, no matcher narrowing can help; every path on the canonical www host still invokes a function just to call NextResponse.next().

**Impact**

high impact — see follow-up metrics for magnitude.

**Fix**

1. Add a redirects() entry to next.config.mjs with a host condition so the redirect compiles into deployment routes evaluated by Vercel's CDN routing layer before any function runs: source '/:path*', has [{ type: 'host', value: 'theethicsreporter.com' }], destination 'https://www.theethicsreporter.com/:path*', permanent true. 2. Delete middleware.ts entirely — the redirect was its only logic. 3. Alternatively (or additionally), set www.theethicsreporter.com as the primary domain in the project's Domains settings and configure the apex domain to redirect to it, which handles canonicalization at the platform edge with no code at all. 4. Deploy, then confirm `curl -I https://theethicsreporter.com/donate` returns a permanent redirect to https://www.theethicsreporter.com/donate and that www requests no longer show middleware activity. The redirect behavior is preserved on every path — including images and robots.txt — while the 140012 per-request function invocations drop to zero.

**Before**

```ts
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www with 301 permanent redirect
  if (host === 'theethicsreporter.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.theethicsreporter.com';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**After**

```js
// next.config.mjs — middleware.ts deleted
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'theethicsreporter.com' }],
        destination: 'https://www.theethicsreporter.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

**Verify**

Current state: 140012 middleware invocations on 195366 requests (72% share), led by /donate (27675), / (7430), and static paths like /robots.txt (2451). After deploying the config-level redirect and deleting middleware.ts, re-run `vercel metrics` for middleware invocations over a comparable window — the count should fall to zero while total requests and the redirect behavior (curl -I on the bare domain) stay unchanged.

**Citations**

- `https://nextjs.org/docs/app/building-your-application/routing/middleware`
- `https://vercel.com/docs/routing/`
- `https://vercel.com/docs/routing-middleware`
- `https://vercel.com/docs/cli/metrics`


### 2. Replace the two raw <img> tags on /rule/[rule] with next/image so article thumbnails are resized and re-encoded instead of shipping full-size JPEGs.

_**cost** · effort: low · impact tier: medium · candidate: Image optimization on /rule/[rule]_

**Why**

app/rule/[rule]/page.tsx:111 and app/rule/[rule]/page.tsx:145 render post.featured_image through raw <img> tags into thumbnail slots (192px wide on desktop, 128px tall cards), while the source JPEGs in public/images/posts are full-size originals (574 files, median 160KB, 90th percentile about 1.5MB, largest 4MB). The route already serves requests: 265 with cache hit rate: 100%, so page HTML costs nothing extra per hit; the remaining per-view cost is up to 6-10 raw multi-hundred-kilobyte images of Fast Data Transfer that next/image would shrink to a few kilobytes each.

**Impact**

medium impact — see follow-up metrics for magnitude.

**Fix**

1. In app/rule/[rule]/page.tsx, add `import Image from "next/image";`.
2. Replace the <img> at line 111 (Our Investigations Involving This Rule section): wrap in a relatively positioned container that keeps the existing responsive classes (`relative w-full md:w-48 h-40 md:h-auto flex-shrink-0`) and render `<Image src={post.featured_image} alt={post.title} fill sizes="(min-width: 768px) 192px, 100vw" className="object-cover" />`. Drop `loading="lazy"` — next/image lazy-loads by default.
3. Replace the <img> at line 145 (Related Coverage grid): wrap in `relative w-full h-32` and render `<Image src={post.featured_image} alt={post.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />`.
4. No next.config change is needed: every featured_image in data/posts.json is a local path under /images/posts/, so no remote patterns are involved.
5. Transformation volume stays bounded: there are 574 unique source images, and optimized variants are cached, so Image Optimization usage is a one-time cost per source-and-size combination rather than per request.

**Before**

```tsx
{post.featured_image && (
  <img
    src={post.featured_image}
    alt={post.title}
    className="w-full md:w-48 h-40 md:h-auto object-cover flex-shrink-0"
    loading="lazy"
  />
)}
// ...and in the Related Coverage grid:
<img src={post.featured_image} alt={post.title} className="w-full h-32 object-cover" loading="lazy" />
```

**After**

```tsx
import Image from "next/image";

{post.featured_image && (
  <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
    <Image
      src={post.featured_image}
      alt={post.title}
      fill
      sizes="(min-width: 768px) 192px, 100vw"
      className="object-cover"
    />
  </div>
)}
// ...and in the Related Coverage grid:
<div className="relative w-full h-32">
  <Image src={post.featured_image} alt={post.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
</div>
```

**Verify**

Re-run `vercel metrics` for the /rule/[rule] route and watch Fast Data Transfer per request drop while the route's request volume (265 at last measurement, 100% cached) stays flat. In the usage breakdown, Image Optimization transformations should rise briefly as variants are generated for the 574 source images, then flatten as the optimized variants are served from cache.

**Citations**

- `https://nextjs.org/docs/app/api-reference/components/image`
- `https://vercel.com/docs/image-optimization`
- `https://vercel.com/docs/image-optimization/managing-image-optimization-costs`



## Platform recommendations

_(none — the gate did not surface any platform-scope recommendations)_

## Observations from investigation

These are real signals from the audit, but they are not ready-to-apply recommendations.

| Candidate | Observation | Evidence | Suggested action | Kind |
|---|---|---|---|---|
| Slow route on /article/[slug] | Miss-path latency splits into two distinct bands across the nine deployments in the window, consistent with prerender-cache resets from frequent full redeploys rather than route code. | per-deployment 95th-percentile latency is 388-478ms on four deployments but 754-997ms on five (e.g. dpl_9DuoNuHByLJ8wJPzPezjZhUpRVrQ at 997ms and dpl_J9FmPvUmKot2Hqf7jqiWp9oQsqZq at 988ms); cache breakdown shows 3740 HIT versus 360 MISS requests; article content is compiled into the bundle via static imports from lib/data (app/article/[slug]/page.tsx:1), so every content publish is a full redeploy that invalidates the prerendered pages and regenerates them on the slower miss path. | Confirm cold-start share on the miss path (the start-type split returned null in this window) and batch content publishes where possible; if cold starts dominate the slow band, the lever is deployment cadence, not changes to this route's code. | Other |
| ISR over-revalidation on /article/[slug] | ISR writes on /article/[slug] are deployment-time prerenders of the full 372-article catalog, not over-revalidation. | writePattern shows all 718 writes with an empty cache result (deploy-time, not request-classified) while readPattern shows 1320 HIT reads and 0 MISS; app/article/[slug]/page.tsx:61-63 maps generateStaticParams over getAllPosts(), which returns all 372 posts from data/posts.json (imported at lib/data.ts:1), so 718 writes matches roughly two full-catalog builds in the metrics window. | No revalidation change is needed and reads are fully cached. If ISR write volume becomes a cost concern as the catalog and deploy frequency grow, return only the most recent posts from generateStaticParams in app/article/[slug]/page.tsx and let older articles generate once on first request (dynamicParams defaults to true), cutting per-deploy writes from the full catalog to the actively read subset. | Other |

## Needs more evidence

These candidates were investigated, but automated checks kept the change out of the ready-to-apply list.

| Candidate | Why it was held back |
|---|---|
| Build Minutes Fanout on account-wide | This observation described an implementation change that needs the ready-to-apply recommendation evidence bar before it can ship. |
| Bot traffic on account-wide | This observation recommended Bot Protection or WAF changes without a staged safe-rollout plan and allowlist review. Promote it to a verified platform recommendation before applying it. |

## Investigated, no change recommended

These candidates were checked and did not produce a supported change.

| Candidate | Why no recommendation shipped |
|---|---|
| Slow route on /article/[slug] | Evidence and source diverge: the route is already fully static — app/article/[slug]/page.tsx:61 exports generateStaticParams over local data and the page component at app/article/[slug]/page.tsx:97 is synchronous with zero awaits and no external IO — so the 755ms 95th-percentile latency (versus 270ms 95th-percentile CPU time, a ~485ms wall-clock gap) on the 360 cache-miss invocations out of 4100 cannot be produced by the code in the resolved files; the miss-path latency points at cold starts or infrastructure, not a file-level change. |
| ISR over-revalidation on /article/[slug] | The route has no revalidation cadence to lengthen: app/article/[slug]/page.tsx exports no revalidate, generateStaticParams (app/article/[slug]/page.tsx:61-63) prerenders every slug from getAllPosts(), and the data source is a statically imported JSON file (lib/data.ts:1) with zero fetch calls, so the 718 writes cannot come from timer or stale-request revalidation. |

## Not investigated in this run

| Candidate type | Why not investigated | Targets | Count |
|---|---|---|---:|
| Low cache-hit route | missing GET-share data — route method mix is required before recommending edge caching | /donate<br>/article/doj-proposes-rule-shield-lawyers-state-bar-probes-apr02-2026<br>/2025/07/31/disbarred-and-suspended-new-york-lawyers-facing-public-sanctions/<br>/2025/07/31/disbarred-and-suspended-new-york-lawyers-facing-public-sanctions | 4 |

## Strengths

- Fluid Compute is enabled (`defaultResourceConfig.fluid=true`) — instance reuse + reduced cold starts active.
- In-function concurrency is enabled — multiple invocations share a single function instance, lowering active CPU costs on I/O-bound work.
- Function regions: `iad1` (single region).
- Cache hit-rate is healthy at the bandwidth tier — HIT/STALE bandwidth (28.12 GB) exceeds MISS/BYPASS (4.49 GB).
- Cold-start rate is very low (0.89%) — Fluid Compute or warm-instance reuse is doing its job.
- 5xx rate is very low (0.000%) on 195.69K requests.

## Configuration notes

- Function memory tier: Standard (2GB) — the cost-efficient default; upgrade to Performance (4GB) only with memory, CPU-bound, or latency-sensitive route evidence.

## Data gaps

- Speed Insights metrics were not usable (`unknown_metric`), so LCP/INP/CLS analysis was skipped.
- No image transformations observed — either `next/image` is not used or no images served in the window.
