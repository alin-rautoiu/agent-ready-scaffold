param(
  [string]$TaskId = '',
  [switch]$DeleteDb,
  [switch]$Merge,
  [switch]$Help
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($Help) {
  Write-Host 'Usage: close-task-worktree.ps1 -TaskId <slug> [-Merge] [-DeleteDb]'
  Write-Host ''
  Write-Host '  -Merge     Fast-forward merge task/<slug> into the current branch before'
  Write-Host '             removing the worktree. Fails if the working tree is dirty or'
  Write-Host '             if the merge is not a fast-forward.'
  Write-Host ''
  Write-Host 'Example: close-task-worktree.ps1 -TaskId issue-218 -Merge'
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

if (-not (Test-Path $worktreeDir)) {
  throw "Worktree directory does not exist: $worktreeDir"
}

# --- Optional merge before teardown ---
if ($Merge) {
  # Refuse if main working tree is dirty (uncommitted changes or staged files)
  $gitStatus = git -C $repoRoot status --porcelain
  if ($gitStatus) {
    throw (
      "Working tree is dirty. Commit or discard changes on the main branch before merging:`n" +
      ($gitStatus -join "`n")
    )
  }

  # Verify main is on the expected base branch (not detached, not on the task branch)
  $currentBranch = git -C $repoRoot rev-parse --abbrev-ref HEAD
  if ($currentBranch -eq $branch) {
    throw "Main working tree is on $branch — switch to main (or the integration branch) before merging."
  }

  Write-Host "Merging $branch into $currentBranch (fast-forward only)..."
  git -C $repoRoot merge --ff-only $branch
  if ($LASTEXITCODE -ne 0) {
    throw (
      "Fast-forward merge failed. $branch has diverged from $currentBranch. " +
      "Rebase the task branch onto $currentBranch and retry, or merge manually."
    )
  }
  Write-Host "Merged $branch -> $currentBranch"
}

if ($DeleteDb) {
  $worktreeDbPath = Join-Path (Join-Path $repoRoot 'data') ('task-' + $TaskId + '.db')
  if (Test-Path $worktreeDbPath) {
    Remove-Item -Path $worktreeDbPath -Force
  }
  if (Test-Path ($worktreeDbPath + '-wal')) {
    Remove-Item -Path ($worktreeDbPath + '-wal') -Force
  }
  if (Test-Path ($worktreeDbPath + '-shm')) {
    Remove-Item -Path ($worktreeDbPath + '-shm') -Force
  }
}

$targetNodeModules = Join-Path $worktreeDir 'node_modules'
if (Test-Path -LiteralPath $targetNodeModules) {
  # Remove-Item without -Recurse removes a directory junction without deleting the linked content.
  # cmd /c rd fails silently on junctions that appear non-empty; avoid it.
  Remove-Item -LiteralPath $targetNodeModules
}

git -C $repoRoot worktree remove $worktreeDir --force
if ($LASTEXITCODE -ne 0) {
  throw 'git worktree remove failed.'
}

git -C $repoRoot branch -d $branch
if ($LASTEXITCODE -ne 0) {
  throw ('Could not delete branch ' + $branch + '. It may be unmerged.')
}

Write-Host ('Worktree removed: ' + $worktreeDir)
Write-Host ('Branch removed: ' + $branch)
