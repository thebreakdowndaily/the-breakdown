<#
.SYNOPSIS
  Re-host all external images (Unsplash, Wikimedia, Reuters) to Supabase storage
  and update story records with new Supabase URLs.

.DESCRIPTION
  Scans all published stories for externally-hosted images and:
  1. Downloads each image to a temp directory
  2. Uploads to Supabase storage bucket (story-images)
  3. Updates the story record's fact_check_image in Supabase

  Prints a summary of what was done.
#>

$ErrorActionPreference = "Continue"
$VerbosePreference = "Continue"

# ─── Load credentials ───────────────────────────────────────────────
$envFile = Join-Path $PSScriptRoot "..\fact-check-cms\.env"
if (-not (Test-Path $envFile)) {
  Write-Error "Cannot find .env at $envFile"
  exit 1
}

$supabaseUrl = $null
$serviceKey  = $null
Get-Content $envFile | ForEach-Object {
  if ($_ -match '^SUPABASE_URL=(.+)$')       { $supabaseUrl   = $matches[1].Trim().Trim('"',"'") }
  if ($_ -match '^SUPABASE_SERVICE_KEY=(.+)$') { $serviceKey  = $matches[1].Trim().Trim('"',"'") }
}
if (-not $supabaseUrl -or -not $serviceKey) {
  Write-Error "Could not load SUPABASE_URL or SUPABASE_SERVICE_KEY from .env"
  exit 1
}

$headers = @{
  "Authorization" = "Bearer $serviceKey"
  "apikey"        = "$serviceKey"
  "Content-Type"  = "application/json"
}

$baseStorageUrl = "$supabaseUrl/storage/v1/object/public/story-images"

# ─── Temp dir ───────────────────────────────────────────────────────
$tmpDir = Join-Path $env:TEMP "newsjack-rehost-$(Get-Random)"
New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
Write-Host "Temp dir: $tmpDir" -ForegroundColor Cyan

$global:updated  = 0
$global:skipped  = 0
$global:failed   = 0

# ─── Helper: download → upload → update ────────────────────────────
function Rehost-Image {
  param(
    [string]$Slug,
    [string]$SourceUrl,
    [string]$SupabaseFileName   # plain filename, e.g. "hero-neet-2026.jpg"
  )
  
  $localPath = Join-Path $tmpDir $SupabaseFileName
  $destUrl = "$baseStorageUrl/$SupabaseFileName"
  
  Write-Host "`n[$Slug]" -ForegroundColor Yellow
  
  # 1) Download
  try {
    Write-Host "  Downloading: $SourceUrl"
    curl.exe -sL -o "$localPath" "$SourceUrl" 2>&1 | Out-Null
    if ((Get-Item $localPath -ErrorAction SilentlyContinue).Length -eq 0) {
      throw "Downloaded file is empty or missing"
    }
    $size = (Get-Item $localPath).Length
    Write-Host "  Downloaded: $([math]::Round($size/1KB, 1)) KB" -ForegroundColor Green
  } catch {
    Write-Host "  FAILED to download: $_" -ForegroundColor Red
    $global:failed++
    return
  }
  
  # 2) Upload to Supabase (upsert)
  try {
    $uploadHeaders = @{
      "Authorization" = "Bearer $serviceKey"
      "apikey"        = "$serviceKey"
      "Content-Type"  = "image/jpeg"
      "x-upsert"      = "true"
    }
    
    # Detect content type
    $ext = [System.IO.Path]::GetExtension($SupabaseFileName).ToLower()
    if ($ext -eq ".svg") { $uploadHeaders["Content-Type"] = "image/svg+xml" }
    if ($ext -eq ".png") { $uploadHeaders["Content-Type"] = "image/png" }
    if ($ext -eq ".avif") { $uploadHeaders["Content-Type"] = "image/avif" }
    if ($ext -eq ".webp") { $uploadHeaders["Content-Type"] = "image/webp" }
    
    # Use curl to upload binary file (Invoke-RestMethod has issues with binary)
    $uploadUrl = "$supabaseUrl/storage/v1/object/story-images/$SupabaseFileName"
    $uploadResult = curl.exe -s -X PUT "$uploadUrl" `
      -H "Authorization: Bearer $serviceKey" `
      -H "apikey: $serviceKey" `
      -H "Content-Type: $($uploadHeaders['Content-Type'])" `
      --data-binary "@$localPath" 2>&1
    
    if ($LASTEXITCODE -ne 0) {
      throw "curl upload failed (exit $LASTEXITCODE): $uploadResult"
    }
    
    Write-Host "  Uploaded to: $destUrl" -ForegroundColor Green
  } catch {
    Write-Host "  FAILED to upload: $_" -ForegroundColor Red
    $global:failed++
    return
  }
  
  # 3) Update story record
  try {
    $body = @{ "fact_check_image" = $destUrl } | ConvertTo-Json
    $updateResult = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/stories?slug=eq.$Slug" `
      -Headers $headers -Method Patch -Body $body
    Write-Host "  Story record updated ✓" -ForegroundColor Green
    $global:updated++
  } catch {
    Write-Host "  FAILED to update story record: $_" -ForegroundColor Red
    $global:failed++
  }
}

