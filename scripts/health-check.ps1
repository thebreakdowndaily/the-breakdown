param(
  [switch]$Quiet
)

# ============================================================
#  health-check.ps1 — Post-deploy site health monitor
#  Run periodically (e.g., via cron / Task Scheduler) to
#  detect broken stories, images, or deployment issues.
# ============================================================

$ErrorActionPreference = 'Stop'

function Write-OK($s) { if (-not $Quiet) { Write-Host "  [OK] $s" -ForegroundColor Green } }
function Write-Warn($s) { Write-Host "  [WARN] $s" -ForegroundColor Yellow }
function Write-Err($s) { Write-Host "  [ERR] $s" -ForegroundColor Red }

$exitCode = 0

# ============================================================
# 1. HOMEPAGE
# ============================================================
try {
  $resp = Invoke-WebRequest -Uri "https://thebreakdown.in" -TimeoutSec 15 -ErrorAction Stop
  if ($resp.StatusCode -ne 200) { Write-Err "Homepage returned HTTP $($resp.StatusCode)"; $exitCode = 1 }
  elseif ($resp.Content.Length -lt 1000) { Write-Err "Homepage too short ($($resp.Content.Length) bytes)"; $exitCode = 1 }
  else { Write-OK "Homepage: $($resp.Content.Length) bytes, HTTP $($resp.StatusCode)" }
} catch { Write-Err "Homepage unreachable: $_"; $exitCode = 1 }

# ============================================================
# 2. SITEMAP
# ============================================================
try {
  $resp = Invoke-WebRequest -Uri "https://thebreakdown.in/sitemap.xml" -TimeoutSec 10 -ErrorAction Stop
  if ($resp.StatusCode -eq 200) {
    $urls = [regex]::Matches($resp.Content, '<loc>').Count
    Write-OK "Sitemap: $urls URLs"
    if ($urls -lt 5) { Write-Warn "Only $urls URLs in sitemap — expected 30+" }
  } else { Write-Err "Sitemap HTTP $($resp.StatusCode)"; $exitCode = 1 }
} catch { Write-Err "Sitemap unreachable: $_"; $exitCode = 1 }

# ============================================================
# 3. ROBOTS.TXT
# ============================================================
try {
  $resp = Invoke-WebRequest -Uri "https://thebreakdown.in/robots.txt" -TimeoutSec 10 -ErrorAction Stop
  if ($resp.Content -match 'Sitemap: ') { Write-OK "robots.txt: sitemap reference found" }
  else { Write-Warn "robots.txt missing sitemap reference" }
} catch { Write-Warn "robots.txt check failed: $_" }

# ============================================================
# 4. CSS/JS ASSETS
# ============================================================
$assets = @(
  "/css/editorial.css",
  "/css/design-system.css",
  "/css/story.css",
  "/js/reading-progress.js"
)
foreach ($asset in $assets) {
  try {
    $resp = Invoke-WebRequest -Uri "https://thebreakdown.in$asset" -TimeoutSec 10 -ErrorAction Stop
    if ($resp.StatusCode -eq 200) {
      $length = $resp.Content.Length
      Write-OK "Asset ${asset}: ${length} bytes"
      if ($length -lt 100) { Write-Warn "${asset} suspiciously small ($length bytes)" }
    } else { Write-Err "Asset ${asset} HTTP $($resp.StatusCode)"; $exitCode = 1 }
  } catch { Write-Err "Asset ${asset} unreachable: $_"; $exitCode = 1 }
}

# ============================================================
# 5. API ENDPOINTS
# ============================================================
try {
  $resp = Invoke-RestMethod -Uri "https://thebreakdown.in/api/stories/published?limit=3" -TimeoutSec 15 -ErrorAction Stop
  $storyCount = $resp.stories.Count
  Write-OK "API /stories/published: $storyCount stories"
  if ($storyCount -eq 0) { Write-Err "API returned 0 stories"; $exitCode = 1 }
} catch { Write-Err "API unreachable: $_"; $exitCode = 1 }

# ============================================================
# 6. SAMPLE STORY PAGES (check 3 latest)
# ============================================================
try {
  $resp = Invoke-RestMethod -Uri "https://thebreakdown.in/api/stories/published?limit=3" -TimeoutSec 15 -ErrorAction Stop
  $stories = $resp.stories
  foreach ($s in $stories) {
    try {
      $storyResp = Invoke-WebRequest -Uri "https://thebreakdown.in/story/$($s.slug)" -TimeoutSec 15 -ErrorAction Stop
      if ($storyResp.StatusCode -eq 200) {
        $html = $storyResp.Content
        # Check for key SEO elements in the rendered HTML
        if ($html -match '<title>') { Write-OK "Story $($s.slug): has <title>" }
        else { Write-Warn "Story $($s.slug): missing <title>" }
        if ($html -match 'og:title') { Write-OK "Story $($s.slug): has og:title" }
        else { Write-Warn "Story $($s.slug): missing og:title" }
        if ($html -notmatch 'YOUR_VERIFICATION_CODE_HERE') { Write-OK "Story $($s.slug): no placeholder text" }
        else { Write-Err "Story $($s.slug): CONTAINS PLACEHOLDER TEXT!"; $exitCode = 1 }
      } else { Write-Err "Story $($s.slug) HTTP $($storyResp.StatusCode)"; $exitCode = 1 }
    } catch { Write-Err "Story $($s.slug) unreachable: $_"; $exitCode = 1 }
  }
} catch { Write-Err "Story health check failed: $_"; $exitCode = 1 }

# ============================================================
# 7. SSL/HTTPS CHECK
# ============================================================
try {
  $resp = Invoke-WebRequest -Uri "https://thebreakdown.in" -TimeoutSec 10 -ErrorAction Stop
  if ($resp.StatusCode -eq 200) { Write-OK "HTTPS: valid" }
} catch {
  if ($_.Exception.Message -match 'SSL|TLS|certificate') {
    Write-Err "SSL certificate issue: $_"
    $exitCode = 1
  } else { Write-Warn "HTTPS check failed: $_" }
}

# ============================================================
# 8. RESPONSE TIME
# ============================================================
$times = @()
foreach ($i in 1..3) {
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $null = Invoke-WebRequest -Uri "https://thebreakdown.in" -TimeoutSec 10 -ErrorAction Stop
    $sw.Stop()
    $times += $sw.ElapsedMilliseconds
  } catch { }
}
if ($times.Count -gt 0) {
  $avg = ($times | Measure-Object -Average).Average
  Write-OK "Avg response time: $([math]::Round($avg))ms"
  if ($avg -gt 2000) { Write-Warn "Response time >2s ($([math]::Round($avg))ms) — consider performance optimization" }
}

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n══════════════════════════════════════════════" -ForegroundColor Cyan
if ($exitCode -eq 0) {
  Write-Host "  ✅ ALL HEALTH CHECKS PASSED" -ForegroundColor Green
} else {
  Write-Host "  ❌ $exitCode CHECK(S) FAILED" -ForegroundColor Red
}
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss UTC')" -ForegroundColor Gray
Write-Host "══════════════════════════════════════════════" -ForegroundColor Cyan

exit $exitCode
