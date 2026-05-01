import json
import urllib.request
import urllib.parse
import sys

def post_to_facebook():
    try:
        with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
            creds = json.load(f)
            
        page_id = None
        access_token = None
        
        for p in creds.get('pages', []):
            if 'Ethics' in p.get('name', ''):
                page_id = p.get('id')
                access_token = p.get('access_token')
                break
                
        if not page_id or not access_token:
            print("Could not find page ID or access token for The Ethics Reporter")
            return False

        message = "New Essay: The Paper Chase Is Over: How the Law School Machine Is Selling an Illusion in the Age of AI\n\nThe law school crisis is no longer just about the cost of attendance. It is about the sale of an illusion. The institutions minting thousands of new lawyers every year are operating on a mid-twentieth-century industrial model, entirely unequipped—or willfully refusing—to acknowledge that the foundational economics of their profession have been permanently rewritten by artificial intelligence.\n\nRead the full investigation at The Ethics Reporter.\n\nhttps://theethicsreporter.com/2026/05/01/law-school-machine-selling-illusion-age-of-ai/"
        
        url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
        data = urllib.parse.urlencode({
            'message': message,
            'access_token': access_token,
            'link': 'https://theethicsreporter.com/2026/05/01/law-school-machine-selling-illusion-age-of-ai/'
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=data)
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print(f"Successfully posted to Facebook. Post ID: {result.get('id')}")
            return True
            
    except Exception as e:
        print(f"Failed to post to Facebook: {e}")
        return False

if __name__ == '__main__':
    post_to_facebook()
