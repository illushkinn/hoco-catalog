@echo off
title DEPLOY FINAL - Hoco Catalog
color 0A

echo.
echo ================================================
echo   DEPLOY FINAL - Footer y Hero Button
echo ================================================
echo.

echo [PASO 1] Cerrando procesos Node/Vercel...
echo.
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM vercel.exe /T 2>nul
wmic process where "commandline like '%%vercel%%'" delete 2>nul
timeout /t 3 /nobreak >nul

echo [PASO 2] Navegando al proyecto...
cd /d "%~dp0"
cd client

echo [PASO 3] Construyendo proyecto...
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build fallido!
    echo Presiona cualquier tecla para salir...
    pause >nul
    exit /b 1
)

echo.
echo [PASO 4] Volviendo a raiz...
cd ..

echo [PASO 5] Agregando cambios a Git...
git add -A

echo [PASO 6] Haciendo commit...
git commit -m "Fix: Footer alineado izquierda + boton hero compacto mobile"

echo.
echo ================================================
echo   BUILD COMPLETADO EXITOSAMENTE
echo ================================================
echo.
echo CAMBIOS REALIZADOS:
echo - Footer todo alineado a la izquierda
echo - Boton "Ver Catalogo" compacto en mobile
echo - Eliminado boton de arrepentimiento
echo - Texto simplificado: "Hoco Original"
echo.
echo SIGUIENTE PASO:
echo Ve a https://vercel.com/dashboard
echo y haz Redeploy del proyecto "hococatalog"
echo.
echo Presiona cualquier tecla para salir...
pause >nul
