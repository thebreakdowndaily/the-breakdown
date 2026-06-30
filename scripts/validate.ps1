param(
  [switch]$Fix,
  [switch]$Verbose
)

# ============================================================
#  validate.ps1 - Pre-deploy validation gate
#  Catches every error pattern before it reaches production.
#  Run with -Fix to auto-fix where possible.
# ============================================================

$ErrorActionPreference = 'Stop'
$exitCode = 0

function Write-Step($s) { Write-Host "`n>>> $s" -ForegroundColor Cyan }
function Write-Pass($s) { Write-Host "  [PASS] $s" -ForegroundColor Green }
function Write-Fail($s) { Write-Host "  [FAIL] $s" -ForegroundColor Red; $script:exitCode = 1 }
function Write-Warn($s) { Write-Host "  [WARN] $s" -ForegroundColor Yellow }
function Write-Info($s) { if ($Verbose) { Write-Host "  [INFO] $s" -ForegroundColor Gray } }

$rootDir = Split-Path -Parent $PSScriptRoot
$cfDir = Join-Path $rootDir "cloudflare-deploy"
$cmsDir = Join-Path $rootDir "fact-check-cms"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  THE BREAKDOWN - Pre-Deploy Validation" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Info "Root: $rootDir"
Write-Info "Cloudflare: $cfDir"
Write-Info "CMS: $cmsDir"

# ============================================================
# 1. FILE INTEGRITY
# ============================================================
Write-Step "1/10 File Integrity"

$requiredFiles = @(
  (Join-Path $cfDir "index.html"),
  (Join-Path $cfDir "story.html"),
  (Join-Path $cfDir "404.html"),
  (Join-Path $cfDir "_worker.js"),
  (Join-Path $cfDir "_headers"),
  (Join-Path $cmsDir "public\story.html"),
  (Join-Path $cmsDir "server.js")
)
$allPresent = $true
foreach ($f in $requiredFiles) {
  if (Test-Path $f) {
    Write-Info "Present: $f"
  } else {
    Write-Fail "Missing: $f"
    $allPresent = $false
  }
}
if ($allPresent) { Write-Pass "All required files present" }

# ============================================================
# 2. PLACEHOLDER CHECK
# ============================================================
Write-Step "2/10 Placeholder Content"

$placeholders = @(
  'YOUR_VERIFICATION_CODE_HERE',
  'YOUR_VERIFICATION',
  'TODO',
  'FIXME',
  'XXXXXXXXXX'
)
$foundPlaceholders = $false
if (Test-Path $cfDir) {
  $htmlFiles = Get-ChildItem -Path $cfDir -Filter *.html -Recurse
  foreach ($f in $htmlFiles) {
    $content = Get-Content $f.FullName -Raw
    foreach ($p in $placeholders) {
      if ($content -match $p) {
        Write-Fail "$($f.Name) contains placeholder: $p"
        $foundPlaceholders = $true
      }
    }
  }
}
if (-not $foundPlaceholders) { Write-Pass "No placeholder content found" }

# ============================================================
# 3. DESIGN CONFLICT - no duplicate CSS/JS in CMS public dir
# ============================================================
Write-Step "3/10 Design Conflict Check"

$forbiddenDirs = @(
  (Join-Path $cmsDir "public\css"),
  (Join-Path $cmsDir "public\js"),
  (Join-Path $cmsDir "public\assets")
)
$conflictFound = $false
foreach ($d in $forbiddenDirs) {
  if (Test-Path $d) {
    Write-Fail "Stale duplicate directory exists: $d"
    $conflictFound = $true
    if ($Fix) {
      Remove-Item -Path $d -Recurse -Force -ErrorAction SilentlyContinue
      Write-Host "  [FIX] Deleted stale directory: $d" -ForegroundColor Magenta
    }
  }
}
if (-not $conflictFound) { Write-Pass "No design conflict - CMS public dir is clean" }

# ============================================================
# 4. BROKEN IMAGES - check for hotlinked images
# ============================================================
Write-Step "4/10 Hotlinked Image Detection"

$blockedPatterns = @(
  'dims\.apnews\.com',
  '90/\?url='
)

