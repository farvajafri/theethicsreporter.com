import json
import requests
import sys

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

with open('/Users/farvascott/code/theethicsreporter/theethicsreporter.com/data/posts.json', 'r') as f:
    posts = json.load(f)

# Find parts 1 to 6
for i in range(1, 7):
    prefix = f"Part {i}:"
    post = next((p for p in posts if p['title'].startswith(prefix) or p['title'].startswith(f"Part {i} ")), None)
    if not post:
        print(f"Could not find Part {i} in posts.json")
        continue
    
    url_fb = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    link = post['link']
    message = f"Part {i} of our 10-part exposé: {post['title']}\n\nRead the full investigation at The Ethics Reporter."
    
    print(f"Posting Part {i}...")
    res = requests.post(url_fb, data={
        'message': message,
        'link': link,
        'access_token': page_token
    })
    print(res.json())

