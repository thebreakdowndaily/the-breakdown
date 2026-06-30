param(
  [switch]$PushCMS,
  [switch]$DryRun,
  [switch]$SkipValidation,
  [switch]$Rollback,
  [string]$RollbackTo = '',
  [switch]$Help
)

# ============================================================
#  deploy.ps1 — The Breakdown Unified Deployment Pipeline
#  v3.0 — Error-proof, validated, rollback-capable.
# ============================================================

$ErrorActionPreference = 'Stop'
$InformationPreference = 'Continue'

function Write-Step($s) { Write-Host "`n>>> $s" -ForegroundColor Cyan }
function Write-OK($s) { Write-Host "  [OK] $s" -ForegroundColor Green }
function Write-Warn($s) { Write-Host "  [WARN] $s" -ForegroundColor Yellow }
function Write-Err($s) { Write-Host "  [ERR] $s" -ForegroundColor Red }
function Write-Section($s) { Write-Host "`n  [$s]" -ForegroundColor Gray }

if ($Help) {
  Write-Host @"

  The Breakdown — Unified Deploy Pipeline v3.0

  USAGE:
    .\scripts\deploy.ps1                  Deploy Cloudflare Pages only
    .\scripts\deploy.ps1 -PushCMS         Deploy Cloudflare + push CMS to Render
    .\scripts\deploy.ps1 -DryRun          Validate everything, but don't deploy
    .\scripts\deploy.ps1 -SkipValidation  Skip pre-deploy checks (not recommended)
    .\scripts\deploy.ps1 -Rollback        List recent deployments for rollback
    .\scripts\deploy.ps1 -Rollback -RollbackTo <id>  Rollback to specific deployment

  ENVIRONMENT:
    .env file at project root with:
      CLOUDFLARE_API_TOKEN=your_token
      GOOGLE_SITE_VERIFICATION=your_code

  WHAT IT DOES:
    1. Runs validation (calls validate.ps1) — catches placeholders, broken images,
       design conflicts, missing meta tags, line ending issues
    2. Injects Google Search Console verification code into all HTML pages
    3. Deploys cloudflare-deploy/ to Cloudflare Pages
    4. (optional) Pushes fact-check-cms/ to Render for auto-deploy

"@
  exit 0
}

# ============================================================
#  SAFETY GUARD: Validate environment before ANY operation
# ============================================================
$rootDir = Resolve-Path "$PSScriptRoot\.."
$envFile = Join-Path $rootDir ".env"

if (-not (Test-Path $envFile)) {
  Write-Warn "No .env found at $envFile — some features may not work"
  Write-Warn "Template: CLOUDFLARE_API_TOKEN=your_token"
}

# Load .env with proper encoding handling (UTF-8 without BOM)
function Load-EnvFile {
  param([string]$Path)
  if (-not (Test-Path $Path)) { return }
  $lines = Get-Content $Path -Raw -Encoding UTF8
  # Normalize line endings to CRLF for safety
  $lines = $lines -replace "`r`n", "`n" -replace "`n", "`r`n"
  $lines = $lines -split "`r`n"
  foreach ($line in $lines) {
    $trimmed = $line.Trim()
    if ($trimmed -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
      $key = $matches[1].Trim()
      $val = $matches[2].Trim().Trim('"', "'")
      if (-not [Environment]::GetEnvironmentVariable($key)) {
        [Environment]::SetEnvironmentVariable($key, $val, 'Process')
        Write-OK "Loaded env: $key"
      }
    }
  }
}

Load-EnvFile -Path $envFile

# ============================================================
#  VALIDATION GATE (skip with -SkipValidation)
# ============================================================
if (-not $SkipValidation -and -not $Rollback) {
  Write-Step "1/4 VALIDATION GATE"
  Write-Host "  Running pre-deploy validation..." -ForegroundColor Gray
  $validationScript = Join-Path $PSScriptRoot "validate.ps1"
  if (Test-Path $validationScript) {
    if ($DryRun) {
      & $validationScript -Verbose
    } else {
      & $validationScript
    }
    if ($LASTEXITCODE -ne 0) {
      Write-Err "Validation FAILED. Fix issues and try again."
      Write-Err "Run with -SkipValidation to bypass (NOT RECOMMENDED)"
      exit 1
    }
    Write-OK "Validation passed — proceeding to deploy"
  } else {
    Write-Warn "validate.ps1 not found — skipping validation"
  }
} elseif ($Rollback) {
  Write-Section "Skipping validation for rollback operation"
} else {
  Write-Warn "Validation SKIPPED (-SkipValidation flag)"
}

# ============================================================
#  CHECK CLOUDFLARE API TOKEN
# ============================================================
Write-Step "2/4 CHECK CREDENTIALS"

$apiToken = $env:CLOUDFLARE_API_TOKEN
if (-not $apiToken) {
  Write-Err "CLOUDFLARE_API_TOKEN not found in .env or environment"
  Write-Err "Add to .env: CLOUDFLARE_API_TOKEN=your_token"
  Write-Err "Get token from: https://dash.cloudflare.com/profile/api-tokens"
  exit 1
}
Write-OK "Cloudflare API token found"

