# Start the Breakdown Backend Server
Write-Host "Starting The Breakdown Backend..." -ForegroundColor Green
Set-Location "$PSScriptRoot\..\backend"
npx tsx src/index.ts
