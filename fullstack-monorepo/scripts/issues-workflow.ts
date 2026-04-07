import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

export type AgentTarget = 'claude' | 'codex'
export type WorkflowMode = 'backlog' | 'execute'
export type IssueBucket = 'quick-wins' | 'moderate' | 'complex' | 'blocked' | 'excluded'
export type TerminalStatus = 'completed' | 'failed' | 'canceled'
export type IssueAction = 'closed' | 'commented_open'

export type ParsedIssueWorkflowArgs = {
  mode: WorkflowMode
  repo?: string
  target?: AgentTarget
  targetCommand?: string
  applyIssueActions: boolean
  dryRun: boolean
  help: boolean
  limit: number
  issues: number[]
  runId?: string
}

export type ScoreFactor = {
  code: string
  weight: number
  reason: string
}

export type IssueComment = {
  author: string
  body: string
  createdAt: string
  url?: string
}

export type IssueContext = {
  number: number
  title: string
  body: string
  url: string
  createdAt: string
  updatedAt: string
  labels: string[]
  assignees: string[]
  milestone?: string | null
  comments: IssueComment[]
  commentsCount: number
}

export type RankedIssue = IssueContext & {
  bucket: IssueBucket
  score: number
  factors: ScoreFactor[]
}

export type GroupedIssues = Record<IssueBucket, RankedIssue[]>

export type GroupedTaskManifestEntry = {
  issueNumber: number
  issueUrl: string
  title: string
  summary: string
  bucket: IssueBucket
  score: number
  briefFile: string
  executionReadiness: 'ready' | 'blocked' | 'excluded'
  statusCue: string
}

export type NormalizedIssueResult = {
  issue_number: number
  issue_url: string
  terminal_status: TerminalStatus
  resolution_summary: string
  evidence_links: string[]
  issue_action: IssueAction
  actions_taken: string[]
  blockers_if_any: string[]
}

export type IssueRunLogEntry = {
  issueNumber: number
  issueUrl: string
  title: string
  bucket: IssueBucket
  score: number
  mode: WorkflowMode
  target?: AgentTarget
  briefPath: string
  outputPath?: string
  status: 'queued' | 'processed' | 'skipped'
  dryRun: boolean
  normalizedResult: NormalizedIssueResult
}

type CommandRunOptions = {
  input?: string
  cwd?: string
}

type CommandResult = {
  status: number | null
  stdout: string
  stderr: string
  error?: Error
}

type CommandRunner = (command: string, args: string[], options?: CommandRunOptions) => CommandResult

type IssueListResponse = {
  number: number
  title: string
  url: string
  state?: string | null
  createdAt: string
  updatedAt: string
  labels?: Array<{ name?: string | null } | null> | null
  assignees?: Array<{ login?: string | null } | null> | null
  comments?: { totalCount?: number | null } | Array<unknown> | number | null
  milestone?: { title?: string | null } | null
}

type IssueViewResponse = Omit<IssueListResponse, 'comments'> & {
  body?: string | null
  comments?: Array<{
    author?: { login?: string | null } | null
    body?: string | null
    createdAt?: string | null
    url?: string | null
  } | null> | { totalCount?: number | null } | number | null
}

type WorkflowDiscovery = {
  issueContexts: IssueContext[]
  rankedIssues: RankedIssue[]
  groups: GroupedIssues
}

type WorkflowRunPaths = {
  runId: string
  runDir: string
  briefsDir: string
  outputsDir: string
  resultsPath: string
}
const DEFAULT_LIMIT = 100
const BUCKET_ORDER: IssueBucket[] = ['quick-wins', 'moderate', 'complex', 'blocked', 'excluded']
const POSITIVE_LABELS = new Set(['good first issue', 'quick win', 'quick-win', 'docs', 'documentation', 'copy', 'content', 'tests', 'test', 'chore', 'ux'])
const COMPLEXITY_LABELS = new Set(['refactor', 'migration', 'infra', 'infrastructure', 'backend', 'frontend', 'api', 'schema', 'database', 'performance', 'security', 'breaking-change', 'feature'])
const BLOCKED_LABELS = new Set(['blocked', 'needs-decision', 'needs-design', 'needs-product', 'waiting', 'waiting-on-external', 'dependency', 'dependencies'])
const EXCLUDED_LABELS = new Set(['duplicate', 'invalid', 'wontfix', 'meta', 'epic', 'tracking', 'question', 'discussion', 'spike', 'research'])
const RUN_ROOT = path.resolve('tmp/issues-orchestration')

function defaultCommandRunner(command: string, args: string[], options?: CommandRunOptions): CommandResult {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    input: options?.input,
    cwd: options?.cwd,
    maxBuffer: 10 * 1024 * 1024,
  })

  return {
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    error: result.error,
  }
}

function normalizeWhitespace(input: string): string {
  return input.replace(/\r\n/g, '\n').trim()
}

function asStringArray(values: unknown): string[] {
  if (!Array.isArray(values)) return []
  return values
    .map((value) => typeof value === 'string' ? value.trim() : '')
    .filter((value) => value.length > 0)
}

function safeJsonParse<T>(input: string): T | null {
  try {
    return JSON.parse(input) as T
  } catch {
    return null
  }
}

function getFlagValue(argv: string[], key: string): string | undefined {
  const prefix = `--${key}=`
  for (const arg of argv) {
    if (arg.startsWith(prefix)) {
      return arg.slice(prefix.length)
    }
  }
  return undefined
}

function hasFlag(argv: string[], key: string): boolean {
  return argv.includes(`--${key}`)
}

function parseIssueList(raw: string): number[] {
  return raw
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isFinite(value) && value > 0)
}

function normalizeIsoForSort(value: string): number {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed
}

function sanitizeRunId(value: string): string {
  return value.trim().replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
}

function isWorkflowMode(value: string | undefined): value is WorkflowMode {
  return value === 'backlog' || value === 'execute'
}

export function createRunId(now = new Date()): string {
  return now.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19)
}

