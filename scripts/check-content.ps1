param(
  [switch]$All,
  [switch]$Fix,
  [switch]$Verbose
)

# ============================================================
#  check-content.ps1 — Story Content Integrity Scanner
#  Verifies every published story has valid metadata,
#  alt text on images, and no broken content.
# ============================================================

$ErrorActionPreference = 'Stop'

function Write-Step($s) { Write-Host "`n>>> $s" -ForegroundColor Cyan }
function Write-OK($s) { Write-Host "  [OK] $s" -ForegroundColor Green }
function Write-Warn($s) { Write-Host "  [WARN] $s" -ForegroundColor Yellow }
function Write-Err($s) { Write-Host "  [ERR] $s" -ForegroundColor Red }
function Write-Info($s) { if ($Verbose) { Write-Host "  [INFO] $s" -ForegroundColor Gray } }

$rootDir = Resolve-Path "$PSScriptRoot\.."
$envFile = Join-Path $rootDir "fact-check-cms\.env"

# Load Supabase credentials
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

# ============================================================
# FETCH ALL PUBLISHED STORIES
# ============================================================
Write-Step "Fetching published stories"

try {
  $stories = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/stories?select=id,title,slug,fact_check_image,og_image,fact_check_image_caption,content,excerpt,published_at,author,status,meta_description,meta_keywords&status=eq.published" -Headers $headers -ErrorAction Stop
} catch {
  Write-Err "Failed to fetch stories: $_"
  exit 1
}

Write-OK "$($stories.Count) published stories to scan"

$issues = @()
$okCount = 0

foreach ($story in $stories) {
  $slug = $story.slug
  $title = $story.title
  $storyIssues = @()

  Write-Info "Checking: $slug"

  # 1. Title check
  if ([string]::IsNullOrWhiteSpace($story.title) -or $story.title -match '^Untitled|^New Story|^Article') {
    $storyIssues += "Generic/bad title: '$($story.title)'"
  }

  # 2. Excerpt check
  if ([string]::IsNullOrWhiteSpace($story.excerpt)) {
    $storyIssues += "Missing excerpt"
  } elseif ($story.excerpt.Length -lt 50) {
    $storyIssues += "Excerpt too short ($($story.excerpt.Length) chars)"
  }

  # 3. Meta description check
  if ([string]::IsNullOrWhiteSpace($story.meta_description)) {
    $storyIssues += "Missing meta_description"
  } elseif ($story.meta_description.Length -lt 80) {
    $storyIssues += "Meta description too short ($($story.meta_description.Length) chars)"
  } elseif ($story.meta_description.Length -gt 165) {
    $storyIssues += "Meta description too long ($($story.meta_description.Length) chars — max 165)"
  }

  # 4. Image check
  if ([string]::IsNullOrWhiteSpace($story.fact_check_image)) {
    $storyIssues += "Missing fact_check_image"
  } else {
    $img = $story.fact_check_image
    if ($img -match 'dims\.apnews\.com') {
      $storyIssues += "Hotlinked AP News image (will 403 in production): $($img.Substring(0, [Math]::Min(60, $img.Length)))"
    } elseif ($img -match '^http:' -or $img -notmatch '^https?://') {
      $storyIssues += "Suspicious image URL: $($img.Substring(0, [Math]::Min(60, $img.Length)))"
    } elseif ($img -match 'placehold|dummy|sample|lorem') {
      $storyIssues += "Placeholder image detected in URL"
    }
  }

  # 5. OG image check
  if ([string]::IsNullOrWhiteSpace($story.og_image)) {
    $storyIssues += "Missing og_image (no social share preview)"
  }

  # 6. Image caption check
  if ([string]::IsNullOrWhiteSpace($story.fact_check_image_caption)) {
    $storyIssues += "Missing image caption (no alt text set)"
  }

  # 7. Content check
  if ([string]::IsNullOrWhiteSpace($story.content)) {
    $storyIssues += "Missing content body"
  } elseif ($story.content.Length -lt 200) {
    $storyIssues += "Content too short ($($story.content.Length) chars)"
  } else {
    # Check for common content issues
    if ($story.content -match '(?i)(Click here|Subscribe to|Read more)') {
      Write-Info "  Content has call-to-action phrases (may be OK)"
    }
  }

  # 8. Author check
  if ([string]::IsNullOrWhiteSpace($story.author)) {
    $storyIssues += "Missing author"
  }

  # 9. Published date check
  if ([string]::IsNullOrWhiteSpace($story.published_at)) {
    $storyIssues += "Missing published_at date"
  }

  # 10. Meta keywords check
  if ([string]::IsNullOrWhiteSpace($story.meta_keywords)) {
    $storyIssues += "Missing meta_keywords (SEO impact)"
  } elseif ($story.meta_keywords.Split(',').Count -lt 3) {
    $storyIssues += "Only $($story.meta_keywords.Split(',').Count) keywords (minimum 3 recommended)"
  }

  if ($storyIssues.Count -eq 0) {
    $okCount++
    Write-Info "  PASS: $slug"
  } else {
    Write-Err "  $($storyIssues.Count) issues in '$title' ($slug):"
    $storyIssues | ForEach-Object { Write-Host "         - $_" -ForegroundColor Red }
    $issues += @{ Slug = $slug; Title = $title; Issues = $storyIssues }
  }
}

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Total stories: $($stories.Count)" -ForegroundColor Gray
Write-Host "  Clean:         $okCount" -ForegroundColor Green
Write-Host "  With issues:   $($issues.Count)" -ForegroundColor $(if ($issues.Count -gt 0) { "Red" } else { "Green" })
Write-Host "══════════════════════════════════════════════════" -ForegroundColor Cyan

if ($issues.Count -gt 0) {
  Write-Host "`nSUMMARY OF ALL ISSUES BY TYPE:" -ForegroundColor Yellow
  $typeCount = @{}
  $issues | ForEach-Object { $_.Issues | ForEach-Object { $typeCount[$_]++ } }
  $typeCount.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object {
    Write-Host "  $($_.Value)x — $($_.Key)" -ForegroundColor Yellow
  }

  Write-Host "`nNext steps:" -ForegroundColor Cyan
  Write-Host "  1. Run .\scripts\host-images.ps1 -All to fix hotlinked images" -ForegroundColor Gray
  Write-Host "  2. Update each story via the CMS admin panel" -ForegroundColor Gray
  Write-Host "  3. Run this check again to verify fixes" -ForegroundColor Gray

  exit 1
} else {
  Write-Host "`n✅ All stories pass content integrity checks" -ForegroundColor Green
  exit 0
}