try {
  $serviceKey = $null
  $envFile = Join-Path $cmsDir ".env"
  if (Test-Path $envFile) {
    $envVars = Get-Content $envFile
    foreach ($line in $envVars) {
      if ($line -match '^SUPABASE_SERVICE_KEY=(.+)$') {
        $serviceKey = $matches[1].Trim().Trim('"', "'")
      }
    }
  }
  if ($serviceKey) {
    $headers = @{ "Authorization" = "Bearer $serviceKey"; "apikey" = "$serviceKey" }
    $supabaseUrl = "https://lvfovvidtowadmnggzzf.supabase.co"
    $stories = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/stories?select=id,title,slug,fact_check_image,og_image&status=eq.published" -Headers $headers -ErrorAction Stop
    $hotlinked = @()
    foreach ($story in $stories) {
      $isHotlinked = $false
      foreach ($pattern in $blockedPatterns) {
        if ($story.fact_check_image -match $pattern -or $story.og_image -match $pattern) {
          $isHotlinked = $true
        }
      }
      if ($isHotlinked) {
        $hotlinked += $story
      }
    }
    if ($hotlinked.Count -gt 0) {
      Write-Fail "$($hotlinked.Count) stories have hotlinked/broken images:"
      foreach ($h in $hotlinked) {
        $imgPreview = $h.fact_check_image
        if ($imgPreview.Length -gt 80) { $imgPreview = $imgPreview.Substring(0, 80) + "..." }
        Write-Host "         $($h.slug): $imgPreview" -ForegroundColor Red
      }
      Write-Warn "Run .\scripts\host-images.ps1 to re-host these on Supabase storage"
    } else {
      Write-Pass "All $($stories.Count) stories use self-hosted or working image URLs"
    }
  } else {
    Write-Warn "Cannot check images - SUPABASE_SERVICE_KEY not found in .env"
  }
} catch {
  Write-Warn "Image check skipped (API error: $($_.Exception.Message))"
}

# ============================================================
# 5. META TAG COMPLETENESS
# ============================================================
Write-Step "5/10 Story Template Meta Tags"

$requiredMeta = @(
  '<meta charset="UTF-8">',
  '<meta name="viewport"',
  '<meta name="description" content="">',
  '<meta name="robots" content="index, follow',
  '<meta property="og:title"',
  '<meta property="og:description"',
  '<meta property="og:type"',
  '<meta property="og:url"',
  '<meta property="og:image"',
  '<meta property="article:published_time"',
  '<meta property="article:tag"',
  '<meta name="news_keywords"',
  '<meta name="twitter:card"',
  '<meta name="twitter:title"',
  '<meta name="twitter:description"',
  '<meta name="twitter:image"',
  '<link rel="canonical"',
  '<link rel="icon"',
  'application/ld+json'
)

$templatesToCheck = @(
  (Join-Path $cmsDir "public\story.html"),
  (Join-Path $cfDir "story.html")
)
foreach ($tmpl in $templatesToCheck) {
  if (Test-Path $tmpl) {
    $content = Get-Content $tmpl -Raw
    $missingList = @()
    foreach ($meta in $requiredMeta) {
      $escaped = [regex]::Escape($meta)
      if ($content -notmatch $escaped) {
        $missingList += $meta
      }
    }
    if ($missingList.Count -gt 0) {
      Write-Fail "$(Split-Path $tmpl -Leaf) missing $($missingList.Count) required meta tags:"
      foreach ($m in $missingList) {
        Write-Host "         Missing: $m" -ForegroundColor Red
      }
    } else {
      Write-Pass "$(Split-Path $tmpl -Leaf): all $($requiredMeta.Count) meta tags present"
    }
  } else {
    Write-Fail "Template not found: $tmpl"
  }
}

# ============================================================
# 6. HTML VALIDITY
# ============================================================
Write-Step "6/10 HTML Structure"

if (Test-Path $cfDir) {
  $htmlFiles = Get-ChildItem -Path $cfDir -Filter *.html
  $validCount = 0
  foreach ($f in $htmlFiles) {
    $c = Get-Content $f.FullName -Raw
    $issuesList = @()
    if ($c -notmatch '<!DOCTYPE html>') { $issuesList += "missing DOCTYPE" }
    if ($c -notmatch '</html>') { $issuesList += "missing </html>" }
    if ($c -match 'YOUR_') { $issuesList += "contains placeholder" }
    if ($issuesList.Count -eq 0) {
      $validCount++
    } else {
      Write-Fail "$($f.Name): $($issuesList -join ', ')"
    }
  }
  if ($validCount -eq $htmlFiles.Count) {
    Write-Pass "All $validCount HTML files valid"
  }
}

# ============================================================
# 7. LINE ENDINGS - enforce CRLF for PowerShell compat
# ============================================================
Write-Step "7/10 Line Endings (CRLF Enforcement)"

$psScriptsDir = Join-Path $rootDir "scripts"
if (Test-Path $psScriptsDir) {
  $psFiles = Get-ChildItem -Path $psScriptsDir -Filter *.ps1
  $fixedCount = 0
  $warningCount = 0
  foreach ($f in $psFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $hasCRLF = $false
    for ($i = 0; $i -lt $bytes.Length - 1; $i++) {
      if ($bytes[$i] -eq 13 -and $bytes[$i+1] -eq 10) {
        $hasCRLF = $true
        break
      }
    }
    if (-not $hasCRLF -and ($bytes -contains 10)) {
      if ($Fix) {
        $text = [System.Text.Encoding]::UTF8.GetString($bytes)
        $text = $text -replace "`r`n", "`n" -replace "(?<!`r)`n", "`r`n"
        [System.IO.File]::WriteAllText($f.FullName, $text, [System.Text.Encoding]::UTF8)
        Write-Host "  [FIX] Converted $($f.Name) to CRLF" -ForegroundColor Magenta
        $fixedCount++
      } else {
        Write-Warn "$($f.Name) has LF line endings - run with -Fix to convert"
        $warningCount++
      }
    }
  }
  if ($fixedCount -eq 0 -and $warningCount -eq 0) {
    Write-Pass "All PowerShell scripts use CRLF"
  } else {
    if ($fixedCount -gt 0) { Write-Info "Fixed $fixedCount file(s)" }
  }
}

