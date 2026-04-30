import json
import requests
import sys

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
except Exception as e:
    print(f"Failed to load credentials: {e}")
    sys.exit(1)

message = "NEW OPINION: The Sanctions Charade: How Courts Are Weaponizing Ethics to Gatekeep AI\n\nCourts and bar associations are weaponizing ethics rules and levying draconian sanctions against lawyers using AI—including a recent $30,000 fine and career-ending disqualifications. This isn’t about protecting clients; it is a desperate act of institutional self-preservation by a legal monopoly terrified that technology will expose the exorbitant cost and routine nature of their “artisanal” work.\n\nRead the full commentary on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/29/ai-gatekeeping-courts-use-sanctions-as-self-preservation-2026/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
