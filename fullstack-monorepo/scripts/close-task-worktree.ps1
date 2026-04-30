param(
  [string]$TaskId = '',
  [string]$BaseBranch = 'main',
  [switch]$DeleteDb,
  [switch]$Merge,
  [switch]$ForceRemove,
  [switch]$Help
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($Help) {
  Write-Host 'Usage: close-task-worktree.ps1 -TaskId <slug> [-BaseBranch <branch>] [-Merge] [-DeleteDb] [-ForceRemove]'
  Write-Host ''
  Write-Host '  -BaseBranch'
  Write-Host '             The expected branch in the main repository to merge into.'
  Write-Host '             Defaults to "main".'
  Write-Host ''
  Write-Host '  -Merge     Fast-forward merge task/<slug> into the current branch before'
  Write-Host '             removing the worktree. Fails if the working tree is dirty or'
  Write-Host '             if the merge is not a fast-forward.'
  Write-Host ''
  Write-Host '  -ForceRemove'
  Write-Host '             Pass --force to git worktree remove after all safety checks pass.'
  Write-Host '             This does not bypass dirty-worktree or unmerged-branch checks.'
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

$actualWorktreeRoot = (git -C $worktreeDir rev-parse --show-toplevel)
if ($LASTEXITCODE -ne 0) {
  throw "Could not inspect worktree root: $worktreeDir"
}

$actualWorktreeRoot = (Resolve-Path $actualWorktreeRoot).Path
$expectedWorktreeRoot = (Resolve-Path $worktreeDir).Path
if ($actualWorktreeRoot -ne $expectedWorktreeRoot) {
  throw "Refusing to close unexpected worktree. Expected $expectedWorktreeRoot, got $actualWorktreeRoot"
}

$taskBranch = (git -C $worktreeDir branch --show-current)
if ($LASTEXITCODE -ne 0) {
  throw "Could not inspect current branch in $worktreeDir"
}

if ($taskBranch -ne $branch) {
  if (-not $taskBranch) {
    throw "Refusing to close $worktreeDir because it is in detached HEAD state. Expected branch $branch."
  }
  throw "Refusing to close $worktreeDir because it is on $taskBranch. Expected branch $branch."
}

$branchRef = 'refs/heads/' + $branch
git -C $repoRoot show-ref --verify --quiet $branchRef
if ($LASTEXITCODE -ne 0) {
  throw "Branch $branch does not exist."
}

$taskStatus = git -C $worktreeDir status --porcelain
if ($LASTEXITCODE -ne 0) {
  throw "Could not inspect task worktree status."
}

if ($taskStatus) {
  throw (
    "Task worktree is dirty. Commit or discard changes before closing:`n" +
    ($taskStatus -join "`n")
  )
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
    throw "Main working tree is on $branch - switch to main (or the integration branch) before merging."
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
} else {
  $mergedBranch = git -C $repoRoot branch --merged HEAD --list $branch
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to check whether $branch is merged into the current branch."
  }

  if (-not $mergedBranch) {
    throw "Refusing to remove unmerged branch $branch. Merge it first or rerun with -Merge."
  }
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
  Write-Host "Removing node_modules junction..."
  $isJunction = (Get-Item -LiteralPath $targetNodeModules).Attributes -match "ReparsePoint"
  if ($isJunction) {
    # Use cmd /c rmdir to avoid PowerShell's Remove-Item NullReferenceException with junctions
    & cmd /c rmdir $targetNodeModules
  } else {
    Write-Host "Warning: $targetNodeModules is not a junction. Skipping automatic removal to protect root node_modules."
  }
}

$removeArgs = @('-C', $repoRoot, 'worktree', 'remove', $worktreeDir)
if ($ForceRemove) {
  $removeArgs += '--force'
}

& git @removeArgs
if ($LASTEXITCODE -ne 0) {
  throw 'git worktree remove failed.'
}

git -C $repoRoot branch -d $branch
if ($LASTEXITCODE -ne 0) {
  throw ('Could not delete branch ' + $branch + '. It may be unmerged.')
}

Write-Host ('Worktree removed: ' + $worktreeDir)
Write-Host ('Branch removed: ' + $branch)