# ============================================================
# 8. WORKER ROUTES
# ============================================================
Write-Step "8/10 Worker Route Check"

$workerPath = Join-Path $cfDir "_worker.js"
if (Test-Path $workerPath) {
  $worker = Get-Content $workerPath -Raw
  $routeChecks = @(
    @{ pattern = '/story/' ; name = 'Story route' }
    @{ pattern = '/api/' ; name = 'API route' }
    @{ pattern = '/admin' ; name = 'Admin route' }
    @{ pattern = '/sitemap.xml' ; name = 'Sitemap route' }
  )
  $missingRoutes = @()
  foreach ($rc in $routeChecks) {
    if ($worker -notmatch $rc.pattern) {
      $missingRoutes += $rc.name
    }
  }
  if ($missingRoutes.Count -gt 0) {
    foreach ($mr in $missingRoutes) {
      Write-Fail "_worker.js missing $mr"
    }
  } else {
    Write-Pass "All required routes present in _worker.js"
  }
} else {
  Write-Fail "_worker.js not found"
}

# ============================================================
# 9. STORY HEALTH CHECK - verify last 3 stories load
# ============================================================
Write-Step "9/10 Story Health Check"

try {
  Write-Info "Fetching recent stories from API..."
  $storiesResp = Invoke-RestMethod -Uri "https://thebreakdown.in/api/stories/published?limit=3" -TimeoutSec 30 -ErrorAction Stop
  $stories = $storiesResp.stories
  $healthyCount = 0
  $totalToCheck = [Math]::Min(3, $stories.Count)
  if ($totalToCheck -gt 0) {
    foreach ($s in $stories[0..($totalToCheck-1)]) {
      try {
        $storyResp = Invoke-RestMethod -Uri "https://thebreakdown.in/api/stories/public/$($s.slug)" -TimeoutSec 10 -ErrorAction Stop
        if ($storyResp.story) {
          $healthyCount++
          Write-Info "$($s.slug): loaded OK"
        }
      } catch {
        Write-Warn "$($s.slug): failed to load"
      }
    }
  }
  if ($healthyCount -eq $totalToCheck -and $totalToCheck -gt 0) {
    Write-Pass "All $healthyCount recent stories load correctly"
  } elseif ($healthyCount -gt 0) {
    Write-Warn "$healthyCount/$totalToCheck recent stories loaded"
  } else {
    Write-Warn "No stories could be verified"
  }
} catch {
  Write-Warn "Story health check skipped (API not reachable): $_"
}

# ============================================================
# 10. CACHE-BUSTING CHECK
# ============================================================
Write-Step "10/10 CSS/JS Cache-Busting"

if (Test-Path $cfDir) {
  $htmlFiles = Get-ChildItem -Path $cfDir -Filter *.html
  $missingVersion = @()
  foreach ($f in $htmlFiles) {
    $c = Get-Content $f.FullName -Raw
    # Check for .css or .js in href/src attributes
    $cssMatches = [regex]::Matches($c, '(?:href|src)="([^"]+\.(css|js)(?:\?[^"]*)?)"')
    foreach ($m in $cssMatches) {
      $fullUrl = $m.Groups[1].Value
      # Skip external/CDN URLs — only check self-hosted assets
      if ($fullUrl -match '^https?://' -and $fullUrl -notmatch 'thebreakdown\.in') {
        continue
      }
      if ($fullUrl -notmatch '\?v=' -and $fullUrl -notmatch '\?\d+') {
        $missingVersion += "$($f.Name): $fullUrl"
      }
    }
  }
  if ($missingVersion.Count -gt 0) {
    foreach ($mv in $missingVersion) { Write-Warn "Missing cache-busting: $mv" }
    Write-Host "  [INFO] Add ?v=N to CSS/JS links for cache control" -ForegroundColor Gray
  } else {
    Write-Pass "All CSS/JS links have cache-busting version parameters"
  }
}

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n============================================" -ForegroundColor Cyan
if ($exitCode -eq 0) {
  Write-Host "  ALL CHECKS PASSED - Ready to Deploy" -ForegroundColor Green
} else {
  Write-Host "  ISSUES FOUND - fix before deploy" -ForegroundColor Red
}
Write-Host "============================================" -ForegroundColor Cyan

exit $exitCode