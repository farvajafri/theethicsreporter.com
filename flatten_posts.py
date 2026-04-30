import json
with open('/Users/farvascott/code/theethicsreporter/site/data/posts.json', 'r') as f:
    posts = json.load(f)

for p in posts:
    if isinstance(p.get('title'), dict) and 'rendered' in p['title']:
        p['title'] = p['title']['rendered']
    if isinstance(p.get('content'), dict) and 'rendered' in p['content']:
        p['content'] = p['content']['rendered']
    if isinstance(p.get('excerpt'), dict) and 'rendered' in p['excerpt']:
        p['excerpt'] = p['excerpt']['rendered']

with open('/Users/farvascott/code/theethicsreporter/site/data/posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Flattened posts.json")
