import json

json_path = '/Users/farvascott/code/theethicsreporter/site/data/posts.json'
with open(json_path, 'r') as f:
    posts = json.load(f)

print(posts[0].keys())
