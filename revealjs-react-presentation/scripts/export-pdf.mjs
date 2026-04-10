import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const rootDir = process.cwd()
const host = '127.0.0.1'
const port = 4173
const previewUrl = `http://${host}:${port}/?print-pdf`
const outputDir = path.join(rootDir, 'exports')
const outputFile = path.join(outputDir, 'presentation.pdf')
const viteCli = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')

function previewCommand() {
  return {
    command: process.execPath,
    args: [viteCli, 'preview', '--host', host, '--port', String(port), '--strictPort'],
  }
}

async function waitForPreview(url, timeoutMs = 20000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url.replace('/?print-pdf', '/'))
      if (response.ok) {
        return
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Preview server did not become ready within ${timeoutMs}ms.`)
}

async function main() {
  await mkdir(outputDir, { recursive: true })

  const { command, args } = previewCommand()
  const previewProcess = spawn(command, args, {
    cwd: rootDir,
    stdio: 'pipe',
    env: process.env,
  })

  previewProcess.stdout.on('data', (chunk) => {
    process.stdout.write(chunk)
  })

  previewProcess.stderr.on('data', (chunk) => {
    process.stderr.write(chunk)
  })

  try {
    await waitForPreview(previewUrl)

    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(previewUrl, { waitUntil: 'networkidle' })
    await page.waitForFunction(() => document.querySelectorAll('.reveal .slides section').length > 0)
    await page.pdf({
      path: outputFile,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '0.3in',
        right: '0.3in',
        bottom: '0.3in',
        left: '0.3in',
      },
    })

    await browser.close()
    console.log(`Exported PDF to ${outputFile}`)
  } finally {
    previewProcess.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  console.error('If Chromium is missing, run `npm run setup:browsers` and retry.')
  process.exitCode = 1
})
