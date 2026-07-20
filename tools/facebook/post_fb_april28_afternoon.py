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

message = "NEW OPINION: The Self-Preservation Sanction: How Courts Use \"Ethics\" to Gatekeep AI.\n\nThe aggressive sanctions against lawyers using AI and the frantic rewriting of ethics rules aren’t about protecting the public from \"hallucinations\"—they are acts of institutional self-preservation by a legal monopoly desperate to maintain its gatekeeping power and protect the billable hour.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/28/self-preservation-sanction-courts-gatekeep-ai-20260428/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
