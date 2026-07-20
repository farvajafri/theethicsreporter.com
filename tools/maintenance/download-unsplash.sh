#!/bin/bash
cd /Users/farvascott/code/theethicsreporter/theethicsreporter.com/public/images/posts

declare -a SLUGS
SLUGS[0]="doj-proposes-rule-shield-lawyers-state-bar-probes-apr02-2026"
SLUGS[1]="florida-supreme-court-disciplines-eight-attorneys-april1-2026"
SLUGS[2]="do-no-harm-civil-rights-complaint-residency-discrimination-corewell-texas-tech-h"
SLUGS[3]="ronald-edward-durbin-ii-oklahoma-attorney-disbarred-after-115-rule-violations-fi"
SLUGS[4]="ariel-mitchell-miami-attorney-suspended-75-days-for-lying-to-the-florida-bar-the"
SLUGS[5]="jianming-shen-new-york-immigration-attorney-publicly-censured-for-commingling-ne"
SLUGS[6]="omid-zareh-new-york-attorney-publicly-censured-after-federal-court-finds-legal-b"
SLUGS[7]="we-wrote-to-every-law-school-dean-in-america-heres-why"
SLUGS[8]="from-trusted-counsel-to-disbarred-the-fall-of-evie-p-jeang"
SLUGS[9]="teresa-schiele-roper-apopka-workers-compensation-attorney-suspended-after-felony"
SLUGS[10]="formal-complaint-susan-g-yellen-and-amy-m-eisenberg-new-york-attorneys-accused-o"
SLUGS[11]="inside-the-inner-circle-how-judge-david-fried-and-justice-sherri-eisenpress-buil"
SLUGS[12]="the-great-law-school-paradox-selling-a-golden-ticket-to-a-vanishing-profession"
SLUGS[13]="pasadena-attorney-renee-estelle-sanders-suspended-for-professional-misconduct"

declare -a PHOTOS
PHOTOS[0]="589829545856-d10d557cf95f"
PHOTOS[1]="575050814297-ed317d71555c"
PHOTOS[2]="507003563983-b5a1f68b5ccf"
PHOTOS[3]="589994960555-d09cf4b8f88b"
PHOTOS[4]="450101499163-c596b6f3ebf1"
PHOTOS[5]="568792923873-e3c41a991de0"
PHOTOS[6]="589829085060-d09568a30cfe"
PHOTOS[7]="497633130489-66c23e5e2043"
PHOTOS[8]="521587765099-8f5b22e5d78d"
PHOTOS[9]="432847712612-4a230f0fb9ad"
PHOTOS[10]="416405748568-f3ca1c36a005"
PHOTOS[11]="486312699619-be47accea8de"
PHOTOS[12]="524995050903-6eae19ef8e7b"
PHOTOS[13]="573497620366-8b18b6d17860"

for i in $(seq 0 13); do
    slug="${SLUGS[$i]}"
    photo="${PHOTOS[$i]}"
    echo -n "Downloading $slug... "
    curl -sL "https://images.unsplash.com/photo-${photo}?w=1200&h=630&fit=crop&q=75" -o "${slug}.jpg"
    size=$(wc -c < "${slug}.jpg" | tr -d ' ')
    if [ "$size" -gt 1000 ]; then
        echo "OK (${size} bytes)"
    else
        echo "FAIL (${size} bytes)"
    fi
done
