---
published_at: "2026-06-08T10:00:00Z"
slug: "tata-electronics-ransomware"
author: "The Breakdown Desk"
---
# Supabase Insert JSON â€” Tata Electronics Ransomware

## Ready to Execute

```json
{
  "title": "630GB of Secrets: How a Ransomware Gang Stole Apple's iPhone Specs and Tesla's Trade Secrets Through an Indian Factory",
  "slug": "tata-electronics-ransomware-apple-tesla-trade-secrets",
  "category": "Technology",
  "summary": "A ransomware group stole 630GB of data from Tata Electronics â€” Apple's primary iPhone assembler in India. The haul includes Apple iPhone specs, Tesla trade secrets, and employee passports. The supply chain attack exposes India's manufacturing security crisis.",
  "status": "published",
  "fact_check_image": "",
  "fact_check_image_caption": "",
  "author": "The Breakdown",
  "read_time": 12,
  "tags": ["ransomware", "Tata Electronics", "Apple", "Tesla", "cybersecurity", "supply chain", "India", "Make in India", "World Leaks", "data breach"]
}
```

## Content Field

The HTML content is stored in `stories/tata-electronics-ransomware/tata-electronics-ransomware.html`.

## Publishing Steps

1. Upload hero image to Supabase bucket `story-images`
2. Update `fact_check_image` with the storage URL
3. Execute the INSERT with the content from the HTML file
4. Verify live at `https://thebreakdown.in/story/tata-electronics-ransomware-apple-tesla-trade-secrets`

## Supabase REST API Command

```bash
curl -X PATCH "https://lvfovvidtowadmnggzzf.supabase.co/rest/v1/stories?slug=eq.tata-electronics-ransomware-apple-tesla-trade-secrets" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Zm92dmlkdG93YWRtbmdnenpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTk1MzA0MSwiZXhwIjoyMDk3NTI5MDQxfQ.quqP46xJKvhKf7JUEzezzcC2gqxa5Z4Y9sLNUvLlWaY" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Zm92dmlkdG93YWRtbmdnenpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTk1MzA0MSwiZXhwIjoyMDk3NTI5MDQxfQ.quqP46xJKvhKf7JUEzezzcC2gqxa5Z4Y9sLNUvLlWaY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"title":"630GB of Secrets: How a Ransomware Gang Stole Apple'\''s iPhone Specs and Tesla'\''s Trade Secrets Through an Indian Factory","slug":"tata-electronics-ransomware-apple-tesla-trade-secrets","category":"Technology","summary":"A ransomware group stole 630GB of data from Tata Electronics â€” Apple'\''s primary iPhone assembler in India. The haul includes Apple iPhone specs, Tesla trade secrets, and employee passports.","status":"published","author":"The Breakdown","read_time":12,"tags":["ransomware","Tata Electronics","Apple","Tesla","cybersecurity","supply chain","India","Make in India","World Leaks","data breach"]}'
```
