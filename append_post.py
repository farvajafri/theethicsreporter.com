import json
from datetime import datetime

with open('/Users/farvascott/code/theethicsreporter/essay_final.html', 'r') as f:
    content = f.read()

posts_file = '/Users/farvascott/code/theethicsreporter/posts.json'
with open(posts_file, 'r') as f:
    posts = json.load(f)

# Sort by id just to be sure of max
max_id = max([p.get('id', 0) for p in posts]) if posts else 0
new_id = max_id + 1

date_str = "2026-05-01T07:13:00"

excerpt = "<p>The marble flooring of the appellate moot courtroom at a mid-tier midwestern law school gleams with the kind of institutional permanence that only a massive endowment—or an unbroken pipeline of federal student loan money—can buy. But as AI hollows out the legal profession, is the promise of the law degree now just an expensive illusion?</p>\n"

title = "The Paper Chase Is Over: How the Law School Machine Is Selling an Illusion in the Age of AI"
slug = "law-school-machine-selling-illusion-age-of-ai"

new_post = {
    "id": new_id,
    "title": title,
    "slug": slug,
    "date": date_str,
    "modified": date_str,
    "content": content,
    "excerpt": excerpt,
    "link": f"https://theethicsreporter.com/2026/05/01/{slug}/",
    "status": "publish",
    "featured_image": None,
    "categories": [1],
    "tags": []
}

# The latest posts in the JSON seemed to be at the end, let's just append it.
posts.append(new_post)

with open(posts_file, 'w') as f:
    json.dump(posts, f, indent=2)

print(f"Successfully added post ID {new_id}")
