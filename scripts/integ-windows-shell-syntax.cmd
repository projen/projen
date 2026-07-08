@echo off
setlocal

rem Verifies a task can resolve and run a command via PATH on Windows,
rem regardless of PATH formatting.

set TARBALL=
for %%f in ("%~dp0..\dist\js\*.tgz") do set TARBALL=%%f
if "%TARBALL%"=="" (
  echo Could not find npm tarball under dist\js >&2
  exit /b 1
)

call :run_test "PATH entry with forward slashes" "./node_modules/.bin"
if errorlevel 1 exit /b 1

call :run_test "PATH entry with a space" "space dir\bin"
if errorlevel 1 exit /b 1

echo Windows task shell syntax tests passed!
exit /b 0

:run_test
setlocal
set "LABEL=%~1"
set "BIN_SUBDIR=%~2"

for /f "delims=" %%d in ('powershell -Command "(New-Item -ItemType Directory -Path (Join-Path $env:TEMP ([System.Guid]::NewGuid()))).FullName"') do set "PROJ_DIR=%%d"
set "BIN_DIR=%PROJ_DIR%\%BIN_SUBDIR%"
mkdir "%BIN_DIR%"
> "%BIN_DIR%\greet.cmd" (
  echo @echo off
  echo echo shim-ok
)

echo === Test: %LABEL% ===
echo PATH entry under test: %BIN_DIR%

pushd "%PROJ_DIR%"
call git init -q
call git config commit.gpgsign false
call npm install "%TARBALL%" --no-save >nul
call npx projen new node --package-manager=npm >nul

powershell -Command "(Get-Content .projenrc.js) -replace 'project.synth\(\);', 'project.tasks.addTask(\"path-repro\", { exec: \"greet\" });project.synth();' | Set-Content .projenrc.js"
call npx projen >nul

set "PATH=%BIN_DIR%;%PATH%"
call npx projen path-repro >output.log 2>&1

findstr /c:"shim-ok" output.log >nul
if errorlevel 1 (
  echo ERROR: %LABEL% did not resolve/run the shim via PATH. Output: >&2
  type output.log >&2
  popd
  endlocal
  exit /b 1
)

echo Output: >&2
type output.log >&2
echo %LABEL% passed!

popd
rd /s /q "%PROJ_DIR%"
endlocal
exit /b 0
