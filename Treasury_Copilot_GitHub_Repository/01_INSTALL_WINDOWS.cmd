@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install the current Node.js LTS release from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js LTS from https://nodejs.org/.
  pause
  exit /b 1
)
echo Installing the pinned Treasury Copilot dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo Installation failed. Capture this window and include it in the defect report.
  pause
  exit /b 1
)
echo.
echo Installation completed successfully.
pause