export function parseArgs(argv: string[]): ParsedIssueWorkflowArgs {
  const modeRaw = getFlagValue(argv, 'mode')
  const mode: WorkflowMode = modeRaw && isWorkflowMode(modeRaw) ? modeRaw : 'backlog'
  const targetRaw = getFlagValue(argv, 'target')
  const target = targetRaw === 'claude' || targetRaw === 'codex' ? targetRaw : undefined
  const limitRaw = getFlagValue(argv, 'limit')
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : DEFAULT_LIMIT
  const issues = parseIssueList(getFlagValue(argv, 'issues') ?? '')
  const runIdRaw = getFlagValue(argv, 'run-id')
  const runId = runIdRaw ? sanitizeRunId(runIdRaw) : undefined

  if (limitRaw && (!Number.isFinite(limit) || limit <= 0)) {
    throw new Error('Invalid --limit value. Expected a positive integer.')
  }

  if (modeRaw && !isWorkflowMode(modeRaw)) {
    throw new Error('Invalid --mode value. Expected one of: backlog, execute.')
  }

  if (targetRaw && !target) {
    throw new Error('Invalid --target value. Expected one of: claude, codex. The copilot target is unavailable — the GitHub Copilot VS Code agent implements execute mode directly via agent delegation.')
  }

  if (runIdRaw && !runId) {
    throw new Error('Invalid --run-id value. Use letters, numbers, dots, underscores, or hyphens.')
  }

  return {
    mode,
    repo: getFlagValue(argv, 'repo'),
    target,
    targetCommand: getFlagValue(argv, 'target-command'),
    applyIssueActions: hasFlag(argv, 'apply-issue-actions'),
    dryRun: hasFlag(argv, 'dry-run'),
    help: hasFlag(argv, 'help') || hasFlag(argv, 'h'),
    limit,
    issues,
    runId,
  }
}

export function printUsage(): void {
  console.log([
    'Usage:',
    '  npm run issues:workflow -- --repo=<owner/name>',
    '  npm run issues:workflow -- --repo=<owner/name> --issues=101,105 --run-id=manual-check',
    '  npm run issues:workflow -- --mode=execute --repo=<owner/name> --target=codex --limit=5 --dry-run',
    '  npm run issues:workflow -- --mode=execute --repo=<owner/name> --target=claude --issues=101,105 --apply-issue-actions',
    '',
    'Flags:',
    '  --mode=backlog|execute  Optional. Defaults to backlog.',
    '  --repo=<owner/name>      GitHub repository. If omitted, resolve from `gh repo view`.',
    '  --target=claude|codex        Required for execute mode only. (copilot target removed — VS Code Copilot agent implements execute mode directly via runSubagent.)',
    '  --target-command=<bin>   Optional executable override for the selected target CLI in execute mode.',
    '  --issues=1,2,3           Optional comma-separated subset of open issue numbers.',
    '  --limit=<n>              Max open issues to inspect when no issue subset is provided. Default: 100.',
    '  --run-id=<id>            Optional artifact directory suffix under tmp/issues-orchestration/.',
    '  --apply-issue-actions    Execute-mode only. Comment on processed issues and close when the result requests it.',
    '  --dry-run                Execute-mode only. Execute target CLIs but never comment or close issues.',
    '  --help                   Show this help output.',
    '',
    'Modes:',
    '  backlog                  Default when --mode is omitted. Fetch issues, rank/group them, and write briefs/artifacts only.',
    '  execute                  Fetch issues, rank/group them, write briefs, and invoke the selected target CLI.',
    '',
    'Artifacts:',
    '  tmp/issues-orchestration/<run-id>/{issue-contexts.json,ranked-queue.json,grouped-summary.json,grouped-task-manifest.json,briefs/,results.ndjson,results.json}',
  ].join('\n'))
}

function normalizeLabels(labels: IssueListResponse['labels']): string[] {
  if (!Array.isArray(labels)) return []
  return labels
    .map((entry) => entry?.name?.trim().toLowerCase() ?? '')
    .filter((label) => label.length > 0)
    .sort((left, right) => left.localeCompare(right))
}

function normalizeAssignees(assignees: IssueListResponse['assignees']): string[] {
  if (!Array.isArray(assignees)) return []
  return assignees
    .map((entry) => entry?.login?.trim() ?? '')
    .filter((login) => login.length > 0)
    .sort((left, right) => left.localeCompare(right))
}

function normalizeCommentsCount(comments: IssueListResponse['comments']): number {
  if (typeof comments === 'number') return comments
  if (Array.isArray(comments)) return comments.length
  if (comments && typeof comments === 'object' && typeof comments.totalCount === 'number') {
    return comments.totalCount
  }
  return 0
}

function normalizeComments(comments: IssueViewResponse['comments']): IssueComment[] {
  if (!Array.isArray(comments)) return []
  return comments
    .map((entry) => ({
      author: entry?.author?.login?.trim() ?? 'unknown',
      body: normalizeWhitespace(entry?.body ?? ''),
      createdAt: entry?.createdAt ?? '',
      url: entry?.url ?? undefined,
    }))
    .filter((entry) => entry.body.length > 0 || entry.createdAt.length > 0)
}

function normalizeIssueContext(issue: IssueViewResponse): IssueContext {
  const comments = normalizeComments(issue.comments)
  return {
    number: issue.number,
    title: issue.title,
    body: normalizeWhitespace(issue.body ?? ''),
    url: issue.url,
    createdAt: issue.createdAt,
    updatedAt: issue.updatedAt,
    labels: normalizeLabels(issue.labels),
    assignees: normalizeAssignees(issue.assignees),
    milestone: issue.milestone?.title?.trim() || null,
    comments,
    commentsCount: comments.length > 0 ? comments.length : normalizeCommentsCount(issue.comments),
  }
}

function pushFactor(factors: ScoreFactor[], code: string, weight: number, reason: string): number {
  factors.push({ code, weight, reason })
  return weight
}

function hasAnyLabel(labels: string[], labelSet: Set<string>): boolean {
  return labels.some((label) => labelSet.has(label))
}

