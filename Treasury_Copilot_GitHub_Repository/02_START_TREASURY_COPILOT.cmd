@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Run 01_INSTALL_WINDOWS.cmd after installing Node.js LTS.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Dependencies are not installed. Run 01_INSTALL_WINDOWS.cmd first.
  pause
  exit /b 1
)
echo Treasury Copilot is starting in read-only mode.
echo Keep this window open, then browse to http://127.0.0.1:8787
echo Press Ctrl+C in this window to stop the application.
call npm start
if errorlevel 1 (
  echo.
  echo Treasury Copilot stopped with an error. Capture this window for the defect report.
  pause
)
