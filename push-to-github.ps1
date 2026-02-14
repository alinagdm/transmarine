# Скрипт загрузки файлов на GitHub через API (напрямую)
# 1. Создайте токен: https://github.com/settings/tokens (галочка repo)
# 2. В PowerShell: cd "путь\к\папке\проекта"
# 3. Запуск: .\push-to-github.ps1
#    Или с токеном: $env:GITHUB_TOKEN = "ghp_xxx"; .\push-to-github.ps1

param(
    [string]$Token = $env:GITHUB_TOKEN
)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

if (-not $Token) {
    $Token = Read-Host "Вставьте GitHub Personal Access Token"
}
if (-not $Token) {
    Write-Host "Токен не указан. Выход." -ForegroundColor Red
    exit 1
}

$owner = "alinagdm"
$repo = "transmarine"
$branch = "main"
$baseUrl = "https://api.github.com/repos/$owner/$repo/contents"
$headers = @{
    "Authorization" = "Bearer $Token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location.Path }

$files = @(
    @{ path = "src/App.css"; local = Join-Path $scriptDir "src\App.css" },
    @{ path = "src/App.tsx"; local = Join-Path $scriptDir "src\App.tsx" },
    @{ path = "src/components/Hero/Hero.css"; local = Join-Path $scriptDir "src\components\Hero\Hero.css" },
    @{ path = "src/components/Footer/Footer.css"; local = Join-Path $scriptDir "src\components\Footer\Footer.css" },
    @{ path = "src/components/Footer/Footer.tsx"; local = Join-Path $scriptDir "src\components\Footer\Footer.tsx" },
    @{ path = "src/components/Services/Services.css"; local = Join-Path $scriptDir "src\components\Services\Services.css" },
    @{ path = "src/components/History/History.css"; local = Join-Path $scriptDir "src\components\History\History.css" }
)

foreach ($f in $files) {
    $filePath = $f.local
    $apiPath = $f.path
    if (-not (Test-Path $filePath)) {
        Write-Host "Файл не найден: $filePath" -ForegroundColor Yellow
        continue
    }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    $contentBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
    $sha = $null
    $uriGet = "https://api.github.com/repos/$owner/$repo/contents/$apiPath" + "?ref=$branch"
    try {
        $resp = Invoke-RestMethod -Uri $uriGet -Headers $headers -Method Get
        $sha = $resp.sha
    } catch {
        # файл новый или 404
    }
    $bodyObj = @{
        message = "Update $apiPath"
        content = $contentBase64
        branch = $branch
    }
    if ($sha) { $bodyObj.sha = $sha }
    $body = $bodyObj | ConvertTo-Json
    $uriPut = "https://api.github.com/repos/$owner/$repo/contents/$apiPath"
    try {
        Invoke-RestMethod -Uri $uriPut -Headers $headers -Method Put -Body $body -ContentType "application/json; charset=utf-8"
        Write-Host "OK: $apiPath" -ForegroundColor Green
    } catch {
        Write-Host "Ошибка $apiPath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nГотово. Проверьте: https://github.com/alinagdm/transmarine/commits/main" -ForegroundColor Cyan
Write-Host "Vercel подхватит деплой через 1–2 минуты." -ForegroundColor Cyan