function uniqueCommenters(issue: IssueContext): number {
  return new Set(issue.comments.map((comment) => comment.author)).size
}

function combinedTextLength(issue: IssueContext): number {
  return `${issue.title}\n${issue.body}`.trim().length
}

function countChecklistItems(body: string): number {
  const matches = body.match(/^\s*[-*]\s+\[[ xX]\]/gm)
  return matches?.length ?? 0
}

export function scoreIssue(issue: IssueContext): RankedIssue {
  const factors: ScoreFactor[] = []
  let score = 50

  if (issue.commentsCount === 0) {
    score += pushFactor(factors, 'no-comments', 12, 'No comment thread yet; lower coordination cost.')
  } else if (issue.commentsCount <= 2) {
    score += pushFactor(factors, 'few-comments', 8, 'Small comment thread suggests limited ambiguity.')
  } else if (issue.commentsCount >= 15) {
    score += pushFactor(factors, 'heavy-thread', -14, 'Large comment thread suggests coordination or churn.')
  } else if (issue.commentsCount >= 8) {
    score += pushFactor(factors, 'busy-thread', -8, 'Busy discussion usually increases execution risk.')
  }

  if (issue.assignees.length === 0) {
    score += pushFactor(factors, 'unassigned', 8, 'No active assignee reduces handoff overlap risk.')
  } else if (issue.assignees.length === 1) {
    score += pushFactor(factors, 'assigned', -4, 'Existing assignee may indicate ongoing coordination.')
  } else {
    score += pushFactor(factors, 'multi-assignee', -10, 'Multiple assignees usually signal broader scope.')
  }

  const positiveLabels = issue.labels.filter((label) => POSITIVE_LABELS.has(label))
  if (positiveLabels.length > 0) {
    const bonus = Math.min(positiveLabels.length * 8, 24)
    score += pushFactor(factors, 'positive-labels', bonus, `Positive labels: ${positiveLabels.join(', ')}.`)
  }

  const complexityLabels = issue.labels.filter((label) => COMPLEXITY_LABELS.has(label))
  if (complexityLabels.length > 0) {
    const penalty = Math.min(complexityLabels.length * 7, 28)
    score += pushFactor(factors, 'complexity-labels', -penalty, `Complexity labels: ${complexityLabels.join(', ')}.`)
  }

  const length = combinedTextLength(issue)
  if (length <= 400) {
    score += pushFactor(factors, 'short-context', 10, 'Short issue text is faster to load and validate.')
  } else if (length <= 1200) {
    score += pushFactor(factors, 'bounded-context', 4, 'Moderate issue text stays reviewable.')
  } else if (length > 3000) {
    score += pushFactor(factors, 'long-context', -10, 'Large issue text often hides multiple sub-problems.')
  }

  const checklistItems = countChecklistItems(issue.body)
  if (checklistItems >= 5) {
    score += pushFactor(factors, 'large-checklist', -6, 'Long checklists usually expand delivery surface.')
  } else if (checklistItems >= 1) {
    score += pushFactor(factors, 'defined-checklist', 4, 'Concrete checklist improves execution clarity.')
  }

  const commenters = uniqueCommenters(issue)
  if (commenters >= 4) {
    score += pushFactor(factors, 'many-commenters', -6, 'Many participants often imply alignment overhead.')
  }

  if (issue.milestone) {
    score += pushFactor(factors, 'milestone', -3, `Milestone attached (${issue.milestone}) suggests scheduling dependency.`)
  }

  const ageMs = Date.now() - normalizeIsoForSort(issue.createdAt)
  const ageDays = ageMs / (24 * 60 * 60 * 1000)
  if (ageDays > 180) {
    score += pushFactor(factors, 'old-issue', -5, 'Older issues are more likely to have hidden history or drift.')
  }

  const bucket = determineBucket(issue, score)

  if (bucket === 'blocked') {
    pushFactor(factors, 'blocked-bucket', -999, 'Blocked metadata overrides numeric ranking.')
  }

  if (bucket === 'excluded') {
    pushFactor(factors, 'excluded-bucket', -999, 'Excluded metadata removes issue from active execution buckets.')
  }

  return {
    ...issue,
    bucket,
    score,
    factors,
  }
}

export function determineBucket(issue: IssueContext, score: number): IssueBucket {
  const titleAndBody = `${issue.title}\n${issue.body}`.toLowerCase()

  if (hasAnyLabel(issue.labels, EXCLUDED_LABELS) || /\b(epic|tracking|meta|research|spike)\b/.test(titleAndBody)) {
    return 'excluded'
  }

  if (hasAnyLabel(issue.labels, BLOCKED_LABELS) || /\bblocked by\b|\bwaiting on\b|\bneeds decision\b/.test(titleAndBody)) {
    return 'blocked'
  }

  if (score >= 72) return 'quick-wins'
  if (score >= 48) return 'moderate'
  return 'complex'
}

export function rankIssues(issues: IssueContext[]): RankedIssue[] {
  return issues
    .map((issue) => scoreIssue(issue))
    .sort((left, right) => {
      const bucketDelta = BUCKET_ORDER.indexOf(left.bucket) - BUCKET_ORDER.indexOf(right.bucket)
      if (bucketDelta !== 0) return bucketDelta
      if (left.score !== right.score) return right.score - left.score
      if (left.commentsCount !== right.commentsCount) return left.commentsCount - right.commentsCount
      const leftLength = combinedTextLength(left)
      const rightLength = combinedTextLength(right)
      if (leftLength !== rightLength) return leftLength - rightLength
      const createdDelta = normalizeIsoForSort(left.createdAt) - normalizeIsoForSort(right.createdAt)
      if (createdDelta !== 0) return createdDelta
      return left.number - right.number
    })
}

