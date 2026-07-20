import json
import requests

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

    message = "NEW OPINION: The Disciplinary Cartel: How Courts Weaponize Ethics to Protect the Legal Monopoly from AI.\n\nThe recent wave of sanctions against lawyers for 'AI hallucinations' isn't about protecting the public—it's an institutional self-preservation tactic by a legal cartel terrified of obsolescence.\n\nRead the full commentary and analysis here:"
    link = "https://theethicsreporter.com/2026/04/25/ai-gatekeeping-courts-cartel-preservation-202604250014/"

    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    payload = {
        'message': message,
        'link': link,
        'access_token': page_token
    }

    response = requests.post(url, data=payload)
    print("FB Response:", response.json())
except Exception as e:
    print("Failed to post to FB:", str(e))
