import json
import requests
import sys
from datetime import datetime, timezone

try:
    with open('/Users/farvascott/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)
    
    # Ethics Reporter Page ID is usually in the creds, let's find it
    page_token = None
    page_id = None
    
    for page in creds.get('pages', []):
        if 'ethics' in page.get('name', '').lower() or 'ethicsreporter' in page.get('id', ''):
            page_token = page.get('access_token')
            page_id = page.get('id')
            break
            
    if not page_token:
        # Fallback to general token if specific page not found
        page_token = creds.get('pages', [{}])[0].get('access_token')
        page_id = creds.get('pages', [{}])[0].get('id')
        
    if not page_token:
        print("No valid Facebook token found.")
        sys.exit(1)

    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')
    slug = f"ai-gatekeeping-courts-ethics-sanctions-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M')}"
    link = f"https://theethicsreporter.com/{now[:4]}/{now[5:7]}/{now[8:10]}/{slug}/"
    
    message = "NEW OPINION: The legal profession's aggressive crackdown on generative AI has nothing to do with protecting the public and everything to do with protecting its monopoly. By weaponizing ethics rules and imposing draconian standing orders, courts and bar associations are engaging in a desperate campaign of institutional self-preservation to crush the technology that threatens their billable hours.\n\nRead the full commentary here:\n" + link
    
    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    payload = {
        'message': message,
        'link': link,
        'access_token': page_token
    }
    
    response = requests.post(url, data=payload)
    print(f"FB Post Response: {response.status_code}")
    print(response.json())
except Exception as e:
    print(f"Error posting to FB: {e}")
