import json
import requests

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

    message = "NEW OPINION: The Legal Cartel's Desperate Stand.\n\nIn the first quarter of 2026, courts and state bars have launched an aggressive campaign against lawyers using generative AI, citing 'hallucinations' and the sanctity of the judicial record. But is it really about protecting the record, or is it institutional self-preservation?\n\nCourts are weaponizing sanctions and ethics rules as a blunt instrument to gatekeep artificial intelligence and preserve the billable hour.\n\nRead our sharp commentary on The Ethics Reporter:"
    link = "https://theethicsreporter.com/2026/04/27/courts-weaponize-sanctions-ai-preservation-april2026/"

    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    payload = {
        'message': message,
        'link': link,
        'access_token': page_token
    }

    response = requests.post(url, data=payload)
    print("FB API Response:", response.json())

except Exception as e:
    print(f"Failed to post to FB: {e}")
