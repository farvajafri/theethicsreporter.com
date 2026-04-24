import json
import requests

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

    message = "NEW OPINION: The Ultimate Legal Protection Racket — Sanctioning Lawyers for AI While the Bench Demands Perfection.\n\nA recent wave of sanctions against lawyers for 'AI hallucinations' isn't about protecting the public—it's an institutional self-preservation tactic by a legal cartel terrified of obsolescence.\n\nRead the full commentary and analysis on The Ethics Reporter."
    link = "https://www.theethicsreporter.com/article/ai-hallucination-sanctions-legal-protection-racket"

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
