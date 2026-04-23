import json
import requests

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

    message = "NEW OPINION: The Cartel's Last Stand — How the Legal Profession is Weaponizing Sanctions to Gatekeep Artificial Intelligence.\n\nIn the first quarter of 2026, U.S. courts imposed over $145,000 in sanctions on attorneys for AI-related errors. But this sudden enforcement surge isn't about protecting the legal record—it's a desperate act of institutional self-preservation by a legal cartel terrified of technological obsolescence.\n\nRead the full commentary and analysis on The Ethics Reporter."
    link = "https://theethicsreporter.com/2026/04/22/courts-weaponizing-sanctions-gatekeep-ai-2026/"

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
