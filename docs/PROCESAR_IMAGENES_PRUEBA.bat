@echo off
echo ========================================
echo PROCESADOR DE IMAGENES - PRUEBA (5 imagenes)
echo ========================================
echo.
echo Este script procesara solo 5 imagenes de prueba
echo para que veas como quedan antes de procesar todas.
echo.
pause

echo.
echo [1/2] Instalando dependencias...
echo.
call pnpm install @imgly/background-removal-node sharp

if errorlevel 1 (
    echo Intentando con npm...
    call npm install @imgly/background-removal-node sharp
)

echo.
echo [2/2] Procesando 5 imagenes de prueba...
echo.
node process-images-test.js

echo.
echo Proceso completado!
echo Revisa las imagenes en: client\public\imagenes_hoco_productos_sin_fondo
echo.
pause
