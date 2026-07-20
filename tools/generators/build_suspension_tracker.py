#!/usr/bin/env python3
"""Build the suspension guide tracker JSON."""
import json

professions = [
    {"name": "Attorney", "slug": "attorney"},
    {"name": "Doctor", "slug": "doctor"},
    {"name": "Nurse", "slug": "nurse"},
    {"name": "Real Estate Agent", "slug": "real-estate-agent"},
    {"name": "Teacher", "slug": "teacher"},
    {"name": "CPA / Accountant", "slug": "cpa-accountant"},
    {"name": "Social Worker", "slug": "social-worker"},
    {"name": "Pharmacist", "slug": "pharmacist"},
    {"name": "Dentist", "slug": "dentist"},
    {"name": "Chiropractor", "slug": "chiropractor"},
    {"name": "Financial Advisor", "slug": "financial-advisor"},
    {"name": "Contractor", "slug": "contractor"},
]

states = [
    {"name": "California", "slug": "california", "abbr": "CA"},
    {"name": "Texas", "slug": "texas", "abbr": "TX"},
    {"name": "Florida", "slug": "florida", "abbr": "FL"},
    {"name": "New York", "slug": "new-york", "abbr": "NY"},
    {"name": "Illinois", "slug": "illinois", "abbr": "IL"},
    {"name": "Pennsylvania", "slug": "pennsylvania", "abbr": "PA"},
    {"name": "Ohio", "slug": "ohio", "abbr": "OH"},
    {"name": "Georgia", "slug": "georgia", "abbr": "GA"},
    {"name": "Michigan", "slug": "michigan", "abbr": "MI"},
    {"name": "North Carolina", "slug": "north-carolina", "abbr": "NC"},
    {"name": "New Jersey", "slug": "new-jersey", "abbr": "NJ"},
    {"name": "Virginia", "slug": "virginia", "abbr": "VA"},
    {"name": "Washington", "slug": "washington", "abbr": "WA"},
    {"name": "Arizona", "slug": "arizona", "abbr": "AZ"},
    {"name": "Massachusetts", "slug": "massachusetts", "abbr": "MA"},
    {"name": "Tennessee", "slug": "tennessee", "abbr": "TN"},
    {"name": "Indiana", "slug": "indiana", "abbr": "IN"},
    {"name": "Missouri", "slug": "missouri", "abbr": "MO"},
    {"name": "Maryland", "slug": "maryland", "abbr": "MD"},
    {"name": "Wisconsin", "slug": "wisconsin", "abbr": "WI"},
    {"name": "Colorado", "slug": "colorado", "abbr": "CO"},
    {"name": "Minnesota", "slug": "minnesota", "abbr": "MN"},
    {"name": "South Carolina", "slug": "south-carolina", "abbr": "SC"},
    {"name": "Alabama", "slug": "alabama", "abbr": "AL"},
    {"name": "Louisiana", "slug": "louisiana", "abbr": "LA"},
    {"name": "Kentucky", "slug": "kentucky", "abbr": "KY"},
    {"name": "Oregon", "slug": "oregon", "abbr": "OR"},
    {"name": "Oklahoma", "slug": "oklahoma", "abbr": "OK"},
    {"name": "Connecticut", "slug": "connecticut", "abbr": "CT"},
    {"name": "Utah", "slug": "utah", "abbr": "UT"},
    {"name": "Iowa", "slug": "iowa", "abbr": "IA"},
    {"name": "Nevada", "slug": "nevada", "abbr": "NV"},
    {"name": "Arkansas", "slug": "arkansas", "abbr": "AR"},
    {"name": "Mississippi", "slug": "mississippi", "abbr": "MS"},
    {"name": "Kansas", "slug": "kansas", "abbr": "KS"},
    {"name": "New Mexico", "slug": "new-mexico", "abbr": "NM"},
    {"name": "Nebraska", "slug": "nebraska", "abbr": "NE"},
    {"name": "Idaho", "slug": "idaho", "abbr": "ID"},
    {"name": "West Virginia", "slug": "west-virginia", "abbr": "WV"},
    {"name": "Hawaii", "slug": "hawaii", "abbr": "HI"},
    {"name": "New Hampshire", "slug": "new-hampshire", "abbr": "NH"},
    {"name": "Maine", "slug": "maine", "abbr": "ME"},
    {"name": "Montana", "slug": "montana", "abbr": "MT"},
    {"name": "Rhode Island", "slug": "rhode-island", "abbr": "RI"},
    {"name": "Delaware", "slug": "delaware", "abbr": "DE"},
    {"name": "South Dakota", "slug": "south-dakota", "abbr": "SD"},
    {"name": "North Dakota", "slug": "north-dakota", "abbr": "ND"},
    {"name": "Alaska", "slug": "alaska", "abbr": "AK"},
    {"name": "Vermont", "slug": "vermont", "abbr": "VT"},
    {"name": "Wyoming", "slug": "wyoming", "abbr": "WY"},
]

articles = []
for prof in professions:
    for state in states:
        slug = f"suspended-{prof['slug']}-license-{state['slug']}-what-to-do"
        articles.append({
            "profession": prof["name"],
            "profession_slug": prof["slug"],
            "state": state["name"],
            "state_slug": state["slug"],
            "state_abbr": state["abbr"],
            "article_slug": slug,
            "status": "pending"
        })

tracker = {
    "description": "State-by-state profession-by-profession guide: what to do after license suspension",
    "series": "suspended-license-state-guide-2026",
    "total": len(articles),
    "articles": articles
}

with open('/Users/farvascott/code/theethicsreporter/suspended-license-tracker.json', 'w') as f:
    json.dump(tracker, f, indent=2)

print(f"✅ Built tracker: {len(articles)} articles ({len(professions)} professions × {len(states)} states)")
print("First:", articles[0]['article_slug'])
print("Last: ", articles[-1]['article_slug'])
