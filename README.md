# The Ethics Reporter — repository guide

**The deployed product is the Next.js app in [`theethicsreporter.com/`](theethicsreporter.com/). Everything else in this repo is content-production tooling, drafts, and archives.**

This note exists mainly for future AI agents and collaborators: the repo root used to hold ~110 loose scripts, drafts, and JSON files. In July 2026 they were moved (with `git mv`, so history is intact) into the folders below. If you're looking for a file you expected at the root, check the map.

## Layout

| Path | What it is |
|---|---|
| `theethicsreporter.com/` | **The Next.js 14 App Router app** deployed to Vercel (project `theethicsreporter.com`). Published articles live in `theethicsreporter.com/data/posts.json`; article images in `theethicsreporter.com/public/images/posts/`. |
| `podcast/` | Podcast episode source documents (scripts/notes, not deployed directly). |
| `tools/generators/` | One-off article/content generator scripts (Python + Node), mostly dated April–July 2026. Each was typically run once to produce an article. |
| `tools/facebook/` | One-off Facebook posting scripts (`post_fb_*.py`). |
| `tools/maintenance/` | Data and image fix-up utilities (`fix_*`, `flatten_posts.*`, `upload-to-wp.py`, `check_keys.py`, `download-unsplash.sh`). |
| `drafts/` | Article/essay drafts (HTML/Markdown). The published versions are in `theethicsreporter.com/data/posts.json` — these are kept for reference only. |
| `data/` | Working JSON: stale root copies of `posts.json`, the original WordPress export (`wp-posts-raw.json`), tracker datasets, and scratch files. **The live data file is `theethicsreporter.com/data/posts.json`, not these.** |
| `docs/` | Project docs (`SEO-STRATEGY.md`). |
| `archive/legacy-public/` | The old root `public/` directory. Its images were superseded by differently named finals in `theethicsreporter.com/public/images/posts/`; nothing on the live site references these. |
| `DEPLOY_LOG.md` | Running deploy journal — stays at the root; append a line when you deploy. |
| `.env.local` | API keys used by the `tools/` scripts (not committed). Stays at the root. |

## Conventions for scripts

- **Run tools from the repo root**, e.g. `python3 tools/generators/gen_one.py`. The scripts use CWD-relative paths (`theethicsreporter.com/data/posts.json`, `.env.local`), so the root must be your working directory.
- Old scripts may reference pre-reorg root paths like `posts.json` or `public/images/...`. Those now live at `data/posts.json` and `archive/legacy-public/images/...`. These scripts are one-shot historical generators — if you rerun one, update its paths first.

## Deploying

Deploy from `theethicsreporter.com/` with the Vercel CLI (`theethicsreporter.com/` is linked to the Vercel project). Every deploy statically regenerates all articles, so batch content changes when you can.
