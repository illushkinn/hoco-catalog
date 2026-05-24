@echo off
title INSTALAR Y DEPLOY - Hoco Catalog
color 0E

echo.
echo ========================================
echo   INSTALAR DEPENDENCIAS Y DEPLOY
echo ========================================
echo.

echo [1/5] Cerrando procesos Node...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo [2/5] Instalando dependencias...
echo.
call pnpm install
if errorlevel 1 (
    echo.
    echo [ERROR] Instalacion fallida!
    echo Intenta manualmente: pnpm install
    pause
    exit /b 1
)

echo.
echo [3/5] Build del proyecto...
echo.
cd client
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build fallido!
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo [4/5] Commit de cambios...
git add -A
git commit -m "Fix: Instalar Analytics y Speed Insights"

echo.
echo [5/5] Push a GitHub...
git push

echo.
echo ========================================
echo   COMPLETADO!
echo ========================================
echo.
echo Vercel desplegara automaticamente.
echo Espera 1-2 minutos y verifica:
echo - https://vercel.com/dashboard
echo.
pause
