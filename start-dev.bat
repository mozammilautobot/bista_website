@echo off
REM ---------------------------------------------------------------
REM  Bista AI - dev launcher
REM  Runs via cmd.exe so it bypasses PowerShell's execution policy.
REM  Just double-click this file.
REM ---------------------------------------------------------------
title Bista AI - dev server
cd /d "%~dp0"

REM Make sure Node is on PATH for this window
set "PATH=C:\Program Files\nodejs;%PATH%"

echo.
echo === Checking Node ===
node -v
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js was not found at "C:\Program Files\nodejs".
  echo Install it from https://nodejs.org/ then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "public" mkdir "public"
if not exist "public\idp_no_left_text_video.mp4" (
  if exist "%USERPROFILE%\Downloads\idp_no_left_text_video.mp4" (
    echo === Copying hero video into public\ ===
    copy /Y "%USERPROFILE%\Downloads\idp_no_left_text_video.mp4" "public\idp_no_left_text_video.mp4"
  )
)

if not exist "node_modules" (
  echo.
  echo === Installing dependencies ^(first run only, ~1-2 min^) ===
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. Read the messages above.
    echo.
    pause
    exit /b 1
  )
)

echo.
echo === Starting Next.js dev server ===
echo Open http://localhost:3000 once you see "Ready".
echo Press Ctrl+C in this window to stop the server.
echo.
call npm run dev

echo.
echo Server stopped.
pause