export function groupRankedIssues(issues: RankedIssue[]): GroupedIssues {
  return {
    'quick-wins': issues.filter((issue) => issue.bucket === 'quick-wins'),
    moderate: issues.filter((issue) => issue.bucket === 'moderate'),
    complex: issues.filter((issue) => issue.bucket === 'complex'),
    blocked: issues.filter((issue) => issue.bucket === 'blocked'),
    excluded: issues.filter((issue) => issue.bucket === 'excluded'),
  }
}

function formatLabels(labels: string[]): string {
  return labels.length > 0 ? labels.join(', ') : 'none'
}

function formatComments(comments: IssueComment[]): string {
  if (comments.length === 0) {
    return '- No comments.'
  }

  return comments
    .map((comment, index) => {
      const header = `- Comment ${index + 1} by @${comment.author}${comment.createdAt ? ` on ${comment.createdAt}` : ''}${comment.url ? ` (${comment.url})` : ''}`
      const body = comment.body.length > 0 ? comment.body.split('\n').map((line) => `  ${line}`).join('\n') : '  (empty comment body)'
      return `${header}\n${body}`
    })
    .join('\n')
}

export function buildIssueBrief(issue: RankedIssue): string {
  const acceptanceCriteria = countChecklistItems(issue.body) > 0
    ? '- Respect the issue body checklist items where still applicable.\n- Preserve existing public contracts unless the issue explicitly requires a change.'
    : '- Resolve the concrete problem described in the issue.\n- Preserve existing public contracts unless the issue explicitly requires a change.'

  return [
    `# Orchestrator Brief: Issue #${issue.number}`,
    '',
    '## Objective',
    `Resolve issue #${issue.number}: ${issue.title}`,
    '',
    '## Context',
    `- Issue URL: ${issue.url}`,
    `- Created: ${issue.createdAt}`,
    `- Updated: ${issue.updatedAt}`,
    `- Labels: ${formatLabels(issue.labels)}`,
    `- Assignees: ${issue.assignees.length > 0 ? issue.assignees.join(', ') : 'none'}`,
    `- Milestone: ${issue.milestone ?? 'none'}`,
    `- Heuristic bucket: ${issue.bucket}`,
    `- Heuristic score: ${issue.score}`,
    '- Heuristic factors:',
    ...issue.factors.map((factor) => `  - ${factor.code}: ${factor.weight >= 0 ? '+' : ''}${factor.weight} (${factor.reason})`),
    '',
    '### Issue Body',
    issue.body.length > 0 ? issue.body : '_No issue body provided._',
    '',
    '### Issue Comments',
    formatComments(issue.comments),
    '',
    '## Issue Reference',
    `- Issue: #${issue.number}`,
    `- URL: ${issue.url}`,
    `- Commit description/body must include: Issue: #${issue.number}`,
    '',
    '## Constraints and Non-Goals',
    '- Keep changes scoped to the issue.',
    '- Do not refactor unrelated areas just because they are nearby.',
    '- Add or update tests when the behavior is testable.',
    '- If blocked, state the blocker explicitly instead of guessing.',
    '',
    '## Acceptance Criteria',
    acceptanceCriteria,
    '',
    '## Verification Plan',
    '- Run focused validation for the changed area.',
    '- Run the full test suite before handing off if code changes were made.',
    '- Provide concrete evidence for any completed resolution claim.',
    '',
    '## Expected Output Schema',
    'Return a JSON object or fenced JSON block with this exact contract:',
    '```json',
    JSON.stringify({
      issue_number: issue.number,
      issue_url: issue.url,
      terminal_status: 'completed',
      resolution_summary: 'Short summary of the actual result.',
      evidence_links: ['https://github.com/owner/repo/commit/<sha>', 'https://github.com/owner/repo/pull/<number>'],
      issue_action: 'closed',
      actions_taken: ['Implemented the fix', 'Added tests', 'Validated with npm test'],
      blockers_if_any: [],
    }, null, 2),
    '```',
  ].join('\n')
}

export function buildGroupedSummary(groups: GroupedIssues): Record<IssueBucket, { count: number; issues: number[] }> {
  return {
    'quick-wins': { count: groups['quick-wins'].length, issues: groups['quick-wins'].map((issue) => issue.number) },
    moderate: { count: groups.moderate.length, issues: groups.moderate.map((issue) => issue.number) },
    complex: { count: groups.complex.length, issues: groups.complex.map((issue) => issue.number) },
    blocked: { count: groups.blocked.length, issues: groups.blocked.map((issue) => issue.number) },
    excluded: { count: groups.excluded.length, issues: groups.excluded.map((issue) => issue.number) },
  }
}

function extractIssueSummary(body: string): string {
  const firstContentLine = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0)

  if (!firstContentLine) return 'No issue body provided.'
  return firstContentLine.length <= 180 ? firstContentLine : `${firstContentLine.slice(0, 177)}...`
}

function getExecutionReadiness(bucket: IssueBucket): GroupedTaskManifestEntry['executionReadiness'] {
  if (bucket === 'blocked') return 'blocked'
  if (bucket === 'excluded') return 'excluded'
  return 'ready'
}

function getStatusCue(bucket: IssueBucket): string {
  if (bucket === 'blocked') {
    return 'Blocked by metadata; requires dependency or decision before execution.'
  }
  if (bucket === 'excluded') {
    return 'Excluded by metadata; not part of active execution queue.'
  }
  return 'Ready for execution.'
}

function toManifestEntry(issue: RankedIssue, bucket: IssueBucket): GroupedTaskManifestEntry {
  return {
    issueNumber: issue.number,
    issueUrl: issue.url,
    title: issue.title,
    summary: extractIssueSummary(issue.body),
    bucket,
    score: issue.score,
    briefFile: `briefs/issue-${issue.number}.md`,
    executionReadiness: getExecutionReadiness(bucket),
    statusCue: getStatusCue(bucket),
  }
}

