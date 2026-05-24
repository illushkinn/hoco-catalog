@echo off
echo ========================================
echo DEPLOY FIX - Hoco Catalog
echo ========================================
echo.

echo [1/5] Matando procesos de Node/Vercel...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/5] Construyendo proyecto...
cd client
call npm run build
if errorlevel 1 (
    echo ERROR: Build fallido
    pause
    exit /b 1
)

echo [3/5] Agregando cambios a Git...
cd ..
git add -A

echo [4/5] Haciendo commit...
git commit -m "Fix: Cache busting v3 + no-cache headers para imagenes"

echo [5/5] Desplegando a Vercel...
echo.
echo IMPORTANTE: Despues del deploy, ve a:
echo https://vercel.com/dashboard
echo Settings -^> Data Cache -^> Purge Everything
echo.

vercel --prod --force

echo.
echo ========================================
echo DEPLOY COMPLETADO
echo ========================================
echo.
echo SIGUIENTE PASO MANUAL:
echo 1. Ve a https://vercel.com/dashboard
echo 2. Selecciona tu proyecto "hococatalog"
echo 3. Ve a Settings -^> Data Cache
echo 4. Click en "Purge Everything"
echo 5. Abre el sitio en modo incognito
echo.
pause
