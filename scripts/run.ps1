param(
  [switch]$All,         # Run full pipeline: validate -> check -> host -> deploy
  [switch]$Quick,       # Quick: validate -> deploy (skip check, host-images)
  [switch]$Check,       # Run content check only
  [switch]$Validate,    # Run validation only
  [switch]$Health,      # Run health check only
  [switch]$HostImages,  # Run image hosting only
  [switch]$PushCMS,     # Include CMS push in deploy
  [switch]$DryRun,      # No changes
  [switch]$Fix,         # Auto-fix where possible
  [switch]$Help
)

# ============================================================
#  run.ps1 — The Breakdown Unified Pipeline Controller
#  Orchestrates validation, content check, image hosting,
#  and deploy as a single unified system.
# ============================================================

$ErrorActionPreference = 'Stop'

function Write-Step($s) { Write-Host "`n>>> $s" -ForegroundColor Cyan }
function Write-OK($s) { Write-Host "  [OK] $s" -ForegroundColor Green }
function Write-Err($s) { Write-Host "  [ERR] $s" -ForegroundColor Red }
function Write-Section($s) { Write-Host "`n  [$s]" -ForegroundColor Gray }

$rootDir = Resolve-Path "$PSScriptRoot\.."

if ($Help) {
  Write-Host @"

  The Breakdown — Unified Pipeline Controller

  USAGE:
    .\scripts\run.ps1               Run full pipeline (validate → deploy)
    .\scripts\run.ps1 -All          Full: validate → check → host → deploy
    .\scripts\run.ps1 -Quick        Quick: validate → deploy (skip check/host)
    .\scripts\run.ps1 -Validate     Run validation only
    .\scripts\run.ps1 -Check        Run content integrity check only
    .\scripts\run.ps1 -Health       Run post-deploy health check only
    .\scripts\run.ps1 -HostImages   Run image hosting scan only
    .\scripts\run.ps1 -DryRun       Show what would happen without making changes
    .\scripts\run.ps1 -Fix          Auto-fix issues when possible
    .\scripts\run.ps1 -PushCMS      Include CMS push in deploy
    .\scripts\run.ps1 -Help         Show this help

  EXAMPLES:
    .\scripts\run.ps1 -Quick              Deploy quickly after a small change
    .\scripts\run.ps1 -All -PushCMS       Full pre-flight + deploy + CMS push
    .\scripts\run.ps1 -Validate -Fix      Fix line endings & remove duplicates
    .\scripts\run.ps1 -Check              Scan all stories for content issues
    .\scripts\run.ps1 -HostImages -DryRun See which images need re-hosting

  WHAT EACH COMMAND DOES:
    validate.ps1    → Checks files, placeholders, conflicts, images, meta tags
    check-content.ps1  → Scans all stories for alt text, excerpts, SEO, etc.
    host-images.ps1 → Downloads hotlinked images, uploads to Supabase
    deploy.ps1      → Injects GSC code, deploys to Cloudflare Pages
    health-check.ps1   → Tests homepage, sitemap, stories, assets, response time

"@
  exit 0
}

$scriptDir = $PSScriptRoot

# ============================================================
#  MODE SELECTION
# ============================================================
$runValidate = $Validate -or $Quick -or $All -or (-not $Check -and -not $Health -and -not $HostImages)
$runCheck = $Check -or $All
$runHostImages = $HostImages -or $All
$runDeploy = (-not $Check -and -not $Health -and -not $HostImages -and -not $Validate) -or $Quick -or $All
$runHealth = $Health

# Build the deploy args as hashtable for proper switch parameter passing
$deployArgs = @{}
if ($PushCMS) { $deployArgs.PushCMS = $true }
if ($DryRun) { $deployArgs.DryRun = $true }
if ($runValidate) { $deployArgs.SkipValidation = $true }


$exitCode = 0

# ============================================================
#  1. VALIDATION
# ============================================================
if ($runValidate) {
  Write-Step "PHASE 1: Pre-Deploy Validation"
  $validateScript = Join-Path $scriptDir "validate.ps1"
  if (Test-Path $validateScript) {
    $validateArgs = @()
    if ($Fix) { $validateArgs += "-Fix" }
    & $validateScript @validateArgs
    if ($LASTEXITCODE -ne 0) {
      Write-Err "Validation FAILED — fix issues before continuing"
      Write-Err "Run with -Fix to auto-fix line endings and stale files"
      $exitCode = 1
      if (-not $All) { exit $exitCode }
    }
  } else {
    Write-Err "validate.ps1 not found"
    exit 1
  }
}

# ============================================================
#  2. CONTENT CHECK
# ============================================================
if ($runCheck -and $exitCode -eq 0) {
  Write-Step "PHASE 2: Content Integrity Check"
  $checkScript = Join-Path $scriptDir "check-content.ps1"
  if (Test-Path $checkScript) {
    $checkArgs = @()
    if ($Fix) { $checkArgs += "-Fix" }
    & $checkScript @checkArgs
    if ($LASTEXITCODE -ne 0) {
      Write-Err "Content check found issues — review and fix in CMS"
      Write-Section "Run .\scripts\run.ps1 -HostImages to re-host broken images"
      $exitCode = 1
      if (-not $All) { exit $exitCode }
    }
  } else {
    Write-Warn "check-content.ps1 not found — skipping"
  }
}

# ============================================================
#  3. IMAGE HOSTING
# ============================================================
if ($runHostImages -and $exitCode -eq 0) {
  Write-Step "PHASE 3: Image Re-Hosting"
  $hostScript = Join-Path $scriptDir "host-images.ps1"
  if (Test-Path $hostScript) {
    $hostArgs = @("-All")
    if ($DryRun) { $hostArgs += "-DryRun" }
    & $hostScript @hostArgs
    if ($LASTEXITCODE -ne 0) {
      Write-Err "Image hosting failed"
      $exitCode = 1
      if (-not $All) { exit $exitCode }
    }
  } else {
    Write-Warn "host-images.ps1 not found — skipping"
  }
}

# ============================================================
#  4. DEPLOY
# ============================================================
if ($runDeploy -and $exitCode -eq 0) {
  Write-Step "PHASE 4: Deploy to Cloudflare Pages"
  $deployScript = Join-Path $scriptDir "deploy.ps1"
  if (Test-Path $deployScript) {
    & $deployScript @deployArgs
    $exitCode = $LASTEXITCODE
  } else {
    Write-Err "deploy.ps1 not found"
    $exitCode = 1
  }
}

# ============================================================
#  5. HEALTH CHECK
# ============================================================
if ($runHealth -and $exitCode -eq 0) {
  Write-Step "PHASE 5: Post-Deploy Health Check (waiting 10s for propagation...)"
  Start-Sleep -Seconds 10
  $healthScript = Join-Path $scriptDir "health-check.ps1"
  if (Test-Path $healthScript) {
    & $healthScript
    if ($LASTEXITCODE -ne 0) {
      Write-Err "Health check FAILED — deployment may have issues"
      $exitCode = 1
    }
  } else {
    Write-Warn "health-check.ps1 not found — skipping"
  }
}

# ============================================================
#  SUMMARY
# ============================================================
Write-Host "`n═══════════════════════════════════════════════════" -ForegroundColor Cyan
if ($exitCode -eq 0) {
  Write-Host "  ✅ PIPELINE COMPLETE — All systems green" -ForegroundColor Green
} else {
  Write-Host "  ❌ PIPELINE FAILED — Review errors above" -ForegroundColor Red
}
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan

exit $exitCode
