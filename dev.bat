@echo off
setlocal
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" "%~dp0scripts\dev-local.mjs" %*
