[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$Repository,
  [string]$Branch = 'gh-pages',
  [string]$BasePath,
  [switch]$BuildOnly
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$outputDir = Join-Path $projectRoot 'out'
$archivePath = Join-Path $projectRoot 'github-pages.zip'

function Invoke-Native {
  param([string]$Command, [string[]]$Arguments)
  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$Command failed with exit code $LASTEXITCODE"
  }
}

if ($Repository -notmatch 'github\.com[:/]') {
  throw 'Repository must be a GitHub SSH or HTTPS URL.'
}

$repositoryName = (($Repository -replace '\.git$', '') -split '[:/]')[-1]
if (-not $PSBoundParameters.ContainsKey('BasePath')) {
  if ($repositoryName -match '\.github\.io$') {
    $BasePath = ''
  } else {
    $BasePath = "/$repositoryName"
  }
}

if ($BasePath -and -not $BasePath.StartsWith('/')) {
  $BasePath = "/$BasePath"
}
$BasePath = $BasePath.TrimEnd('/')

Push-Location $projectRoot
try {
  $previousBasePath = $env:GITHUB_PAGES_BASE_PATH
  $env:GITHUB_PAGES_BASE_PATH = $BasePath
  try {
    Invoke-Native 'npm.cmd' @('run', 'build:static')
  } finally {
    $env:GITHUB_PAGES_BASE_PATH = $previousBasePath
  }

  New-Item -ItemType File -Path (Join-Path $outputDir '.nojekyll') -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $outputDir 'index.html') -Destination (Join-Path $outputDir '404.html') -Force

  if ($BasePath) {
    $publicRoot = (Resolve-Path (Join-Path $projectRoot 'public')).Path
    $assetPaths = Get-ChildItem -LiteralPath $publicRoot -Recurse -File | ForEach-Object {
      '/' + $_.FullName.Substring($publicRoot.Length).TrimStart('\').Replace('\', '/')
    } | Sort-Object Length -Descending

    $textExtensions = @('.html', '.css', '.js', '.json', '.txt', '.xml', '.webmanifest')
    $outputFiles = Get-ChildItem -LiteralPath $outputDir -Recurse -File | Where-Object {
      $textExtensions -contains $_.Extension.ToLowerInvariant()
    }
    $escapedBasePath = [Regex]::Escape($BasePath)

    foreach ($file in $outputFiles) {
      $content = [IO.File]::ReadAllText($file.FullName)
      $original = $content
      foreach ($assetPath in $assetPaths) {
        $pattern = "(?<!$escapedBasePath)$([Regex]::Escape($assetPath))"
        $replacement = $BasePath + $assetPath
        $content = [Regex]::Replace($content, $pattern, [Text.RegularExpressions.MatchEvaluator]{
          param($match)
          $replacement
        })
      }
      if ($content -ne $original) {
        [IO.File]::WriteAllText($file.FullName, $content, [Text.UTF8Encoding]::new($false))
      }
    }
  }

  Remove-Item -LiteralPath $archivePath -Force -ErrorAction SilentlyContinue
  Invoke-Native 'tar.exe' @('-a', '-cf', $archivePath, '-C', $outputDir, '.')
  Write-Host "GitHub Pages archive: $archivePath"
  Write-Host "GitHub Pages base path: $BasePath"

  if ($BuildOnly) {
    Write-Host 'BuildOnly selected; skipping git push.'
    return
  }

  $publishParent = Join-Path ([IO.Path]::GetTempPath()) "second-epoch-pages-$PID"
  $publishDir = Join-Path $publishParent 'site'
  if (-not $publishParent.StartsWith([IO.Path]::GetTempPath(), [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Temporary publish path is outside the system temporary directory.'
  }

  try {
    New-Item -ItemType Directory -Path $publishParent -Force | Out-Null
    Copy-Item -LiteralPath $outputDir -Destination $publishDir -Recurse -Force
    Invoke-Native 'git.exe' @('-C', $publishDir, 'init')
    Invoke-Native 'git.exe' @('-C', $publishDir, 'checkout', '-b', $Branch)
    Invoke-Native 'git.exe' @('-C', $publishDir, 'add', '-A')
    Invoke-Native 'git.exe' @('-C', $publishDir, '-c', 'user.name=github-pages-deploy', '-c', 'user.email=github-pages@local', 'commit', '-m', 'Deploy GitHub Pages')
    Invoke-Native 'git.exe' @('-C', $publishDir, 'remote', 'add', 'origin', $Repository)
    Invoke-Native 'git.exe' @('-C', $publishDir, 'push', '--force', 'origin', "HEAD:$Branch")
  } finally {
    if (Test-Path -LiteralPath $publishParent) {
      Remove-Item -LiteralPath $publishParent -Recurse -Force
    }
  }

  Write-Host "Published $Repository branch $Branch"
} finally {
  Pop-Location
}
