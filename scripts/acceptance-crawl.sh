#!/bin/bash
# Fix Round A acceptance crawl — run against a locally running prod build.
# Usage: bash scripts/acceptance-crawl.sh http://127.0.0.1:3100
BASE=${1:-http://127.0.0.1:3100}
URLS=$(curl -s $BASE/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<\/\?loc>//g' | sed 's|https://scottsdalegolflifestyle.com||')
total=0; bad_status=0; tw=0; comp=0; ext_img=0; badcanon=0; nodisc=0; badog=0
for u in $URLS; do
  total=$((total+1))
  body=$(curl -s -w '\n%{http_code}' "$BASE$u")
  code=$(echo "$body" | tail -1)
  html=$(echo "$body" | head -n -1)
  [ "$code" != "200" ] && { echo "STATUS $code $u"; bad_status=$((bad_status+1)); }
  echo "$html" | grep -qi 'name="twitter' && { echo "TWITTER $u"; tw=$((tw+1)); }
  echo "$html" | grep -qiE 'zillow|redfin|realtor\.com|zestimate|trulia|homes\.com' && { echo "COMPETITOR $u"; comp=$((comp+1)); }
  echo "$html" | grep -qE 'src="https://(images\.unsplash|images\.pexels|upload\.wikimedia)' && { echo "EXT-IMG $u"; ext_img=$((ext_img+1)); }
  echo "$html" | grep -o 'rel="canonical" href="[^"]*"' | grep -q 'href="https://scottsdalegolflifestyle.com' || { echo "CANONICAL $u"; badcanon=$((badcanon+1)); }
  ogcount=$(echo "$html" | grep -o 'property="og:image"' | wc -l)
  echo "$html" | grep -o 'property="og:image" content="[^"]*"' | grep -q 'https://scottsdalegolflifestyle.com/' || badog_this=1
  [ "$ogcount" != "1" ] && { echo "OGCOUNT=$ogcount $u"; badog=$((badog+1)); }
  # dollar figure without disclaimer in page
  if echo "$html" | sed 's/<script[^>]*>.*<\/script>//g' | grep -q '\$[0-9]'; then
    echo "$html" | grep -q 'Figures are illustrative ranges' || { echo "NO-DISCLAIMER $u"; nodisc=$((nodisc+1)); }
  fi
done
echo "===================="
echo "total=$total bad_status=$bad_status twitter=$tw competitor=$comp ext_img=$ext_img bad_canonical=$badcanon og_not_single=$badog no_disclaimer=$nodisc"
# (extended checks appended 2026-09-02: AdSense/branding pass)
