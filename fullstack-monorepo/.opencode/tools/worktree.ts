import { existsSync } from "node:fs"
import path from "node:path"
import { promisify } from "node:util"
import { execFile } from "node:child_process"
import { tool, type ToolContext } from "@opencode-ai/plugin"

const execFileAsync = promisify(execFile)

const taskIdSchema = tool.schema
  .string()
  .regex(/^[a-z0-9][a-z0-9-]*$/, "Task ID must be kebab-case, for example issue-218")

type CommandResult = {
  stdout: string
  stderr: string
}

type WorktreeStatus = {
  taskId: string
  branch: string
  repoRoot: string
  worktreeDir: string
  exists: boolean
  branchExists: boolean
  currentBranch: string | null
  dirty: boolean
  dirtyFiles: string[]
  mergedIntoCurrentBranch: boolean
  recommendedNextAction: string
}

async function run(command: string, args: string[], cwd: string): Promise<CommandResult> {
  try {
    return await execFileAsync(command, args, {
      cwd,
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 8,
    })
  } catch (error) {
    const err = error as Error & Partial<CommandResult> & { code?: number | string }
    const output = [err.stdout, err.stderr].filter(Boolean).join("\n").trim()
    throw new Error(output || `${command} ${args.join(" ")} failed with code ${err.code ?? "unknown"}`)
  }
}

async function runGit(args: string[], cwd: string): Promise<string> {
  const result = await run("git", args, cwd)
  return result.stdout.trim()
}

async function resolveRepoRoot(context: ToolContext): Promise<string> {
  const commonDirRaw = await runGit(["rev-parse", "--git-common-dir"], context.worktree)
  const commonDir = path.resolve(context.worktree, commonDirRaw)

  if (path.basename(commonDir).toLowerCase() === ".git") {
    return path.dirname(commonDir)
  }

  return await runGit(["rev-parse", "--show-toplevel"], context.worktree)
}

function getWorktreeDir(repoRoot: string, taskId: string): string {
  return path.join(path.dirname(repoRoot), `${path.basename(repoRoot)}-${taskId}`)
}

async function branchExists(repoRoot: string, branch: string): Promise<boolean> {
  const branches = await runGit(["branch", "--list", branch], repoRoot)
  return branches.length > 0
}

async function getStatus(taskId: string, context: ToolContext): Promise<WorktreeStatus> {
  const repoRoot = await resolveRepoRoot(context)
  const branch = `task/${taskId}`
  const worktreeDir = getWorktreeDir(repoRoot, taskId)
  const exists = existsSync(worktreeDir)
  const hasBranch = await branchExists(repoRoot, branch)

  let currentBranch: string | null = null
  let dirtyFiles: string[] = []
  let mergedIntoCurrentBranch = false

  if (exists) {
    currentBranch = (await runGit(["branch", "--show-current"], worktreeDir)) || null
    const status = await runGit(["status", "--porcelain"], worktreeDir)
    dirtyFiles = status ? status.split(/\r?\n/).filter(Boolean) : []
  }

  if (hasBranch) {
    const merged = await runGit(["branch", "--merged", "HEAD", "--list", branch], repoRoot)
    mergedIntoCurrentBranch = merged.length > 0
  }

  let recommendedNextAction = "create"
  if (!exists) {
    recommendedNextAction = hasBranch
      ? "create worktree for the existing task branch"
      : "create worktree"
  } else if (currentBranch !== branch) {
    recommendedNextAction = `stop: expected ${branch}, found ${currentBranch ?? "detached HEAD"}`
  } else if (dirtyFiles.length > 0) {
    recommendedNextAction = "commit or discard task worktree changes before closing"
  } else if (!mergedIntoCurrentBranch) {
    recommendedNextAction = "merge the task branch or close with merge=true after validation"
  } else {
    recommendedNextAction = "safe to close"
  }

  return {
    taskId,
    branch,
    repoRoot,
    worktreeDir,
    exists,
    branchExists: hasBranch,
    currentBranch,
    dirty: dirtyFiles.length > 0,
    dirtyFiles,
    mergedIntoCurrentBranch,
    recommendedNextAction,
  }
}