# ============================================================
#  ROLLBACK MODE
# ============================================================
if ($Rollback) {
  Write-Step "3/4 ROLLBACK"
  if ($RollbackTo) {
    Write-Host "  Rolling back to deployment: $RollbackTo" -ForegroundColor Yellow
    if ($DryRun) {
      Write-OK "[DRY RUN] Would rollback to $RollbackTo"
      exit 0
    }
    $rollbackOutput = & npx wrangler pages deployment rollback --project-name thebreakdown $RollbackTo 2>&1
    $rollbackResult = $LASTEXITCODE
    Write-Host $rollbackOutput -ForegroundColor Gray
    if ($rollbackResult -ne 0) {
      Write-Err "Rollback failed — see output above"
      exit 1
    }
    Write-OK "Rollback to $RollbackTo complete"
  } else {
    Write-Host "  Recent Cloudflare deployments:" -ForegroundColor Yellow
    & npx wrangler pages deployment list --project-name thebreakdown 2>&1
    Write-Host "`n  To rollback: .\scripts\deploy.ps1 -Rollback -RollbackTo <deployment-id>" -ForegroundColor Yellow
  }
  exit 0
}

# ============================================================
#  INJECT GSC VERIFICATION CODE
# ============================================================
Write-Step "3/4 INJECT GOOGLE SITE VERIFICATION"

$gscCode = $env:GOOGLE_SITE_VERIFICATION
$cfDir = Join-Path $rootDir "cloudflare-deploy"
$updatedCount = 0
if ($gscCode) {
  $htmlFiles = Get-ChildItem -Path $cfDir -Filter *.html
  foreach ($f in $htmlFiles) {
    $html = Get-Content $f.FullName -Raw
    # Handle both empty content="" and placeholder cases
    $fixed = $html -replace 'content=""', 'content="{{GSC_CODE}}"'
    $fixed = $fixed -replace 'content="YOUR_VERIFICATION_CODE_HERE"', 'content="{{GSC_CODE}}"'
    $final = $fixed -replace '{{GSC_CODE}}', $gscCode
    if ($final -ne $html) {
      if ($DryRun) {
        Write-OK "[DRY RUN] Would inject GSC code into $($f.Name)"
      } else {
        [System.IO.File]::WriteAllText($f.FullName, $final, [System.Text.Encoding]::UTF8)
        Write-OK "Injected GSC code into $($f.Name)"
      }
      $updatedCount++
    }
  }
  if ($updatedCount -eq 0) {
    Write-Warn "No HTML files needed GSC injection (already set or no placeholder found)"
  }
} else {
  Write-Warn "GOOGLE_SITE_VERIFICATION not set — add to .env for Search Console verification"
  Write-Warn "  Get code from: https://search.google.com/search-console"
}

# ============================================================
#  CLOUDFLARE PAGES DEPLOY
# ============================================================
Write-Step "4/4 CLOUDFLARE PAGES DEPLOY"

if ($DryRun) {
  Write-OK "[DRY RUN] Would deploy cloudflare-deploy/ to Cloudflare Pages"
  Write-OK "[DRY RUN] Project: thebreakdown, Branch: main"
  exit 0
}

Write-Host "  Deploying cloudflare-deploy/ to Cloudflare Pages..." -ForegroundColor Gray
Write-Host "  Project: thebreakdown" -ForegroundColor Gray
Write-Host "  Branch:  main" -ForegroundColor Gray

# Remove the hardcoded token — we use $env:CLOUDFLARE_API_TOKEN instead
# that was loaded from .env above
$deployOutput = & npx wrangler pages deploy "$cfDir" --project-name thebreakdown --branch main 2>&1
$exitCode = $LASTEXITCODE

# Display output
Write-Host $deployOutput -ForegroundColor Gray

if ($exitCode -ne 0) {
  Write-Err "Cloudflare deploy FAILED (exit code: $exitCode)"
  Write-Err "Check the output above for details"
  exit 1
}

# Extract deploy URL from output for confirmation
if ($deployOutput -match '(https://[^\s]+\.pages\.dev)') {
  $deployUrl = $matches[1]
  Write-OK "Deployed to: $deployUrl"
  Write-Host "  Production: https://thebreakdown.in" -ForegroundColor Gray
} else {
  Write-OK "Deploy complete"
}

# ============================================================
#  (OPTIONAL) CMS PUSH TO RENDER
# ============================================================
if ($PushCMS) {
  Write-Step "OPTIONAL: CMS PUSH"
  Write-Host "  Pushing fact-check-cms/ to Render..." -ForegroundColor Gray

  $cmsDir = Join-Path $rootDir "fact-check-cms"
  $originalDir = Get-Location

  try {
    Set-Location $cmsDir

    # Check for uncommitted changes
    $status = & git status --porcelain 2>&1
    $hasChanges = ($status -ne $null -and $status.Trim().Length -gt 0)

    if (-not $hasChanges) {
      Write-Warn "No changes in fact-check-cms/ to push"
      return
    }

    git add -A
    $dateStamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMessage = "deploy: $dateStamp"

    & git commit -m $commitMessage 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-Warn "Git commit failed (may be nothing to commit)"
      return
    }
    Write-OK "Committed: $commitMessage"

    & git push origin master 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-Err "CMS push to Render failed"
      exit 1
    }
    Write-OK "CMS push complete — Render will auto-deploy shortly"
  } finally {
    Set-Location $originalDir
  }
} else {
  Write-Section "CMS push skipped (add -PushCMS to include)"
}

# ============================================================
#  DONE
# ============================================================
Write-Host "`n╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   ✅ DEPLOY COMPLETE                        ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "  Site: https://thebreakdown.in" -ForegroundColor Gray
if ($PushCMS) { Write-Host "  CMS:  https://the-breakdown-cms.onrender.com" -ForegroundColor Gray }
Write-Host "  Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
