import json
from datetime import datetime, timezone

json_path = '/Users/farvascott/code/theethicsreporter/site/data/posts.json'
with open(json_path, 'r') as f:
    posts = json.load(f)

slug = 'courts-weaponizing-sanctions-gatekeep-ai-2026'
title = "The Cartel's Last Stand: How the Legal Profession is Weaponizing Sanctions to Gatekeep Artificial Intelligence"
now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')

with open('/Users/farvascott/code/theethicsreporter/write_afternoon.py', 'r') as f:
    code = f.read()
    
content_start = code.find('content = """') + 13
content_end = code.find('"""\n\nexcerpt =')
content = code[content_start:content_end]

excerpt = '<p>In the first quarter of 2026, U.S. courts imposed over $145,000 in sanctions on attorneys for AI-related errors. But this sudden enforcement surge isn\'t about protecting the legal record—it\'s a desperate act of institutional self-preservation by a legal cartel terrified of technological obsolescence.</p>'

new_id = max((post.get('id', 0) for post in posts), default=0) + 1

new_post = {
    'id': new_id,
    'title': title,
    'slug': slug,
    'date': now,
    'modified': now,
    'content': content,
    'excerpt': excerpt,
    'link': f'https://theethicsreporter.com/2026/04/22/{slug}/',
    'status': 'publish',
    'featured_image': f'/images/posts/{slug}.jpg',
    'categories': [1],
    'tags': ['AI', 'Courts', 'Sanctions', 'Gatekeeping', 'Legal Tech']
}

posts.insert(0, new_post)

with open(json_path, 'w') as f:
    json.dump(posts, f, indent=4)

print(f"Added post {new_id} - {title}")
