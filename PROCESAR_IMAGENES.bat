@echo off
echo ========================================
echo PROCESADOR DE IMAGENES - HOCO CATALOG
echo ========================================
echo.
echo Este script va a:
echo 1. Instalar dependencias necesarias
echo 2. Procesar 134 imagenes (remover fondo y reescalar)
echo 3. Guardar en: imagenes_hoco_productos_sin_fondo
echo.
echo NOTA: Este proceso puede tardar 20-40 minutos
echo.
pause

echo.
echo [1/3] Instalando dependencias...
echo.
call pnpm install @imgly/background-removal-node sharp

if errorlevel 1 (
    echo.
    echo ERROR: No se pudieron instalar las dependencias
    echo Intentando con npm...
    call npm install @imgly/background-removal-node sharp
)

echo.
echo [2/3] Procesando imagenes...
echo.
node process-images.js

echo.
echo [3/3] Proceso completado!
echo.
echo Las imagenes procesadas estan en:
echo client\public\imagenes_hoco_productos_sin_fondo
echo.
echo Para usarlas, necesitas actualizar las rutas en el codigo
echo o reemplazar las imagenes originales.
echo.
pause