export function buildGroupedTaskManifest(groups: GroupedIssues): Record<IssueBucket, GroupedTaskManifestEntry[]> {
  return {
    'quick-wins': groups['quick-wins'].map((issue) => toManifestEntry(issue, 'quick-wins')),
    moderate: groups.moderate.map((issue) => toManifestEntry(issue, 'moderate')),
    complex: groups.complex.map((issue) => toManifestEntry(issue, 'complex')),
    blocked: groups.blocked.map((issue) => toManifestEntry(issue, 'blocked')),
    excluded: groups.excluded.map((issue) => toManifestEntry(issue, 'excluded')),
  }
}

function stringifyForJson(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function pickIssueResultShape(value: unknown, issueNumber: number): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    const firstObject = value.find((entry) => typeof entry === 'object' && entry !== null && Number((entry as Record<string, unknown>).issue_number) === issueNumber)
    if (firstObject && typeof firstObject === 'object') return firstObject as Record<string, unknown>
    const fallback = value.find((entry) => typeof entry === 'object' && entry !== null)
    return fallback ? fallback as Record<string, unknown> : null
  }

  if (typeof value === 'object' && value !== null) {
    return value as Record<string, unknown>
  }

  return null
}

function extractJsonPayload(rawOutput: string): unknown {
  const trimmed = rawOutput.trim()
  const direct = safeJsonParse<unknown>(trimmed)
  if (direct !== null) return direct

  const fencedMatch = trimmed.match(/```json\s*([\s\S]*?)```/i)
  if (fencedMatch?.[1]) {
    return safeJsonParse<unknown>(fencedMatch[1].trim())
  }

  const genericFence = trimmed.match(/```\s*([\s\S]*?)```/)
  if (genericFence?.[1]) {
    return safeJsonParse<unknown>(genericFence[1].trim())
  }

  return null
}

function extractUrls(rawOutput: string): string[] {
  const matches = rawOutput.match(/https?:\/\/[^\s)\]]+/g) ?? []
  return Array.from(new Set(matches))
}

function firstNonEmptyLine(rawOutput: string): string {
  const line = rawOutput.split(/\r?\n/).map((entry) => entry.trim()).find((entry) => entry.length > 0)
  return line ?? 'No summary returned by target CLI.'
}

function normalizeTerminalStatus(value: string | undefined, rawOutput: string): TerminalStatus {
  if (value === 'completed' || value === 'failed' || value === 'canceled') return value
  if (/\bcancel(?:ed|led)\b/i.test(rawOutput)) return 'canceled'
  if (/\b(failed|error|blocked)\b/i.test(rawOutput)) return 'failed'
  if (/\b(completed|resolved|done|merged|fixed)\b/i.test(rawOutput)) return 'completed'
  return 'failed'
}

function normalizeIssueAction(value: string | undefined, terminalStatus: TerminalStatus, evidenceLinks: string[]): IssueAction {
  if (value === 'closed' || value === 'commented_open') return value
  return terminalStatus === 'completed' && evidenceLinks.length > 0 ? 'closed' : 'commented_open'
}

export function normalizeAgentResult(issue: Pick<IssueContext, 'number' | 'url'>, rawOutput: string): NormalizedIssueResult {
  const parsed = pickIssueResultShape(extractJsonPayload(rawOutput), issue.number)
  const evidenceLinks = parsed ? asStringArray(parsed.evidence_links) : extractUrls(rawOutput)
  const terminalStatus = normalizeTerminalStatus(parsed ? stringifyForJson(parsed.terminal_status) : undefined, rawOutput)
  const issueAction = normalizeIssueAction(parsed ? stringifyForJson(parsed.issue_action) : undefined, terminalStatus, evidenceLinks)
  const summary = parsed ? stringifyForJson(parsed.resolution_summary) : ''
  const actionsTaken = parsed ? asStringArray(parsed.actions_taken) : []
  const blockers = parsed ? asStringArray(parsed.blockers_if_any) : []

  return {
    issue_number: issue.number,
    issue_url: issue.url,
    terminal_status: terminalStatus,
    resolution_summary: summary || firstNonEmptyLine(rawOutput),
    evidence_links: evidenceLinks,
    issue_action: issueAction,
    actions_taken: actionsTaken,
    blockers_if_any: blockers,
  }
}

function normalizeCliPath(filePath: string): string {
  return filePath.replace(/\\/g, '/')
}

export function buildTargetInvocation(target: AgentTarget, briefPath: string, targetCommand?: string): { command: string; args: string[] } {
  const prompt = `Read and execute the issue workflow brief at "${normalizeCliPath(briefPath)}" in the current repository. Return only the per-issue output contract requested there.`
  if (target === 'claude') {
    return {
      command: targetCommand || 'claude',
      args: ['-p', prompt],
    }
  }

  return {
    command: targetCommand || 'codex',
    args: ['exec', prompt],
  }
}

function ensureCommandAvailable(command: string, runner: CommandRunner): void {
  const result = runner(command, ['--help'])
  if (result.error) {
    const errorWithCode = result.error as Error & { code?: string }
    if (errorWithCode.code === 'ENOENT') {
      throw new Error(`Required CLI "${command}" is not available on PATH.`)
    }
    throw new Error(`Failed to probe CLI "${command}": ${result.error.message}`)
  }

  if (result.status !== 0) {
    const detail = result.stderr || result.stdout || `exit code ${result.status}`
    throw new Error(`Required CLI "${command}" is not available on PATH: ${detail}`)
  }
}

function ensureTargetAvailable(target: AgentTarget, targetCommand: string | undefined, runner: CommandRunner): void {
  const invocation = buildTargetInvocation(target, 'tmp/issues-orchestration/preflight/brief.md', targetCommand)
  ensureCommandAvailable(invocation.command, runner)
}

