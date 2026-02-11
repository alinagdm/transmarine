# Один скрипт: подтянуть с GitHub и запушить. Запускай в PowerShell из папки проекта.
# Права на GitHub должны быть уже настроены (ты уже логинился в браузере).

$ErrorActionPreference = "Stop"
Write-Host "git-sync: stash -> pull --rebase -> stash pop -> push" -ForegroundColor Cyan

if (git status --porcelain | Where-Object { $_ -notmatch "^\?\?" }) {
    Write-Host "Stash..." -ForegroundColor Yellow
    git stash push -m "git-sync"
}
Write-Host "Pull..." -ForegroundColor Yellow
git pull origin main --rebase
if (git stash list | Select-String "git-sync") {
    Write-Host "Stash pop..." -ForegroundColor Yellow
    git stash pop
}
Write-Host "Push..." -ForegroundColor Yellow
git push --set-upstream origin main
Write-Host "Done." -ForegroundColor Green
