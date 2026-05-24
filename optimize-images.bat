@echo off
echo ========================================
echo OPTIMIZADOR DE IMAGENES - Squoosh CLI
echo ========================================
echo.
echo Este script optimiza las imagenes usando Squoosh (Google)
echo - Convierte a WebP
echo - Reduce tamano
echo - Mantiene calidad
echo.
pause

echo.
echo [1/3] Instalando Squoosh CLI...
echo.
call npm install -g @squoosh/cli

echo.
echo [2/3] Creando directorio de salida...
echo.
mkdir client\public\imagenes_optimizadas 2>nul

echo.
echo [3/3] Optimizando imagenes...
echo.
squoosh-cli --webp auto -d client\public\imagenes_optimizadas client\public\imagenes_hoco_productos\*.png client\public\imagenes_hoco_productos\*.jpeg client\public\imagenes_hoco_productos\*.jpg

echo.
echo ========================================
echo COMPLETADO!
echo ========================================
echo.
echo Las imagenes optimizadas estan en:
echo client\public\imagenes_optimizadas
echo.
echo Siguiente paso:
echo 1. Revisa las imagenes
echo 2. Reemplaza las originales
echo 3. Actualiza las rutas en el codigo
echo.
pause