function runJsonCommand<T>(command: string, args: string[], runner: CommandRunner): T {
  const result = runner(command, args)
  if (result.error) {
    throw new Error(`Command failed: ${command} ${args.join(' ')} (${result.error.message})`)
  }
  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}: ${command} ${args.join(' ')}\n${result.stderr || result.stdout}`)
  }
  const parsed = safeJsonParse<T>(result.stdout)
  if (parsed === null) {
    throw new Error(`Command returned invalid JSON: ${command} ${args.join(' ')}`)
  }
  return parsed
}

function resolveRepo(args: ParsedIssueWorkflowArgs, runner: CommandRunner): string {
  if (args.repo) return args.repo
  const repoInfo = runJsonCommand<{ nameWithOwner?: string }>('gh', ['repo', 'view', '--json', 'nameWithOwner'], runner)
  if (!repoInfo.nameWithOwner) {
    throw new Error('Could not resolve repository. Pass --repo=<owner/name>.')
  }
  return repoInfo.nameWithOwner
}

function isOpenIssueState(state: string | null | undefined): boolean {
  if (typeof state !== 'string' || state.trim().length === 0) {
    return true
  }

  return state.trim().toUpperCase() === 'OPEN'
}

function fetchOpenIssueList(repo: string, args: ParsedIssueWorkflowArgs, runner: CommandRunner): IssueListResponse[] {
  if (args.issues.length === 0) {
    return runJsonCommand<IssueListResponse[]>(
      'gh',
      ['issue', 'list', '--repo', repo, '--state', 'open', '--limit', String(args.limit), '--json', 'number,title,url,createdAt,updatedAt,labels,assignees,comments,milestone'],
      runner,
    )
  }

  return args.issues.flatMap((issueNumber) => {
    const issue = runJsonCommand<IssueListResponse>(
      'gh',
      ['issue', 'view', String(issueNumber), '--repo', repo, '--json', 'number,title,url,state,createdAt,updatedAt,labels,assignees,comments,milestone'],
      runner,
    )

    return isOpenIssueState(issue.state) ? [issue] : []
  })
}

function fetchIssueContext(repo: string, issueNumber: number, runner: CommandRunner): IssueContext {
  const issue = runJsonCommand<IssueViewResponse>(
    'gh',
    ['issue', 'view', String(issueNumber), '--repo', repo, '--comments', '--json', 'number,title,body,url,createdAt,updatedAt,labels,assignees,milestone,comments'],
    runner,
  )
  return normalizeIssueContext(issue)
}

function discoverAndRankIssues(repo: string, args: ParsedIssueWorkflowArgs, runner: CommandRunner): WorkflowDiscovery {
  const openIssues = fetchOpenIssueList(repo, args, runner)
  const issueContexts = openIssues.map((issue) => fetchIssueContext(repo, issue.number, runner))
  const rankedIssues = rankIssues(issueContexts)
  const groups = groupRankedIssues(rankedIssues)

  return {
    issueContexts,
    rankedIssues,
    groups,
  }
}
function writeJsonFile(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function buildGroupedSummaryMarkdown(groups: GroupedIssues): string {
  return BUCKET_ORDER
    .map((bucket) => {
      const issues = groups[bucket]
      return [`## ${bucket}`, ...issues.map((issue) => `- #${issue.number} (${issue.score}) ${issue.title}`)].join('\n')
    })
    .join('\n\n')
}

function buildRankedQueueMarkdown(issues: RankedIssue[]): string {
  return issues
    .map((issue, index) => `${index + 1}. #${issue.number} [${issue.bucket}] score=${issue.score} comments=${issue.commentsCount} assignees=${issue.assignees.length} ${issue.title}`)
    .join('\n')
}

function buildSkippedResult(issue: RankedIssue): NormalizedIssueResult {
  const reason = issue.bucket === 'blocked'
    ? 'Skipped execution because metadata marks the issue as blocked.'
    : 'Skipped execution because metadata excludes the issue from active implementation ordering.'

  return {
    issue_number: issue.number,
    issue_url: issue.url,
    terminal_status: 'canceled',
    resolution_summary: reason,
    evidence_links: [],
    issue_action: 'commented_open',
    actions_taken: ['Ranked and bucketed issue via metadata-only workflow'],
    blockers_if_any: [reason],
  }
}

function buildBacklogResult(issue: RankedIssue): NormalizedIssueResult {
  return {
    issue_number: issue.number,
    issue_url: issue.url,
    terminal_status: 'canceled',
    resolution_summary: 'Prepared ranked backlog artifacts and a per-issue brief without invoking a target CLI.',
    evidence_links: [],
    issue_action: 'commented_open',
    actions_taken: ['Fetched issue context', 'Applied metadata-only ranking', 'Generated issue brief'],
    blockers_if_any: ['Backlog mode does not execute target CLIs or mutate GitHub issues.'],
  }
}

function createRunPaths(args: ParsedIssueWorkflowArgs): WorkflowRunPaths {
  const runId = args.runId ?? createRunId()
  const runDir = path.join(RUN_ROOT, runId)
  const briefsDir = path.join(runDir, 'briefs')
  const outputsDir = path.join(runDir, 'agent-output')
  const resultsPath = path.join(runDir, 'results.ndjson')

  fs.mkdirSync(briefsDir, { recursive: true })
  if (args.mode === 'execute') {
    fs.mkdirSync(outputsDir, { recursive: true })
  }

  return {
    runId,
    runDir,
    briefsDir,
    outputsDir,
    resultsPath,
  }
}

function writeDiscoveryArtifacts(runDir: string, discovery: WorkflowDiscovery): void {
  writeJsonFile(path.join(runDir, 'issue-contexts.json'), discovery.issueContexts)
  writeJsonFile(path.join(runDir, 'ranked-queue.json'), discovery.rankedIssues)
  writeJsonFile(path.join(runDir, 'grouped-summary.json'), buildGroupedSummary(discovery.groups))
  writeJsonFile(path.join(runDir, 'grouped-task-manifest.json'), buildGroupedTaskManifest(discovery.groups))
  fs.writeFileSync(path.join(runDir, 'ranked-queue.md'), `${buildRankedQueueMarkdown(discovery.rankedIssues)}\n`, 'utf8')
  fs.writeFileSync(path.join(runDir, 'grouped-summary.md'), `${buildGroupedSummaryMarkdown(discovery.groups)}\n`, 'utf8')
}

