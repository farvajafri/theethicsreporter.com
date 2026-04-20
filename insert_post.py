import json
import subprocess
from datetime import datetime, timezone

# Load content
with open('/Users/farvascott/code/theethicsreporter/afternoon-post.html', 'r') as f:
    content = f.read()

slug = 'courts-weaponize-ethics-against-ai-2026'
title = 'The Gatekeepers\' Panic: How Courts Are Weaponizing Sanctions to Protect the Legal Cartel from AI'
now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')
excerpt = '<p>Courts and bar associations are frantically issuing bans and sanctions against lawyers using AI. But beneath the guise of protecting the public from "hallucinations" lies a cynical reality: the legal profession is weaponizing ethics rules to preserve its monopoly and prevent the commoditization of legal work.</p>'

# Update posts.json
posts_path = '/Users/farvascott/code/theethicsreporter/site/data/posts.json'
with open(posts_path, 'r') as f:
    posts = json.load(f)

new_id = max(post['id'] for post in posts) + 1 if posts else 1

new_post = {
    'id': new_id,
    'title': title,
    'slug': slug,
    'date': now,
    'modified': now,
    'content': content,
    'excerpt': excerpt,
    'link': f'https://theethicsreporter.com/2026/04/20/{slug}/',
    'status': 'publish',
    'featured_image': f'/images/posts/{slug}.jpg',
    'categories': [1],
    'tags': ['AI', 'Legal Ethics', 'Sanctions', 'Courts']
}

posts.insert(0, new_post)

with open(posts_path, 'w') as f:
    json.dump(posts, f, indent=2)

# Update tab-articles.json (often requires just title, slug, excerpt, date)
tab_path = '/Users/farvascott/code/theethicsreporter/site/data/tab-articles.json'
with open(tab_path, 'r') as f:
    tabs = json.load(f)

new_tab = {
    'id': new_id,
    'title': title,
    'slug': slug,
    'date': now,
    'excerpt': excerpt,
    'category': 'Opinion'
}

tabs.insert(0, new_tab)
with open(tab_path, 'w') as f:
    json.dump(tabs, f, indent=2)

print(f"Added post {new_id} - {title}")
