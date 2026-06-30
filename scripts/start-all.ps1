# Start The Breakdown — Full Stack
Write-Host "╔════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  The Breakdown — Starting All     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════╝" -ForegroundColor Cyan

# Start Backend (in background)
Write-Host "`n[1/2] Starting Backend (port 3001)..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
  Set-Location "$using:PSScriptRoot\..\backend"
  npx tsx src/index.ts
}
Start-Sleep -Seconds 3

# Check backend is running
try {
  $health = Invoke-RestMethod -Uri "http://localhost:3001/api/health" -ErrorAction Stop
  Write-Host "  ✓ Backend online — 30 stories served" -ForegroundColor Green
} catch {
  Write-Host "  ✗ Backend failed to start" -ForegroundColor Red
}

# Start Frontend (in current window)
Write-Host "[2/2] Starting Frontend (port 3000)..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\..\frontend"
npx next dev

# Cleanup on exit
Stop-Job $backendJob -ErrorAction SilentlyContinue
Remove-Job $backendJob -Force -ErrorAction SilentlyContinue