function writeIssueBriefs(rankedIssues: RankedIssue[], briefsDir: string): Map<number, string> {
  const briefPaths = new Map<number, string>()

  for (const issue of rankedIssues) {
    const briefPath = path.join(briefsDir, `issue-${issue.number}.md`)
    fs.writeFileSync(briefPath, `${buildIssueBrief(issue)}\n`, 'utf8')
    briefPaths.set(issue.number, briefPath)
  }

  return briefPaths
}

function appendResultLog(resultsPath: string, entry: IssueRunLogEntry): void {
  fs.appendFileSync(resultsPath, `${JSON.stringify(entry)}\n`, 'utf8')
}

function invokeTargetForIssue(
  issue: RankedIssue,
  briefPath: string,
  outputsDir: string,
  target: AgentTarget,
  targetCommand: string | undefined,
  runner: CommandRunner,
): { normalizedResult: NormalizedIssueResult; outputPath: string } {
  const invocation = buildTargetInvocation(target, briefPath, targetCommand)
  const targetResult = runner(invocation.command, invocation.args)
  const rawOutput = normalizeWhitespace(`${targetResult.stdout}\n${targetResult.stderr}`)
  const outputPath = path.join(outputsDir, `issue-${issue.number}.txt`)
  fs.writeFileSync(outputPath, `${rawOutput}\n`, 'utf8')

  if (targetResult.error) {
    return {
      normalizedResult: {
        issue_number: issue.number,
        issue_url: issue.url,
        terminal_status: 'failed',
        resolution_summary: rawOutput || `Target CLI failed for issue #${issue.number}: ${targetResult.error.message}`,
        evidence_links: [],
        issue_action: 'commented_open',
        actions_taken: [],
        blockers_if_any: [`Target CLI failed for issue #${issue.number}: ${targetResult.error.message}`],
      },
      outputPath,
    }
  }

  if (targetResult.status !== 0) {
    return {
      normalizedResult: {
        issue_number: issue.number,
        issue_url: issue.url,
        terminal_status: 'failed',
        resolution_summary: rawOutput || `Target CLI exited with code ${targetResult.status}.`,
        evidence_links: [],
        issue_action: 'commented_open',
        actions_taken: [],
        blockers_if_any: [`Target CLI exited with code ${targetResult.status}.`],
      },
      outputPath,
    }
  }

  return {
    normalizedResult: normalizeAgentResult(issue, rawOutput),
    outputPath,
  }
}

function runBacklogPhase(
  rankedIssues: RankedIssue[],
  briefPaths: Map<number, string>,
  args: ParsedIssueWorkflowArgs & { mode: 'backlog' },
  resultsPath: string,
): IssueRunLogEntry[] {
  const results: IssueRunLogEntry[] = []

  for (const issue of rankedIssues) {
    const isSkippedBucket = issue.bucket === 'blocked' || issue.bucket === 'excluded'
    const normalizedResult = isSkippedBucket ? buildSkippedResult(issue) : buildBacklogResult(issue)
    const entry: IssueRunLogEntry = {
      issueNumber: issue.number,
      issueUrl: issue.url,
      title: issue.title,
      bucket: issue.bucket,
      score: issue.score,
      mode: 'backlog',
      target: undefined,
      briefPath: briefPaths.get(issue.number) ?? path.join('briefs', `issue-${issue.number}.md`),
      outputPath: undefined,
      status: isSkippedBucket ? 'skipped' : 'queued',
      dryRun: args.dryRun,
      normalizedResult,
    }

    results.push(entry)
    appendResultLog(resultsPath, entry)
  }

  return results
}

function runExecutePhase(
  repo: string,
  rankedIssues: RankedIssue[],
  briefPaths: Map<number, string>,
  args: ParsedIssueWorkflowArgs & { mode: 'execute'; target: AgentTarget },
  paths: WorkflowRunPaths,
  runner: CommandRunner,
): IssueRunLogEntry[] {
  const results: IssueRunLogEntry[] = []

  for (const issue of rankedIssues) {
    const briefPath = briefPaths.get(issue.number) ?? path.join(paths.briefsDir, `issue-${issue.number}.md`)

    let normalizedResult: NormalizedIssueResult
    let outputPath: string | undefined
    let status: IssueRunLogEntry['status'] = 'processed'

    if (issue.bucket === 'blocked' || issue.bucket === 'excluded') {
      normalizedResult = buildSkippedResult(issue)
      status = 'skipped'
    } else {
      const execution = invokeTargetForIssue(issue, briefPath, paths.outputsDir, args.target, args.targetCommand, runner)
      normalizedResult = execution.normalizedResult
      outputPath = execution.outputPath
    }

    if (args.applyIssueActions && !args.dryRun) {
      const commentBody = buildIssueComment(normalizedResult, issue.bucket, issue.score)
      try {
        applyIssueAction(repo, issue.number, commentBody, normalizedResult, runner)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        normalizedResult = recordIssueActionFailure(normalizedResult, message)
      }
    }

    const entry: IssueRunLogEntry = {
      issueNumber: issue.number,
      issueUrl: issue.url,
      title: issue.title,
      bucket: issue.bucket,
      score: issue.score,
      mode: 'execute',
      target: args.target,
      briefPath,
      outputPath,
      status,
      dryRun: args.dryRun,
      normalizedResult,
    }

    results.push(entry)
    appendResultLog(paths.resultsPath, entry)
  }

  return results
}
export function buildIssueComment(result: NormalizedIssueResult, bucket: IssueBucket, score: number): string {
  const summary = normalizeForGithubComment(result.resolution_summary)
  const evidence = result.evidence_links.map((link) => normalizeForGithubComment(link))
  const actions = result.actions_taken.map((entry) => normalizeForGithubComment(entry))
  const blockers = result.blockers_if_any.map((entry) => normalizeForGithubComment(entry))

  const evidenceSection = evidence.length > 0
    ? ['Evidence:', ...evidence.map((link) => `- ${link}`)].join('\n')
    : 'Evidence:\n- None provided.'
  const actionsSection = actions.length > 0
    ? ['Actions taken:', ...actions.map((entry) => `- ${entry}`)].join('\n')
    : 'Actions taken:\n- No action list returned.'
  const blockerSection = blockers.length > 0
    ? ['Blockers:', ...blockers.map((entry) => `- ${entry}`)].join('\n')
    : 'Blockers:\n- None.'

  return [
    'Automated issue workflow update',
    '',
    `- Terminal status: ${result.terminal_status}`,
    `- Queue bucket: ${bucket}`,
    `- Heuristic score: ${score}`,
    `- Planned issue action: ${result.issue_action}`,
    '',
    'Summary:',
    summary,
    '',
    evidenceSection,
    '',
    actionsSection,
    '',
    blockerSection,
  ].join('\n')
}

