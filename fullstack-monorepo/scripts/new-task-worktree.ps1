param(
  [string]$TaskId = '',
  [string]$BaseBranch = 'main',
  [switch]$OpenVSCode,
  [switch]$Help
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($Help) {
  Write-Host 'Usage: new-task-worktree.ps1 -TaskId <slug> [-BaseBranch <branch>] [-OpenVSCode]'
  Write-Host 'Example: new-task-worktree.ps1 -TaskId issue-218 -BaseBranch main -OpenVSCode'
  exit 0
}

if (-not $TaskId) {
  throw 'TaskId is required. Use -Help for usage.'
}

if ($TaskId -notmatch '^[a-z0-9][a-z0-9-]*$') {
  throw 'TaskId must be kebab-case (lowercase letters, numbers, dashes). Example: issue-218'
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$repoParent = Split-Path $repoRoot -Parent
$repoName = Split-Path $repoRoot -Leaf
$worktreeDir = Join-Path $repoParent ($repoName + '-' + $TaskId)
$branch = 'task/' + $TaskId

if (-not (Test-Path (Join-Path $repoRoot '.git'))) {
  throw "Repository root not detected at $repoRoot"
}

if (Test-Path $worktreeDir) {
  throw "Worktree directory already exists: $worktreeDir"
}

$existingBranch = git -C $repoRoot branch --list $branch
if ($LASTEXITCODE -ne 0) {
  throw 'Failed to check existing branch.'
}

if ($existingBranch -and $existingBranch.Trim() -ne '') {
  Write-Host "Branch $branch already exists, checking it out in new worktree."
  git -C $repoRoot worktree add $worktreeDir $branch
} else {
  git -C $repoRoot worktree add $worktreeDir -b $branch $BaseBranch
}

if ($LASTEXITCODE -ne 0) {
  throw 'git worktree add failed.'
}

$sourceNodeModules = Join-Path $repoRoot 'node_modules'
$targetNodeModules = Join-Path $worktreeDir 'node_modules'
if ((Test-Path $sourceNodeModules) -and -not (Test-Path $targetNodeModules)) {
  New-Item -ItemType Junction -Path $targetNodeModules -Target $sourceNodeModules | Out-Null
}

$sourceEnv = Join-Path $repoRoot '.env'
if (-not (Test-Path $sourceEnv)) {
  $sourceEnv = Join-Path $repoRoot '.env.example'
  if (-not (Test-Path $sourceEnv)) {
    throw 'Neither .env nor .env.example exists in the repository root.'
  }
  Write-Host 'Warning: .env not found in root, using .env.example as a template.'
}

$targetEnv = Join-Path $worktreeDir '.env'
Copy-Item -Path $sourceEnv -Destination $targetEnv -Force

$envLines = Get-Content -Path $targetEnv
$mainDataDir = Join-Path $repoRoot 'data'
if (-not (Test-Path $mainDataDir)) {
  New-Item -ItemType Directory -Path $mainDataDir | Out-Null
}
$dbPath = (Join-Path $mainDataDir ('task-' + $TaskId + '.db')).Replace('\', '/')
$databasePathLine = 'DATABASE_PATH=' + $dbPath
$hasDatabasePath = $false

for ($i = 0; $i -lt $envLines.Count; $i++) {
  if ($envLines[$i] -match '^\s*DATABASE_PATH=') {
    $envLines[$i] = $databasePathLine
    $hasDatabasePath = $true
    break
  }
}

if (-not $hasDatabasePath) {
  $envLines += $databasePathLine
}

Set-Content -Path $targetEnv -Value $envLines

Write-Host ''
Write-Host ('Worktree created: ' + $worktreeDir)
Write-Host ('Branch: ' + $branch)
Write-Host ('Env file: ' + $targetEnv)
Write-Host ''
Write-Host 'Next steps:'
Write-Host ('1) cd "' + $worktreeDir + '"')
Write-Host '2) npm run db:migrate'
Write-Host '3) npm run dev'

if ($OpenVSCode) {
  code $worktreeDir
}
