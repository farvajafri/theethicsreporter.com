import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Protectionist Panic: How the Legal Establishment Uses 'Ethics' to Gatekeep AI.\n\nCourts and bar associations are heavily sanctioning lawyers for AI hallucinations, but it has nothing to do with protecting the public. It is institutional self-preservation by a legal monopoly terrified of losing the billable hour to technological efficiency. While humans routinely make similar errors with minimal consequences, the justice system is using disciplinary rules to crush AI and protect their pricing power.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/26/ai-gatekeeping-sanctions-courts-legal-profession-self-preservation-2026/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