function formatResult(title: string, value: unknown) {
  return {
    output: `${title}\n${JSON.stringify(value, null, 2)}`,
    metadata: value as Record<string, unknown>,
  }
}

export const create = tool({
  description: "Create a repo-standard task worktree using the new-task-worktree script.",
  args: {
    taskId: taskIdSchema.describe("Task slug in kebab-case, for example issue-218"),
    baseBranch: tool.schema.string().default("main").describe("Base branch for the new task branch"),
    openVSCode: tool.schema.boolean().default(false).describe("Open the created worktree in VS Code"),
  },
  async execute(args, context) {
    const repoRoot = await resolveRepoRoot(context)
    // TODO: replace with the project's new-task-worktree script path and shell invocation
    const script = path.join(repoRoot, "scripts", "new-task-worktree.ps1")
    const commandArgs = [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      script,
      "-TaskId",
      args.taskId,
      "-BaseBranch",
      args.baseBranch,
    ]

    if (args.openVSCode) {
      commandArgs.push("-OpenVSCode")
    }

    const result = await run("powershell", commandArgs, repoRoot)
    const status = await getStatus(args.taskId, context)

    return formatResult("Worktree created", {
      taskId: args.taskId,
      branch: status.branch,
      worktreeDir: status.worktreeDir,
      repoRoot: status.repoRoot,
      stdout: result.stdout.trim(),
      stderr: result.stderr.trim(),
    })
  },
})

export const status = tool({
  description: "Report state and close-readiness for a repo-standard task worktree.",
  args: {
    taskId: taskIdSchema.describe("Task slug in kebab-case, for example issue-218"),
  },
  async execute(args, context) {
    return formatResult("Worktree status", await getStatus(args.taskId, context))
  },
})

export const close = tool({
  description: "Safely close a repo-standard task worktree using the close-task-worktree script.",
  args: {
    taskId: taskIdSchema.describe("Task slug in kebab-case, for example issue-218"),
    merge: tool.schema.boolean().default(false).describe("Fast-forward merge task/<slug> into the current branch before closing"),
    deleteDb: tool.schema.boolean().default(false).describe("Delete the task-scoped database files"),
  },
  async execute(args, context) {
    const before = await getStatus(args.taskId, context)

    if (!before.exists) {
      throw new Error(`Worktree does not exist: ${before.worktreeDir}`)
    }

    if (before.currentBranch !== before.branch) {
      throw new Error(`Refusing to close ${before.worktreeDir}: expected ${before.branch}, found ${before.currentBranch ?? "detached HEAD"}`)
    }

    if (before.dirty) {
      throw new Error(`Refusing to close dirty worktree ${before.worktreeDir}:\n${before.dirtyFiles.join("\n")}`)
    }

    if (!args.merge && !before.mergedIntoCurrentBranch) {
      throw new Error(`Refusing to close unmerged branch ${before.branch}. Merge it first or call worktree_close with merge=true.`)
    }

    // TODO: replace with the project's close-task-worktree script path and shell invocation
    const script = path.join(before.repoRoot, "scripts", "close-task-worktree.ps1")
    const commandArgs = [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      script,
      "-TaskId",
      args.taskId,
    ]

    if (args.merge) {
      commandArgs.push("-Merge")
    }

    if (args.deleteDb) {
      commandArgs.push("-DeleteDb")
    }

    const result = await run("powershell", commandArgs, before.repoRoot)

    return formatResult("Worktree closed", {
      taskId: args.taskId,
      branch: before.branch,
      worktreeDir: before.worktreeDir,
      repoRoot: before.repoRoot,
      stdout: result.stdout.trim(),
      stderr: result.stderr.trim(),
    })
  },
})
