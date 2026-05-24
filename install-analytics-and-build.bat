@echo off
title Instalar Analytics y Build
color 0A

echo.
echo ================================================
echo   INSTALAR VERCEL ANALYTICS Y BUILD
echo ================================================
echo.

echo [PASO 1] Cerrando procesos Node/Vercel...
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM vercel.exe /T 2>nul
timeout /t 3 /nobreak >nul

echo [PASO 2] Instalando @vercel/analytics y @vercel/speed-insights...
echo.
pnpm i @vercel/analytics @vercel/speed-insights
if errorlevel 1 (
    echo.
    echo [ERROR] Instalacion fallida!
    pause
    exit /b 1
)

echo.
echo [PASO 3] Construyendo proyecto...
echo.
cd client
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build fallido!
    pause
    exit /b 1
)
cd ..

echo.
echo [PASO 4] Agregando cambios a Git...
git add -A

echo [PASO 5] Haciendo commit...
git commit -m "Add: Vercel Analytics + Dark mode negro puro"

echo.
echo ================================================
echo   COMPLETADO EXITOSAMENTE
echo ================================================
echo.
echo CAMBIOS REALIZADOS:
echo - Instalado @vercel/analytics
echo - Instalado @vercel/speed-insights
echo - Dark mode ahora usa negro puro (#000000)
echo - Analytics y Speed Insights integrados en main.tsx
echo.
echo SIGUIENTE PASO:
echo Ve a https://vercel.com/dashboard
echo y haz Redeploy del proyecto
echo.
pause