# ─── Define all external images ─────────────────────────────────────
$externalImages = @(
  # ── Unsplash (13) ──
  @{ Slug='neet-2026-exam-that-broke-india';  Source='https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&h=630&fit=crop';     File='hero-neet-2026.jpg' },
  @{ Slug='kunal-shah-meta-story-2026';        Source='https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop';         File='hero-kunal-shah.jpg' },
  @{ Slug='canada-social-media-ban-under-16';  Source='https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop';     File='hero-canada-social-media.jpg' },
  @{ Slug='tata-electronics-ransomware-apple-tesla-trade-secrets'; Source='https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=630&fit=crop'; File='tata-hero.jpg' },
  @{ Slug='mohan-yadav-ujjain-land-scam';      Source='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop';         File='hero-mohan-yadav.jpg' },
  @{ Slug='india-us-trade-deal-2026';           Source='https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=1200&h=630&fit=crop';      File='hero-india-us-trade.jpg' },
  @{ Slug='us-iran-80b-pentagon-war-cost';      Source='https://images.unsplash.com/photo-1600626292260-6a2c90bfa3e3?w=1200&h=630&fit=crop';      File='hero-iran-80b.jpg' },
  @{ Slug='reuters-digital-news-report-2026-india-trust-crisis'; Source='https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1200&h=630&fit=crop'; File='hero-trust-news.jpg' },
  @{ Slug='lucknow-fire-tragedy';               Source='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1200&h=630&fit=crop';      File='hero-lucknow-fire.jpg' },
  @{ Slug='el-nino-2026';                       Source='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=630&fit=crop';      File='hero-el-nino.jpg' },
  @{ Slug='india-digital-regulation-offensive-2026-dpdp-it-rules-crypto'; Source='https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop'; File='hero-digital-regulation.jpg' },
  @{ Slug='anthropic-mythos-ai-2026';           Source='https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop';      File='hero-anthropic-ai.jpg' },
  @{ Slug='china-lineshine-supercomputer-top500-2026'; Source='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop'; File='hero-china-supercomputer.jpg' },
  
  # ── Wikimedia (6) ──
  @{ Slug='modi-cabinet-reshuffle-2026';        Source='https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Third_Modi_Ministry_First_Meeting.jpg/1200px-Third_Modi_Ministry_First_Meeting.jpg'; File='third-modi-ministry-meeting.jpg' },
  @{ Slug='india-ai-governance-guidelines-impact-summit-2026'; Source='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Narendra_Modi_AI_Summit_2025.jpg/1200px-Narendra_Modi_AI_Summit_2025.jpg'; File='modi-ai-summit-2025.jpg' },
  @{ Slug='doval-wang-india-china-lac-normalisation-june-2026'; Source='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/India_and_China_Flag.jpg/1200px-India_and_China_Flag.jpg'; File='india-china-flags.jpg' },
  @{ Slug='rbi-monsoon-warning-growth-inflation-outlook-june-2026'; Source='https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/RBI-Tower.jpg/1200px-RBI-Tower.jpg'; File='rbi-tower-mumbai.jpg' },
  @{ Slug='drone-threat-intelligence-reset-jk-northeast-2026'; Source='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_Army_drone_countermeasure.jpg/1200px-Indian_Army_drone_countermeasure.jpg'; File='indian-army-drone-countermeasure.jpg' },
  @{ Slug='tmc-implosion-ndpi-merger-2026';     Source='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mamata_Banerjee_-_Kolkata_2018-04-25_0484.jpg/1200px-Mamata_Banerjee_-_Kolkata_2018-04-25_0484.jpg'; File='mamata-banerjee-portrait.jpg' },
  
  # ── Reuters (1) ──
  @{ Slug='cbi-operation-chakra-vi-digital-arrest'; Source='https://www.reuters.com/resizer/v2/LRPG3CEJTJJL7GWHXV6A6NE7TQ.jpg?auth=110909df4e9aaf31e72504ad2e900f81101dcfc3cfe08536fd8ca58ec047e6aa&height=630&width=1200&quality=80&smart=true'; File='cbi-digital-arrest-reuters.jpg' }
)

# ─── Execute ────────────────────────────────────────────────────────
Write-Host "=== Re-hosting $($externalImages.Count) external images to Supabase ===" -ForegroundColor Cyan
Write-Host "Target bucket: story-images" -ForegroundColor Cyan
Write-Host ""

foreach ($img in $externalImages) {
  Rehost-Image -Slug $img.Slug -SourceUrl $img.Source -SupabaseFileName $img.File
}

# ─── Summary ────────────────────────────────────────────────────────
Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "  Updated:  $global:updated"
Write-Host "  Skipped:  $global:skipped"
Write-Host "  Failed:   $global:failed"
Write-Host "=========================================" -ForegroundColor Cyan

# Cleanup
Remove-Item -Path $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Temp dir cleaned up." -ForegroundColor Gray

if ($global:failed -gt 0) {
  exit 1
}
exit 0
