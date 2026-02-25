# Run from Desktop: finds folder containing push-to-github.ps1, renames to transmarine, then pushes
$desktop = [Environment]::GetFolderPath("Desktop")
$folder = Get-ChildItem -Path $desktop -Directory | Where-Object { Test-Path (Join-Path $_.FullName "push-to-github.ps1") } | Select-Object -First 1
if (-not $folder) { Write-Host "Project folder not found on Desktop"; exit 1 }
$oldName = $folder.FullName
$parent = Split-Path $oldName -Parent
$newName = Join-Path $parent "transmarine"
if ($oldName -eq $newName) { Write-Host "Already named transmarine"; Set-Location $oldName } else {
    Rename-Item -LiteralPath $oldName -NewName "transmarine"
    Write-Host "Renamed to transmarine"
    Set-Location $newName
}
# Push: try git with token in URL
$token = $env:GITHUB_TOKEN
if ($token) {
    git remote set-url origin "https://alinagdm:${token}@github.com/alinagdm/transmarine.git"
}
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push failed. Run: .\push-to-github.ps1" -ForegroundColor Yellow
}
