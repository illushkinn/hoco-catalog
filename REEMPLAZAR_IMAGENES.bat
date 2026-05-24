@echo off
echo ========================================
echo REEMPLAZAR IMAGENES OPTIMIZADAS
echo ========================================
echo.
echo Este script va a:
echo 1. Hacer backup de las imagenes originales
echo 2. Reemplazar con las imagenes optimizadas de TinyPNG
echo 3. Preparar para commit
echo.
pause

echo.
echo [1/3] Haciendo backup de imagenes originales...
echo.
move client\public\imagenes_hoco_productos client\public\imagenes_hoco_productos_backup

echo.
echo [2/3] Copiando imagenes optimizadas...
echo.
move client\public\imagenes_hoco_productos_tinypng client\public\imagenes_hoco_productos

echo.
echo [3/3] Listo para commit!
echo.
echo ========================================
echo COMPLETADO!
echo ========================================
echo.
echo Backup guardado en: imagenes_hoco_productos_backup
echo Imagenes optimizadas ahora en: imagenes_hoco_productos
echo.
echo Proximos pasos:
echo 1. Verifica que las imagenes se vean bien
echo 2. Ejecuta: DEPLOY_OPTIMIZACION.bat
echo.
pause
