@echo off
cls
echo ===========================================
echo               Menu
echo ===========================================
echo 1. Run npm start in the android folder
echo 2. Run npm run dev in the backend folder
echo 3. Run both commands
echo 4. Exit
echo ===========================================
set /p choice="Choose 1, 2, 3, 4: "

if "%choice%"=="1" goto android
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto both
if "%choice%"=="4" exit

:android
:: Run npm start in the android folder
cd /d D:\THIET BI DI DONG_2\HoangVuKhang\android
echo Running npm start in the android folder...
start npm start
goto end

:backend
:: Run npm run dev in the backend folder
cd /d D:\THIET BI DI DONG_2\HoangVuKhang\backend
echo Running npm run dev in the backend folder...
start npm run dev
goto end

:both
:: Run both commands
cd /d D:\THIET BI DI DONG_2\HoangVuKhang\android
echo Running npm start in the android folder...
start npm start
timeout /t 2 /nobreak >nul
cd /d D:\THIET BI DI DONG_2\HoangVuKhang\backend
echo Running npm run dev in the backend folder...
start npm run dev
goto end

:end
pause