function normalizeForGithubComment(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length === 0) return ''

  return trimmed
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
}

function applyIssueAction(repo: string, issueNumber: number, commentBody: string, result: NormalizedIssueResult, runner: CommandRunner): void {
  fs.mkdirSync(RUN_ROOT, { recursive: true })
  const commentBodyDir = fs.mkdtempSync(path.join(RUN_ROOT, 'gh-comment-'))
  const commentBodyPath = path.join(commentBodyDir, `issue-${issueNumber}-comment.md`)
  let commentResult: CommandResult
  try {
    fs.writeFileSync(commentBodyPath, `${commentBody}\n`, 'utf8')
    commentResult = runner('gh', ['issue', 'comment', String(issueNumber), '--repo', repo, '--body-file', commentBodyPath])
  } finally {
    fs.rmSync(commentBodyDir, { recursive: true, force: true })
  }
  if (commentResult.error || commentResult.status !== 0) {
    const detail = commentResult.error?.message ?? commentResult.stderr ?? commentResult.stdout
    throw new Error(`Failed to comment on issue #${issueNumber}: ${detail}`)
  }

  if (result.issue_action !== 'closed') {
    return
  }

  const closeResult = runner('gh', ['issue', 'close', String(issueNumber), '--repo', repo])
  if (closeResult.error || closeResult.status !== 0) {
    const detail = closeResult.error?.message ?? closeResult.stderr ?? closeResult.stdout
    throw new Error(`Failed to close issue #${issueNumber}: ${detail}`)
  }
}

function recordIssueActionFailure(result: NormalizedIssueResult, message: string): NormalizedIssueResult {
  const blockers = result.blockers_if_any.includes(message)
    ? result.blockers_if_any
    : [...result.blockers_if_any, message]
  const summarySuffix = `GitHub issue action failed: ${message}`
  const resolutionSummary = result.resolution_summary.includes(summarySuffix)
    ? result.resolution_summary
    : `${result.resolution_summary} ${summarySuffix}`.trim()

  return {
    ...result,
    terminal_status: 'failed',
    issue_action: 'commented_open',
    resolution_summary: resolutionSummary,
    blockers_if_any: blockers,
  }
}

function validateArgs(args: ParsedIssueWorkflowArgs): asserts args is ParsedIssueWorkflowArgs & ({ mode: 'backlog' } | { mode: 'execute'; target: AgentTarget }) {
  if (args.mode === 'backlog') {
    if (args.target) {
      throw new Error('Backlog mode does not accept --target. Use --mode=execute to invoke a target CLI.')
    }
    if (args.targetCommand) {
      throw new Error('Backlog mode does not accept --target-command. Use --mode=execute to invoke a target CLI.')
    }
    if (args.applyIssueActions) {
      throw new Error('Backlog mode does not accept --apply-issue-actions because it never mutates GitHub issues.')
    }
    if (args.dryRun) {
      throw new Error('Backlog mode does not accept --dry-run because dry-run only applies to execute mode issue actions.')
    }
    return
  }

  if (!args.target) {
    throw new Error('Execute mode requires --target=claude|codex.')
  }
}

function directRun(importMetaUrl: string): boolean {
  const thisFile = fileURLToPath(importMetaUrl)
  const currentArg = process.argv[1] ? path.resolve(process.argv[1]) : ''
  return thisFile === currentArg
}

export async function runIssueWorkflow(argv: string[], runner: CommandRunner = defaultCommandRunner): Promise<void> {
  const args = parseArgs(argv)
  if (args.help) {
    printUsage()
    return
  }

  validateArgs(args)

  ensureCommandAvailable('gh', runner)

  const repo = resolveRepo(args, runner)
  if (args.mode === 'execute') {
    ensureTargetAvailable(args.target, args.targetCommand, runner)
  }
  const paths = createRunPaths(args)
  const discovery = discoverAndRankIssues(repo, args, runner)
  writeDiscoveryArtifacts(paths.runDir, discovery)

  fs.writeFileSync(paths.resultsPath, '', 'utf8')
  const briefPaths = writeIssueBriefs(discovery.rankedIssues, paths.briefsDir)

  if (args.mode === 'backlog') {
    const backlogResults = runBacklogPhase(discovery.rankedIssues, briefPaths, args, paths.resultsPath)
    writeJsonFile(path.join(paths.runDir, 'results.json'), backlogResults)
    console.log(JSON.stringify({
      repo,
      mode: args.mode,
      target: null,
      applyIssueActions: false,
      runId: paths.runId,
      runDir: normalizeCliPath(paths.runDir),
      processed: backlogResults.length,
      dryRun: args.dryRun,
    }, null, 2))
    return
  }

  const executeResults = runExecutePhase(repo, discovery.rankedIssues, briefPaths, args, paths, runner)
  writeJsonFile(path.join(paths.runDir, 'results.json'), executeResults)
  console.log(JSON.stringify({
    repo,
    mode: args.mode,
    target: args.target,
    applyIssueActions: args.applyIssueActions && !args.dryRun,
    runId: paths.runId,
    runDir: normalizeCliPath(paths.runDir),
    processed: executeResults.length,
    dryRun: args.dryRun,
  }, null, 2))
}

if (directRun(import.meta.url)) {
  runIssueWorkflow(process.argv.slice(2)).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  })
}
