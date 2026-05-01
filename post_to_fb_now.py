import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

access_token = None
page_id = None
for page in creds.get('pages', []):
    if page['name'] == 'The Ethics Reporter':
        access_token = page['access_token']
        page_id = page['id']
        break

if not access_token or not page_id:
    print("Could not find credentials for The Ethics Reporter")
    exit(1)

message = "NEW ESSAY: The Guild at the Gates.\n\nCourts and bar associations are increasingly weaponizing ethics rules and sanctions to protect their monopoly against AI innovation. Is the crackdown on \"hallucinated\" cases about consumer protection, or is it institutional self-preservation?\n\nRead our latest long-form investigation:"
link = "https://theethicsreporter.com/article/the-guild-at-the-gates-weaponizing-ethics-against-ai"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': access_token
}

response = requests.post(url, data=payload)
print(response.status_code)
print(response.json())
