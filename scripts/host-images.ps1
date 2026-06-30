param(
  [switch]$All,       # Scan all stories
  [string]$Slug,      # Specific story slug
  [switch]$DryRun     # Show what would be done without making changes
)

# ============================================================
#  host-images.ps1 — Auto-detect hotlinked images,
#  download them, upload to Supabase storage, update story.
# ============================================================

$ErrorActionPreference = 'Stop'

function Write-Step($s) { Write-Host "`n>>> $s" -ForegroundColor Cyan }
function Write-OK($s) { Write-Host "  [OK] $s" -ForegroundColor Green }
function Write-Warn($s) { Write-Host "  [WARN] $s" -ForegroundColor Yellow }
function Write-Err($s) { Write-Host "  [ERR] $s" -ForegroundColor Red }

# Blocked image patterns that will 403/400 in production
$BLOCKED_PATTERNS = @(
  'dims\.apnews\.com',
  '90/\?url='
)

# Known-good image domains that work when hotlinked
$TRUSTED_DOMAINS = @(
  'reuters.com',
  'reuters-resizer.com',
  'supabase.co',
  'thebreakdown.in'
)

# Load Supabase credentials
$rootDir = Resolve-Path "$PSScriptRoot\.."
$envFile = Join-Path $rootDir "fact-check-cms\.env"
$supabaseUrl = $null
$serviceKey = $null

if (Test-Path $envFile) {
  $envVars = Get-Content $envFile
  foreach ($line in $envVars) {
    if ($line -match '^SUPABASE_URL=(.+)$') { $supabaseUrl = $matches[1].Trim().Trim('"', "'") }
    if ($line -match '^SUPABASE_SERVICE_KEY=(.+)$') { $serviceKey = $matches[1].Trim().Trim('"', "'") }
  }
}

if (-not $supabaseUrl -or -not $serviceKey) {
  Write-Err "SUPABASE_URL and SUPABASE_SERVICE_KEY required in fact-check-cms/.env"
  exit 1
}

$headers = @{ "Authorization" = "Bearer $serviceKey"; "apikey" = "$serviceKey"; "Content-Type" = "application/json" }

# Determine which stories to scan
Write-Step "Fetching stories from CMS"
if ($Slug) {
  $filter = "&slug=eq.$Slug"
} else {
  $filter = "&status=eq.published"
}

try {
  $stories = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/stories?select=id,title,slug,fact_check_image,og_image,fact_check_image_caption$filter" -Headers $headers -ErrorAction Stop
} catch {
  Write-Err "Failed to fetch stories: $_"
  exit 1
}

if (-not $stories -or $stories.Count -eq 0) {
  Write-Warn "No stories found"
  exit 0
}

Write-OK "Found $($stories.Count) stories"

$tmpDir = Join-Path $env:TEMP "thebreakdown-image-hosting"
New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

$totalFixed = 0
$totalSkipped = 0

foreach ($story in $stories) {
  $imageUrl = $story.fact_check_image
  $ogImage = $story.og_image

  if (-not $imageUrl -and -not $ogImage) {
    $totalSkipped++
    continue
  }

  # Check if image URL is from a blocked/hotlinked domain
  $isBlocked = $false
  foreach ($pattern in $BLOCKED_PATTERNS) {
    if ($imageUrl -match $pattern -or $ogImage -match $pattern) {
      $isBlocked = $true
      break
    }
  }

  if (-not $isBlocked) {
    $totalSkipped++
    continue
  }

  Write-Step "Processing: $($story.slug)"

  # Extract the raw image URL from AP's dims proxy
  $rawUrl = $imageUrl
  if ($imageUrl -match '\?url=(https?%3A[^&]+)') {
    $rawUrl = [System.Net.WebUtility]::UrlDecode($matches[1])
  } elseif ($imageUrl -match '\?url=(https?://[^&]+)') {
    $rawUrl = $matches[1]
  }

  Write-Host "  Original: $($imageUrl.Substring(0, [Math]::Min(80, $imageUrl.Length)))" -ForegroundColor Gray
  Write-Host "  Raw:      $($rawUrl.Substring(0, [Math]::Min(80, $rawUrl.Length)))" -ForegroundColor Gray

  if ($DryRun) {
    Write-Warn "[DRY RUN] Would download and re-host this image"
    continue
  }

  # Download the raw image
  $ext = "jpg"
  if ($rawUrl -match '\.(png|jpeg|jpg|gif|webp)(\?|$)') { $ext = $matches[1] }
  $localFile = Join-Path $tmpDir "$($story.slug).$ext"

  try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    $wc.DownloadFile($rawUrl, $localFile)
    Write-OK "Downloaded ($(Get-Item $localFile | Select-Object -ExpandProperty Length) bytes)"
  } catch {
    Write-Err "Download failed: $_"
    continue
  }

  # Upload to Supabase
  $filename = "$($story.slug)-$(Get-Random -Maximum 9999).$ext"
  $uploadUrl = "$supabaseUrl/storage/v1/object/story-images/$filename"

  try {
    $fileBytes = [System.IO.File]::ReadAllBytes($localFile)
    $uploadHeaders = @{ "Authorization" = "Bearer $serviceKey"; "Content-Type" = "image/jpeg" }
    if ($ext -eq "png") { $uploadHeaders["Content-Type"] = "image/png" }
    if ($ext -eq "gif") { $uploadHeaders["Content-Type"] = "image/gif" }
    if ($ext -eq "webp") { $uploadHeaders["Content-Type"] = "image/webp" }

    Invoke-RestMethod -Uri $uploadUrl -Method Put -Headers $uploadHeaders -Body $fileBytes -ContentType $uploadHeaders["Content-Type"] -ErrorAction Stop | Out-Null
    Write-OK "Uploaded to Supabase: $filename"
  } catch {
    Write-Err "Upload failed: $_"
    Remove-Item $localFile -Force -ErrorAction SilentlyContinue
    continue
  }

  # Update story record
  $newUrl = "$supabaseUrl/storage/v1/object/public/story-images/$filename"
  $updateBody = @{
    "fact_check_image" = $newUrl
    "og_image" = $newUrl
  } | ConvertTo-Json

  try {
    Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/stories?id=eq.$($story.id)" -Method Patch -Headers $headers -Body $updateBody -ErrorAction Stop | Out-Null
    Write-OK "Story updated with new image URL"
    $totalFixed++
  } catch {
    Write-Err "Story update failed: $_"
  }

  # Cleanup temp file
  Remove-Item $localFile -Force -ErrorAction SilentlyContinue
}

# Cleanup temp dir
Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Total stories scanned: $($stories.Count)" -ForegroundColor Gray
Write-Host "  Skipped (already clean): $totalSkipped" -ForegroundColor Gray
Write-Host "  Fixed: $totalFixed" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
