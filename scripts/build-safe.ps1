# build-safe.ps1 - step-by-step build with a hang watchdog.
# ASCII only on purpose: PowerShell 5.1 reads .ps1 as ANSI, so non-ASCII content gets garbled.
#
# Background: the esbuild service process on this machine intermittently hangs, which makes
# `vite build` wait forever right after "N modules transformed" (CPU time stops increasing).
# Clearing leftover node/esbuild processes before building usually works, so each step below
# gets a timeout watchdog plus automatic retries.
#
# Two Windows/PowerShell pitfalls this script deliberately avoids:
#   1) Start-Process fails here with "Item has already been added. Key in dictionary: 'Path'"
#      because the ambient environment contains both 'Path' and 'PATH'. We therefore launch
#      children through System.Diagnostics.Process instead.
#   2) Child stdout is read asynchronously, otherwise a full pipe buffer would deadlock.
#
# IMPORTANT: never kill WorkBuddy's own MCP child processes (e.g. the sheetagent node process).
param(
  [int]$StepTimeoutSec = 220,
  [int]$MaxAttempts = 3,
  [string[]]$KeepPids = @(25916)
)

Set-Location (Split-Path -Parent $PSScriptRoot)
$Node = 'C:\Users\Holive Hu\.workbuddy\binaries\node\versions\22.22.2-3\node.exe'
$Log = 'build-safe.log'

function Write-Log($msg) { $msg | Out-File -Append -Encoding utf8 $Log }

function Clear-Stale {
  Get-Process node, esbuild -ErrorAction SilentlyContinue |
    Where-Object { $KeepPids -notcontains $_.Id } |
    ForEach-Object {
      Write-Log ("      clearing stale PID={0} {1}" -f $_.Id, $_.ProcessName)
      Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
}

function Invoke-Step {
  param([string]$Label, [string[]]$ArgList)

  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    Write-Log ("=== {0} attempt {1}/{2} @ {3} ===" -f $Label, $attempt, $MaxAttempts, (Get-Date -Format 'HH:mm:ss'))

    $argString = ($ArgList | ForEach-Object {
        if ($_ -match '\s') { '"' + $_ + '"' } else { $_ }
      }) -join ' '

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $Node
    $psi.Arguments = $argString
    $psi.UseShellExecute = $false
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.WorkingDirectory = (Get-Location).Path

    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $psi
    $proc.Start() | Out-Null

    $outTask = $proc.StandardOutput.ReadToEndAsync()
    $errTask = $proc.StandardError.ReadToEndAsync()

    $finished = $proc.WaitForExit($StepTimeoutSec * 1000)

    if ($finished) {
      $exitCode = $proc.ExitCode
      try { $outText = $outTask.Result } catch { $outText = '' }
      try { $errText = $errTask.Result } catch { $errText = '' }
      if ($outText) { $outText.TrimEnd() | Out-File -Append -Encoding utf8 $Log }
      if ($exitCode -eq 0) {
        Write-Log ("=== {0} OK @ {1} ===" -f $Label, (Get-Date -Format 'HH:mm:ss'))
        return $true
      }
      Write-Log ("!!! {0} exit code {1}" -f $Label, $exitCode)
      if ($errText) { $errText.TrimEnd() | Out-File -Append -Encoding utf8 $Log }
    }
    else {
      Write-Log ("!!! {0} timed out after {1}s (hang detected), clearing and retrying" -f $Label, $StepTimeoutSec)
      try { $proc.Kill() } catch { }
    }

    # 失败路径同样清理临时输出文件（首版只在成功分支清理，失败后会残留 *.out/*.err）
    Remove-Item $stdout, $stderr -ErrorAction SilentlyContinue
    Clear-Stale
    Start-Sleep -Seconds 3
  }

  Write-Log ("!!! {0} failed {1} times, aborting build" -f $Label, $MaxAttempts)
  return $false
}

'' | Out-File -Encoding utf8 $Log
Write-Log ("BUILD-SAFE START {0}" -f (Get-Date -Format o))
Clear-Stale

$steps = @(
  @{ Label = '1-gen-articles'; Args = @('scripts/gen-articles.mjs') },
  @{ Label = '2-vite-client'; Args = @('node_modules/vite/bin/vite.js', 'build') },
  @{ Label = '3-vite-ssr'; Args = @('node_modules/vite/bin/vite.js', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist-server') },
  @{ Label = '4-prerender'; Args = @('scripts/prerender.mjs') },
  @{ Label = '5-sitemap'; Args = @('scripts/gen-sitemap.mjs') },
  @{ Label = '6-audit'; Args = @('scripts/audit-seo.mjs') }
)

foreach ($step in $steps) {
  if (-not (Invoke-Step -Label $step.Label -ArgList $step.Args)) {
    Write-Log 'BUILD-SAFE FAILED'
    exit 1
  }
}

Write-Log ("BUILD-SAFE DONE {0}" -f (Get-Date -Format o))
exit 0
