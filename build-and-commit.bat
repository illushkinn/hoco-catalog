@echo off
echo ========================================
echo BUILD Y COMMIT AUTOMATICO
echo ========================================
echo.

echo [1/4] Matando todos los procesos Node...
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM vercel.exe /T 2>nul
timeout /t 3 /nobreak >nul

echo [2/4] Construyendo proyecto...
cd client
call npm run build
if errorlevel 1 (
    echo ERROR: Build fallido
    pause
    exit /b 1
)
cd ..

echo [3/4] Agregando cambios a Git...
git add -A

echo [4/4] Haciendo commit...
git commit -m "Fix: Footer alineado a izquierda, texto simplificado, sin boton arrepentimiento"

echo.
echo ========================================
echo COMPLETADO
echo ========================================
echo.
echo Los cambios estan listos para deploy.
echo Ahora ve a: https://vercel.com/dashboard
echo Y haz Redeploy manualmente.
echo.
pause
